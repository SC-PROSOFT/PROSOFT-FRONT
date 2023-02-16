<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row">
        <v-card elevation="5" width="1800" class="mx-3">
          <v-row justify="space-between" align="center" class="input-row">
            <v-col cols="12" sm="2" md="2" xs="2">
              <INPUT
                @next-action="nextStep(form, $event, validarBusqueda)"
                :field="form.busqueda"
                @onChange="
                  (data) => {
                    busqueda = data.value;
                  }
                "
                :reg="busqueda"
              ></INPUT>
            </v-col>
            <v-col cols="12" sm="1" md="1" xs="1">
              <v-btn @click="createMaes()" class="ml-5" color="primary" dark>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
            ></v-col>
            <template v-slot:[`item.estado`]="{ item }">
              <div class="d-flex justify-center">
                <v-switch
                  @click="estadoItem(item)"
                  v-model="item.estado"
                  flat
                  right
                ></v-switch>
              </div>
            </template>
            <template v-slot:top>
              <v-dialog v-model="dialog" max-width="800px" persistent>
                <v-card>
                  <v-card-title>
                    <span class="title">{{ maesItem.descrip }}</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-text-field
                            v-model="maesItem.codigo"
                            label="Código"
                            maxlength="15"
                            autofocus
                            flat
                            outlined
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="9">
                          <v-text-field
                            v-model="maesItem.descrip"
                            label="Descripción"
                            maxlength="200"
                            autofocus
                            flat
                            outlined
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            v-model="maesItem.aprobo"
                            label="Aprobado por"
                            maxlength="25"
                            flat
                            outlined
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-menu
                            v-model="calendarioFechaAprobo"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="maesItem.fechaAprob"
                                label="Fecha de aprobación"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                flat
                                outlined
                                hide-details
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="maesItem.fechaAprob"
                              @input="calendarioFechaAprobo = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            v-model="maesItem.reviso"
                            counter="25"
                            label="Revisado por"
                            maxlength="25"
                            flat
                            outlined
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-menu
                            v-model="calendarioFechaReviso"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="maesItem.fechaAct"
                                label="Fecha de actualización"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                flat
                                outlined
                                hide-details
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="maesItem.fechaAct"
                              @input="calendarioFechaReviso = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="maesItem.version"
                            label="Versión"
                            flat
                            outlined
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  color="red" class="ma-4" elevation="10" text @click="close">
                      Cancelar
                      <v-icon class="mx-2"> mdi-close </v-icon>
                    </v-btn>
                    <v-btn  color="success" class="ma-4" elevation="10" text @click="saveMaestroMongo">
                      Guardar
                      <v-icon class="mx-3"> mdi-content-save </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
export default {
  mixins: [nextAction, global],

  data() {
    return {
      titulo: "1. MAESTROS CONSENTIMIENTOS",

      form: {
        busqueda: {
          id: "busqueda",
          label: "Buscar",
          max_length: "20",
        },
      },

      headers: [
        { text: "Código", align: "center", sorteable: false, value: "codigo" },
        { text: "Descripción", align: "center", value: "descrip" },
        { text: "Aprobado por", align: "center", value: "aprobo" },
        { text: "Fecha de aprobación", align: "center", value: "fechaAprob" },
        { text: "Revisado por", align: "center", value: "reviso" },
        { text: "Fecha de act.", align: "center", value: "fechaAct" },
        { text: "Versión", align: "center", value: "version" },
        { text: "Estado", align: "center", align: "center", value: "estado" },
      ],

      arrayConsen: [],
      calendarioFechaAprobo: false,
      calendarioFechaReviso: false,
      busqueda: "",
      dialog: false,

      maesItem: {
        codigo_mae: "",
        version: "",
        descrip: "",
        fechaAprob: "",
        aprobo: "",
        fechaAct: "",
        reviso: "",
        estado: "",
      },

      desserts: [
        {
          codigo: "HIC001",
          descrip: "Consentimiento sin sentimiento",
          aprobo: "AAAAA AAAAAAAA",
          fechaAprob: "2023-02-14",
          reviso: "AAAAA AAAAAAAA",
          fechaAct: "2023-02-14",
          version: "1.1",
          estado: "1",
        },
        {
          codigo: "HIC002",
          descrip: "Consentimiento para consentir",
          aprobo: "BBBBB BBBBBB",
          fechaAprob: "2023-02-14",
          reviso: "BBBBB BBBBBB",
          fechaAct: "2023-02-14",
          version: "1.2",
          estado: "1",
        },
        {
          codigo: "HIC003",
          descrip: "Consentimiento con sentimiento",
          aprobo: "CCCCCC CCCCCC",
          fechaAprob: "2023-02-14",
          reviso: "CCCCCC CCCCCC",
          fechaAct: "2023-02-14",
          version: "1.3",
          estado: "0",
        },
      ],
    };
  },

  computed: {
    ...mapState({ isLoading: "isLoading " }),
  },

  mounted() {
    this.getMaestroMongo();
    this.focusInput(this.form, "busqueda", "busqueda");
  },

  methods: {
    ...mapActions({
      _getMaestros: "maestrosConse/_getMaestros",
    }),

    async saveMaestroMongo () {
        console.log("Estoy en saveMaesMongo")
    },

    async getMaestroMongo() {
        console.log("Estoy en getMaestroMongo")
      const DATA = await this._getMaestros();
      index.commit("isLoading", null, { root: true });
      const RES = RES.map((item) => {
        return {
          codigo: item.COD_MAE,
          descrip: item.DESCRIP,
          aprobo: item.APROBO,
          fechaAprob: item.FECHA_APROB.slice(0, 10),
          reviso: item.REVISO,
          fechaAct: item.FECHA_ACT.slice(0, 10),
          version: item.VERSION,
          estado: item.ESTADO,
        };
      });
      this.desserts = RES;
    },

    close() {
        console.log("Estoy en CLOSE")
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    createMaes(item) {
        console.log("Estoy en CREATEMAES")
      this.noved = "Creando";
      this.createdIndex = this.arrayConsen.indexOf(item);
      this.createdtem = Object.assign({}, item);
      this.dialog = true;
    },
  },
};
</script>
