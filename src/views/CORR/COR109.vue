<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row pt-10">
        <v-col cols="12" sm="12" md="12" xs="12">
          <div class="elevation-12">
            <v-sheet class="elevation-12 mb-16">
              <v-toolbar flat>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="$refs.calendar.prev()"
                >
                  <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="$refs.calendar.next()"
                >
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
              </v-toolbar>
              <v-calendar
                ref="calendar"
                v-model="value"
                :events="events"
                :event-overlap-threshold="30"
                @click:date="opcionDia"
                @change="getEvents"
              ></v-calendar>
            </v-sheet>
          </div>
        </v-col>
        <v-dialog v-model="flag_dia" width="700" persistent>
          <v-toolbar color="primary">
            <h1 class="white--text">{{ title_novedad }}</h1>
            <v-spacer></v-spacer>
            <v-btn fav icon @click="flag_dia = false">
              <v-icon class="botone" color="white"
                >mdi-close-circle</v-icon
              ></v-btn
            >
          </v-toolbar>
          <v-card>
            <v-row justify="start" align="center" class="input-row pt-10">
              <v-col cols="12" sm="5" md="5" xs="5" class="input-col">
                <FECHA
                  @next-action="nextStep(form_dia_n_habil, $event)"
                  :field="form_dia_n_habil.date"
                  :reg="reg_dia_n_habil"
                />
              </v-col>
              <v-col cols="12" sm="7" md="7" xs="7" class="input-col">
                <INPUT
                  @next-action="
                    nextStep(form_dia_n_habil, $event, datoDescripcion)
                  "
                  :field="form_dia_n_habil.descripcion"
                  :reg="reg_dia_n_habil"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
                <div class="text-end">
                  <v-btn
                    v-if="this.novedad != '7'"
                    color="error"
                    @click="(novedad = 9), solicitarAccion()"
                    class="ma-5 botone"
                    >Eliminar</v-btn
                  >
                  <v-btn
                    color="success"
                    @click="solicitarAccion()"
                    class="ma-5 botone"
                    >Aceptar</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
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
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <COR869
      v-if="show_cor869"
      @callBack="callbackCOR869"
      @callbackEsc="callbackCOR869"
    />
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import COR869 from "../../components/COR/COR869.vue";
import {
  getObjectDNHABIL,
  getObjectDNHABIL_,
} from "../../fuentes/correspondencia/regDNHABIL";

export default {
  name: "COR109",
  mixins: [nextAction, global],
  components: { COR869 },
  data() {
    return {
      titulo: "1.9 ACTUALIZA DIAS FERIADOS",
      novedad_activa: false,

      novedad: "",
      flag_dia: false,

      show_cor869: false,

      form_dia_n_habil: getObjectDNHABIL_(),
      reg_dia_n_habil: getObjectDNHABIL(),

      value: "",
      events: [],
      colors: ["primary"],
    };
  },

  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaMotcn: "motcn/getLista",
    }),
    title_novedad() {
      return this.novedad == "7"
        ? "Crear dia feriado"
        : "Modificar Dia feriado";
    },
  },

  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getDiasNoHabil: "dianhabil/_getDiasNoHabil",
      _editDiaNoHabil: "dianhabil/_editDiaNoHabil",
      _getDiaNoHabil: "dianhabil/_getDiaNoHabil",
      _newDiaNoHabil: "dianhabil/_newDiaNoHabil",
      _delDiaNoHabil: "dianhabil/_delDiaNoHabil",
    }),

    async getEvents() {
      const events = [];
      const RES = await this._getDiasNoHabil();
      console.log("dias no habil: ", RES);
      if (RES?.length > 0) {
        for (let i = 0; i < RES.length; i++) {
          events.push({
            name: RES[i].descripcion,
            start: RES[i].date.slice(0, 10),
            end: "",
            color: "primary",
            timed: true,
          });
        }
      }

      this.events = events;
    },
    async opcionDia({ date }) {
      this.novedad = "";
      const RES = await this._getDiaNoHabil({ date });
      if (RES.date) {
        this.CON851P(
          "PNZ",
          "info",
          `¿Ya existe el dia feriado ${date}, desea modificarlo?`,
          () => {
            this.flag_dia = true;
            this.novedad = "8";
            this.reg_dia_n_habil.date = RES.date;
            this.reg_dia_n_habil.descripcion = RES.descripcion;
          },
          this.cerrar_CON851P
        );
      } else if (RES.msg) {
        this.CON851P(
          "PNZ",
          "info",
          `¿Desea crear el dia feriado ${date}?`,
          () => {
            this.reg_dia_n_habil = getObjectDNHABIL();
            this.flag_dia = true;
            this.reg_dia_n_habil.date = date;
            this.novedad = "7";
          },
          this.cerrar_CON851P
        );
      }
    },

    solicitarAccion() {
      this.novedad == 7 &&
        this.CON851P(
          "PNZ",
          "info",
          "¿Estas seguro de crear este dia feriado",
          this.guardar,
          this.cerrar_CON851P
        );
      this.novedad == 8 &&
        this.CON851P(
          "PNZ",
          "info",
          "¿Estas seguro de editar este dia feriado",
          this.editar,
          this.cerrar_CON851P
        );
      this.novedad == 9 &&
        this.CON851P(
          "PNZ",
          "info",
          "¿Estas seguro de eliminar este dia feriado",
          this.eliminar,
          this.cerrar_CON851P
        );
    },

    async confirmar() {
      this.cerrar_CON851();
      this.setDialogType("done");
      this.novedad.acceso == 7 && this.guardar();
      this.novedad.acceso == 8 && this.editar();
      this.novedad.acceso == 9 && this.eliminar();
    },
    cancelar() {
      this.onFieldFree();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done"
        ? this.abrirNovedad()
        : this.onFieldFree();
    },

    datoDescripcion(key) {
      switch (key) {
        case "esc":
          return this.focusInput(null, null, "descripcion");
        case "enter":
          if (this.reg_dia_n_habil.descripcion == "") {
            this.CON851("02", "info");
          } else if (this.reg_dia_n_habil.descripcion != "") {
            this.solicitarAccion();
          }
      }
    },

    async guardar() {
      try {
        const RES = await this._newDiaNoHabil({ ...this.reg_dia_n_habil });
        RES.N1 &&
          this.CON851(
            "N1",
            "success",
            `Fecha grabada correctamente`,
            null,
            () => {
              this.flag_dia = false;
              this.getEvents();
            }
          );
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      try {
        const RES = await this._editDiaNoHabil({ data: this.reg_dia_n_habil });
        RES.N1 &&
          this.CON851(
            "N1",
            "success",
            `Fecha modificada correctamente!`,
            null,
            () => {
              this.flag_dia = false;
              this.getEvents();
            }
          );
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const RES = await this._delDiaNoHabil({
          date: this.reg_dia_n_habil.date,
        });
        RES.N1 &&
          this.CON851(
            "N1",
            "success",
            `Fecha borrada correctamente!`,
            null,
            () => {
              this.flag_dia = false;
              this.getEvents();
            }
          );
        RES.msg && this.CON851("N1", "error", `No se encontraron fechas`);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {},
};
</script>
