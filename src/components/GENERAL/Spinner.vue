<template>
  <!-- <v-app id="spi" v-if="!getLoading"> -->
  <v-dialog fullscreen persistent id="spi" v-model="getLoading" v-if="getLoading">
    <v-row justify="center" align="center" id="spi">
      <v-expand-x-transition>
        <v-card shaped>
          <v-col cols="12" class="pb-1 mb-0">
            <lottie-animation
              ref="anim"
              v-if="card_loader"
              style="height: 230px; width: 300px"
              :animationData="require('../../assets/image/loader.json')"
              :loop="true"
              :speed="2"
              :autoPlay="true"
            />
          </v-col>
          <v-col cols="12" v-if="getSpinnerConfig.showLoadingBar">
            <template v-if="startDownload ? false : true">
              <v-progress-linear indeterminate rounded height="17">
              </v-progress-linear>
              <p class="text-center text-caption">
                {{ `${stateProgress}${textProgress}` }}
              </p>
            </template>

            <template v-if="startDownload ? true : false">
              <v-progress-linear :value="downloadProgress" height="17">
              </v-progress-linear>
              <p class="text-center text-caption">
                {{ `${stateProgress}${textProgress}` }}
              </p>
            </template>
          </v-col>
        </v-card>
      </v-expand-x-transition>
    </v-row>
  </v-dialog>
  <!-- </v-app> -->
</template>
<script>
import LottieAnimation from "lottie-web-vue";
import { mapGetters } from "vuex";
export default {
  components: { LottieAnimation },
  data() {
    return {
      showSpinner: false,
      timeToShowSpinner: new Date(),

      skill: 20,
      knowledge: 33,
      power: 78,

      por: 0,
      time: 0,
      card: false,
      spinner_animation: null,
      card_loader: false,
      card_contabilidad: false,
      card_nomina: false,

      spinerConfig: {},
      downloadProgress: 0,
      stateProgress: "",
      textProgress: "",
      startDownload: false,
    };
  },

  computed: {
    getLoading: {
      get() {
        return this.$store.getters["estadoLoading"];
      },
      set(newVal) {
        return newVal;
      },
    },

    ...mapGetters({
      getSpinnerConfig: "getSpinnerConfig",

      //getLoading: "estadoLoading",
      cargaPorcentaje: "cargaPorcentaje",
      getStartDownload: "getStartDownload",
      getDownloadProgress: "getDownloadProgress",
      getCantidad: "getCantidad",
    }),
  },

  watch: {
    card(newVal) {
    },

    getLoading(newVal) {
      !!newVal ? (this.card = true) : (this.card = false);
      switch (localStorage.modulo) {
        case "contabilidad":
          this.card_contabilidad = true;
          break;
        case "nomina":
          this.card_nomina = true;
          break;
        default:
          this.card_loader = true;
          break;
      }

      newVal == false && this.reset();
    },

    getSpinnerConfig(newVal) {
      this.textProgress = newVal.textProgressValues.waitingData;
      this.stateProgress = "1/3 - ";
    },

    getDownloadProgress(newVal) {
      this.downloadProgress = newVal;
      if (newVal < 100) {
        this.startDownload = true;
        this.textProgress =
          this.getSpinnerConfig.textProgressValues.downloadingData;
        this.stateProgress = "2/3 - ";
      } else if (newVal == 100) {
        this.textProgress =
          this.getSpinnerConfig.textProgressValues.generateDocument;
        this.stateProgress = "3/3 - ";
      }
    },
  },

  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>
<style>
#spi {
  width: 100%;
  height: 100%;
  top: 0px;
  margin: auto;
  position: absolute;
  z-index: 100 !important;
  backdrop-filter: blur(5px);
  background: #123d7d67;
}
</style>
