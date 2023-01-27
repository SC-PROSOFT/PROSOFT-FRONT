<template>
    <v-dialog v-model="estado" persistent width="700">
      <v-card falt>
        <v-toolbar color="primary" class="white--text">
          <h3 class="mx-auto">VENTANA DE TERCEROS</h3>
          <v-btn icon dark @click="exitCORTerce" class="botone">
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
    name: "CORterce",
    mixins: [nextAction, global],
  
    components: {
      TABLE,
    },
  
    props: {
      field: String,
    },
  
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
              title: "Codigo",
              body_conector: "codigo",
              cols: "3",
            },
            {
              title: "Actividad",
              body_conector: "actividad",
              cols: "4",
            },
            {
              title: "Descripción",
              body_conector: "descrip",
              cols: "5",
            },
          ],
          rows: [],
        },
      };
    },
    computed: {
      ...mapGetters({
        get: "formularios/get",
        getlista: "terce/getLista",
      }),
    },
    mounted() {
      this.consultaTerce();
      this.focus_table = true;
    },
    methods: {
      ...mapActions({
        _getTerceF8: "terce/_getTerceF8",
      }),
      datoBusqueda() {
        this.focus_table = false;
        this.focusInput(this.form_bus, "busqueda");
      },
      validarBusqueda(val) {
        switch (val) {
          case "esc":
            this.exitCORTerce();
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
      exitCORTerce() {
        this.$emit("callbackEsc");
      },
      selectRow(item) {
        this.$emit("callBack", item);
      },
      async nextDataValidation(desde, cantidad, filtro) {
        const RES = await this._getTerceF8({
          desde,
          cantidad,
          filtro,
        });
        this.f8.body = this.getlista("lista").slice(0, 8);
      },
      async nextData(data) {
        let filtro = this.busqueda;
        let f8 = this.f8;
        let cantidad = 9;
        let desde = 0;
        switch (data) {
          case ">":
            if (this.getlista("lista").length === 9) {
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
      async consultaTerce() {
        let f8 = this.f8;
        let desde = 0;
        let filtro = "";
        let cantidad = 9;
        const RES = await this._getTerceF8({
          desde,
          cantidad,
          filtro,
        });
        f8.headers = this.data_table.columns;
        f8.body = this.getlista("lista").slice(0, 8);
      },
    },
  };
  </script>
  <style>
  #efe8 {
    transition: 1000ms;
    z-index: -100;
  }
  </style>
  