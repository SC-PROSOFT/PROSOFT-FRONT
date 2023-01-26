<template>
  <v-form ref="form" @submit.prevent>
    <v-file-input
      :error="field.error == true ? true : false"
      @focus="setCaja(field), focusCaja()"
      :disabled="field.disabled"
      @keydown.esc="pressEsc"
      v-model="reg[field.id]"
      :accept="field.file"
      :label="field.label"
      @change="changeFile"
      @blur="sinFoco()"
      :id="field.id"
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
    reg: Object,
    field: {
      label: String,
      value: String,
      disabled: Boolean,
    },
    mask: Function,
  },
  data() {
    return {
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
    flag_foco() {
      let elementos = document.getElementById(this.field.id);
      if (this.flag_foco && !this.field.disabled) {
        elementos.style.background = "#FFD700";
        elementos.style.borderRadius = "0.2rem";
      } else {
        elementos.style.background = "";
      }
    },
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
      !!file?.name && this.$emit("next-action", { key: "enter", field: this.field.id });
    },
  },
};
</script>
<style></style>
