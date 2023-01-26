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
          <INPUT @next-action="nextStep(form_depremi, $event, keyDownCod)" @abrirF8="openCOR879" :field="form_depremi.codigo" :reg="reg_depremi" />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT @next-action="nextStep(form_depremi, $event, keyDownDescrip)" :field="form_depremi.descripcion" :reg="reg_depremi" />
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
    />
    <CON850 @novedadSelec="novedadSelec($event)" :novedad_activa="novedad_activa" v-if="novedad_activa" />
    <COR879 v-if="show_cor879" @callBack="callbackCOR879" @callbackEsc="callbackCOR879" />
  </v-container>
</template>
<script>
import { getObjRegDepremi_, getObjRegDepremi } from "../../fuentes/correspondencia/regDepremi";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import COR879 from "../../components/COR/COR879.vue";

export default {
  name: "COR106",
  mixins: [nextAction, global],
  components: { COR879 },
  data() {
    return {
      titulo: "1.6 CREAR DEPENDENCIA REMITENTES",
      novedad_activa: false,
      novedad: {},

      show_cor879: false,

      form_depremi: getObjRegDepremi_(),
      reg_depremi: getObjRegDepremi(),
    };
  },

  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaMotcn: "motcn/getLista",
    }),
  },

  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      /* depremi */
      _getDepremi: "depremi/_getDepremi",
      _newDepremi: "depremi/_newDepremi",
      _editDepremi: "depremi/_editDepremi",
      _delDepremi: "depremi/_delDepremi",
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
        const RES = await this._newDepremi({ ...this.reg_depremi });

        console.log("my res: ", RES);
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente`);
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async editar() {
      try {
        const codigo = this.reg_depremi.codigo;
        const data = this.reg_depremi;
        const RES = await this._editDepremi({ data, codigo });
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente!`);
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async eliminar() {
      try {
        const codigo = this.reg_depremi.codigo;
        const RES = await this._delDepremi({ codigo });
        RES.N1 && this.CON851("N1", "success", `Datos borrados correctamente!`);
        RES.msg && this.CON851("N1", "error", `No se encontraron coincidencias`);
      } catch (error) {
        console.error(error);
      }
    },

    abrirNovedad() {
      this.reg_depremi = getObjRegDepremi();

      this.novedad_activa = true;
      this.offField();
    },

    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_depremi, "codigo");

      data.acceso == "F" ? this.$router.push("/Menu-Principal") : (this.novedad = Object.assign({}, data));
    },

    openCOR879() {
      this.offField();
      this.show_cor879 = true;
    },

    callbackCOR879(item) {
      if (item) {
        console.log("callback item: ", item);
        this.reg_depremi = item;
      }
      this.show_cor879 = false;
      this.focusInput(this.form_depremi, "codigo");
    },

    /* Functions cod */
    async validateCod() {
      try {
        const codigo = this.reg_depremi.codigo;
        const RES = await this._getDepremi({ codigo });
        console.log("my res: ", RES);

        if (RES.codigo) {
          this.reg_depremi = RES;
        }

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo) this.CON851("N1", "info", `El código ${this.reg_depremi.codigo} ya existe`);
            else this.focusInput(this.form_depremi, "descripcion");
            break;

          case 8:
            if (RES.msg) this.CON851("N1", "info", `El código ${this.reg_depremi.codigo} no existe`);
            else this.focusInput(this.form_depremi, "descripcion");
            break;

          case 9:
            if (RES.msg) this.CON851("N1", "info", `El código no existe`);
            if (RES.codigo) this.CON851("PNZ", "info", `¿Eliminar documento?`, "P");
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
          if (this.reg_depremi.codigo == "") {
            this.CON851("02", "info");
          } else if (this.reg_depremi.codigo.length > 0) {
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
          this.focusInput(this.form_depremi, "codigo");
          break;

        case "enter":
          if (this.reg_depremi.descripcion == "") {
            this.CON851("02", "info");
          } else if (this.reg_depremi.descripcion.length > 0) {
            this.validateDescrip();
          }

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
