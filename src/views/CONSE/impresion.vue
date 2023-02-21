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
              <v-row>
                <v-col align-self="baseline">
                  <v-icon align="right" @click="imprimir_conse(item)">
                    mdi-cloud-print
                  </v-icon>
                </v-col>
              </v-row>
            </template>
            <v-col
              cols="12"
              sm="3"
              md="3"
              xs="3"
              class="input-col"
              v-if="!this.desserts[0]"
            ></v-col>
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
      busqueda: "",

      headers: [
        { text: "Codigo", value: "reg_coninf.cod", align: "center" },
        { text: "Fecha", value: "reg_coninf.llave.fecha", align: "center" },
        {
          text: "Hora",
          value: "reg_coninf.llave.hora",
          align: "justify-between",
        },
        {
          text: "Descripcion",
          value: "reg_coninf.datos_encab.descrip",
          align: "center",
        },
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
            cod: "HIC001",
            llave: {
              fecha: "12/05/2022",
              hora: "11:55",
            },
            datos_encab: {
              descrip: "Consentimientos",
            },
          },
        },
        {
          reg_coninf: {
            codigo: "5454",
            cod: "HIC002",
            llave: {
              fecha: "12/05/2022",
              hora: "11:55",
            },
            datos_encab: {
              descrip: "Consentimientos",
            },
          },
        },
        {
          reg_coninf: {
            codigo: "5454",
            cod: "HIC003",
            llave: {
              fecha: "12/05/2022",
              hora: "11:55",
            },
            datos_encab: {
              descrip: "Consentimientos",
            },
          },
        },
        {
          reg_coninf: {
            codigo: "5454",
            cod: "HIC004",
            llave: {
              fecha: "12/05/2022",
              hora: "11:55",
            },
            datos_encab: {
              descrip: "Consentimientos",
            },
          },
        },
        {
          reg_coninf: {
            codigo: "5454",
            cod: "HIC005",
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
      datos_sesion: {
        admi: "ADMI",
        cod_acomp: "",
        cod_prof: "0017329215",
        llave_hc: "00000000000000101000019",
        modulo: "HIC",
        parentesco: "",
      },
      reg_hc: {
        cierre: {
          estado: "1",
          fact: "000000",
          temporal: "0",
        },
        descrip_med: "BOHORQUEZ CASTAÑO GABRIEL",
        fecha: "20230210",
        hora: "1545",
        llave: "00000000000000101000019",
        med: "0017329215",
        motiv: "EXAMEN DE PRE-INGRESO",
        oper_elab: "ADMI",
        rips: [
          {
            cod: "",
            descrip: "",
          },
        ],
        serv: "02",
        unid_edad: "A",
        vlr_edad: "028",
      },
      reg_od: {},

      reg_prof: {
        atiende: "2",
        cod: "0017329215",
        descrip: "BOHORQUEZ CASTAÑO GABRIEL",
        descrip_atiende: "MEDICO GENERAL",
      },
    };
  },
  mounted() {
    this.datos_sesion = this.datos_sesion;
  },

  computed: {
    ...mapState({ isLoading: "isLoading" }),
  },

  watch: {},

  created() {
    this.datos_sesion;
    console.log("datos_sesion create", this.datos_sesion);
    switch (this.datos_sesion.modulo) {
      case "HIC":
        this.get_hc();

        break;

      default:
        break;
    }
  },

  methods: {
    async get_hc() {
      this.datos_sesion.llave_hc;
      this.reg_hc = this.reg_hc;
      console.log("get_hc", this.datos_sesion.llave_hc);
      this.get_consen();
    },
    async get_consen() {
      this.reg_hc;
      console.log("get_conce", this.reg_hc);
    },

    async imprimir_conse(consen) {
      this.reg_prof;
      let medico = this.reg_prof.cod;
      let llave = consen.reg_coninf.llave
      this.impresion({})
      console.log(this.reg_prof, "reg_prof");
      console.log(llave, "llave");
      console.log(medico, "medico");
    },
  },
};
</script>
