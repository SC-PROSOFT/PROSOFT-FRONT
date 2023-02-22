<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="10">
          <v-alert
            color="primary"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-information"
          >
            Digite el numero de radicado y precione f2 para realizar la busqueda
            del anexo.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_serco, $event, datoSerco)"
            @abrirF8="openCOR865"
            :field="form_serco.codigo"
            :reg="reg_serco.codigo"
            @onChange="onChange"
          ></INPUT>
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
    ></CON851>
    <COR865
      v-if="show_cor865"
      @callBack="callbackCOR865"
      @callbackEsc="callbackCOR865"
    />
  </v-container>
</template>
<script>
import {
  getObjRegSerco_,
  getObjRegSerco,
} from "../../fuentes/correspondencia/regSerco";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import COR865 from "../../components/COR/COR865.vue";

export default {
  name: "COR503",
  mixins: [nextAction, global],
  components: { COR865 },
  data() {
    return {
      titulo: "5.3 Impresion de anexos de correspondencia",
      show_cor865: false,
      form_serco: getObjRegSerco_(),
      reg_serco: getObjRegSerco(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaSerco: "serco/getLista",
    }),
  },
  methods: {
    onChange(data) {
      this.reg_serco[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _delSerco: "serco/_delSerco",
      _getSerco: "serco/_getSerco",
      _newSerco: "serco/_newSerco",
      _editSerco: "serco/_editSerco",
    }),
    openCOR865() {
      this.offField();
      this.show_cor865 = true;
    },
    callbackCOR865(item) {
      if (item) {
        this.reg_serco = item;
      }
      this.show_cor865 = false;
      this.focusInput(this.form_serco, "codigo");
    },
  },
  mounted() {
    setTimeout(() => {
      this.focusInput(this.form_serco, "codigo");
    }, 100);
  },
};
</script>
