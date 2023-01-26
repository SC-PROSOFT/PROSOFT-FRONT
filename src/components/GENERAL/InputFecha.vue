<template>
  <div>
    <v-text-field
      @focus="setCaja(field), focusCaja()"
      :maxlength="field.max_length"
      @keypress.enter="pressEnter"
      :counter="field.max_length"
      :disabled="field.disabled"
      placeholder="dd-mm-aaaa"
      @keydown.esc="pressEsc"
      @keydown.f8="abrirF8"
      v-model="reg[field.id]"
      :label="field.label"
      format="dd-mm-yyyy"
      :type="field.tipo"
      @blur="sinFoco()"
      @input="input()"
      :id="field.id"
      ref="input"
      outlined
      dense
    >
      <v-icon
        :color="field.disabled ? '#6b8996' : 'secondary'"
        style="cursor: pointer"
        class="mt-1 mr-1"
        v-if="field.disabled"
        slot="append"
        size="17"
        dark
        >mdi-calendar-blank</v-icon
      >
    </v-text-field>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </div>
</template>

<script>
import { formatFecha_ } from "../../mixins/global";
import { alert } from "../../mixins/CON851";
import { mapMutations } from "vuex";
import moment from "moment";
export default {
  mixins: [alert],
  props: {
    reg: Object,
    field: {
      label: String,
      value: String,
      max_length: String,
      disabled: Boolean,
      calendar: Boolean,
      tipo: {
        type: String,
        default: () => "string",
      },
      required: {
        type: Boolean,
        default: () => false,
      },
    },
  },
  data() {
    return {
      estado: false,
      primerslap: false,
      segundoslap: false,
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
  computed: {
    form_fecha() {
      this.reg[this.field.id] = moment(this.reg[this.field.id]).format("YYYY-MM-DD");
      return this.reg[this.field.id];
    },
  },
  methods: {
    formatFecha_,
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
    focusCaja() {
      if (!this.reg[this.field.id]) this.reg[this.field.id] = moment().format("YYYY-MM-DD");
      this.flag_foco = false;
    },
    sinFoco() {
      this.flag_foco = true;
    },

    async pressEnter() {
      if (isNaN(Date.parse(this.reg[this.field.id]))) {
        this.CON851("PNZ", "info", `Fecha invalida`);
      } else {
        this.estado = !this.estado;
        this.setDialogType("input");
        this.$emit("next-action", { key: "enter", field: this.field.id });
      }
    },
    abrirF8() {
      this.$emit("abrirF8");
    },
    pressEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
    },
    input() {},
  },
};
</script>
<style>
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  border-radius: 4px;
  margin-right: 2px;
  color: #3399ff;
}
</style>
