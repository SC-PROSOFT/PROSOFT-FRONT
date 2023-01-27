<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" @cerrar="validarSalir" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row align="center">
        <v-col class="font-weight-light text-center">
          <h4 :class="`${novedad.color}--text`">
            <v-icon :color="novedad.color">{{ novedad.icono }}</v-icon>
            {{ novedad.novedad }}
          </h4>
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_oper, $event, datoOperDep)"
            :field="form_oper.llaveOper"
            :reg="reg_rest"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card :field="form_oper.nombre" :reg="reg_rest"></data-card>
        </v-col>
        <v-col cols="12" sm="3" md="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_oper, $event, datoClave)"
            :field="form_oper.clave"
            :reg="reg_rest"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="3" md="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_oper, $event, datoNewClave)"
            :field="form_oper.new_clave"
            :reg="reg_rest"
          ></INPUT>
        </v-col>
      </v-row>
    </v-card>
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    ></CON850>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>

    <CON982
      v-if="show_con982"
      @callBack="callbackCON982"
      @callbackEsc="callbackCON982"
    />
  </v-container>
</template>
<script>
import {
  getObjRegRest,
  getObjRegRest_,
} from "../../fuentes/correspondencia/regRest";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { currentUser, global } from "../../mixins/global";
import CON982 from "../../components/CONTAB/CON982.vue";
import { nextAction } from "../../mixins/nextAction";

export default {
  name: "COR102",
  mixins: [nextAction, global],
  components: { CON982 },
  data() {
    return {
      titulo: " Actualiza configuración de cuenta",
      novedad_activa: false,
      novedad: {},
      current_password: "",
      flag: "",

      show_con982: false,

      form_oper: getObjRegRest_(),
      reg_rest: getObjRegRest(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaSerco: "serco/getLista",
      _getListaDepco: "depco/getLista",
    }),
  },

  mounted() {
    this.reg_rest.llaveOper = currentUser.llaveOper;
    this.firstField(this.form_oper);
  },
  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
      reinicioAcceso: "sesion/reinicioAcceso",
    }),
    ...mapActions({
      _getOper: "oper/_getOper",
      _changePassword: "oper/_changePassword",
    }),
    openCON982() {
      this.offField();
      this.show_con982 = true;
    },
    callbackCON982(item) {
      if (item) {
        this.reg_rest.llaveOper = item.llaveOper;
        this.reg_rest.nombre = item.nombre;
        this.current_password = item.clave;
        this.focusInput(this.form_oper, "clave");
      }
      this.focusInput(this.form_oper, "llaveOper");
      this.show_con982 = false;
    },

    datoOperDep(val) {
      switch (val) {
        case "esc":
          this.flag = "exit";
          this.abrirDialogo();
          break;
        case "enter":
          if (this.reg_rest.llaveOper == "") return this.CON851("02", "info");
          else {
            this.mostrarDatosOper();
          }
          break;
      }
    },
    async mostrarDatosOper() {
      try {
        const RES = await this._getOper({ codigo: this.reg_rest.llaveOper });
        this.reg_rest.llaveOper = RES.llaveOper;
        this.reg_rest.nombre = RES.nombre;
        this.current_password = RES.clave;
        if ("llaveOper" in this.reg_rest)
          this.focusInput(this.form_oper, "clave");
        else return this.CON851("02", "info");
      } catch (error) {
        console.error(error);
      }
    },
    datoClave(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_oper, "llaveOper");
          break;
        case "enter":
          if (this.reg_rest.clave == "") return this.CON851("02", "info");
          else this.focusInput(this.form_oper, "new_clave");
          break;
      }
    },
    datoNewClave(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_oper, "clave");
          break;
        case "enter":
          if (this.reg_rest.new_clave == "") this.CON851("02", "info");
          else if (this.current_password == this.reg_rest.new_clave) {
            return this.CON851("PNZ", "info", "La clave no puede ser la misma");
          } else this.cambiarPassword();
          break;
      }
    },
    async cambiarPassword() {
      try {
        const data = {
          llaveOper: this.reg_rest.llaveOper,
          clave: btoa(this.reg_rest.clave),
          new_clave: btoa(this.reg_rest.new_clave),
        };
        const RES = await this._changePassword({ data });

        if (RES.N1) {
          this.flag = "success";
          this.CON851("N1", "success", `Clave cambiada correstamente`);
        }
        RES.msg && this.CON851("N1", "error", `La clave actual no es correcta`);
      } catch (error) {
        console.error(error);
      }
    },
    validarSalir() {
      this.flag = "exit";
      this.abrirDialogo();
    },

    async confirmar() {
      if (["success", "exit"].includes(this.flag)) return this.reinicioAcceso();
      this.cerrar_CON851();
      this.setDialogType("done");
    },

    cancelar() {
      this.cerrar_CON851();
      this.onField();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      if (["success", "exit"].includes(this.flag)) return this.reinicioAcceso();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    abrirDialogo() {
      this.offField();
      this.CON851(
        "PNZ",
        "warning",
        "No podras hacer ninguna acción hasta no cambiar la contraseña",
        "P"
      );
    },
  },
};
</script>
