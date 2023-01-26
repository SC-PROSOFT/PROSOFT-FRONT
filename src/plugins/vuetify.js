import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#123d7d",
        secondary: "#21759c",
        tertiary: "#054D50",
        background: "#ececf5",
        accent: "#71c3c7",
        error: "#cc0000",
        info: "#123d7d",
        salir: "#09696e",
        success: "#4BB543",
        warning: "#FFC107",
      },
    },
  },
});
