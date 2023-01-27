<template>
  <v-dialog v-model="estado" persistent>
    <v-card flat>
      <v-toolbar color="primary" class="white--text">
        <h3 class="mx-auto">VENTANA DE CONSULTA DE CORRESPONDENCIA</h3>
        <v-btn icon dark @click="exitCOR865" class="botone">
          <v-icon>mdi-close-circle </v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="3">
            <AUTOCOMPLETE
              @next-action="nextStep(form_bus, $event, validarFiltro)"
              :field="form_bus.filtro"
              :reg="busqueda"
              @onChange="(data) => (busqueda = data.value)"
            ></AUTOCOMPLETE>
          </v-col>
          <v-col cols="4">
            <INPUT
              @next-action="nextStep(form_bus, $event, validarBusqueda)"
              :field="form_bus.busqueda"
              :reg="busqueda"
              @onChange="(data) => (busqueda = data.value)"
            ></INPUT>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12">
            <TABLE
              :focus_table="focus_table"
              @escTable="datoBusqueda"
              @selectRow="selectRow"
              @nextData="nextData"
              :f8="f8"
            ></TABLE>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { nextAction } from "../../mixins/nextAction";
import { mapActions, mapGetters } from "vuex";
import { global } from "../../mixins/global";
import TABLE from "../GENERAL/DataTable.vue";

export default {
  name: "COR868",
  mixins: [nextAction, global],
  components: {
    TABLE,
  },
  data() {
    return {
      focus_table: false,
      busqueda: "",
      filtro: "",

      form_bus: {
        filtro: {
          id: "filtro",
          label: "Filtrar columna",
          items: [
            { id: " ", text: "Sin filtro" },
            { id: "llave", text: "Llave" },
            { id: "nit", text: "Tercero" },
            { id: "descripTipco", text: "Tipo correspondencia" },
            { id: "fecha", text: "Fecha" },
            { id: "oper", text: "Operador" },
            { id: "descripEsta", text: "Estado" },
          ],
          item_value: "id",
          disabled: true,
        },
        busqueda: {
          id: "busqueda",
          label: "Busqueda",
          max_length: "50",
          disabled: true,
        },
      },

      estado: true,
      f8: {
        estado: true,
        headers: [],
        body: [],
        nroPeticion: 0,
        buscar: "",
      },
      buscar: "",
      data_table: {
        columns: [
          {
            title: "LLave",
            body_conector: "llave",
            cols: "1",
          },
          {
            title: "Tercero",
            body_conector: "nit",
            cols: "2",
          },
          {
            title: "Tipco",
            body_conector: "descripTipco",
            cols: "3",
          },
          {
            title: "Fecha",
            body_conector: "fecha",
            cols: "2",
          },
          {
            title: "Operador",
            body_conector: "oper",
            cols: "2",
          },
          {
            title: "Estado",
            body_conector: "descripEsta",
            cols: "2",
          },
        ],
        rows: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      getLista: "corr/getLista",
    }),
  },
  mounted() {
    this.consultaSerco();
    this.focus_table = true;
  },
  methods: {

    ...mapActions({
      _getCorr868F8: "corr/_getCorr868F8",
    }),
    datoBusqueda() {
      this.focus_table = false;
      this.focusInput(this.form_bus, "filtro");
    },
    validarFiltro(val) {
      switch (val) {
        case "esc":
          this.exitCOR865();
          break;
        case "enter":
          this.focusInput(this.form_bus, "busqueda");
          break;
      }
    },
    validarBusqueda(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_bus, "filtro");
          break;
        case "enter":
          this.offField();
          this.nextData();
          setTimeout(() => {
            this.focus_table = true;
          }, 100);
          break;
      }
    },
    exitCOR865() {
      this.$emit("callbackEsc");
    },
    selectRow(item) {
      this.$emit("callBack", item);
    },
    async nextDataValidation(desde, cantidad, filtro) {
      let parametro = this.busqueda
      await this._getCorr868F8({ desde, cantidad, filtro, parametro });
      this.f8.body = this.getLista("lista").slice(0, 8);
    },
    async nextData(data) {
      let filtro = this.busqueda;
      let f8 = this.f8;
      let cantidad = 9;
      let desde = 0;
      switch (data) {
        case ">":
          if (this.getLista("lista").length === 9) {
            f8.nroPeticion += 1;
            desde = cantidad * f8.nroPeticion - 1 * f8.nroPeticion;
            this.nextDataValidation(desde, cantidad, filtro);
          }
          break;
        case "<":
          desde = cantidad * (f8.nroPeticion - 1) - 1 * (f8.nroPeticion - 1);
          if (desde >= 0) {
            f8.nroPeticion -= 1;
            this.nextDataValidation(desde, cantidad, filtro);
          }
          break;
        case "filtro":
          this.nextDataValidation(desde, cantidad, filtro);
          break;
        default:
          this.nextDataValidation(desde, cantidad, filtro);
          break;
      }
    },
    async consultaSerco() {
      let f8 = this.f8;
      let desde = 0;
      let filtro = "";
      let cantidad = 9;
      const RES = await this._getCorr868F8({ desde, cantidad, filtro });
      f8.headers = this.data_table.columns;
      f8.body = this.getLista("lista").slice(0, 8);
    },
  },
};
</script>
