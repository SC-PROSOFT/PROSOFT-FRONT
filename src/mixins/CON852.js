import CON852 from "../components/CONTAB/CON852.vue";
export const alert = {
  components: {
    "CON852": CON852,
  },
  data() {
    return {
      alerta: {
        estado: false,
        tipo: "",
        code: "",
        descrip: "",
        opcion: "",
      }
    }
  },
  methods: {
    CON852(code, tipo, descrip, opcion) {
      this.alerta.estado = true;
      this.alerta.code = code;
      this.alerta.tipo = tipo
      this.alerta.descrip = descrip
      this.alerta.opcion = opcion
    },
    cerrar_CON852() {
      this.alerta.estado = false;
      this.alerta.code = "";
      this.alerta.tipo = "";
      this.alerta.descrip = ""
      this.alerta.opcion = ""
    },
  }
}