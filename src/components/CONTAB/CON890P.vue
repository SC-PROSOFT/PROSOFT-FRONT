<template>
  <v-row justify="center">
    <v-dialog v-model="modal_impresion" max-width="320" persistent @keydown.esc="cerrarModalImpresion">
      <v-card>
        <v-card-text class="pa-5">
          <h2 class="primary--text text-center">Impresión</h2>
          <div class="mb-2">
            <v-row justify="center" class="ma-0 pa-0">
              <v-col class="ma-0 pa-0 mt-6" cols="2"><v-divider></v-divider> </v-col>
              <v-col class="ma-0 pa-0 mt-3" cols="8"><h4 class="text-center">¿Qué formato desea?</h4> </v-col>
              <v-col class="ma-0 pa-0 mt-6" cols="2"><v-divider></v-divider> </v-col>
            </v-row>
          </div>
          <v-list dense>
            <v-list-item-group autofocus v-model="imp" color="primary">
              <v-list-item
                v-for="(impresion, i) in impresiones"
                @click="impresionSelec(impresion)"
                class="botone"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon :color="impresion.color" v-text="impresion.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <h4 v-text="impresion.text"></h4>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "CON890P",
  props: {
    modal_impresion: Boolean,
  },

  data() {
    return {
      impresiones: [
        // {
        //   text: "1.  FORMATO PDF",
        //   icon: "mdi-file-pdf-box",
        //   color: "red",
        //   acceso: 1,
        //   estado: true,
        //   tipo: "pdf",
        // },
        {
          text: "FORMATO XLSX",
          icon: "mdi-microsoft-excel",
          color: "green",
          acceso: 2,
          estado: true,
          tipo: "xlsx",
        },
        {
          text: "F. ABANDONAR",
          icon: "mdi-logout-variant",
          color: "warning",
          estado: true,
          acceso: "F",
        },
      ],

      imp: 0,
    };
  },

  computed: {
    impresiones_Activas() {
      return this.impresiones.filter((e) => e.estado == true);
    },
  },
  watch: {
    modal_impresion() {
      if (!this.modal_impresion) {
        document.removeEventListener("keydown", this.siguienteElemento);
        document.removeEventListener("keydown", this.accesos);
      } else {
        document.addEventListener("keydown", this.siguienteElemento);
        document.addEventListener("keydown", this.accesos);
      }
    },
  },

  methods: {
    impresionSelec(index) {
      const vm = this;

      this.impresiones_Activas.forEach((e) => {
        vm.$emit("impresionSelec", {
          text: index.text,
          acceso: index.acceso,
          icono: index.icon,
          color: index.color,
        });
      });
    },
    cerrarModalImpresion() {},

    siguienteElemento(event) {
      if (event.keyCode == 38 && this.imp > 0) {
        this.imp--;
      } else if (event.keyCode == 40 && this.imp < this.impresiones_Activas.length - 1) {
        this.imp++;
      } else if (event.keyCode == 13) {
        this.$emit("impresionSelec", {
          text: this.impresiones_Activas[this.imp].text,
          acceso: this.impresiones_Activas[this.imp].acceso,
          icono: this.impresiones_Activas[this.imp].icon,
          color: this.impresiones_Activas[this.imp].color,
        });
      }
    },

    accesos(event) {
      const vm = this;
      this.impresiones_Activas.forEach((e) => {
        if (event.key.toUpperCase() == e.acceso && e.estado) {
          vm.$emit("impresionSelec", {
            text: e.text,
            acceso: e.acceso,
            icono: e.icon,
            color: e.color,
          });
        }
      });
    },

    ocultarImpresion() {
      this.$emit("ocultarImpresion", {
        text: "",
        acceso: "",
        icono: "",
        color: "",
      });
    },
  },

  mounted() {
    switch (this.$route.path) {
      case "/NOM615A":
        this.field.impresiones[0].estado = false;
        break;
      case "":
        this.field.impresiones[3].estado = true;
        break;
      default:
        break;
    }
    setTimeout(() => {
      document.addEventListener("keydown", this.siguienteElemento);
      document.addEventListener("keydown", this.accesos);
    }, 100);
  },
  destroyed() {
    document.removeEventListener("keydown", this.siguienteElemento);
    document.removeEventListener("keydown", this.accesos);
  },
};
</script>
