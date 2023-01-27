<template>
  <v-dialog v-model="estado" persistent width="700">
    <v-card flat>
      <v-toolbar color="primary" class="white--text">
        <h3 class="mx-auto">VENTANA DE CONSULTA DE TIPO DE CORRESPONDENCIA.</h3>
        <v-btn icon dark @click="exitCOR867" class="botone">
          <v-icon>mdi-close-circle </v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="4" class="">
            <INPUT
              @next-action="nextStep(form_bus, $event, validarBusqueda)"
              :field="form_bus.busqueda"
              :reg="busqueda"
              @onChange="onChange"
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
  name: "COR867",
  mixins: [nextAction, global],
  components: { TABLE },

  data() {
    return {
      focus_table: false,

      busqueda: "",

      form_bus: {
        busqueda: {
          id: "busqueda",
          label: "Busqueda",
          value: "",
          max_length: "10",
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

      data_table: {
        columns: [
          {
            title: "Cod. tipco",
            body_conector: "codigo",
            cols: "3",
          },
          {
            title: "Descripción",
            body_conector: "descripcion",
            cols: "7",
          },
          {
            title: "Dias",
            body_conector: "dias",
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
      _getListaTipco: "tipco/getLista",
    }),
  },
  mounted() {
    this.consultaTipco();
    this.focus_table = true;
  },
  methods: {
    onChange(data) {
      this.reg[data.key] = data.value;
    },
    ...mapActions({
      _getTipcoF8: "tipco/_getTipcoF8",
    }),
    datoBusqueda() {
      this.focus_table = false;
      this.focusInput(this.form_bus, "busqueda");
    },
    validarBusqueda(val) {
      switch (val) {
        case "esc":
          this.exitCOR867();
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
    exitCOR867() {
      this.$emit("callbackEsc");
    },
    selectRow(item) {
      this.$emit("callBack", item);
    },
    async nextDataValidation(desde, cantidad, filtro) {
      await this._getTipcoF8({ desde, cantidad, filtro });
      this.f8.body = this._getListaTipco("lista").slice(0, 8);
    },
    async nextData(data) {
      let filtro = this.busqueda.busqueda;
      let f8 = this.f8;
      let cantidad = 9;
      let desde = 0;
      switch (data) {
        case ">":
          if (this._getListaTipco("lista").length === 9) {
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
    async consultaTipco() {
      let f8 = this.f8;
      let desde = 0;
      let filtro = "";
      let cantidad = 9;
      const RES = await this._getTipcoF8({ desde, cantidad, filtro });

      f8.headers = this.data_table.columns;
      f8.body = this._getListaTipco("lista").slice(0, 8);
    },
  },
};
</script>
