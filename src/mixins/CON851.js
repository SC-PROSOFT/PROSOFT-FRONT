import CON851 from "../components/CONTAB/CON851.vue";
export const alert = {
  components: {
    CON851: CON851,
  },
  data() {
    return {
      alerta: {
        estado: false,
        tipo: "",
        code: "",
        descrip: "",
        opcion: "",
      },
    };
  },
  methods: {
    CON851(code, tipo, descrip, opcion) {
      setTimeout(() => {
        this.alerta.estado = true;
        this.alerta.code = code;
        this.alerta.tipo = tipo;
        this.alerta.descrip = descrip;
        this.alerta.opcion = opcion;
      }, 100);
    },
    cerrar_CON851() {
      this.alerta.estado = false;
      this.alerta.code = "";
      this.alerta.tipo = "";
      this.alerta.descrip = "";
      this.alerta.opcion = "";
    },
  },
};
