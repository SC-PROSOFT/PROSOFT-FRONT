<template>
  <v-app style="background-color: #ececf5" :onclick="$router.path == 'Menu-Principal' ? foo.focus() : null">
    <CON851
      v-if="alerta.estado"
      :alerta="alerta"
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      @confirmar="confirmar()"
    ></CON851>
    <Header />

    <router-view></router-view>
    <v-container class="---fill-height" v-if="ver">
      <v-row align="center" justify="center">
        <v-col>
          <v-card color="primary" dark elevation="24" width="520" height="32" outlined class="mx-auto ma-2">
            <h5 class="white--text text-center text-md-h6 ma-0 text-caption">
              {{ this.historial[this.historial.length - 1] == this.historial[0] ? "" : "Opc " + this.opcs.join(",") + " " + "|" }}&nbsp;
              {{ this.subtitle[this.subtitle.length - 1] }}
            </h5>
          </v-card>
          <v-card
            v-click-outside="select"
            :autofocus="activeFocus"
            @click="itemActive = 0"
            @keydown="checkKey"
            class="mx-auto"
            tabindex="1"
            width="520"
            ref="foo"
            id="foo"
          >
            <v-navigation-drawer floating permanent width="520">
              <v-list dark color="primary" style="padding: 10px">
                <v-list-item
                  style="min-height: 0px; border-radius: 0.4rem"
                  :input-value="itemActive == index"
                  v-for="(opc, index) in menu"
                  class="ma-0 py-1 botone"
                  :class="opc.color"
                  :key="index"
                  autofocus
                  link
                >
                  <v-list-item-content @click="validClickOpcMenu(opc)" style="min-height: 0px" class="py-0 ma-0" height="400">
                    <v-list-item-title class="text-md-h6 font-weight-light" style="min-height: 0px">
                      {{ opc.opc }}.
                      {{ opc.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon style="margin: 10px">
                    <v-icon style="margin-left: 4px" dense x-small>
                      {{ opc.icon }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-icon
                    v-show="!opc.Sub && !['F', 'S'].includes(opc.opc)"
                    @click="favorito(opc)"
                    :disabled="isLoading"
                    style="margin: 5px"
                    class="botone"
                  >
                    <v-icon dense x-small :color="lista_favoritos.includes(opc.route) ? 'yellow' : 'white'">
                      {{ lista_favoritos.includes(opc.route) ? "mdi-star" : "mdi-star-outline" }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import menuContabilidad from "../../menus/menuContabilidad.json";
import { currentUser, global } from "../../mixins/global";
import menuNomina from "../../menus/menuNomina.json";
import menuCorr from "../../menus/menuCorr.json";
import menuConse from "../../menus/menuConse.json";
import Header from "./Header.vue";
import Vue from "vue";

export default {
  name: "MENUPRINCIPAL",

  props: { select_menu: Object },
  components: { Header },
  mixins: [global],

  data: () => ({
    titulo: [],
    n: 0,
    restriccion: "",
    menu: [],
    menuP: [],
    historial: [],
    activeFocus: true,
    itemActive: 0,
    sheet: false,
    isVisible: true,
    focusIndex: 0,
    dialog: false,
    opcs: [],
    item: "",
    subtitle: ["MENU PRINCIPAL"],
    ver: true,
    lista_favoritos: [],
  }),
  async created() {
    if (localStorage.modulo) {
      switch (localStorage.modulo) {
        case "CONTABILIDAD":
          this.historial.push(menuContabilidad);
          this.menu = menuContabilidad.Menu;
          this.menuP = menuContabilidad.Menu;
          break;
        case "NOMINA":
          this.historial.push(menuNomina);
          this.menu = menuNomina.Menu;
          this.menuP = menuNomina.Menu;
          break;
        case "CORRESPONDENCIA":
          this.historial.push(menuCorr);
          this.menu = menuCorr.Menu;
          this.menuP = menuCorr.Menu;
          break;
        case "CONSENTIMIENTOS":
          this.historial.push(menuConse);
          this.menu = menuConse.Menu;
          this.menuP = menuConse.Menu;
          break;
        case "CONFIG":
          this.historial.push(menuConfiguracion);
          this.menu = menuConfiguracion.Menu;
          this.menuP = menuConfiguracion.Menu;
          break;
      }
    }
    this.init();
  },
  computed: {
    ...mapState({ isLoading: "isLoading" }),
    ...mapGetters({ list: "favorito/list" }),
  },
  methods: {
    ...mapActions({
      getFavorito: "favorito/getFavorito",
      addFavorito: "favorito/addFavorito",
      deleteFavorito: "favorito/deleteFavorito",
    }),
    ...mapMutations({
      reinicio: "sesion/reinicioAcceso",
    }),
    async init() {
      let res = await this.getFavorito([currentUser.llaveOper, localStorage.modulo]);
      let array = this.list("list_favorito");
      if (array[0]) {
        if (res.status != -1) {
          this.lista_favoritos = array.map((el) => el.route);
        }
      }
    },
    async favorito(opc) {
      if (opc.route != undefined) {
        let user = currentUser.llaveOper;
        let route = opc.route;
        let nombre = opc.text;
        let modulo = localStorage.modulo;

        let res = await this.addFavorito({ user, route, nombre, modulo });
        if (res.msg == 1) {
          await this.deleteFavorito({ user, route, modulo });
        } else if (res.msg == 2) {
          this.CON851("FAV", "info");
        }
        await this.getFavorito([currentUser.llaveOper, modulo]);
        let array = this.list("list_favorito");
        this.lista_favoritos = [];
        if (array[0]) {
          this.lista_favoritos = array.map((el) => el.route);
        }
      }
    },
    cancelar() {
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
    },
    confirmar() {
      this.reinicio();
    },
    select() {
      this.itemActive = 0;
    },
    checkKey(event) {
      switch (event.which) {
        case 39:
        case 32:
        case 37:
        case 27:
          null;
          break;
        case 13: // enter
          this.validarLetra();
          if (this.item != this.menu.length) {
            let er = this.menu.find((el) => el.opc == this.item);
            this.validarRestric(er);
            if (this.restriccion == "") {
              if (er.Sub) {
                Vue.set(this, "menu", er.Sub),
                  (this.itemActive = 0),
                  this.historial.push(er.Sub),
                  this.opcs.push(er.opc),
                  this.subtitle.push(er.text),
                  (this.titulo = [er.text]);
              } else if (this.historial[this.historial.length - 1] == this.historial[0]) this.validarSalir();
              else this.$router.push({ path: er.route });
            }
          } else {
            this.validarSalirVolver();
            this.validarVolver();
            break;
          }
          break;
        case 70: // F
          this.validarSalirVolver();
          this.validarVolver();
          break;
        case 83: // tecla s salir "S"
          this.validarSalir();
          this.itemActive = 0;
          break;
        case 38: // up
          if (this.itemActive > 0) this.itemActive--;
          this.activeFocus = false;
          break;
        case 40: // down
          if (this.itemActive < this.menu.length - 1) this.itemActive++;
          return (this.activeFocus = false);
        default:
          //teclas por defaul
          this.teclaDefaul();
          break;
      }
    },
    validarRestric(item) {
      let array_rest = [];
      currentUser.restr.forEach((e, i) => {
        array_rest.push(e.opc);
      });

      if (array_rest.includes(item?.opc_segu)) {
        this.restriccion = item.opc_segu;
        return this.CON851("15", "info");
      } else this.restriccion = "";
    },

    validarSalirVolver() {
      if (this.historial[this.historial.length - 1] != this.historial[0]) {
        (this.itemActive = 0), this.validarLetra();
        let ale = this.menu.find((el) => el.opc == this.item);
        Vue.set(this, "menu", ale.Sub);
        this.subtitle.pop(ale.Sub);
        this.historial.pop(ale.Sub);
        this.opcs.pop();
      }
    },

    validClickOpcMenu(data) {
      this.itemActive = 0;
      this.validarRestric(data);
      if (this.restriccion == "") {
        if (data.Sub && data.opc != "F") {
          Vue.set(this, "menu", data.Sub);
          this.historial.push(data.Sub);
          this.opcs.push(data.opc);
          this.titulo = [data.text];
          this.subtitle.push(data.text);
        } else if (this.historial[this.historial.length - 1] == this.historial[0]) {
          this.menu;
          this.CON851("SALIR", "warning", "", "P");
        } else if (data.opc == "F") {
          this.historial.pop(data.Sub);
          this.opcs.pop();
          this.subtitle.pop(data.text);
          this.validarVolver();
        } else this.$router.push({ path: data.route });
      }
    },
    validarVolver() {
      if (this.historial[this.historial.length - 1] == this.historial[0]) {
        this.menu = [...this.menuP];
        this.titulo = ["  MENU PRINCIPAL"];
      } else {
        this.menu = this.historial[this.historial.length - 1];
        this.n = this.subtitle.length - 1;
        this.titulo = this.subtitle;
        this.itemActive = 0;
      }
    },
    validarSalir() {
      if (this.historial[this.historial.length - 1] == this.historial[0]) {
        this.CON851("SALIR", "warning", "", "P");
      }
    },
    validarLetra() {
      if (this.itemActive == this.menu.length - 1) {
        this.item = this.itemActive + 1;
        this.validarVolver();
        this.validarSalir();
      } else if (this.itemActive < 9) this.item = this.itemActive + 1;
      else {
        let objTecla = {
          9: "A",
          10: "B",
          11: "C",
          12: "D",
          13: "E",
          14: "G",
          15: "H",
          16: "I",
          17: "J",
          18: "K",
          19: "L",
          20: "M",
          21: "N",
          22: "O",
        };
        this.item = objTecla[this.itemActive];
        return this.item;
      }
    },

    teclaDefaul() {
      if (isFinite(event.key)) this.itemActive = event.key;
      else {
        this.itemActive = event.key.toString().toUpperCase();
      }
      let busq = this.menu.find((el) => el.opc == this.itemActive);
      this.validarRestric(busq);
      if (this.restriccion == "") {
        if (busq) {
          if (busq.Sub)
            Vue.set(this, "menu", busq.Sub),
              (this.itemActive = 0),
              this.historial.push(busq.Sub),
              this.opcs.push(busq.opc),
              this.subtitle.push(busq.text),
              (this.titulo = [busq.text]);
          else this.$router.push({ path: busq.route }), (this.itemActive = 0);
        }
      }
    },
  },
  mounted() {
    this.itemActive = 0;
    let contador = 0;

    for (let i in this.menuP) {
      contador = parseInt(this.menu[i].opc) + contador;
    }

    if (this.$refs.foo) this.$refs.foo.$el.focus();
    if (localStorage.ver) this.ver = localStorage.ver;
    else localStorage.getItem("ver", true);
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
  },
  updated() {
    if (this.$route.path == "/Menu-Principal") {
      localStorage.ver = true;
      if (this.$refs.foo) this.$refs.foo.$el.focus();
    } else localStorage.ver = false;
    if (localStorage.getItem("ver") === "true") this.ver = true;
    else this.ver = false;
  },
};
</script>
<style>
.zoomIt {
  display: block !important;
  -webkit-transition: -webkit-transform 0.5s ease-out;
  -moz-transition: -moz-transform 0.5s ease-out;
  -o-transition: -o-transform 0.5s ease-out;
  -ms-transition: -ms-transform 0.5s ease-out;
  transition: transform 0.5s ease-out;
}
.zoomIt:hover {
  -moz-transform: scale(0.96);
  -webkit-transform: scale(0.96);
  -o-transform: scale(0.96);
  -ms-transform: scale(0.96);
  transform: scale(0.96);
}
.zoomIt:focus {
  -moz-transform: scale(0.96);
  -webkit-transform: scale(0.96);
  -o-transform: scale(0.96);
  -ms-transform: scale(0.96);
  transform: scale(0.96);
}
.zoomIt:-moz-focus-inner {
  -moz-transform: scale(0.96);
  -webkit-transform: scale(0.96);
  -o-transform: scale(0.96);
  -ms-transform: scale(0.96);
  transform: scale(0.96);
}
.sub-titulo {
  text-decoration: underline darkblue;
  color: darkblue;
}
.sub-titulo {
  text-decoration: underline darkblue;
  color: darkblue;
}
.input-row {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.row + .row {
  margin-top: 10px;
  margin-bottom: 0px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin: 2px;
}

.input-col {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  /* height: 60px; */
}
</style>
