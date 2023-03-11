<template>
  <div class="my-0 py-0">
    <v-text-field
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      :append-icon="field.id == 'contrasena' ? (field.show_contrasena ? 'mdi-eye' : 'mdi-eye-off') : undefined"
      :type="field.id == 'contrasena' ? (field.show_contrasena ? 'text' : 'password') : field.tipo"
      @click:append="field.show_contrasena = !field.show_contrasena"
      :placeholder="field.placeholder || field.label"
      :error="field.error == true ? true : false"
      :prepend-icon="field.prepend_icon"
      :maxlength="field.maxlength || 1"
      :background-color="color_input"
      @keydown.enter="pressEnter"
      :counter="field.maxlength"
      :disabled="field.disabled"
      @keydown.esc="pressEsc"
      @keydown.f2="pressF2"
      :prefix="field.prefix"
      @keydown.f8="abrirF8"
      :label="field.label"
      @focus="focusCaja"
      @input="onValue"
      @blur="sinFoco"
      :id="field.id"
      :value="value"
      ref="input"
      outlined
      dense
    >
      <v-card :color="field.disabled ? '#6b8996' : 'secondary'" style="cursor: pointer" @click="abrirF8" v-if="field.f8" slot="append" dark>
        <v-icon>mdi-magnify</v-icon>
      </v-card>
    </v-text-field>
  </div>
</template>
<script>
import { formatIp_ } from "../../mixins/global";
import { mapMutations } from "vuex";
export default {
  props: {
    value: [Number, String],
    field: {
      label: String,
      maxlength: String,
      show_contrasena: Boolean,
      campo_abierto: Boolean,
      disabled: Boolean,
      tipo: {
        type: String,
        default: () => "string",
      },
      f8: {
        type: Boolean,
        default: () => false,
      },
      required: {
        type: Boolean,
        default: () => false,
      },
    },
  },
  data() {
    return {
      flag_foco: false,
      color_input: "",
    };
  },
  watch: {
    flag_foco() {
      if (!this.field.campo_abierto) {
        if (this.flag_foco && !this.field.disabled) this.color_input = "input_foco";
        else this.color_input = "input_blur";
      }
    },
  },

  methods: {
    ...mapMutations({ CON851: "CON851" }),

    onValue(e) {
      let valor = e;
      if (this.field.tipo == "number") {
        if (!isNaN(valor) || valor != NaN) valor = parseInt(valor);
      }
      if (["string", undefined, "email"].includes(this.field.tipo)) valor = this.quitarTildes(valor);
      this.field.tipo == "moneda" && this.input_mask(this.field.id);
      setTimeout(() => {
        if (valor.toString().length == this.field.maxlength && this.field.tipo != "time") this.pressEnter();
      }, 100);

      switch (this.field.tipo) {
        case "ip":
          valor = formatIp_(valor);
          break;
        default:
          break;
      }
      this.$emit("input", valor);
    },
    focoCampo() {
      setTimeout(() => {
        document.getElementById(this.field.id).focus();
      }, 100);
    },
    async pressEnter() {
      if (this.field.required && typeof this.value == "string" && this.value?.trim() == "") {
        this.CON851(["PNZ", "info", `${this.field.label} es requerid@`, this.focoCampo]);
      } else if (this.field.required && typeof this.value == "number" && [NaN, ""].includes(this.value)) {
        this.CON851(["PNZ", "info", `${this.field.label} es requerid@`, , this.focoCampo]);
      } else if (!/.+@.+\..+/.test(this.value) && this.field.tipo == "email") {
        this.CON851(["PNZ", "info", `Correo ${this.field.label} invalido`, , this.focoCampo]);
      } else {
        if (!this.field.campo_abierto) this.field.disabled = true;
        this.$emit("next-action", "enter");
      }
    },
    async pressEsc() {
      if (!this.field.campo_abierto) this.field.disabled = true;
      this.$emit("next-action", "esc");
    },
    abrirF8() {
      this.$emit("abrirF8");
    },
    pressF2() {
      console.log("HE");
      this.$emit("F2");
    },
    focusCaja() {
      this.flag_foco = false;
    },
    sinFoco() {
      this.flag_foco = true;
    },
    quitarTildes(str) {
      str = str.toUpperCase();
      const acentos = { Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U" };
      return str
        .split("")
        .map((letra) => acentos[letra] || letra)
        .join("")
        .toString();
    },
  },
};
</script>
