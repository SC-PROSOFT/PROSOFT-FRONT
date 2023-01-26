<template>
  <v-footer class="mx-auto sticky" height="70" color="primary" dark>
    <v-row align="center">
      <v-col cols="10">
        <h2 class="mb-0 ml-2">{{ empresa }}</h2>
        <h4 class="ml-2">
          {{ titulo }}
          <v-icon
            :color="lista_favoritos.includes($route.path) ? 'yellow' : 'white'"
            :disabled="isLoading"
            @click="favorito"
            class="ml-2"
            size="25"
            dense
          >
            {{ lista_favoritos.includes($route.path) ? "mdi-star" : "mdi-star-outline" }}
          </v-icon>
        </h4>
      </v-col>
      <v-col cols="2" class="text-end">
        <v-btn @click="cerrar" width="30" height="30" icon color="white">
          <v-icon size="40">mdi-arrow-left-bold-box-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <CON851
      v-if="alerta.estado"
      :alerta="alerta"
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      @confirmar="confirmar()"
    ></CON851>
  </v-footer>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { currentUser } from "../../mixins/global";
import { alert } from "../../mixins/CON851";
export default {
  mixins: [alert],
  name: "TITULO",
  props: {
    titulo: "",
  },
  data: () => ({
    lista_favoritos: [],
  }),
  computed: {
    ...mapState(["empresa", "isLoading"]),

    ...mapGetters({ list: "favorito/list" }),
  },
  methods: {
    ...mapMutations({ setDialogType: "formularios/setDialogType" }),
    ...mapActions({
      getFavorito: "favorito/getFavorito",
      addFavorito: "favorito/addFavorito",
      deleteFavorito: "favorito/deleteFavorito",
    }),
    async favorito() {
      if (this.$route.path != undefined) {
        let user = currentUser.llaveOper;
        let route = this.$route.path;
        let nombre = this.titulo.split(" ").slice(1).join(" ").toUpperCase();
        let modulo = localStorage.modulo;
        try {
          let res = await this.addFavorito({ user, route, nombre, modulo });
          if (res.msg == 1) {
            await this.deleteFavorito({ user, route, modulo });
          } else if (res.msg == 2) {
            this.enviarAlerta("FAV", "info");
          }
          await this.getFavorito([currentUser.llaveOper, modulo]);
          let array = this.list("list_favorito");
          if (array[0]) {
            this.lista_favoritos = [];
            this.lista_favoritos = array.map((el) => el.route);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    cancelarAlerta() {
      if (document.getElementById("imp")) {
        setTimeout(() => {
          document.addEventListener("keydown", this.keyCheck);
        }, 100);
      }
      this.cerrar_CON851();
    },
    cancelar() {
      this.cerrar_CON851();
    },
    confirmar() {
      this.$router.push("/Menu-Principal");
    },

    cerrar() {
      this.$emit("cerrar");
      if (this.$route.path != "/CON000") this.CON851("MENU", "info", null, "p");
    },
  },
  async mounted() {
    if (this.$route.path != "Menu-Pricipal") {
      let res = await this.getFavorito([currentUser.llaveOper, localStorage.modulo]);
      let array = this.list("list_favorito");
      if (res.status != -1 && array[0]) {
        this.lista_favoritos = array.map((el) => el.route);
      }
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
</style>
