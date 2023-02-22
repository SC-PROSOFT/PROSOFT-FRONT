<template>
  <v-form ref="form" @submit.prevent>
    <v-text-field
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      :error="field.error == true ? true : false"
      @focus="setCaja(field), focusCaja()"
      :background-color="color_input"
      :maxlength="field.max_length"
      @keydown.enter="pressEnter"
      :counter="field.max_length"
      :disabled="field.disabled"
      @keydown.esc="pressEsc"
      @keydown.f2="pressF2"
      @keydown.f8="abrirF8"
      :label="field.label"
      :type="field.tipo"
      @keyup="onChange()"
      @blur="sinFoco()"
      :id="field.id"
      v-model="reg_"
      @input="input"
      ref="input"
      outlined
      dense
    >
      <v-card
        :color="field.disabled ? '#6b8996' : 'secondary'"
        style="cursor: pointer"
        @click="abrirF8"
        v-if="field.f8"
        slot="append"
        dark
      >
        <v-icon>mdi-magnify</v-icon>
      </v-card>
    </v-text-field>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-form>
</template>

<script>
import { formatNumberMask_ } from "../../mixins/global";
import { alert } from "../../mixins/CON851";
import { mapMutations } from "vuex";
export default {
  mixins: [alert],
  props: {
    reg: [Number, String, File],
    field: {
      label: String,
      value: String,
      max_length: String,
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
      details: {
        type: Boolean,
        default: () => false,
      },
    },
    mask: Function,
  },
  data() {
    return {
      reg_: null,
      flag_foco: false,
      color_input: "",
    };
  },
  watch: {
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    "$props.reg"(val) {
      this.reg_ = val;
    },
    flag_foco() {
      if (this.flag_foco && !this.field.disabled)
        this.color_input = "input_foco";
      else this.color_input = "input_blur";
    },
  },
  mounted() {
    this.reg_ = this.reg;
  },

  methods: {
    formatNumberMask_,
    ...mapMutations({
      setCaja: "formularios/setCaja",
      setDialogType: "formularios/setDialogType",
    }),
    cancelar() {
      this.cancelarAlerta();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      setTimeout(() => {
        document.getElementById(this.field.id).focus();
      }, 100);
    },
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },
    confirmar() {},
    async pressEnter() {
      if (
        this.field.required &&
        typeof this.reg_ == "string" &&
        this.reg_?.trim() == ""
      ) {
        this.CON851("PNZ", "info", `${this.field.label} es requerid@`);
      } else if (
        this.field.required &&
        typeof this.reg_ == "number" &&
        [NaN, ""].includes(this.reg_)
      ) {
        this.CON851("PNZ", "info", `${this.field.label} es requerid@`);
      } else if (!/.+@.+\..+/.test(this.reg_) && this.field.tipo == "email") {
        this.CON851("PNZ", "info", `Correo ${this.field.label} invalido`);
      } else {
        this.$emit("next-action", { key: "enter", field: this.field.id });
      }
    },
    async pressEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
    },
    abrirF8() {
      this.$emit("abrirF8");
    },
    pressF2() {
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
    input_mask(obj_name) {
      let val = event.target.value;
      let val_edit = val.replace(/,/g, "");
      this.$set(this.reg, obj_name, val_edit);
      this.reg_ = formatNumberMask_(this.reg_);
    },
    input() {
      if (this.field.tipo == "number") {
        if (!isNaN(this.reg_) || this.reg_ != NaN) {
          this.reg_ = parseInt(this.reg_);
        }
      }
      if (["string", undefined, "email"].includes(this.field.tipo))
        this.reg_ = this.quitarTildes(this.reg_);
      if (this.mask) {
        this.reg_ = this.mask({
          val: this.reg_,
          max: this.field.max_digits,
          decimal: this.field.decimal,
        });
      }
      this.field.tipo == "moneda" && this.input_mask(this.field.id);
      setTimeout(() => {
        if (
          this.reg_.toString().length == this.field.max_length &&
          this.field.tipo != "time"
        )
          this.pressEnter();
      }, 100);
    },
  },
};
</script>
