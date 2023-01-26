<template>
  <v-footer
    v-if="['/Menu-Principal', '/modulos', '/Modulos', '/Configuracion'].includes($route.path)"
    class="sticky ma-0"
    color="primary"
  >
    <div :class="`ml-2 `">
      <v-img
        :src="require('../../assets/image/pensador.png')"
        @click="$router.push({ path: '/modulos' })"
        style="cursor: pointer"
        class="white--text botone"
        contain
        outline
        height="50"
        width="30"
      />
    </div>
    <h1 class="white--text botone mr-2" @click="$router.push({ path: '/modulos' })" style="cursor: pointer">Prosoft</h1>
    <v-menu transition="slide-y-transition" bottom v-if="is_mobil">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="py-0 botone" color="white" dark v-bind="attrs" v-on="on" outlined dense>
          <v-icon>mdi-sort-variant</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-title @click="item.method">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-expand-x-transition>
      <v-card outlined dark color="primary" v-if="!is_mobil">
        <v-btn
          v-if="!['/Modulos', '/modulos'].includes($route.path)"
          @click="buscar_opcion.estado = true"
          class="py-0 botone ml-2"
          label="Buscar Opción"
          color="white"
          outlined
          dense
        >
          <v-icon>mdi-text-search</v-icon>
        </v-btn>
      </v-card>
    </v-expand-x-transition>
    <v-hover v-if="!['/Modulos', '/modulos'].includes($route.path)" v-slot="{ hover }" open-delay="60">
      <v-card v-show="expand2" outlined dark color="primary" v-if="!is_mobil">
        <v-btn
          v-if="!['/Modulos', '/modulos'].includes($route.path)"
          :class="hover ? `botone ` : null"
          :elevation="hover ? 24 : 0"
          :disabled="estadoLoader"
          @click="favorito"
          class="botone px-2 ml-2"
          outlined
          dark
        >
          Favoritos
          <v-icon class="ml-2" :color="hover ? 'yellow' : 'white'" size="20"> mdi-star </v-icon>
        </v-btn>
      </v-card>
    </v-hover>
    <v-dialog width="400" v-model="favorite" @keydown="keyCheck">
      <v-card width="400" shaped>
        <v-subheader>
          <h3 class="zoomIt primary--text text-center mx-auto">FAVORITOS</h3>
        </v-subheader>
        <v-divider class="mx-4"></v-divider>
        <v-list ref="lista" dense>
          <v-list-item-group v-model="row">
            <v-list-item
              v-for="(item, index) in lista_favoritos"
              @click="elergirFavorito(item)"
              style="height: 10px"
              :key="index"
              link
            >
              <h5 class="zoomIt primary--text ma-1">
                {{ index + 1 + " - " + item.nombre }}
              </h5>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
    <v-spacer class="mr-16"></v-spacer>

    <h3 class="white--text botone ml-12" v-if="modulo">
      {{ $route.path != "/modulos" ? `${modulo.toUpperCase()}` : "" }}
    </h3>

    <v-spacer></v-spacer>
    <v-spacer> </v-spacer>
    <div class="mt-1 white--text botone">
      <p class="mb-1">
        {{ `${currentUser_.llaveOper} ${currentUser_.nombre}` }}&nbsp; - &nbsp;{{ reloj.time }}, {{ reloj.fech }}
      </p>
    </div>

    <v-hover v-slot="{ hover }" open-delay="60">
      <v-btn
        :class="hover ? `botone ` : null"
        :color="hover ? 'red' : 'salir'"
        class="boton botone text-end ml-2"
        :elevation="hover ? 24 : 0"
        @click="abrirDialogo"
        dark
      >
        Salir
        <v-icon class="ml-2" color="white" size="25">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-hover>

    <CON851
      @cancelarAlerta="cancelar()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
    <FiltroOpcion v-if="buscar_opcion.estado" :buscar_opcion="buscar_opcion"></FiltroOpcion>
  </v-footer>
</template>

