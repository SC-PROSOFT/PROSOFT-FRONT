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
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnoLlave)"
            :field="form_corres.anoLlave"
            :reg="reg.llave.anoLlave"
            @onChange="
              (data) => {
                reg.llave[data.key] = data.value;
              }
            "
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnoCont)"
            @abrirF8="openCOR868"
            :field="form_corres.cont"
            :reg="reg.llave.cont"
            @onChange="
              (data) => {
                reg.llave[data.key] = data.value;
              }
            "
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event, datoManejo)"
            :field="form_corres.manejo"
            :reg="reg.manejo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event, datoProcedencia)"
            :field="form_corres.proceden"
            :reg="reg.proceden"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event, datoFecha)"
            :field="form_corres.fecha"
            :reg="reg.fecha"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.hora"
            :reg="reg.hora"
            @onChange="onChange"
          />
        </v-col>
      </v-row>
      <v-row
        justify="start"
        align="center"
        class="input-row"
        v-if="flag_radicados"
      >
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoContAtnt)"
            @abrirF8="openCOR868"
            :field="form_corres.contAtnt"
            :reg="reg_ant.contAtnt"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.contAtnt1" :reg="reg_ant.contAtnt1" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.contAtnt2" :reg="reg_ant.contAtnt2" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.contAtnt3" :reg="reg_ant.contAtnt3" />
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoRemitente)"
            @abrirF8="openCON802"
            :field="form_corres.nit"
            :reg="reg.nit"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card :field="form_corres.descripTer" :reg="reg.descripTer" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoDependencia)"
            @abrirF8="openCOR879"
            :field="form_corres.deptoremi"
            :reg="reg.deptoremi"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card
            :field="form_corres.descripDeptoremi"
            :reg="reg.descripDeptoremi"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoTipoCorres)"
            @abrirF8="openCOR867"
            :field="form_corres.tipoCorres"
            :reg="reg.tipoCorres"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card
            :field="form_corres.descripTipco"
            :reg="reg.descripTipco"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card :field="form_corres.diasTipco" :reg="reg.diasTipco" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card :field="form_corres.fechaCau" :reg="reg.fechaCau" />
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAux)"
            @abrirF8="openCOR871"
            :field="form_corres.codAux"
            :reg="reg.codAux"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripAux" :reg="reg.descripAux" />
        </v-col>
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoDescrip)"
            :field="form_corres.descrip"
            :reg="reg.descrip"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoSer)"
            @abrirF8="openCOR865"
            :field="form_corres.ser"
            :reg="reg.ser"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripSer" :reg="reg.descripSer" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoDep)"
            @abrirF8="openCOR866"
            :field="form_corres.dep"
            :reg="reg.dep"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card
            :field="form_corres.responsableDep"
            :reg="reg.responsableDep"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoFol)"
            :field="form_corres.fol"
            :reg="reg.fol"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoFolD)"
            :field="form_corres.fold"
            :reg="reg.fold"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event, datoTipoAnexo)"
            :field="form_corres.tipoAnexo"
            :reg="reg.tipoAnexo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnex)"
            :field="form_corres.anex"
            :reg="reg.anex"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoFactura)"
            :field="form_corres.nroFact"
            :reg="reg.nroFact"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoMonto)"
            :field="form_corres.monto"
            :reg="reg.monto"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event, datoFechaFact)"
            :field="form_corres.fechaFact"
            :reg="reg.fechaFact"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event, datoFechaEntre)"
            :field="form_corres.fechaEntre"
            :reg="reg.fechaEntre"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event, datoMedioIng)"
            :field="form_corres.medioIng"
            :reg="reg.medioIng"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoNroGuia)"
            :field="form_corres.nroGuia"
            :reg="reg.nroGuia"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoPersentre)"
            :field="form_corres.persentre"
            :reg="reg.persentre"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <TEXTAREA
            @next-action="nextStep(form_corres, $event, datoObserv)"
            :field="form_corres.observ"
            :reg="reg.observ"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <AUTOCOMPLETE :field="form_corres.esta" :reg="reg.esta" />
        </v-col>
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT :field="form_corres.oper" :reg="reg.oper" />
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="show_archivo_abjunto" width="500">
      <v-card width="500">
        <v-toolbar color="primary">
          <h2 class="white--text">
            Adjuntar arvhivo PDf
            <v-icon size="35" class="mb-1" color="red">mdi-file-pdf-box</v-icon>
          </h2>
        </v-toolbar>
        <v-container>
          <FILEINPUT
            :field="form_corres.archivo_file"
            :reg="reg.archivo_file"
            @onChange="onChange"
            class="ma-10"
          />
          <div class="mb-2 text-center">
            <v-btn
              class="mb-2 mx-1 botone"
              color="red"
              @click="datoObserv()"
              dark
              >cancelar
            </v-btn>
            <v-btn
              class="mb-2 mx-1 botone"
              color="primary"
              @click="validarAbjunto()"
              dark
              >aceptar</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    />
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
    <COR868
      v-if="show_cor868"
      @callBack="callbackCOR868"
      @callbackEsc="callbackCOR868"
    />
    <CON802
      v-if="show_con802"
      @callBack="callbackCON802"
      @callbackEsc="callbackCON802"
    />
    <COR879
      v-if="show_cor879"
      @callBack="callbackCOR879"
      @callbackEsc="callbackCOR879"
    />
    <COR867
      v-if="show_cor867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    />
    <COR871
      v-if="show_cor871"
      @callBack="callbackCOR871"
      @callbackEsc="callbackCOR871"
    />
    <COR866
      v-if="show_cor866"
      @callBack="callbackCOR866"
      @callbackEsc="callbackCOR866"
    />
    <COR865
      v-if="show_cor865"
      @callBack="callbackCOR865"
      @callbackEsc="callbackCOR865"
    />
  </v-container>
