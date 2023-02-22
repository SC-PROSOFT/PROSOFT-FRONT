<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" />
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
            @next-action="nextStep(form_macro, $event, datoTipo)"
            @abrirF8="openCOR867"
            :field="form_macro.tipo"
            :reg="reg_macro.tipo"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_macro.tipo_descripcion"
            :reg="reg_macro.tipo_descripcion"
       
          ></data-card>
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_macro, $event, datoCodigo)"
            @abrirF8="openCORmacro"
            :field="form_macro.codigo"
            :reg="reg_macro.codigo"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_macro, $event, datoDescripcion)"
            :field="form_macro.descripcion"
            :reg="reg_macro.descripcion"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- Macro -->
        <v-col cols="12" class="input-col">
          <TEXTAREA
            rows="5"
            placeholder="Escribe tu texto aquí"
            wrap="soft"
            @next-action="nextStep(form_macro, $event, datoText)"
            :field="form_macro.text"
            :reg="reg_macro.text"
            @onChange="onChange"
          ></TEXTAREA>
            <h5>CTRL + ENTER Guardar</h5>
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
    <COR867
      v-if="show_cor867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    ></COR867>
    <CORmacro
      v-if="show_cormacro"
      :field="f8_busqueda"
      @callBack="callbackCORmacro"
      @callbackEsc="callbackCORmacro"
    ></CORmacro>
  </v-container>
</template>
<script>
import {
  getObjRegMacroRespuesta,
  getObjRegMacroRespuesta_,
} from "../../fuentes/correspondencia/regMacroRespuesta";
import { mapMutations, mapActions, mapGetters } from "vuex";
//import CORmacro from "../../components/COR/CORmacro.vue";
import COR867 from "../../components/COR/COR867.vue";
import CORmacro from "../../components/COR/CORmacro.vue";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import moment from "moment";

