<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row">
        <v-card elevation="5" width="1800" class="mx-3">
          <v-col cols="2">
            <INPUT
              @next-action="nextStep(form, $event, validarBusqueda)"
              :field="form.busqueda"
              @onChange="((data)=>{
                busqueda = data.value
              })"
              :reg="busqueda"
            ></INPUT>
          </v-col>
        </v-card>

        <v-col cols="12" sm="12" md="12" xs="12" class="input-col mt-2">
          <v-data-table
            class="elevation-16"
            :headers="headers"
            :items="desserts"
            :search="busqueda"
          >
            <v-col
              cols="12"
              sm="3"
              md="3"
              xs="3"
              class="input-col"
              v-if="!this.desserts[0]"
            >
            </v-col>
            <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado }}</v-chip
              >
            </template>
            <template v-slot:no-data>
              <lottie-animation
                :animationData="require('../../assets/image/no_found.json')"
                style="height: 230px; width: 300px"
                class="text-center mx-auto"
                :autoPlay="true"
                :loop="true"
                :speed="2"
                ref="anim"
              />
              <h1>No existen datos</h1>
            </template>

            <v-row justify="center">
              <v-col cols="12"> </v-col>
            </v-row>

            <h2 class="text-center mt-5">¡Ups, No existen registros!</h2>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <CON851
      @cancelar="cerrarDialogo"
      @salirEsc="cerrarDialogo"
      @confirmar="confirmar"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import LottieAnimation from "lottie-web-vue";
import { global } from "../../mixins/global";

/* index vuex */
import index from "../../store/index";

export default {
  mixins: [nextAction, global],
  components: { LottieAnimation },

  data() {
    return {
      titulo: "5.1 CORRESPONDENCIA INFORMATIVO",

      form: {
        busqueda: {
          id: "busqueda",
          label: "Buscar",
          max_length: "20",
        },
      },
      busqueda: "",
      headers: [
        {
          text: "Radicado",
          align: "start",
          sortable: false,
          value: "cont",
        },
        { text: "Fecha", value: "fecha" },
        { text: "Hora", value: "hora" },
        { text: "Tipo", value: "tipo" },
        { text: "Dependencia", value: "depen" },
        { text: "Estado", value: "estado" },
        { text: "Fecha de Vence", value: "fecha_vence" },
        { text: "Fecha de Respuesta", value: "fecha_respuesta" },
        { text: "Dias transcurridos", value: "dias_trans" },
      ],
      desserts: [],
    };
  },

  computed: {
    ...mapState({ isLoading: "isLoading" }),

    ...mapGetters({
      get: "formularios/get",
      _getListaMotcn: "motcn/getLista",
    }),
    state_body() {
      if (!this.desserts[0]) return true;
      else return false;
    },
  },

  mounted() {
    this.getData();
    this.focusInput(this.form, "busqueda", "busqueda");
  },

  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getImpresion: "impresion301/_getImpresion",
    }),

    getColor(estado) {
      if (estado == "EN TRAMITE") return "orange";
      else if (estado == "VENCIDA") return "red";
      else if (estado == "RESUELTA") return "green";
      else if (estado == "PRORROGADA") return "green";
      else if (estado == "ANULADO") return "#cc9900";
      else return "";
    },

    async getData() {
      const datos_envio = {
        nit: "99",
        dep: "**",
        estado: "**",
        tipoCorr: "**",
        jornada: "**",
        proceden: "2",
        manejo: "**",
        fechaIni: "2021-01-14T00:00:00.000Z",
        fechaFin: "2023-12-22T00:00:00.000Z",
      };
      const RES = await this._getImpresion(datos_envio);
      index.commit("isLoading", null, { root: true });

      const filter_res = RES.map((val) => {
        return {
          cont: val.cont,
          fecha: val.fecha.slice(0, 10),
          hora: val.fecha.slice(12, 16),
          tipo: val.manejoR,
          depen: val.descripSerco,
          estado: val.estaR,
          fecha_vence:
            val.fecha_vence == null ? "" : val.fecha_vence.slice(0, 10),
          fecha_respuesta:
            val.fechaRespuesta == null ? "" : val.fechaRespuesta.slice(0, 10),
          dias_trans: `${val.dias_vence}${val.diasTipc}`,
        };
      }).filter((val) => {
        return val.tipo == "INFORMATIVO";
      });
      this.desserts = filter_res;
    },

    async confirmar() {
      try {
        let dialogType = this.get("dialogType");
        switch (dialogType) {
          case "salir":
            this.$router.push("/Menu-Principal");
            break;
          case "done":
            break;
        }
        this.firstField(this.form);
      } catch (error) {
        console.error(error);
      }
    },

    cancelarAlerta() {
      setTimeout(() => {
        this.firstFieldFree(this.form);
      }, 100);
      this.cerrar_CON851();
    },

    cerrarDialogo() {
      this.cerrar_CON851();
      this.focusInput(this.form, null, "busqueda");
    },

    validarBusqueda(val) {
      switch (val) {
        case "esc":
          this.CON851("PNZ", "warning", "¿Esta seguro que desea salir?", "P");

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
  },
};
</script>
