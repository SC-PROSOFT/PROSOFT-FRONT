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
        <!-- ano respuesta -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownAnoLlave)"
            :field="form_rescorr.anoLlave"
            :reg="reg_rescorr.codResp.anoLlave"
            @onChange="
              (data) => {
                reg_rescorr.codResp[data.key] = data.value;
              }
            "
          ></INPUT>
        </v-col>

        <!-- radicado -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownRadicado)"
            :field="form_rescorr.cont"
            :reg="reg_rescorr.codResp.cont"
            @onChange="
              (data) => {
                reg_rescorr.codResp[data.key] = data.value;
              }
            "
          ></INPUT>
        </v-col>

        <v-col cols="8"></v-col>

        <!-- tiene radicado? -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_rescorr, $event, keyDownTieneRadi)"
            :field="form_rescorr.swRadi"
            :reg="reg_rescorr.swRadi"
            @onChange="onChange"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- ano radicado -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownRadicadoAno)"
            :field="form_rescorr.anoRadi"
            :reg="reg_rescorr.anoRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- nro radicado -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownContRadi)"
            @abrirF8="openCOR868"
            :field="form_rescorr.contRadi"
            :reg="reg_rescorr.contRadi"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>

        <!-- fecha -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event)"
            :field="form_rescorr.fechaRadi"
            :reg="reg_rescorr.fechaRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- hora -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event)"
            :field="form_rescorr.horaRadi"
            :reg="reg_rescorr.horaRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <v-col cols="2"></v-col>

        <!-- remitente -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownRemitente)"
            @abrirF8="openCORterce"
            :field="form_rescorr.nit"
            :reg="reg_rescorr.nit"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.nit_dataCard"
            :reg="reg_rescorr.nit_dataCard"
          ></data-card>
        </v-col>

        <!-- depto remit -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownDptoRemit)"
            @abrirF8="openCORremidep"
            :field="form_rescorr.dptoRemit"
            :reg="reg_rescorr.dptoRemit"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.dptoRemit_dataCard"
            :reg="reg_rescorr.dptoRemit_dataCard"
          ></data-card>
        </v-col>

        <!-- procedencia -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_rescorr, $event, keyDownProcedencia)"
            :field="form_rescorr.proceden"
            :reg="reg_rescorr.proceden"
          ></AUTOCOMPLETE>
        </v-col>

        <v-col cols="10"></v-col>

        <!-- tipo -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownTipoCorres)"
            @abrirF8="openCORtipco"
            :field="form_rescorr.tipoCorres"
            :reg="reg_rescorr.tipoCorres"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.tipoCorres_dataCard"
            :reg="reg_rescorr.tipoCorres_dataCard"
          ></data-card>
        </v-col>

        <!-- aux_tip -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownAuxTip)"
            @abrirF8="openCORauxco"
            :field="form_rescorr.codAuxco"
            :reg="reg_rescorr.codAuxco"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.codAuxco_dataCard"
            :reg="reg_rescorr.codAuxco_dataCard"
          ></data-card>
        </v-col>

        <!-- dpto -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownDpto)"
            @abrirF8="openCOR865"
            :field="form_rescorr.ser"
            :reg="reg_rescorr.ser"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.ser_dataCard"
            :reg="reg_rescorr.ser_dataCard"
          ></data-card>
        </v-col>

        <!-- responsable -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownResponsable)"
            @abrirF8="openCORdepco"
            :field="form_rescorr.dep"
            :reg="reg_rescorr.dep"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.dep_dataCard"
            :reg="reg_rescorr.dep_dataCard"
          ></data-card>
        </v-col>

        <!-- descripcion -->
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownDescripcion)"
            :field="form_rescorr.descrip"
            :reg="reg_rescorr.descrip"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- asunto -->
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownAsunto)"
            :field="form_rescorr.asunto"
            :reg="reg_rescorr.asunto"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- macro -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownClMacro)"
            @abrirF8="openCOR867"
            :field="form_rescorr.clMacro"
            :reg="reg_rescorr.clMacro"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownCodigoMacro)"
            @abrirF8="openCORmacro"
            :field="form_rescorr.codigoMacro"
            :reg="reg_rescorr.codigoMacro"
            @onChange="(data) => (busqueda = data.value)"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_rescorr.macro_dataCard"
            :reg="reg_rescorr.macro_dataCard"
          ></data-card>
        </v-col>

        <!-- fecha_2 -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event)"
            :field="form_rescorr.fecha"
            :reg="reg_rescorr.fecha"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- hora_2 -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event)"
            :field="form_rescorr.hora"
            :reg="reg_rescorr.hora"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- macro -->
        <v-col cols="12" class="input-col">
          <TEXTAREA
            @next-action="nextStep(form_rescorr, $event, keyDownMacroArea)"
            :field="form_rescorr.macro"
            :reg="reg_rescorr.macro"
            @onChange="onChange"
          ></TEXTAREA>
        </v-col>

        <!-- medio respuesta -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_rescorr, $event, keyDownMedioResp)"
            :field="form_rescorr.medio"
            :reg="reg_rescorr.medio"
            @onChange="onChange"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- numero factura -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownNroFactura)"
            :field="form_rescorr.numeroFact"
            :reg="reg_rescorr.numeroFact"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- valor factura -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownValorFactura)"
            @onChange="(data) => (reg_rescorr.monto = data.value)"
            :field="form_rescorr.monto"
            :reg="reg_rescorr.monto"
          ></INPUT>
        </v-col>

        <!-- nro guia -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownNroGuia)"
            :field="form_rescorr.nroGuia"
            :reg="reg_rescorr.nroGuia"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- nombre de persona/empresa que recibe el paquete -->
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownPersonaRecibe)"
            :field="form_rescorr.perRec"
            :reg="reg_rescorr.perRec"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- firma -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownFirma)"
            :field="form_rescorr.firma"
            :reg="reg_rescorr.firma"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <data-card
            :field="form_rescorr.firma_dataCard"
            :reg="reg_rescorr.firma_dataCard"
          ></data-card>
        </v-col>

        <!-- cargo -->
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_rescorr, $event, keyDownCargo)"
            :field="form_rescorr.cargo"
            :reg="reg_rescorr.cargo"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- estado correspondencia -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_rescorr, $event, keyDownEstadoCorres)"
            :field="form_rescorr.esta"
            :reg="reg_rescorr.esta"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- file input -->
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <FILEINPUT
            @next-action="nextStep(form_rescorr, $event, keyDownFileInput)"
            :field="form_rescorr.file"
            :reg="reg_rescorr.file"
            @onChange="onChange"
          ></FILEINPUT>
        </v-col>
      </v-row>
    </v-card>

    <!-- componentes adicionales -->
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    ></CON850>

    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />

    <CON851
      @cancelarAlerta="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>

    <!-- f8's -->
    <COR865
      v-if="show_cor865"
      @callBack="callbackCOR865"
      @callbackEsc="callbackCOR865"
    />

    <COR866
      v-if="show_cor866"
      @callBack="callbackCOR866"
      @callbackEsc="callbackCOR866"
    />

    <COR867
      v-if="show_cor867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    />

    <COR868
      v-if="show_cor868"
      @callBack="callbackCOR868"
      @callbackEsc="callbackCOR868"
    />

    <COR876
      v-if="show_cor876"
      @callBack="callbackCOR876"
      @callbackEsc="callbackCOR876"
    />

    <CORmacro
      v-if="show_cormacro"
      :field="f8_busqueda"
      @callBack="callbackCORmacro"
      @callbackEsc="callbackCORmacro"
    />

    <CORterce
      v-if="show_corterce"
      @callBack="callbackCORterce"
      @callbackEsc="callbackCORterce"
    />

    <CORremidep
      v-if="show_corremidep"
      @callBack="callbackCORremidep"
      @callbackEsc="callbackCORremidep"
    />

    <CORtipco
      v-if="show_cortipco"
      @callBack="callbackCORtipco"
      @callbackEsc="callbackCORtipco"
    />

    <CORauxco
      v-if="show_corauxco"
      @callBack="callbackCORauxco"
      @callbackEsc="callbackCORauxco"
    />

    <CORdepco
      v-if="show_cordepco"
      @callBack="callbackCORdepco"
      @callbackEsc="callbackCORdepco"
    />
  </v-container>