</template>
<script>
import {
  getObjCorres_,
  getObjCorres,
} from "../../fuentes/correspondencia/regObjtCorres";
import { global, currentUser, formatNumberMask_ } from "../../mixins/global";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { informeCORR201P } from "../../Pdf/index";
import moment from "moment";

import CON802 from "../../components/CONTAB/CON802.vue";
import COR868 from "../../components/COR/COR868.vue";
import COR879 from "../../components/COR/COR879.vue";
import COR867 from "../../components/COR/COR867.vue";
import COR871 from "../../components/COR/COR871.vue";
import COR866 from "../../components/COR/COR866.vue";
import COR865 from "../../components/COR/COR865.vue";

export default {
  name: "COR201",
  mixins: [nextAction, global],
  components: { COR868, CON802, COR879, COR867, COR871, COR866, COR865 },
  data() {
    return {
      titulo: `2.1 Recepción  Correspondencia`,

      show_archivo_abjunto: false,
      novedad_activa: false,
      novedad: {},

      show_cor868: false,
      show_con802: false,
      show_cor879: false,
      show_cor867: false,
      show_cor871: false,
      show_cor866: false,
      show_cor865: false,
      flag_radicados: false,

      original: null,

      form_corres: getObjCorres_(),
      reg_ant: getObjCorres(),
      reg: getObjCorres(),
    };
  },
  computed: {
    ...mapGetters({ get: "formularios/get" }),
  },
  mounted() {
    this.abrirNovedad();
  },
  methods: {
    onChange(data) {
      this.reg[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _deleteCorres: "corr/_deleteCorres",
      _getUltCorr: "corr/_getUltCorr",
      _getCORR891: "corr/_getCORR891",
      _postCorres: "corr/_postCorres",
      _putCorres: "corr/_putCorres",
      _getCorr: "corr/_getCorr",

      _sendEmail: "envioemail/_sendEmail",
      _uploadFile: "archivos/_uploadFile",
      _getDepremi: "depremi/_getDepremi",
      _getAuxco: "auxtip/_getAuxco",
      _getTerce: "terce/_getTerce",
      _getTipco: "tipco/_getTipco",
      _getDepco: "depco/_getDepco",
      _getSerco: "serco/_getSerco",

      /* dias no habil */
      _getDiasNoHabil: "dianhabil/_getDiasNoHabil",
    }),
    datoAnoLlave(key) {
      switch (key) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          return this.focusInput(this.form_corres, "cont");
      }
    },
    datoAnoCont(val) {
      !val && this.focusInput(this.form_corres, "cont");
      switch (val) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          return this.leerCorrespondecia();
      }
    },
    datoContAtnt(val) {
      if (!val) {
        this.focusInput(this.form_corres, "contAtnt");
        this.flag_radicados = true;
      }
      switch (val) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          return this.validarContAnt();
      }
    },
    async validarContAnt() {
      try {
        const llave = {
          anoLlave: this.reg_ant.contAtnt?.slice(0, 4),
          cont: this.reg_ant.contAtnt?.slice(4),
        };
        const RES = await this._getCorr({ llave });
        if (!RES.msg) {
          this.reg_ant.contAtnt1 = RES.contAtnt1;
          this.reg_ant.contAtnt2 = RES.contAtnt2;
          this.reg_ant.contAtnt3 = RES.contAtnt3;
          this.reg.proceden = RES.proceden;
          this.reg.manejo = RES.manejo;
          this.validarRadicadosAnteriores();
        }
      } catch (error) {
        this.onField();
        console.error(error);
      }
    },
    validarRadicadosAnteriores() {
      switch (true) {
        case this.reg_ant.contAtnt1 == 0:
          this.reg.contAtnt1 = this.reg_ant.contAtnt;
          break;
        case this.reg_ant.contAtnt2 == 0:
          this.reg.contAtnt1 = this.reg_ant.contAtnt1;
          this.reg.contAtnt2 = this.reg_ant.contAtnt;
          break;
        case this.reg_ant.contAtnt3 == 0:
          this.reg.contAtnt1 = this.reg_ant.contAtnt1;
          this.reg.contAtnt2 = this.reg_ant.contAtnt2;
          this.reg.contAtnt3 = this.reg_ant.contAtnt;
          break;
        default:
          this.CON851("PNZ", "info", "Excede el limite de trazabilidad!");
          return this.datoContAtnt(undefined);
      }
      this.focusInput(this.form_corres, "nit");
    },
    async leerCorrespondecia() {
      this.original = null;
      const RES = await this._getCorr({ llave: this.reg.llave });
      if (RES.msg && this.novedad.acceso != "7")
        this.CON851("N1", "info", `La correspondencia no existe`);
      else {
        this.original = JSON.parse(JSON.stringify(RES));
        this.novedad.acceso == "7" && this.nuevo(RES);
        this.novedad.acceso == "8" && this.cambio(RES);
        this.novedad.acceso == "9" && this.confirmar(RES);
      }
    },
    async condicionesNovedad() {
      if (this.novedad.acceso == "7" || !this.reg.contAtnt)
        await this.buscarNumero();
      if (this.novedad.acceso == "7") {
        let anio_actual = moment().format("YYYY-MM-DD").slice(0, 4);
        if (this.reg.llave.anoLlave == anio_actual) {
          this.reg.llave.cont = this.reg.llave.cont + 1;
        } else {
          this.reg.llave.anoLlave = parseInt(anio_actual);
          this.reg.llave.cont = 1;
        }
        this.leerCorrespondecia();
      } else this.focusInput(this.form_corres, "anoLlave");
    },
    async buscarNumero() {
      try {
        const RES = await this._getUltCorr();
        if ("llave" in RES) {
          this.reg.llave.anoLlave = RES.llave.anoLlave;
          this.reg.llave.cont = RES.llave.cont;
          this.reg.fecha = RES.fechaR;
          this.reg.hora = RES.hora;
        } else if ("msg" in RES) {
          this.CON851("PNZ", "info", "No se encontro correspondencia");
        }
      } catch (error) {
        console.error(error);
      }
    },

    holding() {
      if (this.nit_usu != 900566047) {
        this.focusInput(this.form_corres, "manejo");
      } else this.abrirNovedad();
    },

    async datoManejo(val) {
      switch (val) {
        case "esc":
          if (this.novedad.acceso == "7") return this.abrirNovedad();
          return this.focusInput(this.form_corres, "cont");
        case "enter":
          return this.focusInput(this.form_corres, "proceden");
      }
    },
    datoProcedencia(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "manejo");
          break;
        case "enter":
          const OPER = currentUser.llaveOper;
          if (
            OPER == "GMRI" ||
            OPER == "ADMI" ||
            OPER == "GEBC" ||
            OPER == "YEYO"
          ) {
            this.focusInput(this.form_corres, "fecha");
          } else this.focusInput(this.form_corres, "nit");
          break;
      }
    },
    datoFecha(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "proceden");
        case "enter":
          return this.focusInput(this.form_corres, "nit");
      }
    },
    datoRemitente(val) {
      switch (val) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          if (!this.reg.nit)
            return this.focusInput(this.form_corres, "deptoremi");
          return this.validarRemitente();
      }
    },
    async validarRemitente() {
      try {
        const RES = await this._getTerce({ codigo: this.reg.nit });
        if ("codigo" in RES) {
          this.reg.descripTer = RES.descrip;
          this.focusInput(this.form_corres, "deptoremi");
        } else if (RES.msg || "codigo" in RES) {
          this.CON851P(
            "PNZ",
            "info",
            "No existe tercero, ¿Deseas registrar uno?",
            () => {
              window.open(`/CON110C/?codigo=${this.reg.nit} `, "_blank");
              this.onField();
            },
            this.onField
          );
        } else this.CON851("000", "error");
      } catch (error) {
        this.focusInput(this.form_corres, "nit");
        console.error(error);
      }
    },
    datoDependencia(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "nit");
        case "enter":
          return this.validarDepremi();
      }
    },
    async validarDepremi() {
      try {
        const RES = await this._getDepremi({ codigo: this.reg.deptoremi });
        if ("codigo" in RES) {
          this.reg.deptoremi = RES.codigo;
          this.reg.descripDeptoremi = RES.descripcion;

          this.focusInput(this.form_corres, "tipoCorres");
        } else if (RES.msg) {
          this.CON851("PNZ", "info", "No existe dependencia ");
        } else this.CON851("000", "error");
      } catch (error) {
        this.focusInput(this.form_corres, "nit");
        console.error(error);
      }
    },
    datoTipoCorres(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "deptoremi");
          break;
        case "enter":
          this.validarTipoCorres();
          break;
      }
    },
    async validarTipoCorres() {
      try {
        const RES = await this._getTipco({ codigo: this.reg.tipoCorres });

        if ("codigo" in RES) {
          this.reg.descripTipco = RES.descripcion;
          this.reg.diasTipco = RES.dias;
          this.deadline();
          this.focusInput(this.form_corres, "codAux");
        } else if (RES.msg) {
          this.CON851("PNZ", "info", "No existe tipo de correspondencia");
        } else this.CON851("000", "error");
      } catch (error) {
        this.focusInput(this.form_corres, "tipoCorres");
        console.error(error);
      }
    },
    async deadline() {
      const { fecha } = this.reg;
      const year = [];
      const res_getDiasNoHabil = await this._getDiasNoHabil();
      let yearIni = parseInt(fecha.slice(0, 4));
      let date;
      let festivo;
      let anos = [];
      let noHabilesDelAno = [];
      let diasRestantes = this.reg.diasTipco;

      for (let i = 0; i < 730; i++) {
        date = new Date(
          new Date(yearIni, 0, 1).setDate(new Date(yearIni, 0, 1).getDate() + i)
        );
        if (date.getDay() === 0 || date.getDay() === 6) festivo = true;
        else festivo = false;
        year.push({ date: date, fest: festivo });
      }
      // Obtener los anos con los que voy a trabajar.
      year.forEach((elem) => {
        if (!anos.includes(elem.date.getUTCFullYear().toString()))
          anos.push(elem.date.getUTCFullYear().toString());
      });
      // filtro los dias no habiles que voy a necesitar.
      const noHabilFilter = res_getDiasNoHabil.filter(
        (elem) =>
          elem.date.slice(0, 4) == anos[0] || elem.date.slice(0, 4) == anos[1]
      );
      // Agrego a year los festivos que filtre en el paso anterior.
      noHabilesDelAno = year.map((elem) => {
        noHabilFilter.forEach((elem2) => {
          if (
            elem2.date.slice(0, 10) ==
            `${elem.date.getFullYear()}-${
              (elem.date.getMonth() + 1).toString().length == 1
                ? (elem.date.getMonth() + 1).toString().padStart(2, "0")
                : (elem.date.getMonth() + 1).toString()
            }-${
              elem.date.getDate().toString().length == 1
                ? elem.date.getDate().toString().padStart(2, "0")
                : elem.date.getDate().toString()
            }`
          ) {
            return (elem.fest = true);
          }
        });
        return elem;
      });

      // muestro en la caja la fecha limite para dar respuesta a la correspondencia
      let fecha_inicial = noHabilesDelAno.filter(
        (elem) =>
          `${elem.date.getFullYear()}-${
            (elem.date.getMonth() + 1).toString().length == 1
              ? (elem.date.getMonth() + 1).toString().padStart(2, "0")
              : (elem.date.getMonth() + 1).toString()
          }-${
            elem.date.getDate().toString().length == 1
              ? elem.date.getDate().toString().padStart(2, "0")
              : elem.date.getDate().toString()
          }` == fecha
      );

      for (
        let i = noHabilesDelAno.indexOf(fecha_inicial[0]);
        i < noHabilesDelAno.length;
        i++
      ) {
        if (noHabilesDelAno[i]?.fest == false) {
          diasRestantes--;
        }
        if (diasRestantes == 0) {
          this.reg.fechaCau = `${noHabilesDelAno[i].date.getFullYear()}-${
            (noHabilesDelAno[i].date.getMonth() + 1).toString().length == 1
              ? (noHabilesDelAno[i].date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")
              : (noHabilesDelAno[i].date.getMonth() + 1).toString()
          }-${
            noHabilesDelAno[i].date.getDate().toString().length == 1
              ? noHabilesDelAno[i].date.getDate().toString().padStart(2, "0")
              : noHabilesDelAno[i].date.getDate().toString()
          }`;
          break;
        }
      }
    },
    datoAux(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_corres, "tipoCorres");
          break;
        case "enter":
          this.validarAux();
          break;
      }
    },
    async validarAux() {
      try {
        const RES = await this._getAuxco({ codigo: this.reg.codAux });
        if ("codigo" in RES) {
          this.reg.descripAux = RES.descripcion;
          this.focusInput(this.form_corres, "descrip");
        } else if (RES.msg) {
          this.CON851("PNZ", "info", "No existe auxiliar");
        } else this.CON851("000", "error");
      } catch (error) {
        this.focusInput(this.form_corres, "codAux");
        console.error(error);
      }
    },
    datoDescrip(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "codAux");
        case "enter":
          return this.focusInput(this.form_corres, "ser");
      }
    },
    datoSer(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "descrip");
        case "enter":
          return this.validarSer();
      }
    },
    async validarSer() {
      try {
        const RES = await this._getSerco({ codigo: this.reg.ser });
        if ("codigo" in RES) {
          this.reg.descripSer = RES.descripcion;
          this.focusInput(this.form_corres, "dep");
        } else if (RES.msg) {
          this.CON851("PNZ", "info", "No existe correspondencia");
        } else this.CON851("PNZ", "error", "Error consultando datos");
      } catch (error) {
        this.focusInput(this.form_corres, "ser");
        console.error(error);
      }
    },
    datoDep(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "ser");
        case "enter":
          return this.validarDep();
      }
    },
    async validarDep() {
      try {
        const RES = await this._getDepco({ codigo: this.reg.dep });
        if ("codigo" in RES) {
          !RES.correo &&
            this.CON851(
              "PNZ",
              "info",
              "Personal de destino sin correo electronico"
            );
          this.reg.responsableDep = RES.responsable;
          this.reg.correoDep = RES.correo;
          this.focusInput(this.form_corres, "fol");
        } else if (RES.msg) {
          this.CON851("PNZ", "info", "No existe personal de destino");
        } else this.CON851("000", "error");
      } catch (error) {
        this.focusInput(this.form_corres, "ser");
        console.error(error);
      }
    },
    datoFol(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "dep");
        case "enter":
          return this.focusInput(this.form_corres, "fold");
      }
    },
    datoFolD(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "fol");
        case "enter":
          if (Number(this.reg.fol) > Number(this.reg.fold)) {
            return this.CON851(
              "PNZ",
              "info",
              "Numero de folios invalido",
              null,
              () => {
                this.focusInput(this.form_corres, "fol");
              }
            );
          }
          return this.focusInput(this.form_corres, "tipoAnexo");
      }
    },
    datoTipoAnexo(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "fold");
        case "enter":
          return this.focusInput(this.form_corres, "anex");
      }
    },
    datoAnex(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "tipoAnexo");
        case "enter":
          return this.focusInput(this.form_corres, "nroFact");
      }
    },
    datoFactura(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "anex");
        case "enter":
          if (this.reg.nroFact.trim()) this.validarFactura();
          else this.focusInput(this.form_corres, "fechaFact");
          break;
      }
    },
    async validarFactura() {
      try {
        const RES = await this._getCORR891({ codigo: this.reg.nroFact });
        if ("codigo" in RES) {
          if (RES.cartera == "1" && this.novedad.acceso != 8) {
            this.CON851("9M", "info", "", null, () => {
              this.focusInput(this.form_corres, "nroFact");
            });
          } else this.focusInput(this.form_corres, "monto");
        } else if (RES.msg) {
          this.CON851(
            "PNZ",
            "info",
            "No existe factura de destino",
            null,
            () => {
              this.reg.nroFact = "";
              this.focusInput(this.form_corres, "fechaFact");
            }
          );
        }
      } catch (error) {
        this.focusInput(this.form_corres, "nroFact");
        console.error(error);
      }
    },
    datoMonto(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "nroFact");
        case "enter":
          return this.focusInput(this.form_corres, "fechaFact");
      }
    },
    datoFechaFact(val) {
      switch (val) {
        case "esc":
          if (this.reg.nroFact.trim())
            return this.focusInput(this.form_corres, "monto");
          else return this.focusInput(this.form_corres, "nroFact");
        case "enter":
          return this.focusInput(this.form_corres, "fechaEntre");
      }
    },
    datoFechaEntre(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "fechaFact");
        case "enter":
          if (
            Date.parse(this.reg.fechaFact) > Date.parse(this.reg.fechaEntre)
          ) {
            return this.CON851(
              "PNZ",
              "info",
              "La fecha de entrega debe ser despues a la fecha del documento",
              null,
              () => {
                this.focusInput(this.form_corres, "fechaEntre");
              }
            );
          }
          return this.validarFechaEntre();
      }
    },
    validarFechaEntre() {
      if (
        (this.USUARIO_GLOBAL.nit == 800162035 && this.reg.nroFact.trim()) ||
        this.USUARIO_GLOBAL.nit == 900405505
      ) {
        return this.focusInput(this.form_corres, "fechaEntre");
      } else return this.focusInput(this.form_corres, "medioIng");
    },
    datoMedioIng(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "nroFact");
        case "enter":
          if (this.reg.medioIng == 1)
            return this.focusInput(this.form_corres, "nroGuia");
          else return this.focusInput(this.form_corres, "persentre");
      }
    },
    datoNroGuia(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "medioIng");
        case "enter":
          return this.focusInput(this.form_corres, "persentre");
      }
    },
    datoPersentre(val) {
      switch (val) {
        case "esc":
          if (this.reg.medioIng == 1)
            return this.focusInput(this.form_corres, "nroGuia");
          else return this.focusInput(this.form_corres, "medioIng");
        case "enter":
          return this.focusInput(this.form_corres, "observ");
      }
    },
    datoObserv(val) {
      !val && [
        (this.show_archivo_abjunto = false),
        this.focusInput(this.form_corres, "observ"),
      ];
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "persentre");
        case "enter":
          if (this.novedad.acceso == 7) return this.solicitarAbjunto();
          else return this.confirmar();
      }
    },
    solicitarAbjunto(data) {
      this.show_archivo_abjunto = true;
    },
    validarAbjunto() {
      this.show_archivo_abjunto = false;
      if (this.reg.archivo_file?.length == 0 || this.reg.archivo_file == null) {
        this.CON851(
          "PNZ",
          "info",
          "Debes abjuntar un archivo pdf",
          null,
          this.datoObserv
        );
      } else this.subirArchivo();
    },
    async subirArchivo() {
      try {
        const data = {
          anoLlave: this.reg.llave.anoLlave,
          cont: this.reg.llave.cont,
          file: this.reg.archivo_file,
        };
        const RES = await this._uploadFile({ data });
        if (RES.N1) {
          this.CON851(
            "PNZ",
            "success",
            "Abjunto subido correctamente",
            null,
            this.confirmar
          );
        } else if (RES.cod_error == "00")
          this.CON851(
            "PNZ",
            "info",
            "Ya existe archivo con la llave digitada",
            null,
            this.datoObserv
          );
        else
          this.CON851(
            "PNZ",
            "error",
            "Ha ocurrido un error intentando subir el archivo abjunto",
            null,
            this.datoObserv
          );
      } catch (error) {
        this.CON851(
          "PNZ",
          "error",
          "Ha ocurrido un error intentando subir el archivo abjunto",
          null,
          this.datoObserv
        );
        console.error(error);
      }
    },
    confirmar() {
      this.novedad.acceso == 7 &&
        this.CON851P(
          "PNZ",
          "info",
          "¿Guardar correspondencia?",
          this.guardar,
          this.datoObserv
        );
      this.novedad.acceso == 8 &&
        this.CON851P(
          "PNZ",
          "info",
          "Modificar correspondencia?",
          this.editar,
          this.datoObserv
        );
      this.novedad.acceso == 9 &&
        this.CON851P(
          "PNZ",
          "info",
          "¿Eliminar correspondencia?",
          this.eliminar,
          this.datoAnoCont
        );
    },
    nuevo(data) {
      if ("llave" in data) {
        return this.CON851(
          "PNZ",
          "info",
          `Ya existe la correspondencia ${data.llave.anoLlave}${data.llave.cont} `,
          null,
          () => {
            this.focusInput(this.form_corres, "cont");
          }
        );
      } else {
        this.reg.oper = `${currentUser.llaveOper} - ${currentUser.nombre}`;
        this.reg.fecha = moment().format("YYYY-MM-DD");
        this.reg.hora = moment().format("HH:mm");
        this.CON851P(
          "PNZ",
          "info",
          "¿Continuar trazabilidad de radicado anterior?",
          this.datoContAtnt,
          this.holding
        );
      }
    },
    cambio(data) {
      this.reg = Object.assign(this.reg, data);
      this.reg.monto = formatNumberMask_(this.reg.monto);
      this.focusInput(this.form_corres, "manejo");
    },

    async guardar() {
      try {
        let data = JSON.parse(JSON.stringify(this.reg));
        data.esta = data.manejo == 1 ? 4 : 1;
        data.fecha = this.formatFecha_(data.fecha, data.hora);
        data.otroAnexo = data.tipoAnexo == 6 ? data.otroAnexo || "" : "";
        data.monto = this.formatNumber_(data.monto);

        const RES = await this._postCorres({ data });
        if (RES.N1)
          this.CON851(
            "N1",
            "success",
            `Datos grabados correctamente`,
            null,
            this.enviarEmail
          );
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        this.onField();
        console.error(error);
      }
    },
    async enviarEmail() {
      try {
        const data = {
          id: this.reg.dep,
          propietario: this.reg.descripDeptoremi,
          anoLlave: this.reg.llave.anoLlave,
          cont: this.reg.llave.cont,
          destino: this.reg.correoDep,
          nom_empresa: this.USUARIO_GLOBAL.nombre,
        };
        const RES = await this._sendEmail({ data });
        if ("accepted" in RES)
          this.CON851(
            "N1",
            "success",
            `Correo enviado correctamente`,
            null,
            this.solicitarImpresion
          );
        RES.msg &&
          this.CON851(
            "N1",
            "error",
            `¡Error enviando el correo!`,
            null,
            this.abrirNovedad
          );
      } catch (error) {
        this.abrirNovedad();
        console.error(error);
      }
    },

    async editar() {
      try {
        let data = JSON.parse(JSON.stringify(this.reg));
        data.fecha = this.formatFecha_(data.fecha, data.hora);
        data.esta = data.esta;
        data.fechaModi = this.formatFecha_(moment().format("YYYY-MM-DD"));
        data.operModi = `${currentUser.llaveOper} - ${currentUser.nombre}`;
        data.monto = this.formatNumber_(data.monto);
        const RES = await this._putCorres({ data });
        if (RES.N1)
          return this.CON851(
            "N1",
            "success",
            `Datos modificados correctamente!`,
            null,
            this.solicitarImpresion
          );
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        this.onField();
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const RES = await this._deleteCorres({ llave: this.reg.llave });
        if (RES.N1)
          return this.CON851(
            "N1",
            "success",
            `Correspondencia borrada correctamente!`
          );
        RES.msg && this.CON851("N1", "error", `No se encontro correspondencia`);
      } catch (error) {
        console.error(error);
      }
    },
    solicitarImpresion() {
      this.CON851P("00", "info", "", this.generarImpresion, this.abrirNovedad);
    },
    async generarImpresion() {
      const data = {
        USUARIO: this.USUARIO_GLOBAL.nombre,
        ...this.reg,
      };
      await informeCORR201P(data);
      this.abrirNovedad();
    },
    openCON802() {
      this.offField();
      this.show_con802 = true;
    },
    async callbackCON802(item) {
      this.show_con802 = false;
      if (item) {
        this.reg.nit = item.codigo;
        this.reg.descripTer = item.descrip;
        return this.focusInput(this.form_corres, "deptoremi");
      }
      this.focusInput(this.form_corres, "nit");
    },
    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },
    callbackCOR868(item) {
      if (item) {
        this.show_cor868 = false;
        if (this.flag_radicados) {
          this.reg_ant.contAtnt = item.llaveBusqueda;
          this.reg_ant.contAtnt1 = item.contAtnt1;
          this.reg_ant.contAtnt2 = item.contAtnt2;
          this.reg_ant.contAtnt3 = item.contAtnt3;
          this.reg.proceden = item.proceden;
          this.reg.manejo = item.manejo;
          return this.focusInput(this.form_corres, "nit");
        } else {
          this.reg = item;
          return this.focusInput(this.form_corres, "manejo");
        }
      }
      this.show_cor868 = false;
      if (this.flag_radicados)
        return this.focusInput(this.form_corres, "contAtnt");
      this.focusInput(this.form_corres, "cont");
    },
    openCOR879() {
      this.offField();
      this.show_cor879 = true;
    },
    callbackCOR879(item) {
      this.show_cor879 = false;
      if (item) {
        this.reg.deptoremi = item.codigo;
        this.reg.descripDeptoremi = item.descripcion;
        return this.focusInput(this.form_corres, "tipoCorres");
      }
      this.focusInput(this.form_corres, "deptoremi");
    },

    openCOR867() {
      this.offField();
      this.show_cor867 = true;
    },
    callbackCOR867(item) {
      this.show_cor867 = false;
      if (item) {
        this.reg.tipoCorres = item.codigo;
        this.reg.descripTipco = item.descripcion;
        this.deadline();
        this.reg.diasTipco = item.dias;
        return this.focusInput(this.form_corres, "codAux");
      }
      this.focusInput(this.form_corres, "tipoCorres");
    },
    openCOR871() {
      this.offField();
      this.show_cor871 = true;
    },
    callbackCOR871(item) {
      this.show_cor871 = false;
      if (item) {
        this.reg.codAux = item.codigo;
        this.reg.descripAux = item.descripcion;
        return this.focusInput(this.form_corres, "descrip");
      }
      this.focusInput(this.form_corres, "codAux");
    },
    openCOR865() {
      this.offField();
      this.show_cor865 = true;
    },
    callbackCOR865(item) {
      this.show_cor865 = false;
      if (item) {
        this.reg.ser = item.codigo;
        this.reg.descripSer = item.descripcion;
        return this.focusInput(this.form_corres, "dep");
      }
      this.focusInput(this.form_corres, "ser");
    },
    openCOR866() {
      this.offField();
      this.show_cor866 = true;
    },
    callbackCOR866(item) {
      this.show_cor866 = false;
      if (item) {
        this.reg.dep = item.codigo;
        this.reg.responsableDep = item.responsable;
        return this.validarDep();
      }
      this.focusInput(this.form_corres, "dep");
    },
    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    abrirNovedad() {
      this.reg = getObjCorres();
      this.novedad_activa = true;
      this.flag_radicados = false;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
      if ([7, 8, 9].includes(data.acceso)) this.condicionesNovedad();
    },
  },
};
</script>
