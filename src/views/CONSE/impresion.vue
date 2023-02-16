<template>
  <v-container calss="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row">
        <v-card elevation="5" width="1800" class="mx-3">
          <v-col cols="2">
            <INPUT
              @next-action="nextStep(form, $event)"
              :field="form.busqueda"
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-col align-self="baseline">
                <v-col>
                  <v-row class="left">
                    <v-icon
                      class="mr-2"
                      alignith="center"
                      @click="imprimir_conse(item)"
                    >
                      mdi-cloud-print
                    </v-icon>
                  </v-row>
                </v-col>
              </v-col>
            </template>
            <v-col
              cols="12"
              sm="3"
              md="3"
              xs="3"
              class="input-col"
              v-if="!this.desserts[0]"
            ></v-col>
            <!-- <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado }}
              </v-chip>
            </template> -->
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
              <v-col cols="12"></v-col>
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
import { global } from "../../mixins/global";
import { nextAction } from "../../mixins/nextAction";
import { mapState } from "vuex";
import LottieAnimation from "lottie-web-vue";
/* INDEX VUEX */
import index from "../../store/index";

export default {
  name: "Impresion",
  mixins: [nextAction, global],
  components: { LottieAnimation },

  data() {
    return {
      titulo: "4.Imprimir Consentimientos",
      form: {
        busqueda: {
          id: "busqueda",
          label: "Buscar",
          max_length: "20",
        },
      },

      headers: [
        { text: "Codigo", value: "reg_coninf.cod" },
        { text: "Fecha", value: "reg_coninf.llave.fecha" },
        { text: "Hora", value: "reg_coninf.llave.hora" },
        { text: "Descripcion", value: "reg_coninf.datos_encab.descrip" },
        {
          text: "Imprimpir",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      desserts: [
        {
          reg_coninf: {
            codigo: "5454",
            cod: "123",
            llave: {
              fecha: "12/05/2022",
              hora: "11:55",
            },
            datos_encab: {
              descrip: "Consentimientos",
            },
          },
        },
      ],
    };
  },

  computed: {
    ...mapState({ isLoading: "isLoading" }),
  },

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {},
    async imprimir_conse(data) {
      console.log("Estamos Editando", data);
    },
  },
};
</script>
