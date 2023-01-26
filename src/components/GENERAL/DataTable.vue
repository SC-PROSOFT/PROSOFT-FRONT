<template>
  <v-card flat>
    <v-container fluid class="ma-0 pa-0">
      <v-card-text class="pa-0">
        <v-list class="pt-0 mb-2" dense>
          <v-divider></v-divider>
          <v-list-item class="subtitle-1 font-weight-black">
            <v-col class="pb-0 pt-0 mx-auto" v-for="(head, index) in f8.headers" :key="index" :cols="head.cols">
              <h3 class="text-center">
                {{ head.title }}
              </h3>
            </v-col>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group v-model="row">
            <template>
              <v-list-item v-for="(item, index) in items" @click="selectRow(item)" style="height: 10px" :key="index">
                <v-col v-for="(dato, i) of item" :key="i" :cols="dato.cols" v-if="item">
                  <v-card-text class="text-center">
                    {{ format(dato.value) }}
                  </v-card-text>
                </v-col>
              </v-list-item>
              <v-container v-if="state_body && !isLoading">
                <v-row justify="center">
                  <v-col cols="12">
                    <lottie-animation
                      :animationData="require('../../assets/image/no_found.json')"
                      style="height: 230px; width: 300px"
                      class="text-center mx-auto"
                      :autoPlay="true"
                      :loop="true"
                      :speed="2"
                      ref="anim"
                    />
                  </v-col>
                </v-row>
                <h2 class="text-center mt-5">¡Ups, No existen registros!</h2>
              </v-container>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-container>
  </v-card>
</template>
<script>
import LottieAnimation from "lottie-web-vue";
import { mapState } from "vuex";
export default {
  components: { LottieAnimation },
  props: {
    focus_table: null,
    f8: {
      headers: Array,
      body: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
  },
  data() {
    return {
      row: 0,
    };
  },
  watch: {
    focus_table(val) {
      if (val) {
        this.row = 0;
        window.addEventListener("keydown", this.nextElement);
      } else {
        window.removeEventListener("keydown", this.nextElement);
        this.row = undefined;
      }
    },
  },
  computed: {
    ...mapState({ isLoading: "isLoading" }),
    state_body() {
      if (!this.f8.body[0]) return true;
      else return false;
    },
    items() {
      const HEADERS = this.f8.headers;
      const BODY = this.f8.body;
      if (HEADERS[0]) {
        let items = BODY.map((el) => {
          let temp = [];
          HEADERS.forEach((ele) => {
            temp.push({
              row: el,
              value: el[ele.body_conector],
              cols: ele.cols,
            });
          });
          return temp;
        });
        return items;
      } else return BODY;
    },
  },
  methods: {
    cerrarBusqueda() {
      this.$emit("cerrar");
    },
    selectRow(row) {
      this.$emit("selectRow", row[0].row);
    },
    nextElement(event) {
      switch (event.keyCode) {
        case 38:
          this.row > 0 && this.row--;
          break;
        case 40:
          this.row < this.f8.body.length - 1 && this.row++;
          break;
        case 34:
        case 39:
          !this.isLoading && this.$emit("nextData", ">");
          setTimeout(() => {
            this.row = 0;
          }, 100);
          break;
        case 33:
        case 37:
          !this.isLoading && this.$emit("nextData", "<");
          setTimeout(() => {
            this.row = 0;
          }, 100);
          break;
        case 13:
          this.row != undefined && this.$emit("selectRow", this.f8.body[this.row]);
          break;
        case 27:
          this.row = undefined;
          this.$emit("escTable");
          break;
      }
    },
    format(dato) {
      if (dato != null) return typeof dato === "object" ? Object.values(dato).join("") : dato;
    },
  },
  destroyed() {
    this.f8.nroPeticion = 0;
    document.removeEventListener("keydown", this.nextElement);
  },
};
</script>
