import { mapMutations, mapGetters } from "vuex";

export const nextAction = {
  data() {
    return {
      back: null,
      next: null,
    };
  },
  computed: {
    ...mapGetters({ get: "formularios/get" }),
  },
  methods: {
    ...mapMutations({ setDialogType: "formularios/setDialogType" }),

    nextStep(cajas, data, func1) {
      const keys = Object.keys(cajas);
      const indexField = keys.lastIndexOf(data.field);
      cajas[data.field].disabled = true;
      switch (data.key) {
        case "enter":
          func1(data.key);
          this.setDialogType("input");
          break;
        case "esc":
          func1(data.key);
          if (indexField === 0) this.setDialogType("salir");
          else this.setDialogType("input");
          break;
      }
    },
    nextStepFree(cajas, data, func1, func2) {
      //flujo cuando las cajas están habilitadas
      const keys = Object.keys(cajas);
      const indexField = keys.lastIndexOf(data.field);
      switch (data.key) {
        case "enter":
          if (indexField === keys.length - 1) {
            this.setDialogType("done");
            func1();
          } else {
            document.getElementById(cajas[keys[indexField + data.jumps]].id).focus();
          }
          break;
        case "esc":
          if (indexField === 0) {
            this.setDialogType("salir");
            func2();
          } else {
            document.getElementById(cajas[keys[indexField - data.jumps]].id).focus();
          }
          break;
        default:
          break;
      }
    },

    firstField(cajas) {
      // habilitar la primera caja (disabled)
      const keys = Object.keys(cajas);
      cajas[keys[0]].disabled = false;
    },
    firstFieldDisabled(cajas) {
      // deshabilitar la primera caja
      const keys = Object.keys(cajas);
      cajas[keys[0]].disabled = true;
    },
    lastField(cajas) {
      // habilita la última
      const keys = Object.keys(cajas);
      cajas[keys[keys.length - 1]].disabled = false;
    },
    lastFieldDisabled(cajas) {
      // habilita la última
      const keys = Object.keys(cajas);
      cajas[keys[keys.length - 1]].disabled = true;
    },
    onField() {
      // habilitar la última caja que se focuseó
      this.get("enCaja").disabled = false;
    },
    offField() {
      // deshabilitará la última caja que se focuseó
      this.get("enCaja").disabled = true;
    },
    focusInput(cajas, data, id) {
      // console.log(cajas[data].disabled);
      setTimeout(() => {
        id && document.getElementById(id).focus();
        cajas[data].disabled = false;
        // console.log(cajas[data].disabled);
      }, 100);
    },
    InputFoco(id) {
      document.getElementById(id).disabled = false;
      id && document.getElementById(id).focus();
      // cajas[data].disabled = false;
    },

    firstFieldFree(cajas) {
      const keys = Object.keys(cajas);
      document.getElementById(cajas[keys[0]].id).focus();
    },
    lastFieldFree(cajas) {
      // habilita la última
      const keys = Object.keys(cajas);
      document.getElementById(cajas[keys.at(-1)].id).focus();
    },
    onFieldFree() {
      document.getElementById(this.get("enCaja").id).focus();
    },
    focusInputFree(id) {
      id && document.getElementById(id).focus();
    },
  },
};
