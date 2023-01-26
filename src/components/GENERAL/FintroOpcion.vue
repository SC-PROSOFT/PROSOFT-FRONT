<template>
  <v-dialog v-model="buscar_opcion.estado" v-click-outside="selectFocoOpciones" width="520">
    <v-card id="card" class="section" width="520" shaped>
      <v-subheader>
        <h3 class="zoomIt primary--text text-center mx-auto">Buscar opción</h3>
      </v-subheader>
      <v-text-field
        @keydown.esc="buscar_opcion.estado = false"
        @input="filtro = filtro.toUpperCase()"
        label="Buscar opcion"
        v-model="filtro"
        @keyup="filtrar"
        class="mx-4"
        ref="buscar"
        autofocus
        outlined
        dense
      ></v-text-field>
      <v-divider class="mx-4"></v-divider>
      <v-list dense @keydown="keyCheck_Opciones">
        <v-list-item-group v-model="row_opciones">
          <v-list-item
            v-for="(item, index) in filtrar_menu"
            @click="elegirOpcion(item)"
            style="height: 10px"
            :key="index"
            id="list"
            autofocus
            link
          >
            <h5 class="zoomIt primary--text ma-1">
              {{ item.ruta + " - " + item.text }}
            </h5>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import menuContabilidad from "../../menus/menuContabilidad.json";
import menuNomina from "../../menus/menuNomina.json";
import menuCorr from "../../menus/menuCorr.json";
import { scrollTo } from "scroll-js";
export default {
  props: {
    buscar_opcion: Object,
    select_menu: Object,
  },
  data() {
    return {
      row_opciones: 0,
      filtro: "",
      filtrar_menu: [],
      base_filtrar_menu: [],
      menu: [],
    };
  },
  watch: {
    filtro() {
      this.filtrar_menu = this.base_filtrar_menu;
      let filtrado = this.filtrar_menu.filter((el) =>
        !["F", "S"].includes(el.opc) ? el.text.includes(this.filtro) : null
      );
      this.filtrar_menu = filtrado.slice(0, 20);
    },
    opcion() {
      if (this.opcion == false) {
        setTimeout(() => {
          this.filtro = "";
        }, 1500);
      }
    },
  },
  methods: {
    async elegirOpcion(item) {
      await this.$router.push(item.route);
      this.buscar_opcion.estado = false;
    },
    keyCheck_Opciones(event) {
      if (event.keyCode == 38 && this.row_opciones >= 0) {
        if (this.row_opciones == 0) this.$refs.buscar.focus();
        scrollTo(document.getElementById("card"), {
          top: this.row_opciones * 40,
        }).then(function () {});
        this.row_opciones--;
      } else if (event.keyCode == 40 && this.row_opciones < this.filtrar_menu.length - 1) {
        scrollTo(document.getElementById("card"), {
          top: this.row_opciones * 40,
        }).then(function () {});
        this.row_opciones++;
      } else if (event.keyCode == 13) {
        this.$router.push(this.filtrar_menu[this.row_opciones].route);
        this.buscar_opcion.estado = false;
      } else if (event.keyCode == 27) {
        document.removeEventListener("keydown", this.keyCheck_Opciones);
        this.$refs.buscar.focus();
      }
    },
    selectFocoOpciones() {
      // this.row_opciones = 0
      this.$refs.buscar.focus();
      if (this.$refs == "buscar") {
        document.addEventListener("keydown", this.keyCheck_Opciones);
        this.$refs.buscar.focus();
      }
    },
    filtrar(event) {
      switch (event.which) {
        case 38:
          break;
        case 13:
        case 40:
          this.$refs.buscar.blur();
          document.addEventListener("keydown", this.keyCheck_Opciones);
          this.row_opciones = 0;
        default:
          break;
      }
    },
    base_Menu_Filtro() {
      let push_sub_menu = (sub_menu) => {
        sub_menu.forEach((el) => {
          el.text = el.text.toUpperCase();
          if (el.Sub) push_sub_menu(el.Sub);
          else this.base_filtrar_menu.push(el);
        });
      };
      push_sub_menu(this.menu);
    },
    onScroll(e) {
      this.row_opciones = e.target.scrollTop;
    },
  },
  mounted() {
    switch (localStorage.modulo) {
      case "contabilidad":
        this.menu = [...menuContabilidad.Menu];
        break;
      case "nomina":
        this.menu = [...menuNomina.Menu];
        break;
      case "correspondencia":
        let menu = JSON.stringify([...menuCorr.Menu]);
        this.menu = JSON.parse(menu);
        break;

      default:
        break;
    }
    this.base_Menu_Filtro();
  },
  destroyed() {
    document.removeEventListener("keydown", this.keyCheck_Opciones);
  },
};
</script>
<style scoped>
.section {
  max-height: 500px;
  padding: 1rem;
  overflow-y: auto;
  direction: ltr;
  scrollbar-color: #d4aa70 #e4e4e4;
  scrollbar-width: thin;
}

.section::-webkit-scrollbar {
  width: 20px;
}

.section::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.section::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #123d7d;
}
body {
  font-family: "system-ui";
  line-height: 1.4;
  padding: 1rem;
  background-color: #f7f7f7;
  min-height: 100px;
}

* {
  box-sizing: border-box;
}
</style>
