<template>
  <v-app>
    <Header />
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-card class="mx-auto" color="white" elevation="12">
            <v-list flat>
              <v-list-item-group>
                <v-row class="ma-5 mx-4" align="center" justify="space-around">
                  <v-col cols="12" md="12">
                    <v-hover v-slot="{ hover }" open-delay="10" v-if="this.current_user.llaveOper == 'GEBC'">
                      <v-btn
                        :elevation="hover ? 24 : 0"
                        to="/Configuracion_login"
                        class="ma-3 botone"
                        color="primary"
                        width="320"
                        height="70"
                        outlined
                      >
                        <v-list-item-content>
                          <v-list-item-title class="text-h6">
                            {{ "Configuración" }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon size="25">
                            {{ "mdi-cog-outline" }}
                          </v-icon>
                        </v-list-item-icon>
                      </v-btn>
                    </v-hover>
                    <v-menu v-for="(item, i) in current_user.modulos.modulos" :key="i" offset-y>
                      <template v-slot:activator="{}">
                        <v-hover v-slot="{ hover }" open-delay="10">
                          <v-expand-transition>
                            <v-btn
                              outlined
                              v-show="btn_transition_estado"
                              :elevation="hover ? 24 : 0"
                              router
                              height="70"
                              width="315"
                              @click="select_Modulo(item)"
                              color="primary"
                              class="ma-3 text-h6 botone"
                            >
                              <!-- :to="item.route" -->
                              <v-list-item-content>
                                <v-list-item-title class="text-h6">
                                  {{ item.descripcion }}
                                </v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-icon>
                                <v-icon size="25">
                                  <!-- {{ item.icon }} -->
                                </v-icon>
                              </v-list-item-icon>
                            </v-btn>
                          </v-expand-transition>
                        </v-hover>
                      </template>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="end" class="mx-5" align="center">
                  <v-col cols="12" sm="2" md="2" xs="2">
                    <v-select :items="items" label="Contabilidad" dense class="ma-3" text outlined color="primary"></v-select>
                  </v-col>
                </v-row>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from "@/components/GLOBAL/Header.vue";
import modulos from "../menus/modulos.json";
import { global, currentUser } from "../mixins/global";
export default {
  components: { Header },

  mixins: [global],
  name: "modulos",
  data() {
    return {
      menu: "",
      Visible: false,
      modul: false,
      items: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
      opc: [],
      card_modulos_estado: false,
      btn_transition_estado: false,
      current_user: currentUser,
    };
  },
  created() {
    console.log(this.current_user);
    this.opc = modulos.MenuModulos;
  },
  mounted() {
    setTimeout(() => {
      this.btn_transition_estado = true;
    }, 400);
    if (this.$route.path == "/modulos") this.modul = true;
  },
  methods: {
    select_Modulo(item) {

      switch (item.cod) {
        case "CON":
          localStorage.modulo = item.descripcion;
          this.$router.push("/Menu-Principal");
          break;
        case "NOM":
          localStorage.modulo = item.descripcion;
          this.$router.push("/Menu-Principal");
          break;
        case "COR":
          localStorage.modulo = item.descripcion;
          this.$router.push("/Menu-Principal");
          break;
        case "CONS":
          localStorage.modulo = item.descripcion;
          this.$router.push("/Menu-Principal");
          break;
        case "configuracion":
          localStorage.modulo = item.descripcion;
          this.$router.push("/Menu-Principal");
          break;
      }
    },
  },
};
</script>