export default {
  name: "COR402",
  mixins: [nextAction, global],
  components: { CORmacro, COR867 },

  data() {
    return {
      /* text area */
      rules: [(v) => v.length <= 25 || "Max 25 caracteres"],
      value: "Empecemos!",
      /* ------------------------------------------------------ */
      titulo: " 4.2 Macro respuesta Corresp",
      novedad_activa: false,
      novedad: {},

      f8_busqueda: "",

      show_cormacro: false,
      show_cor867: false,

      form_macro: getObjRegMacroRespuesta_(),
      reg_macro: getObjRegMacroRespuesta(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaTipco: "tipco/getLista",
      /* macro */
      _getListaMacro: "macro/getLista",
    }),
  },

  watch: {
    "reg_macro.tipo"(newVal) {
      this.f8_busqueda = newVal;
    },
  },

  mounted() {
  
    this.abrirNovedad();
  },

  methods: {
    onChange(data) {
      this.reg_macro[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getTipco: "tipco/_getTipco",
      /* macro */
      _delMacro: "macro/_delMacro",
      _getMacro: "macro/_getMacro",
      _editMacro: "macro/_editMacro",
      _newMacro: "macro/_newMacro",
      /* buscar ID */
      _getMacroId: "macro/_getMacroId",
      _getMacroF8: "macro/_getMacroF8",
    }),

    openCOR867() {
      this.offField();
      this.show_cor867 = true;
    },
    callbackCOR867(item) {
      if (item) {
        this.reg_macro.tipo = item.codigo;
        this.reg_macro.tipo_descripcion = item.descripcion;
      }
      this.show_cor867 = false;
      this.focusInput(this.form_macro, "tipo");
    },
    openCORmacro() {
      this.offField();
      this.show_cormacro = true;
    },
    async callbackCORmacro(item) {
      if (item) {
        this.reg_macro.codigo = item.llave.cl + item.llave.codigo;
        this.reg_macro.codigo = item.llave.codigo;
      }
      this.focusInput(this.form_macro, "codigo");
      this.show_cormacro = false;
    },
    async datoTipo(val) {
      switch (val) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          await this.validateTipo();
          break;
      }
    },
    async validateTipo() {
      try {
        const RES = await this._getTipco({ codigo: this.reg_macro.tipo });
        this.reg_macro.tipo_descripcion = RES.descripcion;
        switch (this.novedad.acceso) {
          case 7:
            if (RES.msg) {
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_macro.codigo} no existe`
              );
            } else {
              this.reg_macro.tipo_descripcion = RES.descripcion;
              //this.mostrarDatos();
              this.focusInput(this.form_macro, "codigo");
            }
          case 8:
            if (RES.msg) {
              this.CON851(
                "N1",
                " info",
                `El codigo ${this.reg_macro.codigo} no existe`
              );
            } else {
              this.focusInput(this.form_macro, "codigo");
            }
          case 9:
            if (RES.msg) {
              this.CON851(
                "N1",
                " info",
                `El codigo ${this.reg_macro.codigo} no existe`
              );
            } else {
              this.focusInput(this.form_macro, "codigo");
            }
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },

    async datoCodigo(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_macro, "tipo");
          break;
        case "enter":
          await this.validatecodigo();
          break;
      }
    },
    async validatecodigo() {
      const RES = await this._getMacroId({
        cl: this.reg_macro.tipo,
        codigo: this.reg_macro.codigo,
      });
      switch (this.novedad.acceso) {
        case 7:
          if (RES.llave) {
            this.CON851(
              "N1",
              "info",
              `El código ${this.reg_macro.codigo} Ya existe`
            );
          } else {
            this.focusInput(this.form_macro, "descripcion");
          }
          break;
        case 8:
          if (RES.msg) {
            this.CON851(
              "N1",
              "info",
              `El codigo ${this.reg_macro.codigo} no existe`
            );
            //this.focusInput(this.form_macro.codigo, "codigo");
          } else {
            //this.reg_macro.descripcion = RES.descripcion;
            this.reg_macro.descripcion = RES.detalle;
            this.reg_macro.text = RES.tabla;
            this.focusInput(this.form_macro, "text");
          }
          break;
        case 9:
          if (RES.msg)
            this.CON851(
              "N1",
              "info",
              `El código  Auxiliar ${this.reg_macro.codigo} no existe`
            );
          else {
            this.reg_macro.descripcion = RES.detalle;
            this.reg_macro.text = RES.tabla;
            this.CON851(
              "PNZ",
              "info",
              `¿Seguro que desea eliminar Macro?`,
              "P"
            );
          }
      }
    },

    async datoDescripcion(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_macro, "codigo");

          break;
        case "enter":
          this.focusInput(this.form_macro, "text");

          // this.focusInput(this.form_macro, "datoText");
          break;
      }
    },

    // async validateDescripcion() {
    //   this.form_macro.descripcion == "" && this.CON851("02", "info");
    //   this.focusInput(this.form_macro.descripcion, "text");
    // },
    async datoText(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_macro, "descripcion");
          break;
        case "enter":
          if (this.form_macro.text == "" && this.CON851) return "02", "info";
          else
            this.novedad.acceso == 7 &&
              this.CON851(
                "PNZ",
                "info",
                `¿Deseas crear Macro respuesta correspondencia?`,
                "p"
              );
          this.novedad.acceso == 8 &&
            this.CON851("PNZ", "info", `Desea cambiar Macro de respuesta`, "p");

        default:
          break;
      }
    },
    async validateText() {},

    async confirmar() {
      this.cerrar_CON851();
      this.setDialogType("done");
      this.novedad.acceso == 7 && this.guardar();
      this.novedad.acceso == 8 && this.editar();
      this.novedad.acceso == 9 && this.eliminar();
    },
    async guardar() {
      let usuario = this.USUARIO_GLOBAL;
      let data = {
        llave: {
          cl: this.reg_macro.tipo,
          codigo: this.reg_macro.codigo,
        },
        detalle: this.reg_macro.descripcion,
        tabla: this.reg_macro.text,
        oper: usuario.nombre,
        fechOper: moment().format("YYYY-MM-DD"),
      };
      const RES = await this._newMacro(data);
      RES.N1 &&
        this.CON851(
          "N1",
          "success",
          `Servicio de correspondencia guardado`,
          null,
          () => {
            if (this.$route.query.codigo) return window.close();
            this.abrirNovedad();
          }
        );
      RES.msg &&
        this.CON851(
          "N1",
          "error",
          `No se pudo crear Servicio de correspondencia`
        );
    },

    async editar() {
      try {
        let usuario = "COBO";
        const data = {
          llave: {
            cl: this.reg_macro.tipo,
            codigo: this.reg_macro.codigo,
          },
          detalle: this.reg_macro.descripcion,
          tabla: this.reg_macro.text,
          oper: usuario,
          fechOper: moment().format("YYYY-MM-DD"),
        };
        const RES = await this._editMacro({
          cl: this.reg_macro.tipo,
          codigo: this.reg_macro.codigo,
          data,
        });

        RES.N1 && this.CON851("N1", "success", `Macro modificado`);
        RES.msg && this.CON851("N1", "error", `No se pudo modificar Macro`);
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const RES = await this._delMacro({
          cl: this.reg_macro.tipo,
          codigo: this.reg_macro.codigo,
        });
        RES.N1 &&
          this.CON851("N1", "success", `Macro eliminado correctamente!`);
        RES.msg && this.CON851("N1", "error", `No se pudo eliminar Macro`);
      } catch (error) {
        console.error(error);
      }
    },

    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    abrirDialogo() {
      this.offField();
      this.CON851("MENU", "warning", "", "P");
    },
    abrirNovedad() {
      this.reg_macro = getObjRegMacroRespuesta();

      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_macro, "tipo");
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
