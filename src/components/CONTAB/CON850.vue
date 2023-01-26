<template>
  <v-row justify="center">
    <v-dialog v-model="novedad_activa" max-width="300" persistent>
      <v-card>
        <v-card-text class="pa-5">
          <h2 class="primary--text text-center">Novedad</h2>
          <div>
            <v-row justify="center" class="ma-0 pa-0">
              <v-col class="ma-0 pa-0 mt-6" cols="2"><v-divider></v-divider> </v-col>
              <v-col class="ma-0 pa-0 mt-3" cols="8"><h4 class="text-center">¿Qué desea hacer?</h4> </v-col>
              <v-col class="ma-0 pa-0 mt-6" cols="2"><v-divider></v-divider> </v-col>
            </v-row>
          </div>
          <v-list dense>
            <v-list-item-group autofocus v-model="nov" color="primary">
              <v-list-item v-for="(novedad, i) in novedades_Activas" :key="i" @click="novedadSelec(i)">
                <v-list-item-content class="botone">
                  <h4 class="text-center">{{ novedad.novedad }}</h4>
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
  data() {
    return {
      novedades: [
        {
          novedad: " 7. N U E V O",
          acceso: 7,
          color: "success",
          icono: "mdi-plus-box-outline",
          estado: true,
        },
        {
          novedad: "8. C A M B I O",
          acceso: 8,
          icono: "mdi-square-edit-outline",
          color: "info",
          estado: true,
        },
        {
          novedad: "9. R E T I R O",
          acceso: 9,
          icono: "mdi-delete",
          color: "red",
          estado: true,
        },
        {
          novedad: "R. R E T I R O -- E M P L E A D O",
          acceso: "R",
          icono: "mdi-delete",
          estado: false,
        },
        {
          novedad: "F. F I N",
          acceso: "F",
          estado: true,
        },
      ],
      nov: 0,
    };
  },
  props: {
    novedad_activa: Boolean,
  },
  computed: {
    novedades_Activas() {
      return this.novedades.filter((e) => e.estado == true);
    },
  },
  methods: {
    novedadSelec(index) {
      this.$emit("novedadSelec", {
        acceso: this.novedades_Activas[index].acceso,
        color: this.novedades_Activas[index].color,
        icono: this.novedades_Activas[index].icono,
        novedad: this.novedades_Activas[index].novedad,
      });
    },
    siguienteElemento(event) {
      if (event.keyCode == 38 && this.nov > 0) {
        this.nov--;
      } else if (event.keyCode == 40 && this.nov < this.novedades_Activas.length - 1) {
        this.nov++;
      } else if (event.keyCode == 13) {
        this.$emit("novedadSelec", {
          acceso: this.novedades_Activas[this.nov].acceso,
          icono: this.novedades_Activas[this.nov].icono,
          color: this.novedades_Activas[this.nov].color,
          novedad: this.novedades_Activas[this.nov].novedad,
        });
      }
    },
    accesos(event) {
      const vm = this;
      this.novedades_Activas.forEach((novedad) => {
        if (event.key.toUpperCase() == novedad.acceso && novedad.estado) {
          vm.$emit("novedadSelec", {
            acceso: novedad.acceso,
            icono: novedad.icono,
            color: novedad.color,
            novedad: novedad.novedad,
          });
        }
      });
    },
  },
  mounted() {
    switch (this.$route.path) {
      case "/CON906":
        this.novedades[1].estado = false;
        break;
      case "/CON90-3":
        this.novedades[3].estado = true;
        break;
      default:
        break;
    }
    setTimeout(() => {
      document.addEventListener("keydown", this.siguienteElemento);
      document.addEventListener("keydown", this.accesos);
    }, 200);
  },
  destroyed() {
    document.removeEventListener("keydown", this.siguienteElemento);
    document.removeEventListener("keydown", this.accesos);
  },
};
</script>
