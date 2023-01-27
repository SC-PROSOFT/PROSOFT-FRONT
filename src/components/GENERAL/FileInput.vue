<template>
  <v-form ref="form" @submit.prevent>
    <v-file-input
      :error="field.error == true ? true : false"
      @focus="setCaja(field), focusCaja()"
      :background-color="color_input"
      :disabled="field.disabled"
      @keydown.esc="pressEsc"
      :accept="field.file"
      :label="field.label"
      @change="changeFile"
      @keyup="onChange()"
      @blur="sinFoco()"
      :id="field.id"
      v-model="reg_"
      ref="input"
      outlined
      dense
    >
    </v-file-input>
    <CON851
      @cancelarAlerta="cancelar()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-form>
</template>
<script>
import { alert } from "../../mixins/CON851";
import { mapMutations } from "vuex";
export default {
  mixins: [alert],
  props: {
    reg: [Object, Array, File],
    field: {
      label: String,
      value: String,
      disabled: Boolean,
    },
  },
  data() {
    return {
      reg_: null,
      color_input: "",
      flag_foco: false,
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
      console.log("val", val);
      this.reg_ = val;
    },
    reg_(val) {
      this.onChange();
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
    ...mapMutations({
      setCaja: "formularios/setCaja",
      setDialogType: "formularios/setDialogType",
    }),
    cancelar() {
      this.cerrar_CON851();
      setTimeout(() => {
        document.getElementById(this.field.id).focus();
      }, 100);
    },

    async pressEsc() {
      this.$refs.form.reset();
      this.$emit("next-action", { key: "esc", field: this.field.id });
    },
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },

    abrirF8() {
      this.$emit("abrirF8");
    },
    focusCaja() {
      this.flag_foco = false;
    },
    sinFoco() {
      this.flag_foco = true;
    },
    changeFile(file) {
      !!file?.name &&
        this.$emit("next-action", { key: "enter", field: this.field.id });
    },
  },
};
</script>
<style></style>
