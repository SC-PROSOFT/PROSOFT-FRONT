<template>
  <v-app>
    <spinner />
    <v-main style="background-color: #ececf5">
      <router-view />
    </v-main>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
    <v-dialog v-model="change_passowrd" persistent max-width="600">
      <v-card>
        <v-toolbar color="primary">
          <h1 class="white--text mx-auto">Bienvenid@ a Prosoft</h1>
        </v-toolbar>
        <v-container>
          <v-alert border="top" colored-border type="info" elevation="2">
            Para la nueva versión de Prosoft es necesario cambiar la clave que se le ha dado por defecto.
            <v-row justify="center">
              <v-col cols="6">
                <v-img :src="require('../src/assets/image/prueba.gif')" class="mx-auto" height="200" contain loading />
              </v-col>
              <v-col cols="6" class="mt-8">
                <v-form v-model="valid" lazy-validation ref="form">
                  <v-text-field
                    label="Clave nueva"
                    @input="user.clave = user.clave.toUpperCase()"
                    :rules="rules_clave"
                    v-model="user.clave"
                    maxlength="8"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    @input="user.new_clave = user.new_clave.toUpperCase()"
                    :rules="rules_new_clave"
                    v-model="user.new_clave"
                    label="Confimar clave"
                    maxlength="8"
                    outlined
                    dense
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-alert>

          <div class="text-center">
            <v-btn color="success" class="botone mx-2" @click="verificarClave()" :disabled="!valid">VERIFICAR CLAVE</v-btn>
            <v-btn color="primary" class="botone mx-2" @click="cambiarClave()" :disabled="!valid">CAMBIAR CLAVE</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { currentUser } from "../src/mixins/global";
import spinner from "./components/GENERAL/Spinner.vue";
import { password_change } from "../src/mixins/global";
import { nextAction } from "../src/mixins/nextAction";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { alert } from "../src/mixins/CON851";
//import JqueryTable from './Excel/JqueryTable.vue'

export default {
  name: "AppMain",
  mixins: [alert, nextAction],
  components: { spinner },

  data() {
    return {
      change_passowrd: false,
      user: {
        clave: "",
        new_clave: "",
      },
      valid: true,
      rules_clave: [
        (v) => !!v || "Nueva clave es requerida",
        (v) => v != "NUEVO123" || "La clave no puede ser igual que la anterior",
        (v) => v.length == 8 || "Clave debe tener 8 caracteres",
      ],
      rules_new_clave: [
        (v) => !!v || "Confirmar clave",
        (v) => v.length == 8 || "Clave debe tener 8 caracteres",
        (v) => v == this.user.clave || "Los campos no coinciden",
      ],
    };
  },
  computed: {
    ...mapGetters({
      estado: "CON851",
    }),
  },
  watch: {
    estado() {
      if (this.estado != "") {
        this.CON851(`${this.estado.code}`, `${this.estado.tipo}`, `${this.estado.descrip}`, `${this.estado.opcion}`);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (password_change && !["CON000", "/"].includes(this.$route.path)) {
        this.change_passowrd = true;
      }
    }, 200);
  },
  methods: {
    ...mapMutations({ CON851_DELETE: "CON851_DELETE", reinicioAcceso: "sesion/reinicioAcceso" }),
    ...mapActions({ _changePassword: "oper/_changePassword" }),

    async cambiarClave() {
      let validate = this.$refs.form.validate();

      if (validate) {
        try {
          const data = {
            llaveOper: currentUser.llaveOper,
            new_clave: btoa(this.user.new_clave),
          };
          const RES = await this._changePassword({ data });

          if (RES.N1) {
            this.CON851("N1", "success", `Clave cambiada correstamente`);
            setTimeout(() => {
              this.reinicioAcceso();
            }, 700);
          }
          RES.msg && this.CON851("N1", "error", `La clave actual no es correcta`);
        } catch (error) {
          console.error(error);
        }
      }
    },
    cancelar() {
      this.cancelarAlerta();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      if (["/Login", "/login"].includes(this.$route.path)) {
        setTimeout(() => {
          this.focusInput("", "", "usa");
        }, 100);
      } else if (this.$route.path != "/Menu-Principal") {
        setTimeout(() => {
          this.onField();
        }, 100);
      } else if (this.$route.path == "/Menu-Principal") {
        setTimeout(() => {
          document.getElementById("foo").click();
        }, 100);
      }
      this.CON851_DELETE();
    },
  },
};
</script>
<style lang="scss">
@import "./assets/app/style";
</style>
