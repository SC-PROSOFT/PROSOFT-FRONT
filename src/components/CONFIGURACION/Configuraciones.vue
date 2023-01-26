<template>
  <v-container>
    <v-toolbar color="primary" dark flat height="150">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>{{ title }}</h2>
          </v-col>
          <v-col cols="12">
            <v-btn class="mx-2 botone primary--text" color="white" @click="step = 1">Configuracion servidor</v-btn>
            <v-btn class="mx-2 botone primary--text" color="white" @click="step = 2">Asignar modulos a operadores</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card elevation="24">
          <v-row justify="start" class="mx-8 pt-10">
            <v-col cols="12" md="3" sm="3" xs="3">
              <v-text-field v-model="reg_serv.ips.ipPublica" label="Ip Global" maxlength="15" id="ipGlobal" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="3" xs="3">
              <v-text-field v-model="reg_serv.ips.ipLocal" label="IP Local" maxlength="15" id="ip_local" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="3" xs="3">
              <v-text-field v-model="reg_serv.puerto" label="Puerto" maxlength="4" id="puerto" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-10">
            <v-col cols="6">
              <TABLACONTAB :contabilidades="contabilidades" @verModulos="verModulos" />
            </v-col>
            <v-col cols="6">
              <TABLAMODULOS :modulos="modulos" />
            </v-col>
          </v-row>
          <v-row class="justify-end">
            <v-col cols="4">
              <v-btn to="/Modulos" color="primary" class="ma-4" elevation="10">
                Volver
                <v-icon class="mx-2"> mdi-arrow-left-circle </v-icon>
              </v-btn>

              <v-btn color="success" class="ma-4" elevation="10" @click="solicitarGuardado()">
                Guardar
                <v-icon class="mx-3"> mdi-content-save </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>
      <v-window-item :value="2">
        <v-card elevation="24">
          <v-row justify="start" class="mt-2">
            <v-col cols="12" md="3" sm="3" xs="3" class="ml-10">
              <v-text-field v-model="search" label="Buscar operador" maxlength="4" id="operador" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :items="JSON.parse(JSON.stringify(getLista('usuarios')))"
                :headers="headers_oper"
                :search="search"
                item-key="key"
                class="mx-10 mb-5 elevation-2"
              >
                <template v-slot:item.actions="{ item }">
                  <h4 class="primary--text" style="cursor: pointer" @click="asignarModulos(item)">
                    asignar
                    <v-icon small class="mr-2" color="primary" @click="asignarModulos(item)"> mdi-pencil </v-icon>
                  </h4>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-dialog v-model="show_asignar_oper">
            <TABLAMODULOSOPER :modulos="modulos_oper" @cerrar="show_asignar_oper = false" />
          </v-dialog>
        </v-card>
      </v-window-item>
    </v-window>
    <CON851 v-if="alerta.estado" :alerta="alerta" />
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
  </v-container>
</template>

<script>
import { format_ip, format_Mac, currentUser, global } from "../../mixins/global";
import { getConfig } from "../../fuentes/configuracion/regConfig";
import { mapActions, mapGetters } from "vuex";
import TABLAMODULOSOPER from "./TablaModulosOper.vue";
import TABLAMODULOS from "./TablaModulos.vue";
import TABLACONTAB from "./TablaContab.vue";
import moment from "moment";

export default {
  mixins: [global],
  name: "Configuracion",
  components: { TABLAMODULOS, TABLACONTAB, TABLAMODULOSOPER },
  data() {
    return {
      reg_serv: getConfig(),
      novedad: null,
      tab: null,
      items: ["CONFIGURAR SERVIDOR", "ASIGNAR MODULOS A OPERADORES"],
      modulos: {},
      contabilidades: [],
      step: 1,
      search: "",
      show_asignar_oper: false,
      modulos_oper: {},
      headers_oper: [
        {
          text: "Operador",
          align: "start",
          sortable: false,
          value: "llaveOper",
        },
        { text: "Nombre", value: "nombre" },

        { text: "Asignar modulos", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getLista: "oper/getLista",
    }),
    title() {
      return this.step == 1 ? "Configuracion del servidor" : "Asignar modulos a operadores";
    },
  },
  watch: {
    modulos: {
      handler: function (val, oldVal) {
        console.log("Watch", val, oldVal);
      },
      deep: true,
    },
  },
  mounted() {
    this.cargarConfig();
  },
  methods: {
    format_Mac,
    format_ip,
    ...mapActions({
      _getModulosPorOper: "oper/_getModulosPorOper",
      _guardarConfig: "server/_guardarConfig",
      _getOperadores: "oper/_getOperadores",
      newContab: "server/newContabilidad",
      _editConfig: "server/_editConfig",
      _getConfig: "server/_getConfig",
    }),
    solicitarGuardado() {
      this.novedad == 7 && this.CON851P("PNZ", "info", "¿Seguro que deseas guardar esta configuracion?", this.guardarConfig, this.cerrar_CON851P);
      this.novedad == 8 && this.CON851P("PNZ", "info", "¿Seguro que deseas modificar esta configuracion?", this.guardarConfig, this.cerrar_CON851P);
    },
    async guardarConfig() {
      try {
        let fecha_actual = this.formatFecha_(moment().format("YYYY-MM-DD"));

        if (localStorage.ipPublica || localStorage.ipLocal) {
          localStorage.ipPublica = this.reg_serv.ips.ipPublica;
          localStorage.ipLocal = this.reg_serv.ips.ipLocal;
          localStorage.puerto = this.reg_serv.puerto;
          if (this.novedad == 7) {
            this.reg_serv.fechaCrea = fecha_actual;
            const RES = await this._guardarConfig({ data: this.reg_serv });
            if (RES.N1) {
              this.CON851("PNZ", "success", "Configuración creada correctamente", null, this.cargarConfig);
            }
          } else if (this.novedad == 8) {
            this.reg_serv.fechaModif = fecha_actual;
            const RES = await this._editConfig({ data: this.reg_serv });
            if (RES.N1) {
              this.CON851("PNZ", "success", "Configuración modificada correctamente", null, this.cargarConfig);
            }
          }
        } else {
          localStorage.ipPublica = this.reg_serv.ips.ipPublica;
          localStorage.ipLocal = this.reg_serv.ips.ipLocal;
          localStorage.puerto = this.reg_serv.puerto;
          //192.168.0.201
          this.CON851("PNZ", "success", "Configuración inicial creada correctamente", null, () => {
            location.reload();
          });
        }
        this.novedad = null;
      } catch (error) {
        console.error(error);
      }
    },
    async cargarConfig() {
      const RES = await this._getOperadores();
      console.log(RES);
      if ((localStorage.ipPublica || localStorage.ipLocal) && localStorage.puerto) {
        const RES = await this._getConfig();
        if (RES.ips) {
          this.reg_serv = RES;
          localStorage.ipPublica = RES.ips.ipPublica;
          localStorage.ipLocal = RES.ips.ipLocal;
          localStorage.puerto = RES.puerto;
          this.novedad = 8;
          this.contabilidades = this.reg_serv.contab;
        } else this.novedad = 7;
      } else this.novedad = 7;
    },
    verModulos(item) {
      this.modulos = item;
    },

    async asignarModulos(item) {
      const RES = await this._getModulosPorOper({ llave: item.llaveOper });
      this.show_asignar_oper = true;
      this.modulos_oper = item;
    },
  },
};
</script>
