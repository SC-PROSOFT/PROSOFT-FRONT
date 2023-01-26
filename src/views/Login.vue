<template>
  <v-container class="fill-height">
    <v-card :loading="getLoading" @keyup="checkKey" class="mx-auto" elevation="24" height="500" width="1000" shaped>
      <v-row justify="center" align="center">
        <v-col cols="7" md="5" sm="5">
          <v-card-text class="mt-6">
            <h2 class="primary--text text-center text-md-h4">Iniciar sesión</h2>
            <v-row justify="center" class="py-10">
              <v-col cols="12" sm="8" md="8" xs="8">
                <v-form ref="form">
                  <v-text-field
                    :rules="[() => form.usuario.length <= 4 || 'El usuario debe tener 4 caracteres']"
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    @input="(val) => (form.usuario = form.usuario.toUpperCase())"
                    prepend-icon="mdi-account-circle"
                    placeholder="Ingresa usuario"
                    v-on:keypress.enter="paso()"
                    @focus="cambio = 'usuario'"
                    v-model="form.usuario"
                    label="Usuario"
                    color="primary"
                    elevation="12"
                    maxlength="4"
                    class="mt-6"
                    counter="4"
                    autofocus
                    ref="usa"
                    outlined
                    id="usa"
                    dense
                  />

                  <v-text-field
                    :rules="[() => form.contraseña.length <= 8 || 'La contraseña debe tener menos o igual a 8 caracteres']"
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    @input="(val) => (form.contraseña = form.contraseña.toUpperCase())"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Ingresa contraseña"
                    @focus="cambio = 'contraseña'"
                    v-model="form.contraseña"
                    @keypress.enter="login()"
                    prepend-icon="mdi-lock"
                    autocomplete="true"
                    label="Contraseña"
                    ref="contraseña"
                    color="primary"
                    maxlength="8"
                    counter="8"
                    outlined
                    dense
                  />
                </v-form>
                <v-hover v-slot="{ hover }" open-delay="50">
                  <v-btn
                    class="mr-8 mt-4 text-md-overline"
                    :elevation="hover ? 24 : 0"
                    :disabled="getLoading"
                    :loading="getLoading"
                    @click="login()"
                    color="primary"
                    shaped
                    block
                  >
                    Inicia sesión
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-col cols="5" md="7" sm="7">
          <v-card shaped class="primary rounded-bl-xl" height="500">
            <!-- src="https://res.cloudinary.com/eonia/image/upload/v1655158010/PENSADOR_esmnhh.png" -->
            <div class="pt-10">
              <v-img :src="require('../assets/image/prueba.gif')" class="mx-auto" height="400" width="280" loading />
            </div>
            <p class="white--text text-center">© 2022 Prosoft - Versión 4.0.0</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-container>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import logoprosoft from "../assets/image/prueba.json";
import LottieAnimation from "lottie-web-vue";
import { global } from "../mixins/global";
import moment from "moment";

export default {
  components: { LottieAnimation },
  mixins: [global],
  data: () => ({
    logoprosoft: logoprosoft,
    loader: null,
    cambio: "",
    form: {
      usuario: "",
      contraseña: "",
    },
    image: "",
    showPassword: false,
  }),
  mounted() {
    localStorage.removeItem("modulo");
  },
  computed: {
    ...mapGetters({
      getLoading: "estadoLoading",
    }),
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    "form.contraseña"() {
      if (this.cambio === "contraseña" && this.form.contraseña.length === 8) {
        this.login();
      }
    },
    form: {
      deep: true,
      handler(form) {
        if (this.cambio === "usuario" && form.usuario.length === 4) {
          this.$refs.contraseña.focus();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      getUser: "sesion/getUsuarios",
    }),
    ...mapMutations({
      isLoading: "isLoading",
    }),
    cancelarAlerta() {
      this.cerrar_CON851();
      setTimeout(() => {
        this.$refs.usa.focus();
      }, 100);
    },
    checkKey(event) {
      switch (event.which) {
        case 27:
          this.$refs.usa.focus();
          break;
      }
    },
    validarConfig(datos) {
      if (datos.usuario == "GEBC") {
        let f_a = moment().format("YYYY-MM-DD");
        f_a = f_a.split("-").join("");
        let password_GEBC = `SC${Number(f_a.slice(2, 4)) + Number(f_a.slice(4, 6))}${Number(f_a.slice(2, 4)) + Number(f_a.slice(6))}${
          Number(f_a.slice(4, 6)) + Number(f_a.slice(6))
        }`;
        if (password_GEBC == datos.contraseña) return this.$router.push("/Configuracion");
        else {
          return { config_password: "NO-PASSWORD" };
        }
      } else {
        return { no_config: "NO-CONFIG" };
      }
    },

    async login() {
      // if ((!localStorage.ipPublica || !localStorage.ipLocal) && !localStorage.puerto) {
      //   const RES = this.validarConfig(this.form);
      //   RES?.config_password && this.CON851("USER", "error");
      //   RES?.no_config && this.CON851("PNZ", "error", "No se ha configurado el servidor");
      // } else {
      let { usuario } = this.form;
      if (!usuario) {
        this.CON851("02", "info", "usuario");
      } else {
        try {
          const RES = await this.getUser({ ...this.form });
          if (RES == -1) return this.validarConfig(this.form);
          RES?.msg && this.CON851("USER", "error");
        } catch (error) {
          console.error(error);
        }
      }
      // }
    },
    paso() {
      this.$refs.contraseña.focus();
    },
  },
};
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 120px !important;
}
.v-application .rounded-br-xl {
  width: 100%;
  border-radius: 50%;
}
.v-application .letra {
  color: crimson;
  font-family: "Times New Roman", Times, serif;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
