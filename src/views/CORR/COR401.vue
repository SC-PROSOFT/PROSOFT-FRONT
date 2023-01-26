<template>
  <v-container fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row align="center">
        <v-col class="font-weight-light text-center">
          <h4 :class="`${novedad.color}--text`">
            <v-icon :color="novedad.color">{{ novedad.icono }}</v-icon>
            {{ novedad.novedad }}
          </h4>
        </v-col>
      </v-row>

      <v-row>
        <!-- ano llave -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event, keyDownAnoLlave)"
            :field="form_COR401.ano_llave"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- radicado -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event, keyDownRadicado)"
            @abrirF8="openCOR868"
            :field="form_COR401.radicado"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <v-col cols="4"> </v-col>

        <!-- fecha -->
        <v-col cols="12" sm="2" md="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.fecha"
            :reg="reg_COR401"
          ></FECHA>
        </v-col>

        <!-- hora -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.hora"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- remitente -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.remitente"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.remitente_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- depto remit -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.depto_remit"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.depto_remit_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- tipo -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.tipo"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.tipo_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- aux_tip -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.aux_tip"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.aux_tip_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- manejo -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.manejo"
            :reg="reg_COR401"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- procedencia -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.procedencia"
            :reg="reg_COR401"
          ></AUTOCOMPLETE>
        </v-col>

        <v-col cols="8"></v-col>

        <!-- descripcion -->
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.descripcion"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <v-col cols="2"></v-col>

        <!-- drig_depto -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.drig_depto"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.drig_depto_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- personal destino -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.personal_destino"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_COR401.personal_destino_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- folios -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.folios"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- de -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.de"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- anexos -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.anexos"
            :reg="reg_COR401"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- nro factura -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.nro_factura"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- valor factura -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.valor_factura"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- Vigencia (Aqui quiero mejorar el diseno) -->
        <!-- fecha -->
        <v-col cols="12" sm="2" md="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.fecha_documento"
            :reg="reg_COR401"
          ></FECHA>
        </v-col>

        <!-- fecha entrega -->
        <v-col cols="12" sm="2" md="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.fecha_entrega"
            :reg="reg_COR401"
          ></FECHA>
        </v-col>

        <!-- centro de costos -->
        <v-col cols="12" sm="2" md="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.centro_costos"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="2" md="2" class="input-col">
          <data-card
            :field="form_COR401.centro_costos_dataCard"
            :reg="reg_COR401"
          ></data-card>
        </v-col>

        <!-- numero de guia -->
        <v-col cols="12" sm="2" md="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.nro_guia"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- nombre persona empresa que trae la correspondencia o paquete -->
        <v-col cols="12" sm="4" md="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.persona_entrega_corres"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="input-col"> </v-col>

        <!-- text area -->
        <v-col cols="12" sm="12" md="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.observaciones"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>

        <!-- estado de correspondencia -->
        <v-col cols="12" sm="4" md="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_COR401, $event)"
            :field="form_COR401.estado_corres"
            :reg="reg_COR401"
          ></INPUT>
        </v-col>
      </v-row>
    </v-card>

    <!-- Componentes adicionales -->

    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>

    <COR868
      v-if="show_cor868"
      @callBack="callbackCOR868"
      @callbackEsc="callbackCOR868"
    ></COR868>
  </v-container>
</template>

<script>
/* standar */
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

/* index vuex */
import index from "../../store/index";

/* reg */
import {
  getObjCOR401,
  getObjCOR401_,
} from "../../fuentes/correspondencia/regCOR401";

/* pdf */
import { informeCorr401_pdf } from "../../Pdf/informeCorr401-pdf";

/* f8 */
import COR868 from "../../components/COR/COR868.vue";

