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
            @next-action="nextStep(form_tipco, $event, keyDownCod)"
            @abrirF8="openCOR867"
            :field="form_tipco.codigo"
            :reg="reg_tipco.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_tipco, $event, keyDownDescrip)"
            :field="form_tipco.descripcion"
            :reg="reg_tipco.descripcion"
            @onChange="onChange"

          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_tipco, $event, keyDownDias)"
            :field="form_tipco.dias"
            :reg="reg_tipco.dias"
            @onChange="onChange"

          />
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
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <COR867
      v-if="show_cor867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    />
  </v-container>
</template>
<script>
import {
  getObjRegTipco_,
  getObjRegTipco,
} from "../../fuentes/correspondencia/regTipco";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import COR867 from "../../components/COR/COR867.vue";
import { global } from "../../mixins/global";

export default {
  name: "COR103",
  mixins: [nextAction, global],
  components: { COR867 },
  data() {
    return {
      titulo: "1.3 ACTUALIZA TIPOS CORRESPONDENCIA",

      novedad_activa: false,
      novedad: {},

      show_cor867: false,

      form_tipco: getObjRegTipco_(),
      reg_tipco: getObjRegTipco(),
    };
  },

  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaMotcn: "motcn/getLista",
    }),
  },

  methods: {
    onChange(data) {
      this.reg_tipco[data.key] = data.value;
    },

    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      /* tipco */
      _getTipco: "tipco/_getTipco",
      _newTipco: "tipco/_newTipco",
      _editTipco: "tipco/_editTipco",
      _delTipco: "tipco/_delTipco",
    }),

    /* Standard function */

    async confirmar() {
      this.cerrar_CON851();
      this.setDialogType("done");
      this.novedad.acceso == 7 && this.guardar();
      this.novedad.acceso == 8 && this.editar();
      this.novedad.acceso == 9 && this.eliminar();
    },

    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },

    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },

    async guardar() {
      try {
        const RES = await this._newTipco({ ...this.reg_tipco });

        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente`);
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async editar() {
      try {
        const codigo = this.reg_tipco.codigo;
        const data = this.reg_tipco;
        const RES = await this._editTipco({ data, codigo });
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente!`);
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async eliminar() {
      try {
        const codigo = this.reg_tipco.codigo;
        const RES = await this._delTipco({ codigo });
        RES.N1 && this.CON851("N1", "success", `Datos borrados correctamente!`);
        RES.msg &&
          this.CON851("N1", "error", `No se encontraron coincidencias`);
      } catch (error) {
        console.error(error);
      }
    },

    abrirNovedad() {
      this.reg_tipco = getObjRegTipco();

      this.novedad_activa = true;
      this.offField();
    },

    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_tipco, "codigo");

      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },

    openCOR867() {
      this.offField();
      this.show_cor867 = true;
    },

    callbackCOR867(item) {
      if (item) {
        this.reg_tipco = item;
      }
      this.show_cor867 = false;
      this.focusInput(this.form_tipco, "codigo");
    },

    /* Functions cod */
    async validateCod() {
      try {
        const codigo = this.reg_tipco.codigo;
        const RES = await this._getTipco({ codigo });

        if (RES.codigo) {
          this.reg_tipco = RES;
        }

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_tipco.codigo} ya existe`
              );
            else this.focusInput(this.form_tipco, "descripcion");
            break;

          case 8:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_tipco.codigo} no existe`
              );
            else this.focusInput(this.form_tipco, "descripcion");
            break;

          case 9:
            if (RES.msg) this.CON851("N1", "info", `El código no existe`);
            if (RES.codigo)
              this.CON851("PNZ", "info", `¿Eliminar documento?`, "P");
            break;

          default:
            break;
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },

    /* Functions descrip */
    async validateDescrip() {
      switch (this.novedad.acceso) {
        case 7:
          if (
            this.reg_tipco.descripcion == "" ||
            this.reg_tipco.descripcion == undefined
          )
            this.CON851("02", "info");
          else if (this.reg_tipco.descripcion.length > 0)
            this.focusInput(this.form_tipco, "dias");
          break;

        case 8:
          if (
            this.reg_tipco.descripcion == "" ||
            this.reg_tipco.descripcion == undefined
          )
            this.CON851("02", "info");
          else if (this.reg_tipco.descripcion.length > 0)
            this.focusInput(this.form_tipco, "dias");
          break;

        default:
          break;
      }
    },

    /* Functions dias */
    async validateDias() {
      switch (this.novedad.acceso) {
        case 7:
          this.CON851("PNZ", "info", `¿Desea grabar datos?`, "p");
          break;

        case 8:
          this.CON851("PNZ", "info", `¿Desea grabar datos?`, "p");
          break;

        default:
          break;
      }
    },

    /* Input Functions */
    keyDownCod(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          if (this.reg_tipco.codigo == "") {
            this.CON851("02", "info");
          } else if (this.reg_tipco.codigo.length > 0) {
            this.validateCod();
          }

          break;

        default:
          break;
      }
    },

    keyDownDescrip(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_tipco, "codigo");
          break;

        case "enter":
          this.validateDescrip();

        default:
          break;
      }
    },

    keyDownDias(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_tipco, "descripcion");
          break;

        case "enter":
          if (this.reg_tipco.dias == "" || this.reg_tipco.dias == undefined) {
            this.CON851("02", "info");
          } else if (this.reg_tipco.dias.toString().length > 0) {
            this.validateDias();
          }
          break;

        default:
          break;
      }
    },
  },

  /* hooks */

  mounted() {
    this.abrirNovedad();
  },
};
</script>