<script>
import FiltroOpcion from "../GENERAL/FintroOpcion.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { currentUser } from "../../mixins/global";
import { alert } from "../../mixins/CON851";
import moment from "moment";
export default {
  mixins: [alert],
  name: "Header",
  components: {
    FiltroOpcion,
  },
  data() {
    return {
      items: [
        { title: "Favoritos", method: this.favorito },
        { title: "Buscar Opcion", method: this.buscarOpcion },
      ],
      lista_favoritos: [],
      favorite: false,
      currentUser_: currentUser,
      modulo: "",
      row: 0,
      is_mobil: "",
      expand2: false,
      buscar_opcion: {
        estado: false,
      },
    };
  },
  computed: {
    ancho() {
      return window.outerWidth;
    },
    alto() {
      // var widthBrowser = window.outerWidth;
      // var heightBrowser = window.outerHeight;
      // console.log(widthBrowser, heightBrowser);
      return window.outerHeight;
    },
    ...mapGetters({ list: "favorito/list", estadoLoader: "estadoLoading" }),
    reloj() {
      moment.locale("es");
      let fecha = moment().format("ll");
      let hora = moment().format("dddd");
      const FECHA_ACTUAL = {
        fech: fecha,
        time: hora,
      };
      return FECHA_ACTUAL;
    },
  },
  created() {
    const hello = document.getElementById("widthYheight");
    var $this = this;
    this.mobile(this.$vuetify.breakpoint.name);
    this.$watch("$vuetify.breakpoint.name", (e) => {
      $this.mobile(e);
    });
  },
  mounted() {
    if (this.$route.path != "/modulos") {
      this.expand2 = true;
    } else if (["/Modulos", "/modulos"].includes(this.$route.path)) {
      localStorage.removeItem("modulo");
    }
    this.modulo = localStorage.modulo;
  },

  methods: {
    ...mapActions({
      getFavorito: "favorito/getFavorito",
    }),
    ...mapMutations({
      reinicio: "sesion/reinicioAcceso",
    }),
    buscarOpcion() {
      this.buscar_opcion.estado = true;
    },
    base_Menu_Filtro() {
      let push_sub_menu = (sub_menu) => {
        sub_menu.forEach((el) => {
          if (el.Sub) push_sub_menu(el.Sub);
          else this.base_filtrar_menu.push(el);
        });
      };
      push_sub_menu(this.menu);
    },
    keyCheck(event) {
      if (event.keyCode == 38 && this.row > 0) {
        // up
        this.row--;
      } else if (event.keyCode == 40 && this.row < this.lista_favoritos.length - 1) {
        // down
        this.row++;
      } else if (event.keyCode == 13) {
        //enter
        this.$router.push(this.lista_favoritos[this.row].route);
        this.favorite = false;
      } else if (event.keyCode == 27) {
        //esc
        this.favorite = false;
      }
    },
    async favorito() {
      try {
        let res = await this.getFavorito([currentUser.llaveOper, localStorage.modulo]);
        if (res.status != -1 && this.list("list_favorito").length > 0) {
          let array = this.list("list_favorito");
          this.favorite = true;
          this.lista_favoritos = [];
          this.lista_favoritos = array;
        } else {
          this.CON851("NFAV", "info");
        }
      } catch (error) {
        console.error(error);
      }
    },
    elergirFavorito(item) {
      this.favorite = false;
      this.$router.push(item.route);
    },
    cancelar() {
      this.cerrar_CON851();
    },
    abrirDialogo() {
      this.CON851("SALIR", "warning", "", "p");
    },
    confirmar() {
      this.cerrar_CON851();
      this.reinicio();
    },
    mobile(data) {
      switch (data) {
        case "xs":
        case "sm":
          this.is_mobil = true;
          break;
        case "md":
        case "cols":
        case "lg":
        case "xl":
          this.is_mobil = false;
          break;
      }
    },
  },
  updated() {
    if (this.buscar_opcion.estado == false && this.$route.path == "/Menu-Principal") {
      setTimeout(() => {
        document.getElementById("foo").focus();
      }, 100);
    }
  },
};
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
.boton {
  transition: 300ms;
}
.btne {
  transition: 2000ms;
}
</style>