export default {
  name: "COR401",

  mixins: [nextAction, global],

  components: { COR868 },

  data() {
    return {
      titulo: `4.1 IMPRIME CORRESPONDENCIA`,

      novedad_activa: false,
      novedad: {
        acceso: null,
      },

      show_cor868: false,

      reg_COR401: getObjCOR401(),
      form_COR401: getObjCOR401_(),
    };
  },

  computed: {
    ...mapGetters({
      get: "formularios/get",
    }),
  },

  created() {
    this.initialData();
  },

  mounted() {},

  methods: {
    ...mapActions({
      /* remidep */
      _reidepF8: "remidep/_remidepF8",
      _getRemidep: "remidep/_getRemidep",

      /* tipco */
      _tipcoF8: "tipco/_getTipcoF8",
      _getTipco: "tipco/_getTipco",

      /* auxtip */
      _getAuxco: "auxtip/_getAuxco",

      /* serco */
      _getSerco: "serco/_getSerco",

      /* depco */
      _getDepco: "depco/_getDepco",

      /* corr */
      _getCorr: "corr/_getCorr",
      _getCorr: "corr/_getCorr",
      _getUltCorr: "corr/_getUltCorr",

      /* usuar */
      _getUsuario: "usuar/getUsuario",
    }),

    /* standar */
    async initialData() {
      const res_getUltCorr = await this._getUltCorr();

      this.reg_COR401.ano_llave = res_getUltCorr.llave.anoLlave.toString();
      this.reg_COR401.radicado = res_getUltCorr.llave.cont.toString();

      this.focusInput(this.form_COR401, "ano_llave");
    },

    async completeInputs(RES) {
      console.log("my respu: ", RES);
      const selected_data = {
        ano_llave: this.reg_COR401.ano_llave,
        radicado: this.reg_COR401.radicado,
        fecha: RES?.fecha.slice(0, 10),
        hora: RES?.hora,
        remitente: RES.nit == " " ? "" : RES.nit,
        remitente_dataCard:
          RES.descripTer == null || RES.descripTer == " " ? "" : RES.descripTer,
        depto_remit: RES.deptoremi == " " ? "" : RES.deptoremi,
        depto_remit_dataCard: RES?.descripDeptoremi,
        tipo: RES.tipoCorres == " " ? "" : RES.tipoCorres,
        tipo_dataCard: RES?.descripTipco,
        aux_tip: RES.codAux == " " ? "" : RES.codAux,
        aux_tip_dataCard: RES?.descripAux,
        manejo: RES.manejo == " " ? "" : RES.manejo.toString(),
        procedencia: RES.proceden == " " ? "" : RES.proceden.toString(),
        descripcion: RES.descrip == " " ? "" : RES.descrip,
        drig_depto: RES.ser == " " ? "" : RES.ser,
        drig_depto_dataCard: RES?.descripSer,
        personal_destino: RES.dep == " " ? "" : RES.dep,
        personal_destino_dataCard: RES?.responsableDep,
        folios: RES.fol == " " ? "" : RES.fol,
        de: RES.fold == " " ? "" : RES.fold,
        anexos: RES.anex == " " ? "" : RES.anex,
        nro_factura: RES.nroFact == " " ? "" : RES.nroFact,
        valor_factura: RES.monto == " " ? "" : RES.monto,
        fecha_documento: RES.fechaFact.slice(0, 10),
        fecha_entrega: RES.fechaEntre.slice(0, 10),
        centro_costos: RES.centroCos == " " ? "" : RES.centroCos,
        centro_costos_dataCard: "", //falta
        nro_guia: RES.nroGuia == " " ? "" : RES.nroGuia,
        persona_entrega_corres: RES.persentre == " " ? "" : RES.persentre,
        observaciones: RES.observ == " " ? "" : RES.observ,
        estado_corres: `${
          RES.esta.toString() == " " ? "" : RES.esta.toString()
        } - ${RES.descripEsta == " " ? "" : RES.descripEsta}`,
      };
      this.reg_COR401 = selected_data;

      let cod_remidep = this.reg_COR401.depto_remit;
      const get_remidep = await this._getRemidep(cod_remidep);
      this.reg_COR401.depto_remit_dataCard = get_remidep.descripcion;

      let cod_tipco = this.reg_COR401.tipo;
      const get_tipco = await this._getTipco({ codigo: cod_tipco });
      this.reg_COR401.tipo_dataCard = get_tipco.descripcion;

      let cod_auxco = this.reg_COR401.aux_tip;
      const get_auxtip = await this._getAuxco({ codigo: cod_auxco });
      this.reg_COR401.aux_tip_dataCard = get_auxtip.descripcion;

      let cod_serco = this.reg_COR401.drig_depto;
      const get_serco = await this._getSerco({ codigo: cod_serco });
      this.reg_COR401.drig_depto_dataCard = get_serco.descripcion;

      let cod_depco = this.reg_COR401.personal_destino;
      const get_depco = await this._getDepco({ codigo: cod_depco });
      this.reg_COR401.personal_destino_dataCard = get_depco.descripcion;
    },

    async confirmar() {
      this.cerrar_CON851();
      let dialogType = this.get("dialogType");

      switch (dialogType) {
        case "salir":
          this.$router.push("/Menu-Principal");
          break;
        case "input":
          this.generatePdf();
          break;

        default:
          break;
      }
    },

    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },

    cancelarAlerta() {
      this.cerrar_CON851();
      this.onField();
    },

    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },

    callbackCOR868(item) {
      if (item) {
        this.completeInputs(item);
        this.reg_COR401.ano_llave = item.anoLlave;
        this.reg_COR401.radicado = item.contLlave;
      }
      this.show_cor868 = false;
      this.focusInput(this.form_COR401, "radicado");
    },

    async generatePdf() {
      let { ano_llave, radicado } = this.reg_COR401;
      let llave = {
        anoLlave: ano_llave,
        cont: radicado,
      };

      const RES = await this._getCorr({ llave });

      let cod_remidep = RES.deptoremi;
      const get_remidep = await this._getRemidep(cod_remidep);
      RES["tipoDescrip"] = get_remidep.descripcion;

      let cod_tipco = RES.tipoCorres;
      const get_tipco = await this._getTipco({ codigo: cod_tipco });
      RES["tipoCorresDescrip"] = get_tipco.descripcion;

      let get_usuar = await this._getUsuario();
      RES["usuar"] = get_usuar[0].nombre;

      if (RES?.msg) {
        this.CON851("01", "info", `${llave.anoLlave}${llave.cont}`);
      } else if (RES?.llave) {
        informeCorr401_pdf(RES);
        this.focusInput(this.form_COR401, "radicado");
      }
    },

    /* anoLlave functions */
    validateAnoLlave() {
      const { ano_llave } = this.reg_COR401;

      if (ano_llave == "") {
        this.CON851("02", "info", null);
      } else {
        this.focusInput(this.form_COR401, "radicado");
      }
    },

    /* radicado functions */
    async validateRadicado() {
      let { ano_llave, radicado } = this.reg_COR401;

      let llave = {
        anoLlave: ano_llave,
        cont: radicado,
      };
      const RES = await this._getCorr({ llave });

      if (RES?.msg) {
        this.CON851("01", "info", `${ano_llave}${radicado}`);
      } else if (RES?.llave) {
        this.completeInputs(RES);
        this.CON851("PNZ", "info", "¿Imprimir documento?", "P");
      } else {
        this.CON851(
          "PNZ",
          "error",
          "Error desconocido, compruebe las entradas de datos"
        );
      }
    },

    /* Keydown functions */
    keyDownAnoLlave(key) {
      switch (key) {
        case "esc":
          this.CON851("MENU", "info", null, "P");
          break;

        case "enter":
          this.validateAnoLlave();
          break;
      }
    },

    keyDownRadicado(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_COR401, "ano_llave");
          break;

        case "enter":
          this.validateRadicado();
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>