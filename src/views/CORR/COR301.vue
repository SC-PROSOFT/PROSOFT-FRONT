<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" @salir="abrirDialogo"></form-titulo>
    <v-card elevation="20" class="pa-4 mx-auto">
      <v-card-text class="text-center primary--text py-0">
        <v-row class="input-row" justify="center">
          <v-col cols="6" md="6" sm="6" class="mx-auto">
            <v-icon :color="tipo_impresion.color">
              {{ tipo_impresion.icono }}
            </v-icon>
            {{ tipo_impresion.text }}
          </v-col>
        </v-row>

        <v-row class="input-row">
          <v-col cols="12" sm="3" md="3" class="input-col">
            <INPUT
              @next-action="nextStep(form_corres, $event, datoEntidad)"
              :field="form_corres.entidad"
              @abrirF8="openCON802"
              :reg="reg_corres.entidad"
              @onChange="(data) => (busqueda = data.value)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <data-card
              :field="form_corres.entidad_descripcion"
              :reg="reg_corres.entidad_descripcion"
            ></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="nextStep(form_corres, $event, datoDependencia)"
              :field="form_corres.depenTipoCorres"
              :reg="reg_corres.depenTipoCorres"
              @abrirF8="openCOR866"
              @onChange="(data) => (busqueda = data.value)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="4" md="4" class="input-col">
            <data-card
              :field="form_corres.depen_descripcion"
              :reg="reg_corres.depen_descripcion"
            ></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="nextStep(form_corres, $event, datoTipoCorres)"
              :field="form_corres.tipoCorres"
              @abrirF8="openCOR867"
              :reg="reg_corres.tipoCorres"
              @onChange="(data) => (busqueda = data.value)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <data-card
              :field="form_corres.corres_descripcion"
              :reg="reg_corres.corres_descripcion"
            ></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoDescartarCorres)"
              :field="form_corres.descartarTipoCorres"
              :reg="reg_corres.descartarTipoCorres"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoRadicado)"
              :field="form_corres.incluirRadiRes"
              :reg="reg_corres.incluirRadiRes"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <FECHA
              @next-action="nextStep(form_corres, $event, datoFechaIni)"
              :field="form_corres.fechaIni"
              :reg="reg_corres.fechaIni"
            ></FECHA>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <FECHA
              @next-action="nextStep(form_corres, $event, datoFechaFin)"
              :field="form_corres.fechaFin"
              :reg="reg_corres.fechaFin"
            ></FECHA>
          </v-col>

          <v-col cols="12" sm="3" md="3" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoJornada)"
              :field="form_corres.jornada"
              :reg="reg_corres.jornada"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoProcedencia)"
              :field="form_corres.procedencia"
              :reg="reg_corres.procedencia"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoManejo)"
              :field="form_corres.manejo"
              :reg="reg_corres.manejo"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <AUTOCOMPLETE
              @next-action="nextStep(form_corres, $event, datoEstado)"
              :field="form_corres.estado"
              :reg="reg_corres.estado"
            ></AUTOCOMPLETE>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-card-text>
      <CON890P
        :modal_impresion="modal_impresion"
        @impresionSelec="impresionSelec"
        class="mx-auto"
      ></CON890P>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
    <COR866
      v-if="show_COR866"
      @callBack="callbackCOR866"
      @callbackEsc="callbackCOR866"
    ></COR866>
    <CON802
      v-if="show_con802"
      @callBack="callbackCON802"
      @callbackEsc="callbackCON802"
    ></CON802>
    <COR867
      v-if="show_COR867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    ></COR867>
  </v-container>
</template>

<script>
import {
  getCorrespondenciaImpresion_,
  getCorrespondenciaImpresion,
} from "../../fuentes/correspondencia/regCorrespondenciaImpresion";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { global, image_base64 } from "../../mixins/global";
import CON890P from "../../components/CONTAB/CON890P.vue";
import { nextAction } from "../../mixins/nextAction";
import { alert } from "../../mixins/CON851";
import { getImpresion301 } from "../../Excel/impresionCORR301";
import generadorImpresion from "../../Excel/generadorImpresion";
import CON802 from "../../components/CONTAB/CON802";
import COR866 from "../../components/COR/COR866.vue";
import COR867 from "../../components/COR/COR867.vue";

