<template>
  <div>
    <v-text-field
      @focus="setCaja(field), focusCaja()"
      :background-color="color_input"
      :maxlength="field.max_length"
      @keypress.enter="pressEnter"
      :counter="field.max_length"
      :disabled="field.disabled"
      placeholder="dd-mm-aaaa"
      @keydown.esc="pressEsc"
      @keydown.f8="abrirF8"
      :label="field.label"
      format="dd-mm-yyyy"
      @keyup="onChange()"
      :type="field.tipo"
      @blur="sinFoco()"
      @input="input()"
      v-model="reg_"
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
    reg: [Number, String],
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
      color_input: "",
      reg_: "",
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
      if (this.flag_foco && !this.field.disabled) this.color_input = "input_foco";
      else this.color_input = "input_blur";
    },
  },
  computed: {
    form_fecha() {
      this.reg_ = moment(this.reg_).format("YYYY-MM-DD");
      return this.reg_;
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
      if (!this.reg_) this.reg_ = moment().format("YYYY-MM-DD");
      this.flag_foco = false;
    },
    sinFoco() {
      this.flag_foco = true;
    },
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },
    async pressEnter() {
      if (isNaN(Date.parse(this.reg_))) {
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
