<template>
  <v-container fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row mt-4">
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event, datoAnoLlave)"
            :field="form_corres.anoLlave"
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
            :reg="reg.cont"
            @onChange="
              (data) => {
                reg.llave[data.key] = data.value;
              }
            "
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.manejo"
            :reg="reg.manejo"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.proceden"
            :reg="reg.proceden"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
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
          />
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.descrip"
            :reg="reg.descrip"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
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
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fol"
            :reg="reg.fol"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fold"
            :reg="reg.fold"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.anex"
            :reg="reg.anex"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.tipoAnexo"
            :reg="reg.tipoAnexo"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.nroFact"
            :reg="reg.nroFact"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.monto"
            :reg="reg.monto"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fechaFact"
            :reg="reg.fechaFact"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <FECHA
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.fechaEntre"
            :reg="reg.fechaFact"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.nroGuia"
            :reg="reg.nroGuia"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_corres, $event)"
            :field="form_corres.persentre"
            :reg="reg.persentre"
            @onChange="onChange"
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
          <AUTOCOMPLETE
            :field="form_corres.esta"
            :reg="reg.esta"
            @onChange="onChange"
          />
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
import { global } from "../../mixins/global";

import COR868 from "../../components/COR/COR868.vue";

export default {
  name: "COR205",
  mixins: [nextAction, global],
  components: { COR868 },
  data() {
    return {
      titulo: `2.5 Enviar correspondecias pendientes`,
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
    onChange(data) {
      this.reg[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _sendEmail: "envioemail/_sendEmail",
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
        this.reg = Object.assign(this.reg, RES);
        this.solicitarEnvioCorreo();
      } else this.CON851("N1", "error", `Algo salio mal, intentelo de nuevo`);
    },
    solicitarEnvioCorreo() {
      this.CON851P(
        "PNZ",
        "info",
        "¿Enviar correspondencia por correo?",
        this.enviarEmail,
        () => {
          this.focusInput(this.form_corres, "cont");
        }
      );
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
        RES.msg && this.CON851("N1", "error", `¡Error enviando el correo!`);
      } catch (error) {
        this.abrirNovedad();
        console.error(error);
      }
    },
    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },
    callbackCOR868(item) {
      this.show_cor868 = false;
      if (item) {
        this.reg = item;
        this.reg.hora = this.reg.hora.padStart(5, "0");
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
