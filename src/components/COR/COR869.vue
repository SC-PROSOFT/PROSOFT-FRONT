<template>
  <v-dialog v-model="estado" persistent>
    <v-card flat heigth="900">
      <v-toolbar color="primary" class="white--text">
        <h3 class="mx-auto">DIAS FERIADOS</h3>
        <v-btn icon dark @click="exitCOR869" class="botone">
          <v-icon>mdi-close-circle </v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="4" class="">
            <INPUT
              @next-action="nextStep(form, $event, validarBusqueda)"
              :field="form.busqueda"
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
  name: "COR869",
  mixins: [nextAction, global],
  components: {
    TABLE,
  },
  data() {
    return {
      focus_table: false,

      estado: true,

      busqueda: "",
      form: {
        busqueda: {
          id: "busqueda",
          label: "Busqueda",
          value: "",
          max_length: "50",
          disabled: true,
        },
      },

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
            title: "Fecha",
            body_conector: "date",
            cols: "6",
          },
          {
            title: "Descripción",
            body_conector: "descripcion",
            cols: "6",
          },
        ],
        rows: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      getLista: "dianhabil/getLista",
    }),
  },
  mounted() {
    this.consultaDepco();
    this.focus_table = true;
  },
  methods: {
    ...mapActions({
      _getDiaNoHabilF8: "dianhabil/_getDiaNoHabilF8",
    }),
    async consultaDepco() {
      let f8 = this.f8;
      let desde = 0;
      let cantidad = 9;
      let filtro = "";
      const RES = await this._getDiaNoHabilF8({ desde, cantidad, filtro });
      f8.headers = this.data_table.columns;
      f8.body = this.getLista("lista").slice(0, 8);
    },
    datoBusqueda() {
      this.focus_table = false;
      this.focusInput(this.form, "busqueda");
    },
    validarBusqueda(val) {
      switch (val) {
        case "esc":
          this.exitCOR869();
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
    exitCOR869() {
      this.$emit("callbackEsc");
    },
    selectRow(item) {
      this.$emit("callBack", item);
    },
    async nextDataValidation(desde, cantidad, filtro) {
      await this._getDiaNoHabilF8({ desde, cantidad, filtro });
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
  },
};
</script>
