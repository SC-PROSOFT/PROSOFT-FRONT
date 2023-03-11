<template>
  <v-container class="fill-height">
    <v-card
      :loading="loading"
      class="mx-auto"
      elevation="24"
      height="500"
      width="1000"
      shaped
    >
      <v-row justify="center" align="center">
        <v-col cols="7" md="5" sm="5">
          <v-card-text class="mt-6">
            <h2 class="primary--text text-center text-md-h4">Iniciar sesión</h2>
            <v-row justify="center" class="py-10">
              <v-form ref="form">
                <INPUT_
                  :field="form.usuario"
                  v-model="ingreso.usuario"
                  @next-action="datoUsuario"
                  @F2="abrirConfig"
                  class="col-12 col-sm-12 col-md-12 col-xs-12 mx-auto"
                />
                <INPUT_
                  :field="form.contrasena"
                  @next-action="datoClave"
                  v-model="ingreso.contrasena"
                  class="col-12 col-sm-12 col-md-12 col-xs-12 mx-auto"
                />
              </v-form>
              <div class="col-10 col-sm-10 col-md-10 col-xs-10 mb-4">
                <v-hover v-slot="{ hover }" open-delay="50">
                  <v-btn
                    :elevation="hover ? 24 : 0"
                    class="text-md-overline"
                    :disabled="loading"
                    :loading="loading"
                    color="primary"
                    @click="validarIngreso"
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
              </div>
              <AUTOCOMPLETE_
                :items="contabilidades"
                :field="form.contabilidad"
                v-model="ingreso.contabilidad"
                class="col-12 col-sm-5 col-md-5 col-xs-5"
              />
              <AUTOCOMPLETE_
                :items="meses"
                :field="form.mes"
                v-model="ingreso.mes"
                class="col-12 col-sm-5 col-md-5 col-xs-5"
              />
            </v-row>
            <p class="black--text text-center">
              {{
                ingreso.modulo
                  ? ingreso.modulo?.toUpperCase()
                  : "No hay modulo seleccionado"
              }}
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="5" md="7" sm="7">
          <v-card shaped class="primary rounded-bl-xl" height="500">
            <div class="pt-10">
              <v-img
                :src="require('../assets/image/prueba.gif')"
                class="mx-auto"
                height="400"
                width="280"
                loading
              />
            </div>
            <p class="white--text text-center">
              © 2023 {{ this.env_package.name }} - Versión
              {{ this.env_package.version }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <CONFIGURACION
      v-if="config.estado"
      :config="config"
      @cerrar="config.estado = false"
      @guardar="grabarConfig"
    />
  </v-container>
</template>
<script>
import CONFIGURACION from "@/components/CONFIGURACION/ConfigIngreso.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import logoprosoft from "../assets/image/prueba.json";
import env_package from "./../../package.json";
import { global } from "@/mixins/global";
import LottieAnimation from "lottie-web-vue";
import moment from "moment";

export default {
  mixins: [global],
  components: { LottieAnimation, CONFIGURACION },
  data() {
    return {
      config: {
        estado: false,
        modulos: [],
      },
      info_usunet: [],
      env_package: env_package,
      logoprosoft: logoprosoft,
      loader: null,
      ip: "",
      ingreso: {
        usuario: "",
        contrasena: "",
        modulo: "",
        contabilidad: "",
        nomina: "",
        mes: "",
      },
      form: {
        usuario: {
          id: "usuario",
          label: "Usuario",
          maxlength: "4",
          required: true,
          placeholder: "Ingresar usuario",
          campo_abierto: true,
          prepend_icon: "mdi-account-circle",
        },
        contrasena: {
          id: "contrasena",
          maxlength: "8",
          label: "Clave",
          campo_abierto: true,
          placeholder: "Ingresar clave",
          prepend_icon: "mdi-lock",
          show_contrasena: false,
        },
        contabilidad: {
          id: "contabilidad",
          label: "Contabilidad",
          campo_abierto: true,
          item_value: "cod",
          item_text: "cod",
        },
        mes: {
          id: "mes",
          label: "Mes",
          item_value: "cod",
          campo_abierto: true,
          item_text: "text",
        },
      },
      meses: [
        { cod: "13", text: "CONTROL" },
        { cod: "1", text: "ENERO" },
        { cod: "2", text: "FEBRERO" },
        { cod: "3", text: "MARZO" },
        { cod: "4", text: "ABRRIL" },
        { cod: "5", text: "MAYO" },
        { cod: "6", text: "JUNIO" },
        { cod: "7", text: "JULIO" },
        { cod: "8", text: "AGOSTO" },
        { cod: "9", text: "SEPTIEMBRE" },
        { cod: "10", text: "OCTUBRE" },
        { cod: "11", text: "NOVIEMBRE" },
        { cod: "12", text: "DICIEMBRE" },
        { cod: "14", text: "CIERRE" },
      ],
      contabilidades: [],
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
  computed: {
    ...mapGetters({ loading: "estadoLoading" }),
  },
  mounted() {
    this.infoServe();
    this.ip = localStorage?.IP;
    console.log(this.ip);
    this.ingreso.modulo = localStorage?.MODULO;

    this.FOCO_(this.form, "usuario");
  },
  methods: {
    ...mapMutations({ CON851: "CON851" }),
    ...mapActions({
      _getUsuario: "usuario/_getUsuario",
      _infoServe: "servidor/_infoServe",
      _CON904: "servidor/_CON904",
    }),
    abrirConfig() {
      this.config.estado = true;
    },
    async infoServe() {
      try {
        const RES = await this._infoServe();
        console.log(RES, "info serev");
        const { CONTAB, NOMINA, ...usunet } = RES.Usunet[0];

        CONTAB.pop();
        NOMINA.pop();
        RES.MODULOS.pop();

        this.info_usunet = usunet;
        let modulos = RES.MODULOS.map((e) => ({
          COD: e.COD,
          DESCRIPT: e.DESCRIP,
          ACT: e.ACT,
          text: e.COD + " - " + e.DESCRIP,
        }));
        this.ingreso.modulo = modulos.find(
          (e) => e.COD == localStorage.Modulo
        )?.DESCRIPT;
        this.ingreso.nomina = NOMINA;
        this.contabilidades = CONTAB.reverse().map(({ DIR }) => ({
          cod: DIR?.trim(),
        }));
        this.ingreso.contabilidad = this.contabilidades[0].cod || "";
        this.ingreso.mes = moment().format("M");
        this.config.modulos = modulos;
      } catch (error) {
        this.CON851([
          "?",
          "info",
          "No se ha configurado",
          () => this.FOCO_(this.form, "usuario"),
        ]);
      }
    },
    grabarConfig(datos) {
      localStorage.IP = datos.ip;
      this.ip = datos.ip;
      localStorage.Modulo = datos.modulo;
      localStorage.sucursal = datos.sucursal;
      localStorage.id_maquina = datos.id_maquina;

      this.config.estado = false;

      if (this.config.modulos.length) {
        this.ingreso.modulo = this.config.modulos.find(
          (e) => e.COD == localStorage.Modulo
        )?.DESCRIPT;
      } else this.infoServe();
      this.CON851([
        "?",
        "success",
        "Configuración grabada correctamente",
        () => this.FOCO_(this.form, "usuario"),
      ]);
    },

    datoUsuario(event) {
      switch (event) {
        case "esc":
          return this.FOCO_(this.form, "usuario");
        case "enter":
          return this.FOCO_(this.form, "contrasena");
      }
    },
    datoClave(event) {
      switch (event) {
        case "esc":
          return this.FOCO_(this.form, "usuario");
        case "enter":
          return this.validarIngreso();
      }
    },

    validarIngreso() {
      const { usuario, contabilidad, modulo } = this.ingreso;
      console.log("INGRESO", this.ingreso);
      if (!this.ip)
        return this.CON851([
          "02",
          "info",
          "Dirección Ip",
          () => (this.config.estado = true),
        ]);
      if (!modulo) {
        return this.CON851([
          "02",
          "info",
          "modulo",
          () => (this.config.estado = true),
        ]);
      }
      if (!usuario)
        return this.CON851([
          "02",
          "info",
          "usuario",
          () => this.FOCO_(this.form, "usuario"),
        ]);
      if (!contabilidad)
        return this.CON851([
          "02",
          "info",
          "contabilidad",
          () => this.FOCO_(this.form, "contabilidad"),
        ]);
      this.login();
    },
    async login() {
      try {
        const RES = await this._getUsuario({ ...this.ingreso });
        this.recibirLogin(RES);
      } catch (error) {
        this.CON851([
          "USER",
          "info",
          "",
          () => this.FOCO_(this.form, "usuario"),
        ]);
      }
    },

    async recibirLogin(datos) {
      let { contrasena, contabilidad, input_contab, mes, btn_edit } =
        this.ingreso;
      let contab = !btn_edit ? contabilidad : input_contab;

      let modulo = localStorage.Modulo;
      let consulta = this.config.modulos.find(
        (e) => e.COD == localStorage.Modulo
      );

      if (datos.EST == "01") {
        if (!consulta) this.CON851(["?", "info", "No se encontraron modulos"]);
        else if (consulta.ACT != "S")
          this.CON851(["?", "info", "Modulo no se encuentra activo"]);
        else {
          localStorage.Clave = contrasena || "";
          localStorage.Usuario = datos.OPER.trim();
          localStorage.IDUSU = datos.IDUSU.trim();
          localStorage.Nombre = datos.NOMUSU.trim();
          localStorage.Sesion = datos.SESSIOUSU.trim();
          localStorage.Vendedor = datos.VENDEDOR.trim();
          localStorage.IdUsunet = datos.NITUSUNET.trim();
          localStorage.Contab = contab;
          localStorage.Nomina = "";
          localStorage.Mes = mes;
          localStorage.config = btoa(JSON.stringify(this.config));
          localStorage.Unidad = this.info_usunet["UNID-PROG"].toUpperCase();

          if (["DOM", "PRY"].includes(modulo)) {
            localStorage.Contab = "";
            localStorage.Carpeta_modulo = contab;
          }
          let option = "C";
          if (localStorage.Modulo.trim() == "HIC") option = "ISH";
          await this._CON904({
            datosh: "|" + contab + "||" + datos.OPER + "|" + option + "|",
          }).then((data) => {});
        }
      }
      this.restricciones();
    },
    async restricciones(datos) {
      let { contrasena, contabilidad, input_contab, btn_edit } = this.ingreso;
      let modulo = localStorage.Modulo;
      let sesion = localStorage.Sesion;
      let contab = localStorage.Contab;
      let mes = localStorage.Mes;
      let usuario = localStorage.Usuario;
      let opcion = localStorage.Opcion;
      console.log(
        "🚀 ~ file: Login2.vue:384 ~ restricciones ~ Sesion:",
        sesion
      );
      let consulta = this.config.modulos.find(
        (e) => e.COD == localStorage.Modulo
      );

      console.log(
        "🚀 ~ file: Login2.vue:384 ~ restricciones ~ modulo:",
        modulo
      );

      const data = {
        datosh: `${sesion}|${contab}|${mes}|${usuario}|${opcion}`,
      };
      console.log("🚀 ~ file: Login2.vue:401 ~ restricciones ~ data:", data);
      const RES = await this._CON904(data);
      console.log("🚀 ~ file: Login2.vue:343 ~ restrcciones ~ RES:", RES);
      //location.reload();
    },
  },
};
</script>