</template>

<script>
/* standar imports */
import { global, currentUser, formatNumberMask_ } from "../../mixins/global";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";

/* f8's */
import COR865 from "../../components/COR/COR865.vue";
import COR866 from "../../components/COR/COR866.vue";
import COR867 from "../../components/COR/COR867.vue";
import COR868 from "../../components/COR/COR868.vue";
import COR876 from "../../components/COR/COR876.vue";
import CORmacro from "../../components/COR/CORmacro.vue";
import CORterce from "../../components/COR/CORterce.vue";
import CORremidep from "../../components/COR/CORremidep.vue";
import CORtipco from "../../components/COR/CORtipco.vue";
import CORauxco from "../../components/COR/CORauxco.vue";
import CORdepco from "../../components/COR/CORdepco.vue";

/* variables de la opcion */
import {
  getRescorr,
  getRescorr_,
} from "../../fuentes/correspondencia/regRescorr";

/* impresiones */
import { informeCORR403 } from "../../Pdf/index";
export default {
  name: "COR403",

  mixins: [nextAction, global],

  components: {
    COR865,
    COR866,
    COR867,
    COR868,
    COR876,
    CORmacro,
    CORterce,
    CORremidep,
    CORtipco,
    CORauxco,
    CORdepco,
  },

  data() {
    return {
      titulo: "4.3 RESPUESTA CORRESPONDENCIA MANUAL",

      novedad_activa: false,
      novedad: {
        acceso: null,
        color: null,
        icono: null,
        novedad: null,
      },

      show_cor865: false,
      show_cor866: false,
      show_cor867: false,
      show_cor868: false,
      show_cor876: false,
      show_cormacro: false,
      show_corterce: false,
      show_corremidep: false,
      show_cortipco: false,
      show_corauxco: false,
      show_cordepco: false,

      f8_busqueda: "",

      reg_rescorr: getRescorr(),
      form_rescorr: getRescorr_(),
    };
  },

  computed: {
    ...mapGetters({
      get: "formularios/get",
    }),
  },

  watch: {
    "reg_rescorr.clMacro"(newVal) {
      this.f8_busqueda = newVal;
    },
  },

  created() {
    this.completeInputsAtStartOption();
  },

  mounted() {
    this.abrirNovedad();
  },

  methods: {
    onChange(data) {
      this.reg_rescorr[data.key] = data.value;
    },
    ...mapActions({
      /* rescorr */
      _getResscor: "rescorr/_getRescorr",
      _getUltRescorr: "rescorr/_getUltRescorr",
      _postRescorr: "rescorr/_postRescorr",
      _putRescorr: "rescorr/_putRescorr",
      _deleteRescorr: "rescorr/_deleteRescorr",
      _postRescorrUploadPdf: "rescorr/_postRescorrUploadPdf",

      /* corr */
      _getCorr868F8: "corr/_getCorr868F8",
      _getCorr: "corr/_getCorr",
      _putCorres: "corr/_putCorres",

      /* unifun */
      _getUnifun: "unifun/_getUnifun",

      /* remidep */
      _getRemidep: "remidep/_getRemidep",

      /* tipco */
      _getTipco: "tipco/_getTipco",

      /* auxtip */
      _getAuxco: "auxtip/_getAuxco",

      /* serco */
      _getSerco: "serco/_getSerco",

      /* depco */
      _getDepco: "depco/_getDepco",

      /* macro */
      _getMacroId: "macro/_getMacroId",

      /* terceros */
      _getTerce: "terce/_getTerce",

      /* correos */
      _sendEmailRescorr: "envioemail/_sendEmailRescorr",
    }),

    /* f8's */
    callbackCOR865(item) {
      if (item) {
        this.reg_rescorr.ser = item.codigo;
        this.reg_rescorr.ser_dataCard = item.descripcion;
        this.show_cor865 = false;
        this.focusInput(this.form_rescorr, "dep");
      } else {
        this.show_cor865 = false;
        this.focusInput(this.form_rescorr, "ser");
      }
    },

    openCOR865() {
      this.offField();
      this.show_cor865 = true;
    },

    callbackCOR866(item) {
      if (item) {
        this.reg_rescorr.dep = item.codigo;
        this.reg_rescorr.dep_dataCard = item.descripcion;
        this.show_cor866 = false;
        this.focusInput(this.form_rescorr, "descrip");
      } else {
        this.show_cor866 = false;
        this.focusInput(this.form_rescorr, "dep");
      }
    },

    openCOR866() {
      this.offField();
      this.show_cor866 = true;
    },

    callbackCOR867(item) {
      if (item) {
        this.reg_rescorr.clMacro = item.codigo;
        this.reg_res;
        this.show_cor867 = false;
        this.focusInput(this.form_rescorr, "codigoMacro");
      } else {
        this.show_cor867 = false;
        this.focusInput(this.form_rescorr, "clMacro");
      }
    },

    openCOR867() {
      this.offField();
      this.show_cor867 = true;
    },

    callbackCOR868(item) {
      if (item) {
        this.showCorrespondencia(item);
        this.show_cor868 = false;
      } else {
        this.focusInput(this.form_rescorr, "contRadi");
        this.show_cor868 = false;
      }
    },

    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },

    callbackCOR876(item) {
      if (item) {
        this.reg_rescorr.dptoRemit = item.codigo;
        this.reg_rescorr.dptoRemit_dataCard = item.descripcion;
        this.show_cor876 = false;
        this.focusInput(this.form_rescorr, "proceden");
      } else {
        this.show_cor876 = false;
        this.focusInput(this.form_rescorr, "dptoRemit");
      }
    },

    openCOR876() {
      this.offField();
      this.show_cor876 = true;
    },

    callbackCORmacro(item) {
      if (item) {
        this.reg_rescorr.codigoMacro = item.llave.codigo.toString();
        this.reg_rescorr.macro_dataCard = item.detalle;
        this.reg_rescorr.macro = item.tabla;
        this.show_cormacro = false;
        this.focusInput(this.form_rescorr, "macro");
      } else {
        this.show_cormacro = false;
        this.focusInput(this.form_rescorr, "codigoMacro");
      }
    },

    openCORmacro() {
      this.offField();
      this.show_cormacro = true;
    },

    callbackCORterce(item) {
      if (item) {
        this.reg_rescorr.nit = item.codigo;
        this.reg_rescorr.nit_dataCard = item.descrip;
        this.show_corterce = false;
        this.focusInput(this.form_rescorr, "dptoRemit");
      } else {
        this.show_corterce = false;
        this.focusInput(this.form_rescorr, "nit");
      }
    },

    openCORterce() {
      this.offField();
      this.show_corterce = true;
    },

    callbackCORremidep(item) {
      if (item) {
        this.reg_rescorr.dptoRemit = item.codigo;
        this.reg_rescorr.dptoRemit_dataCard = item.descripcion;
        this.show_corremidep = false;
        this.focusInput(this.form_rescorr, "proceden");
      } else {
        this.show_corremidep = false;
        this.focusInput(this.form_rescorr, "dptoRemit");
      }
    },

    openCORremidep() {
      this.offField();
      this.show_corremidep = true;
    },

    callbackCORtipco(item) {
      if (item) {
        this.reg_rescorr.tipoCorres = item.codigo;
        this.reg_rescorr.tipoCorres_dataCard = item.descripcion;
        this.show_cortipco = false;
        this.focusInput(this.form_rescorr, "codAuxco");
      } else {
        this.show_cortipco = false;
        this.focusInput(this.form_rescorr, "tipoCorres");
      }
    },

    openCORtipco() {
      this.offField();
      this.show_cortipco = true;
    },

    callbackCORauxco(item) {
      if (item) {
        this.reg_rescorr.codAuxco = item.codigo;
        this.reg_rescorr.codAuxco_dataCard = item.descripcion;
        this.show_corauxco = false;
        this.focusInput(this.form_rescorr, "ser");
      } else {
        this.show_corauxco = false;
        this.focusInput(this.form_rescorr, "codAuxco");
      }
    },

    openCORauxco() {
      this.offField();
      this.show_corauxco = true;
    },

    callbackCORdepco(item) {
      if (item) {
        this.reg_rescorr.dep = item.codigo;
        this.reg_rescorr.dep_dataCard = item.responsable;
        this.show_cordepco = false;
        this.focusInput(this.form_rescorr, "descrip");
      } else {
        this.show_cordepco = false;
        this.focusInput(this.form_rescorr, "dep");
      }
    },

    openCORdepco() {
      this.offField();
      this.show_cordepco = true;
    },

    /* standar functions */
    async completeInputsAtStartOption() {
      this.reg_rescorr.swRadi = "S";
    },

    async readCorrespondencia() {
      const { anoRadi, contRadi } = this.reg_rescorr;

      switch (this.novedad.acceso) {
        case 7:
          const getCorr868F8_ = await this._getCorr868F8({
            desde: "0",
            cantidad: "1",
            filtro: `${anoRadi}${contRadi}`,
            parametro: "llave",
          });
          console.log("getCorr: ", getCorr868F8_);

          if (getCorr868F8_?.cod_error == "01") {
            this.CON851("01", "info", `${anoRadi}${contRadi}`);
          } else if (getCorr868F8_[0]?.esta == 4) {
            // 4 significa "resuelta"
            this.CON851(
              "personalizada",
              "info",
              "Esta correspondencia ya fue resuelta"
            );
          } else {
            this.showCorrespondencia(getCorr868F8_[0]);
          }
          break;

        case 8:
          break;
      }
    },

    async showCorrespondencia(RES) {
      const partOfReg = {
        anoRadi: RES?.llave.anoLlave.toString(),
        contRadi: RES?.llave.cont.toString(),
        fechaRadi: RES?.fecha,
        horaRadi: RES?.hora,
        nit: RES?.nit,
        nit_dataCard: RES?.descripTer,
        dptoRemit: RES?.deptoremi,
        dptoRemit_dataCard: RES?.descripDeptoremi,
        proceden: RES?.proceden,
        tipoCorres: RES?.tipoCorres,
        tipoCorres_dataCard: RES?.descripTipco,
        codAuxco: RES?.codAux,
        codAuxco_dataCard: RES?.descripAux,
        ser: RES?.ser,
        ser_dataCard: RES?.descripSer,
        dep: RES?.dep.toString(),
        dep_dataCard: RES?.responsableDep,
        descrip: RES?.descrip,
        esta: RES?.esta,
        correoTer: RES?.correoTer,
      };
      this.reg_rescorr = Object.assign(this.reg_rescorr, partOfReg);

      this.focusInput(this.form_rescorr, "asunto");
    },

    novedadSelec(data) {
      this.novedad = data;
      this.novedad_activa = false;

      switch (data.acceso) {
        case 7:
          this.focusInput(this.form_rescorr, "swRadi");
          this.completeNumeroResp();
          break;

        case 8:
        case 9:
          this.focusInput(this.form_rescorr, "anoLlave");
          break;
      }

      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },

    async completeNumeroResp() {
      const anoActual = new Date().toISOString().slice(0, 4);
      const getUltRescorr_ = await this._getUltRescorr();
      console.log(getUltRescorr_ )
      let sumaCont;

      this.reg_rescorr.codResp.anoLlave = getUltRescorr_.fecha.slice(0, 4);
      this.reg_rescorr.codResp.cont = getUltRescorr_.cont.toString();
      

      if (this.novedad.acceso == 7) {
        if (this.reg_rescorr.codResp.anoLlave == anoActual) {
          sumaCont = parseInt(this.reg_rescorr.codResp.cont) + 1;
          this.reg_rescorr.codResp.cont = sumaCont.toString();
        } else {
          this.reg_rescorr.codResp.anoLlave = anoActual;
          this.reg_rescorr.codResp.cont = 1;
        }
      }
    },

    abrirNovedad() {
      this.reg_rescorr = getRescorr();
      this.novedad_activa = true;
      this.offField();
    },

    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },

    /* functions anoLlave */
    validateAnoLlave() {
      this.reg_rescorr.codResp.anoLlave = this.reg_rescorr.codResp.anoLlave
        .toString()
        .padStart(4, "0");

      this.focusInput(this.form_rescorr, "cont");
    },

    /* functions cont */
    async validateCont() {
      const { codResp } = this.reg_rescorr;

      switch (this.novedad.acceso) {
        case 7:
          this.focusInput(this.form_rescorr, "swRadi");
          break;

        case 8:
          const getRescorr_ = await this._getResscor({
            radi_ano: codResp.anoLlave,
            radi_numero: codResp.cont,
          });

          if (getRescorr_?.cod_error == "01") {
            this.CON851(
              "personalizada",
              "info",
              `No existe el codigo ${codResp.anoLlave}${codResp.cont}`
            );
          } else if (getRescorr_.swRadi) {
            this.showResCorr(getRescorr_);
            this.focusInput(this.form_rescorr, "nit");
          } else {
            this.CON851(
              "personalizada",
              "info",
              "Por favor verifique los datos ingresados"
            );
          }
          break;
        case 9:
          this.CON851P(
            "PNZ",
            "info",
            "Eliminar Respuesta de correspondencia?",
            this.delete,
            this.onField
          );
          break;
      }
    },

    async delete() {
      const { codResp } = this.reg_rescorr;

      try {
        const res_deleteRescorr = await this._deleteRescorr({
          radi_ano: codResp.anoLlave,
          radi_numero: codResp.cont,
        });

        if (res_deleteRescorr?.N1 == "eliminado") {
          this.CON851(
            "personalizada",
            "success",
            "Eliminado correctamente",
            null,
            this.abrirNovedad
          );
        } else {
          this.CON851("01", "info", `${codResp.anoLlave}${codResp.cont}`);
        }
      } catch {
        this.CON851(
          "personalizada",
          "error",
          "Fallo la conexion, intentelo de nuevo"
        );
      }
    },

    async showResCorr(RES) {
      const partOfReg = {
        swRadi: RES.swRadi == "S" ? 1 : 2,
        anoRadi: RES.llaveRadi.slice(0, 4),
        contRadi: RES.llaveRadi.slice(4, 10),
        fechaRadi: RES.fechaRadi.slice(0, 10),
        horaRadi: RES.horaRadi,
        nit: RES.nit.toString(),
        nit_dataCard: RES.descripTer,
        dptoRemit: RES.deptoremi,
        dptoRemit_dataCard: RES.descripDeptoremi,
        proceden: parseInt(RES?.proceden),
        tipoCorres: RES?.tipoCorres,
        tipoCorres_dataCard: RES.descripTipco,
        codAuxco: RES?.codAuxco,
        codAuxco_dataCard: RES.descripAux,
        ser: RES?.ser,
        ser_dataCard: RES.descripSer,
        dep: RES?.dep.toString(),
        dep_dataCard: RES.responsableDep,
        descrip: RES?.descrip,
        asunto: RES?.asunto,
        clMacro: RES?.clMacro,
        codigoMacro: RES?.codigoMacro,
        macro_dataCard: "",
        fecha: RES?.fecha.slice(0, 10),
        hora: RES?.hora,
        macro: RES?.tabla,
        medio: parseInt(RES?.medio),
        numeroFact: RES?.numeroFact,
        monto: formatNumberMask_(RES?.monto),
        nroGuia: RES?.nroGuia,
        perRec: RES?.perRec,
        firma: RES?.firma,
        firma_dataCard: RES?.responsableDep,
        cargo: RES?.cargo,
        esta: parseInt(RES?.esta),
      };

      const res_getCorr = await this._getCorr({
        llave: { anoLlave: partOfReg.anoRadi, cont: partOfReg.contRadi },
      });
      partOfReg.dptoRemit = res_getCorr?.deptoremi;
      partOfReg.dptoRemit_dataCard = res_getCorr?.descripDeptoremi;

      const res_getMacroId = await this._getMacroId({
        cl: partOfReg.clMacro,
        codigo: partOfReg.codigoMacro,
      });
      partOfReg.macro_dataCard = res_getMacroId.detalle;

      this.reg_rescorr = Object.assign(this.reg_rescorr, partOfReg);
    },

    /* functions swRadi */
    validateSwRadi() {
      const { swRadi } = this.reg_rescorr;
      console.log(swRadi);
      switch (this.novedad.acceso) {
        case 7:
          swRadi == 1 && this.focusInput(this.form_rescorr, "anoRadi");
          swRadi == 2 && this.focusInput(this.form_rescorr, "nit");
          break;

        case 8:
        case 9:
          swRadi == 1 && this.focusInput(this.form_rescorr, "asunto");
          swRadi == 2 && this.focusInput(this.form_rescorr, "nit");
          break;
      }
    },

    /* functions RadicadoAno */
    validateContAno() {
      this.reg_rescorr.anoRadi = this.reg_rescorr.anoRadi.padStart(4, "0");

      this.focusInput(this.form_rescorr, "contRadi");
    },

    /* functions contRadi */
    async validateContRadi() {
      this.reg_rescorr.contRadi = this.reg_rescorr.contRadi.padStart(6, "0");

      await this.readCorrespondencia();
    },

    /* functions remitente */
    async validateRemitente() {
      const { nit, swRadi } = this.reg_rescorr;

      const getTerce_ = await this._getTerce({ codigo: nit });

      if (getTerce_?.cod_error == "01") {
        this.CON851("01", "info", nit);
      } else if (getTerce_?.codigo) {
        this.reg_rescorr.nit_dataCard = getTerce_.descrip;
        this.focusInput(this.form_rescorr, "dptoRemit");
      }
    },

    /* functions dptoRemit */
    async validateDptoRemit() {
      const { dptoRemit } = this.reg_rescorr;

      try {
        const res_getRemidep = await this._getRemidep(dptoRemit);

        if (res_getRemidep?.cod_error == "01") {
          this.CON851("01", "info", `${dptoRemit}`);
        } else if (res_getRemidep?.codigo) {
          this.reg_rescorr.dptoRemit_dataCard = res_getRemidep.descripcion;
          this.focusInput(this.form_rescorr, "proceden");
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Verifique los datos ingresados"
          );
        }
      } catch (error) {
        this.CON851("personalizada", "error", "Verifique los datos ingresados");
      }
    },

    /* functions procedencia */
    validateProcedencia() {
      this.focusInput(this.form_rescorr, "tipoCorres");
    },

    /* functions tipoCorres */
    async validateTipoCorres() {
      const { tipoCorres } = this.reg_rescorr;

      try {
        const res_getTipco = await this._getTipco({ codigo: tipoCorres });

        if (res_getTipco?.cod_error == "01") {
          this.CON851("01", "info", `${tipoCorres}`);
        } else if (res_getTipco?.codigo) {
          this.reg_rescorr.tipoCorres_dataCard = res_getTipco.descripcion;
          this.focusInput(this.form_rescorr, "codAuxco");
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Verifique los datos ingresados"
          );
        }
      } catch (error) {
        this.CON851("personalizada", "error", "verifique los datos ingresados");
      }
    },

    /* functions auxtip */
    async validateAuxTip() {
      const { codAuxco } = this.reg_rescorr;

      try {
        const res_getAuxco = await this._getAuxco({ codigo: codAuxco });

        if (res_getAuxco?.cod_error == "01") {
          this.CON851("01", "info", `${codAuxco}`);
        } else if (res_getAuxco?.codigo) {
          this.reg_rescorr.codAuxco_dataCard = res_getAuxco.descripcion;
          this.focusInput(this.form_rescorr, "ser");
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Verifique los datos ingresados"
          );
        }
      } catch {
        this.CON851("personalizada", "error", "Verifique los datos ingresados");
      }
    },

    /* functions Dpto */
    async validateDpto() {
      const { ser } = this.reg_rescorr;

      try {
        const res_getSerco = await this._getSerco({ codigo: ser });

        if (res_getSerco?.cod_error == "01") {
          this.CON851("01", "info", `${ser}`);
        } else if (res_getSerco?.codigo) {
          this.reg_rescorr.ser_dataCard = res_getSerco.descripcion;
          this.focusInput(this.form_rescorr, "dep");
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Verifique los datos ingresados"
          );
        }
      } catch {
        this.CON851("personalizada", "error", "Verifique los datos ingresados");
      }
    },

    /* functions responsable */
    async validateResponsable() {
      const { dep } = this.reg_rescorr;

      try {
        const res_getDepco = await this._getDepco({ codigo: dep });

        if (res_getDepco?.cod_error == "01") {
          this.CON851("01", "info", `${dep}`);
        } else if (res_getDepco?.codigo) {
          this.reg_rescorr.dep_dataCard = res_getDepco.responsable;
          this.focusInput(this.form_rescorr, "descrip");
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Verifique los datos ingresados"
          );
        }
      } catch {
        this.CON851("personalizada", "error", "Verifique los datos ingresados");
      }
    },

    /* functions asunto */
    validateAsunto() {
      this.reg_rescorr.fecha = new Date().toISOString().slice(0, 10);
      this.reg_rescorr.hora = new Date().toString().slice(16, 21);

      this.focusInput(this.form_rescorr, "clMacro");
    },

    /* functions macro */
    async validateClMacro() {
      this.reg_rescorr.clMacro = this.reg_rescorr.clMacro.padStart(2, "0");

      const { clMacro } = this.reg_rescorr;

      const getTipco_ = await this._getTipco({ codigo: clMacro });

      if (getTipco_?.cod_error == "01") {
        this.CON851("01", "info", `${clMacro}`);
      } else if (getTipco_?.codigo) {
        this.focusInput(this.form_rescorr, "codigoMacro");
      } else {
        this.CON851("personalizada", "info", "verifique los datos ingresados");
      }
    },

    /* functions macroCodigo */
    async validateMacroCodigo() {
      const { clMacro, codigoMacro } = this.reg_rescorr;

      const getMacroId_ = await this._getMacroId({
        cl: clMacro,
        codigo: codigoMacro,
      });

      if (getMacroId_?.cod_error == "01") {
        this.CON851P(
          "PNZ",
          "info",
          "No existe el macro, ¿Desea crear uno?",
          () => {
            window.open(`/COR402/?codigo=${codigoMacro} `, "_blank");
            this.onField();
          },
          this.onField
        );
      } else if (getMacroId_?.llave) {
        this.reg_rescorr.macro_dataCard = getMacroId_.detalle;
        this.reg_rescorr.macro = getMacroId_.tabla;
        this.focusInput(this.form_rescorr, "macro");
      } else {
        this.CON851("personalizada", "info", "verifique los datos ingresados");
      }
    },

    /* functions macro */
    validateMacro() {
      this.focusInput(this.form_rescorr, "medio");
    },

    /* functions medio */
    validateMedio() {
      const { medio } = this.reg_rescorr;

      switch (medio) {
        case 1:
          this.focusInput(this.form_rescorr, "numeroFact");
          break;
        case 2:
        case 3:
          this.validarResponsable();
          this.focusInput(this.form_rescorr, "firma");
          break;
      }
    },

    /* functions nro_factura */
    validateNroFactura() {
      this.focusInput(this.form_rescorr, "monto");
    },

    /* functions valor_factura */
    validateValorFactura() {
      this.focusInput(this.form_rescorr, "nroGuia");
    },

    /* functions nro_guia */
    validateNroGuia() {
      this.focusInput(this.form_rescorr, "perRec");
    },

    /* functions persentre */
    validatePersonaRecibe() {
      this.validarResponsable();

      this.focusInput(this.form_rescorr, "firma");
    },

    /* functions firma */
    async validateFirma() {
      const { swRadi, dep } = this.reg_rescorr;
      const user = currentUser;

      if (swRadi == "N") {
        this.reg_rescorr.firma = user.llaveOper;
        this.reg_rescorr.firma_dataCard = user.nombre;
      }

      if (swRadi == "S") {
        const getDepco_ = await this._getDepco({ codigo: dep });

        getDepco_?.cod_error == "01"
          ? ((this.reg_rescorr.firma = ""),
            (this.reg_rescorr.firma_dataCard = ""))
          : ((this.reg_rescorr.firma = getDepco_.oper),
            (this.reg_rescorr.firma_dataCard = getDepco_.responsable));
      }

      this.focusInput(this.form_rescorr, "cargo");
    },

    async validarResponsable() {
      let codigo_responsable = this.reg_rescorr.dep;

      const res_getDepco = await this._getDepco({ codigo: codigo_responsable });

      this.reg_rescorr.firma = res_getDepco.oper;
      this.reg_rescorr.firma_dataCard = res_getDepco.responsable;
      this.reg_rescorr.cargo = res_getDepco.cargo;
    },

    /* functions cargo */
    validateCargo() {
      this.focusInput(this.form_rescorr, "esta");
    },

    /* functions estadoCorres */
    validateEstadoCorres() {
      switch (this.novedad.acceso) {
        case 7:
          this.focusInput(this.form_rescorr, "file");
          break;

        case 8:
          this.CON851P("01", "info", null, this.edit, () =>
            this.focusInput(this.form_rescorr, "esta")
          );
          break;

        case 9:
          this.eliminar();
          break;
      }
    },

    async edit() {
      const { codResp } = this.reg_rescorr;

      try {
        const data = JSON.parse(JSON.stringify(this.reg_rescorr));
        // agrego variables que necesita el back para editar
        data.tabla = data.macro;
        data.codResp.anoLlave = parseInt(data.codResp.anoLlave);
        data.operModi = `${currentUser.llaveOper} - ${currentUser.nombre}`;
        data.swRadi = this.reg_rescorr.swRadi == 1 ? "S" : "N";
        data.fechaModi = new Date().toISOString().slice(0, 10);
        data.fechaRadi = this.formatFecha_(fechaRadi, horaRadi);
        data.fecha = this.formatFecha_(fecha, hora);
        data.monto = this.formatNumber_(data.monto);

        const res_putRescorr = await this._putRescorr({
          radi_ano: codResp.anoLlave,
          radi_numero: codResp.cont,
          data: data,
        });

        if (res_putRescorr?.N1 == "editado") {
          this.CON851(
            "personalizada",
            "success",
            "Editado correctamente",
            null,
            this.solicitarImpresion
          );
        } else {
          this.CON851(
            "personalizada",
            "info",
            "Verifique los datos ingresados"
          );
        }
      } catch {
        this.CON851(
          "personalizada",
          "error",
          "Error de conexion con el servidor"
        );
      }
    },

    /* functions file */
    validateFile() {
      this.CON851P(
        "PNZ",
        "info",
        "Guardar respuesta de la correspondencia?",
        this.saveAnswerCorrespondence,
        this.cancelSaveAnswerCorrespondence
      );
    },

    async saveAnswerCorrespondence() {
      const { fechaRadi, horaRadi, fecha, hora, anoRadi, contRadi } =
        this.reg_rescorr;

      const data = JSON.parse(JSON.stringify(this.reg_rescorr));
      data.operModi = `${currentUser.llaveOper} - ${currentUser.nombre}`;
      data.fechaModi = new Date().toISOString().slice(0, 10);
      data.swRadi = this.reg_rescorr.swRadi == 1 ? "S" : "N";
      data.fechaRadi = this.formatFecha_(fechaRadi, horaRadi);
      data.fecha = this.formatFecha_(fecha, hora);
      data.tabla = data.macro;
      data.monto = this.formatNumber_(data.monto);

      const postRescorr_ = await this._postRescorr(data);
      console.log("RES", postRescorr_);

      if (postRescorr_?.N1 == "guardado") {
        const res_getCorr = await this._getCorr({
          llave: { anoLlave: anoRadi, cont: contRadi },
        });
        const corr = JSON.parse(JSON.stringify(res_getCorr));
        corr.esta = data.esta;

        const res_putCorres = await this._putCorres({ data: corr });
        console.log("editado: ", res_putCorres);

        this.CON851(
          "personalizada",
          "success",
          "Datos guardados correctamente",
          null,
          this.guardarPdf
        );
      } else {
        this.CON851(
          "personalizada",
          "error",
          "Error, no se guardo la respuesta correspondencia"
        );
      }
    },

    cancelSaveAnswerCorrespondence() {
      this.focusInput(this.form_rescorr, "file");
    },

    async guardarPdf() {
      const { codResp, file } = this.reg_rescorr;
      const postRescorrPdf_ = await this._postRescorrUploadPdf({
        ano: codResp.anoLlave,
        radi: codResp.cont,
        file,
      });
      console.log(postRescorrPdf_)

      if (postRescorrPdf_?.N1 == "guardado") {
        this.CON851(
          "personalizada",
          "success",
          "pdf guardado correctamente",
          null,
          this.enviarEmail
        );
      } else {
        this.CON851("personalizada", "error", "Error, no se guardo el pdf");
      }
    },

    async enviarEmail() {
      try {
        const data = {
          id: this.reg_rescorr.dep,
          anoLlave: this.reg_rescorr.codResp.anoLlave,
          cont: this.reg_rescorr.codResp.cont,
          destino: this.reg_rescorr.correoTer,
          observacion: this.reg_rescorr.macro,
          nom_empresa: this.USUARIO_GLOBAL.nombre,
        };
        const RES = await this._sendEmailRescorr({ data });

        if ("accepted" in RES) {
          this.CON851(
            "N1",
            "success",
            `Correo enviado correctamente`,
            null,
            this.solicitarImpresion
          );
        } else if (!data.destino) {
          this.CON851(
            "personalizada",
            "info",
            "No existe un email al cual enviar el correo",
            null,
            this.solicitarImpresion
          );
        } else {
          this.CON851(
            "personalizada",
            "error",
            "Fallo el envio del correo",
            null,
            this.solicitarImpresion
          );
        }
      } catch (error) {
        console.error(error);
        this.CON851("personalizada", "error", "Fallo el envio de correo");
      }
    },

    solicitarImpresion() {
      this.CON851P("00", "info", "", this.generarImpresion, this.abrirNovedad);
    },

    async generarImpresion() {
      const data = {
        USUARIO: this.USUARIO_GLOBAL.nombre,
        NIT: this.USUARIO_GLOBAL.nit,
        ...this.reg_rescorr,
      };

      await informeCORR403(data);
      this.abrirNovedad();
    },

    /* keydown functions */
    keyDownAnoLlave(key) {
      switch (key) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          return this.validateAnoLlave();
      }
    },

    keyDownRadicado(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "anoLlave");
          break;

        case "enter":
          this.validateCont();
          break;
      }
    },

    keyDownTieneRadi(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          this.validateSwRadi();
          break;
      }
    },

    keyDownRadicadoAno(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;

        case "enter":
          this.validateContAno();
          break;
      }
    },

    keyDownContRadi(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "anoRadi");
        case "enter":
          return this.validateContRadi();
      }
    },

    keyDownRemitente(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;

        case "enter":
          this.validateRemitente();
          break;
      }
    },

    keyDownDptoRemit(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "nit");
          break;

        case "enter":
          this.validateDptoRemit();
          break;
      }
    },

    keyDownProcedencia(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "dptoRemit");
          break;

        case "enter":
          this.validateProcedencia();
          break;
      }
    },

    keyDownTipoCorres(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "proceden");
          break;
        case "enter":
          this.validateTipoCorres();
          break;
      }
    },

    keyDownAuxTip(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "tipoCorres");
          break;
        case "enter":
          this.validateAuxTip();
          break;
      }
    },

    keyDownDpto(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "codAuxco");
          break;
        case "enter":
          this.validateDpto();
          break;
      }
    },

    keyDownResponsable(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "ser");
          break;
        case "enter":
          this.validateResponsable();
          break;
      }
    },

    keyDownDescripcion(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "dep");
          break;
        case "enter":
          this.focusInput(this.form_rescorr, "asunto");
          break;
      }
    },

    keyDownAsunto(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;

        case "enter":
          this.validateAsunto();
          break;
      }
    },

    keyDownClMacro(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "asunto");
          break;

        case "enter":
          this.validateClMacro();
          break;
      }
    },

    keyDownCodigoMacro(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "clMacro");
          break;

        case "enter":
          this.validateMacroCodigo();
          break;
      }
    },

    keyDownMacroArea(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "codigoMacro");
          break;

        case "enter":
          this.validateMacro();
          break;
      }
    },

    keyDownMedioResp(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "macro");
          break;

        case "enter":
          this.validateMedio();
          break;
      }
    },

    keyDownNroFactura(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "medio");
          break;

        case "enter":
          this.validateNroFactura();
          break;
      }
    },

    keyDownValorFactura(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "numeroFact");
          break;

        case "enter":
          this.validateValorFactura();
          break;
      }
    },

    keyDownNroGuia(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_rescorr, "monto");
          break;

        case "enter":
          this.validateNroGuia();
          break;
      }
    },

    keyDownPersonaRecibe(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "nroGuia");
        case "enter":
          return this.validatePersonaRecibe();
      }
    },

    keyDownFirma(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "perRec");
        case "enter":
          return this.validateFirma();
      }
    },

    keyDownCargo(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "firma");
        case "enter":
          return this.validateCargo();
      }
    },

    keyDownEstadoCorres(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "cargo");
        case "enter":
          return this.validateEstadoCorres();
      }
    },

    keyDownFileInput(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_rescorr, "esta");
        case "enter":
          return this.validateFile();
      }
    },
  },
};
</script>

<style></style>
