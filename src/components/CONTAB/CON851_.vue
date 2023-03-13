<template>
    <v-dialog v-model="alerta.estado" max-width="500" persistent>
      <v-alert border="left" colored-border :color="color" class="my-0 py-0">
        <v-card-text>
          <v-row style="padding-bottom: 10px; padding-top: 10px">
            <v-col cols="4" lg="3" md="3" sm="3">
              <lottie-animation
                :animationData="tipo_alerta"
                class="mx-auto botone"
                style="height: 100px"
                v-if="alerta.estado"
                :autoPlay="true"
                ref="anim_login"
                id="anim_login"
                :loop="true"
                :speed="2"
                content
              />
            </v-col>
            <v-col cols="8" lg="9" md="9" sm="9" class="ml-0 pl-0">
              <v-row justify="center" align="center">
                <v-col cols="12" lg="12" md="12" sm="12" class="ml-0 pl-0">
                  <h1 :class="` ${color}--text text-center`">
                    {{ titulo }}
                  </h1>
                  <h3 class="text-center mt-3">
                    {{ cuerpo }}
                  </h3>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" v-if="!btn_cancelar" class="mx-auto py-0 my-0">
                  <v-card-actions class="mx-0">
                    <v-btn ref="btn3" @click="confimar" class="botone mx-auto" :color="color" outlined
                      >cerrar
                      <v-icon :color="color" dark translate="true" class="ml-2">mdi-close-circle</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-alert>
    </v-dialog>
  </template>
  
  <script>
  import success from "../../assets/image/success.json";
  import warning from "../../assets/image/warning.json";
  import error from "../../assets/image/error.json";
  import info from "../../assets/image/info.json";
  import LottieAnimation from "lottie-web-vue";
  import { msgCON851 } from "@/fuentes/msgCON851"
  import { mapMutations } from "vuex";
  
  export default {
    name: "CON851",
    components: { LottieAnimation },
    props: {
      alerta: Object,
    },
    data() {
      return {
        icono: "",
        color: "",
        iconos: {
          warning: ["mdi-alert-circle", "¡Precaución!", warning],
          error: ["mdi-close-octagon-outline", "¡Error!", error],
          success: ["mdi-check-circle-outline", "¡Hecho!", success],
          info: ["mdi-information-outline", "¡Atención!", info],
        },
        titulo: "",
        cuerpo: "",
        tipo_alerta: "",
        btn_cancelar: false,
      };
    },
    methods: {
      ...mapMutations({ CON851_DELETE: "CON851_DELETE" }),
      msjError() {
        for (const key of Object.keys(this.iconos)) {
          if (this.alerta.tipo == key) {
            this.color = key;
            this.icono = this.iconos[key][0];
            this.titulo = this.iconos[key][1];
            this.tipo_alerta = this.iconos[key][2];
            break;
          }
        }
        console.log(this.alerta.code, this.alerta.descrip);
        this.cuerpo = msgCON851(this.alerta.code, this.alerta.descrip);
      },
      confimar() {
        if (this.alerta.function1) this.alerta.function1();
        else this.$emit("confirmar");
        this.alerta.estado = false;
        this.CON851_DELETE();
      },
      salir() {
        if (event.keyCode === 27) {
          if (this.btn_cancelar) {
            this.$emit("cancelar");
          } else {
            this.$emit("salirEsc");
          }
        }
      },
      checkKey(event) {
        switch (event.which) {
          case 39: //derecha
            this.$refs.btn2.$el.focus();
            break;
          case 83: //tecla s para que no se Crucen eventos al momento del focusear el dialogo
            this.$refs.btn2.$el.focus();
            break;
          case 37: //izquierda
            this.$refs.btn1.$el.focus();
            break;
          case 38: //izquierda
            this.$refs.btn1.$el.focus();
            break;
          default:
            //teclas por defaul
            break;
        }
      },
    },
    watch: {
      confirmarActiva() {
        if (this.confirmarActiva) return;
        requestAnimationFrame(() => {
          if (this.btn_cancelar == false) {
            this.$refs.btn3.$el.focus();
          } else {
            this.$refs.btn1.$el.focus();
          }
        });
      },
    },
    created() {
      this.msjError(this.alerta.code);
      setTimeout(() => {
        this.$refs.btn3.$el.focus();
      }, 100);
  
      document.addEventListener("keydown", this.salir);
      document.addEventListener("keydown", this.checkKey);
    },
    destroyed() {
      document.removeEventListener("keydown", this.salir);
      document.removeEventListener("keydown", this.checkKey);
    },
  };
  </script>
  