<template>
  <v-dialog v-model="con851_p.estado" max-width="500" persistent>
    <v-alert border="left" colored-border :color="color" class="my-0 py-0">
      <v-card-text>
        <v-row style="padding-bottom: 10px; padding-top: 10px">
          <v-col cols="4" lg="3" md="3" sm="3">
            <lottie-animation
              :animationData="tipo_alerta"
              class="mx-auto botone"
              style="height: 100px"
              v-if="con851_p.estado"
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
              <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0">
                <v-btn ref="btn1" outlined color="success" width="110" class="botone ml-md-13 ml-sm-10" @click="confirmar">
                  SI
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0">
                <v-btn color="error" outlined width="110" @click="cancelar" class="botone" ref="btn2">
                  NO
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-alert>
  </v-dialog>
</template>

<script>
import warning from "../../assets/image/warning.json";
import success from "../../assets/image/success.json";
import error from "../../assets/image/error.json";
import info from "../../assets/image/info.json";
import { msgCON851P } from "../../fuentes/global/msgCON851P";
import LottieAnimation from "lottie-web-vue";
export default {
  components: { LottieAnimation },
  props: {
    con851_p: Object,
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
    };
  },
  methods: {
    msjAlerta() {
      for (const key of Object.keys(this.iconos)) {
        if (this.con851_p.tipo == key) {
          this.color = key;
          this.icono = this.iconos[key][0];
          this.titulo = this.iconos[key][1];
          this.tipo_alerta = this.iconos[key][2];
          break;
        }
      }
      this.cuerpo = msgCON851P(this.con851_p);
      return this.cuerpo;
    },
    confirmar() {
      this.con851_p.function1();
      this.cerrarCON851P();
      //   this.$emit("confirmar", this.con851_p.function1());
    },
    cancelar() {
      this.con851_p.function2();
      this.cerrarCON851P();
      //   this.$emit("cancelar", this.con851_p.function2());
    },
    cerrarCON851P() {
      this.con851_p.estado = false;
      this.con851_p.code = "";
      this.con851_p.tipo = "";
      this.con851_p.descrip = "";
      this.con851_p.function1 = null;
      this.con851_p.function2 = null;
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
        case 39:
          this.$refs.btn2.$el.focus();
          break;
        case 83:
          this.$refs.btn2.$el.focus();
          break;
        case 37:
          this.$refs.btn1.$el.focus();
          break;
        case 38:
          this.$refs.btn1.$el.focus();
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
    this.msjAlerta(this.con851_p.code);
    setTimeout(() => {
      this.$refs.btn2.$el.focus();
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
