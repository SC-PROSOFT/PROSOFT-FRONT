<template>
  <v-dialog v-model="estado" persistent>
    <v-card>
      <v-toolbar color="primary" class="white--text">
        <h3 class="mx-auto">VENTANA DE CONSULTA AUX TIPO CORRESPONDENCIA.</h3>
        <v-btn icon dark @click="exitCOR871" class="botone">
          <v-icon>mdi-close-circle </v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="4" class="">
            <INPUT
              @next-action="nextStep(form_bus, $event, validarBusqueda)"
              :field="form_bus.busqueda"
              :reg="busqueda.busqueda"
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
  name: "COR871",
  mixins: [nextAction, global],
  components: { TABLE },
  data() {
    return {
      focus_table: false,
      busqueda: {
        busqueda: "",
      },
      form_bus: {
        busqueda: {
          id: "busqueda",
          label: "Busqueda",
          value: "",
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
            title: "Codigo",
            body_conector: "codigo",
            cols: "3",
          },
          {
            title: "Descripción",
            body_conector: "descripcion",
            cols: "5",
          },
          {
            title: "Descripción tipo correspondencia",
            body_conector: "descripCodSerco",
            cols: "4",
          },
        ],
        rows: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      getLista: "auxtip/getLista",
    }),
  },
  mounted() {
    this.consultaUnifun();
    this.focus_table = true;
  },
  methods: {
    onChange(data) {
      this.reg_dep[data.key] = data.value;
    },
    ...mapActions({
      _getAuxcoF8: "auxtip/_getAuxcoF8",
    }),
    datoBusqueda() {
      this.focus_table = false;
      this.focusInput(this.form_bus, "busqueda");
    },
    validarBusqueda(val) {
      switch (val) {
        case "esc":
          this.exitCOR871();
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
    exitCOR871() {
      this.$emit("callbackEsc");
    },
    selectRow(item) {
      this.$emit("callBack", item);
    },
    async nextDataValidation(desde, cantidad, filtro) {
      await this._getAuxcoF8({ desde, cantidad, filtro });
      this.f8.body = this.getLista("lista").slice(0, 8);
    },
    async nextData(data) {
      let filtro = this.busqueda.busqueda;
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
    async consultaUnifun() {
      let f8 = this.f8;
      let desde = 0;
      let filtro = "";
      let cantidad = 9;
      const RES = await this._getAuxcoF8({ desde, cantidad, filtro });
      f8.headers = this.data_table.columns;
      f8.body = this.getLista("lista").slice(0, 8);
    },
  },
};
</script>