/* index vuex */
import index from "../../store/index";
import moment from "moment";
export default {
  name: "COR301",
  mixins: [global, nextAction, alert],
  components: {
    CON890P,
    CON802,
    COR866,
    COR867,
  },
  data() {
    return {
      titulo: "3.1 Informe de correspondencia",
      modal_impresion: true,
      tipo_impresion: {},

      show_con802: false,
      show_COR866: false,
      show_COR867: false,
      form_corres: getCorrespondenciaImpresion_(),
      reg_corres: getCorrespondenciaImpresion(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      Lista: "impresion/getLista",
    }),
  },
  mounted() {
    this.initialData();
  },
  methods: {
    onChange(data) {
      this.reg_corres[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      /* terce */
      _getTerceF8: "terce/_getTerceF8",
      /* corres */
      _getTipco: "tipco/_getTipco",
      /* impresion */
      _getCorresF8: "corres/_getCorresF8",
      _getImpresion: "impresion301/_getImpresion",
      /* tipco */
      _getTipco: "tipco/_getTipco",
      /* depco */
      _getDepco: "depco/_getDepco",
    }),

    initialData() {
      this.reg_corres.entidad = "99";

      this.reg_corres.depenTipoCorres = "**";

      this.reg_corres.tipoCorres = "**";

      this.reg_corres.descartarTipoCorres = "S";

      this.reg_corres.incluirRadiRes = "S";

      this.reg_corres.fechaIni = moment().format("2022-10-01");

      this.reg_corres.fechaFin = moment().format("YYYY-MM-DD");

      this.reg_corres.jornada = "**";

      this.reg_corres.procedencia = "**";

      this.reg_corres.manejo = "**";

      this.reg_corres.estado = "**";
    },

    openCON802() {
      this.offField();
      this.show_con802 = true;
    },

    async callbackCON802(item) {
      if (item) {
        this.reg_corres.entidad = item.codigo;
      }
      this.show_con802 = false;
      this.focusInput(this.form_corres, "entidad");
    },

    openCOR866() {
      this.offField();
      this.show_COR866 = true;
    },

    async callbackCOR866(item) {
      if (item) {
        this.reg_corres.depenTipoCorres = item.codigo;
      }
      this.show_COR866 = false;
      this.focusInput(this.form_corres, "depenTipoCorres");
    },

    openCOR867() {
      this.offField();
      this.show_COR867 = true;
    },

    async callbackCOR867(item) {
      if (item) {
        this.reg_corres.tipoCorres = item.codigo;
      }
      this.show_COR867 = false;
      this.focusInput(this.form_corres, "tipoCorres");
    },

    datoEntidad(val) {
      switch (val) {
        case "esc":
          this.abrirImpresion();
          break;
        case "enter":
          this.validateEntidad();
          break;
      }
    },

    async validateEntidad() {
      const { entidad } = this.reg_corres;

      if (entidad.length > 0) {
        const RES = await this._getTerceF8({
          desde: "0",
          cantidad: "1",
          filtro: entidad,
        });

        if (entidad == "99") {
          this.reg_corres.entidad_descripcion = "TODAS LAS ENTIDADES";
          this.focusInput(this.form_corres, "depenTipoCorres");
        } else if (RES.msg) {
          this.reg_corres.entidad_descripcion = "";
          this.CON851("01", "info", `${entidad}`);
        } else if (RES[0].codigo != entidad) {
          this.reg_corres.entidad_descripcion = "";
          this.CON851("01", "info", `${entidad}`);
        } else {
          this.reg_corres.entidad_descripcion = RES[0].descrip;
          this.focusInput(this.form_corres, "depenTipoCorres");
        }
      } else if (entidad.length == 0) {
        this.CON851("personalizada", "info", "Ingrese un valor");
      }
    },

    datoDependencia(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "entidad");
          break;

        case "enter":
          this.validateDatoCorres();
          break;

        default:
          break;
      }
    },

    async validateDatoCorres() {
      let { depenTipoCorres } = this.reg_corres;

      if (depenTipoCorres.length > 0) {
        const RES = await this._getDepco({ codigo: depenTipoCorres });

        if (depenTipoCorres == "**") {
          this.reg_corres.depen_descripcion = "Todas las dependencias";
          this.focusInput(this.form_corres, "tipoCorres");
        } else if (RES.msg) {
          this.reg_corres.depen_descripcion = "";
          this.CON851("01", "info", `${depenTipoCorres}`);
        } else {
          this.reg_corres.depen_descripcion = RES.descripcion;
          this.focusInput(this.form_corres, "tipoCorres");
        }
      } else if (depenTipoCorres.length == 0) {
        this.CON851("personalizada", "info", "Ingrese un valor");
      }
    },

    async datoTipoCorres(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "depenTipoCorres");
          break;
        case "enter":
          if (this.reg_corres.tipoCorres == "")
            return this.CON851("02", "info");
          await this.validateDatoTipoCorres();
          break;
      }
    },

    async validateDatoTipoCorres() {
      const { tipoCorres } = this.reg_corres;

      if (tipoCorres.length > 0) {
        const RES = await this._getTipco({ codigo: tipoCorres });

        if (tipoCorres == "**") {
          this.reg_corres.corres_descripcion = "Todos los tipos";
          this.focusInput(this.form_corres, "descartarTipoCorres");
        } else if (RES.msg) {
          this.reg_corres.corres_descripcion = "";
          this.CON851("01", "info", `${tipoCorres}`);
        } else {
          this.reg_corres.corres_descripcion = RES.descripcion;
          this.focusInput(this.form_corres, "descartarTipoCorres");
        }
      } else if (tipoCorres.length == 0) {
        this.CON851("personalizada", "info", "Ingrese un valor");
      }
    },

    datoDescartarCorres(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "tipoCorres");
          break;

        case "enter":
          if (this.descartarTipoCorres == "S") {
          } else this.descartarTipoCorres == "N";
          this.focusInput(this.form_corres, "incluirRadiRes");
          break;

        default:
          break;
      }
    },

    datoRadicado(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "descartarTipoCorres");
          break;

        case "enter":
          this.focusInput(this.form_corres, "fechaIni");
          break;

        default:
          break;
      }
    },

    datoFechaIni(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_corres, "incluirRadiRes");
          break;

        case "enter":
          this.validateFechaIni();
          break;

        default:
          break;
      }
    },

    /* Fecha_Init */
    async validateFechaIni() {
      const { fechaIni } = this.reg_corres;
      const { max_length } = this.form_corres.fechaIni;

      if (fechaIni.length == 0) {
        this.CON851("personalizada", "info", "Ingrese un valor");
      } else if (fechaIni.length < max_length) {
        this.CON851("personalizada", "info", "Verifique la fecha inicial");
      } else if (fechaIni.length == max_length) {
        this.focusInput(this.form_corres, "fechaFin");
      }
    },

    datoFechaFin(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_corres, "fechaIni");
          break;

        case "enter":
          this.validateFechaFin();
          break;

        default:
          break;
      }
    },

    /* Fecha_fin */
    async validateFechaFin() {
      this.focusInput(this.form_corres, "jornada");
      const { fechaFin } = this.reg_corres;
      const { max_length } = this.form_corres.fechaFin;

      if (fechaFin.length == 0) {
        this.CON851("personalizada", "info", "Ingrese un valor");
      } else if (fechaFin.length < max_length) {
        this.CON851("personalizada", "info", "Verifique la fecha inicial");
      } else if (fechaFin.length == max_length) {
      }
    },

    datoJornada(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "fechaFin");
          break;

        case "enter":
          this.focusInput(this.form_corres, "procedencia");
          break;

        default:
          break;
      }
    },

    datoProcedencia(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "jornada");
          break;

        case "enter":
          this.focusInput(this.form_corres, "manejo");
          break;

        default:
          break;
      }
    },

    /* input-manejo */
    datoManejo(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "procedencia");
          break;

        case "enter":
          this.focusInput(this.form_corres, "estado");
          break;

        default:
          break;
      }
    },

    /* input-estado */
    async datoEstado(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "manejo");
          break;
        case "enter":
          await this.requestPrint();
          break;
      }
    },

    async requestPrint() {
      const {
        entidad,
        depenTipoCorres,
        tipoCorres,
        descartarTipoCorres,
        incluirRadiRes,
        fechaIni,
        fechaFin,
        jornada,
        procedencia,
        manejo,
        estado,
      } = this.reg_corres;

      const data = {
        nit: entidad,
        dep: depenTipoCorres,
        tipoCorr: tipoCorres,
        descartarTipoCorres: descartarTipoCorres,
        incluirRadiRes: incluirRadiRes,
        jornada: jornada,
        proceden: procedencia,
        manejo: manejo,
        estado: estado,
        fechaIni: new Date(fechaIni).toISOString(),
        fechaFin: new Date(fechaFin).toISOString(),
      };
      const spinnerConfig = {
        name: "descargarListadoControlDeRespuestasXLSX",
        textProgressValues: {
          waitingData: "Procesando solicitud",
          downloadingData: "Preparando documento XLSX",
          generateDocument: "Descargando documento XLSX",
        },
        showLoadingBar: true,
      };
      index.commit("spinnerConfig", spinnerConfig, { root: true });
      const RES = await this._getImpresion(data);
      if (RES.length < 1) {
        this.CON851("personalizada", "warning", "No hay datos disponibles.");
      } else {
        let columnas = getImpresion301().columnas;
        let logo = getImpresion301().logo
       const impre = {
          USUARIO: this.USUARIO_GLOBAL.nombre,
          NIT: this.USUARIO_GLOBAL.nit,
        };
        let header = [
          { text: `${impre.USUARIO}`, bold: true, size: 16 },
          `CONTROL DE CORRESPONDENCIA  NIT: ${impre.NIT}`,
          `Periodo desde: ${data.fechaIni.slice(0,10)}  Hasta: ${data.fechaFin.slice(0,10)}`,
        ];
       
        if (RES && RES.msg) {
          this.CON851("personalizada", "warning", "No hay datos disponibles.");
          index.commit("isLoading", null, { root: true });
        } else if (RES[0].nit) {
          setTimeout(() => {
            generadorImpresion({
              header,
              logo,
              tabla: {
                columnas,
                data: RES,
              },
              incluirRadiRes: incluirRadiRes,
            });
            this.initialData();
            this.focusInput(this.form_corres, "estado");
          }, 700);
        } else {
          this.CON851(
            "personalizada",
            "warning",
            "Verifique los datos introducidos y vuelva a intentarlo"
          );
        }
      }
    },
    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    abrirDialogo() {
      this.offField();
      this.CON851("MENU", "warning", "", "P");
    },
    abrirImpresion() {
      this.modal_impresion = false;
      this.offField();
    },
    impresionSelec(data) {
      this.modal_impresion = false;
      this.focusInput(this.form_corres, "entidad");
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.tipo_impresion = Object.assign({}, data));
    },
  },
};
</script>
