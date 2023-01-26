<template>
  <v-container fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row mt-4">
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnoLlave)"
            :field="form_corres.anoLlave"
            :reg="reg.llave"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnoCont)"
            @abrirF8="openCOR868"
            :field="form_corres.cont"
            :reg="reg.llave"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.manejo"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.proceden"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fecha"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.hora"
            :reg="reg"
          />
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.nit"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card :field="form_corres.descripTer" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.deptoremi"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripDeptoremi" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.tipoCorres"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripTipco" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card :field="form_corres.diasTipco" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <data-card :field="form_corres.fechaCau" :reg="reg" />
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.codAux"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripAux" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.descrip"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.ser"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.descripSer" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.dep"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_corres.responsableDep" :reg="reg" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fol"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fold"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.anex"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.tipoAnexo"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.nroFact"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.monto"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fechaFact"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fechaEntre"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.nroGuia"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.persentre"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <TEXTAREA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.observ"
            :reg="reg"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <AUTOCOMPLETE :field="form_corres.esta" :reg="reg" />
        </v-col>
      </v-row>
    </v-card>
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
  </v-container>
</template>
<script>
import {
  getObjCorres_,
  getObjCorres,
} from "../../fuentes/correspondencia/regObjtCorres";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { informeCORR201P } from "../../Pdf/index";
import { global } from "../../mixins/global";
import COR868 from "../../components/COR/COR868.vue";

export default {
  name: "COR202",
  mixins: [nextAction, global],
  components: { COR868 },
  data() {
    return {
      titulo: `2.2 Recepción  Correspondencia`,
      show_cor868: false,

      reg: getObjCorres(),
      form_corres: getObjCorres_(),
    };
  },
  computed: {
    ...mapGetters({ get: "formularios/get" }),
  },
  mounted() {
    this.buscarUltimaCorres();
  },
  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getUltCorr: "corr/_getUltCorr",
      _getCorr: "corr/_getCorr",
    }),
    async buscarUltimaCorres() {
      try {
        const RES = await this._getUltCorr();
        if ("llave" in RES) {
          this.reg.llave.anoLlave = RES.llave.anoLlave;
          this.reg.llave.cont = RES.llave.cont;
          this.reg.fecha = RES.fechaR;
          this.reg.hora = RES.hora;
          this.firstField(this.form_corres);
        } else if ("msg" in RES) {
          this.CON851("PNZ", "info", "No se encontro correspondencia");
        }
      } catch (error) {
        console.error(error);
      }
    },
    datoAnoLlave(key) {
      switch (key) {
        case "esc":
          return this.validarSalir();
        case "enter":
          return this.focusInput(this.form_corres, "cont");
      }
    },
    datoAnoCont(val) {
      !val && this.focusInput(this.form_corres, "cont");
      switch (val) {
        case "esc":
          return this.focusInput(this.form_corres, "anoLlave");
        case "enter":
          return this.leerCorrespondecia();
      }
    },
    async leerCorrespondecia() {
      const RES = await this._getCorr({ llave: this.reg.llave });
      if (RES.msg) this.CON851("N1", "info", `La correspondencia no existe`);
      else if (RES.llave) {
        console.log("my res: ", RES);
        

        this.reg = RES;
        this.solicitarImpresion();
      } else this.CON851("N1", "error", `Algo salio mal, intentelo de nuevo`);
    },
    solicitarImpresion() {
      this.CON851P("00", "info", "", this.generarImpresion, () => {
        this.focusInput(this.form_corres, "cont");
      });
    },
    async generarImpresion() {
      console.log("my reg: ", this.reg);
      const data = {
        USUARIO: this.USUARIO_GLOBAL.nombre,
        ...this.reg,
      };
      await informeCORR201P(data);
      this.focusInput(this.form_corres, "cont");
    },
    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },
    callbackCOR868(item) {
      this.show_cor868 = false;
      if (item) {
        this.reg = item;
        this.show_cor868 = false;
        return this.leerCorrespondecia();
      }
      this.focusInput(this.form_corres, "cont");
    },
    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    validarSalir() {
      this.CON851P(
        "PNZ",
        "warning",
        "¿Seguro que desea volver al menu principal?",
        () => {
          this.$router.push("/Menu-Principal");
        },
        () => {
          this.focusInput(this.form_corres, "anoLlave");
        }
      );
    },
  },
};
</script>
