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
            @next-action="nextStep(form_holding, $event, keyDownCod)"
            @abrirF8="openCOR885"
            :field="form_holding.codigo"
            :reg="reg_holding.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_holding, $event, keyDownDescrip)"
            :field="form_holding.descripcion"
            :reg="reg_holding.descripcion"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_holding, $event, keyDownActivado)"
            :field="form_holding.activa"
            :reg="reg_holding.activa"
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
    />
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <COR885
      v-if="show_cor885"
      @callBack="callbackCOR885"
      @callbackEsc="callbackCOR885"
    />
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import COR885 from "../../components/COR/COR885.vue";
import {
  getObjRegHolding_,
  getObjRegHolding,
} from "../../fuentes/correspondencia/regHolding";

export default {
  name: "COR107",
  mixins: [nextAction, global],
  components: { COR885 },
  data() {
    return {
      titulo: "1-7 CREAR HOLDING EMPRESARIAL CORRESPONDENCIA",

      novedad_activa: false,
      novedad: {},

      show_cor885: false,

      form_holding: getObjRegHolding_(),
      reg_holding: getObjRegHolding(),
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
      this.reg_holding[data.key] = data.value;
    },

    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      /* holding */
      _getHolding: "holding/_getHolding",
      _newHolding: "holding/_newHolding",
      _editHolding: "holding/_editHolding",
      _delHolding: "holding/_delHolding",
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
        const RES = await this._newHolding({ ...this.reg_holding });

        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente`);
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async editar() {
      try {
        const codigo = this.reg_holding.codigo;
        const data = this.reg_holding;
        const RES = await this._editHolding({ data, codigo });
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente!`);
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        console.error(error);
      }
    },

    async eliminar() {
      try {
        const codigo = this.reg_holding.codigo;
        const RES = await this._delHolding({ codigo });
        RES.N1 && this.CON851("N1", "success", `Datos borrados correctamente!`);
        RES.msg &&
          this.CON851("N1", "error", `No se encontraron coincidencias`);
      } catch (error) {
        console.error(error);
      }
    },

    abrirNovedad() {
      this.reg_holding = getObjRegHolding();

      this.novedad_activa = true;
      this.offField();
    },

    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_holding, "codigo");

      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },

    openCOR885() {
      this.offField();
      this.show_cor885 = true;
    },

    callbackCOR885(item) {
      if (item) {
        this.reg_holding = item;
      }
      this.show_cor885 = false;
      this.focusInput(this.form_holding, "codigo");
    },

    /* Functions cod */
    async validateCod() {
      try {
        const codigo = this.reg_holding.codigo;
        const RES = await this._getHolding({ codigo });

        if (RES.codigo) {
          this.reg_holding = RES;
        }

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_holding.codigo} ya existe`
              );
            else this.focusInput(this.form_holding, "descripcion");
            break;

          case 8:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_holding.codigo} no existe`
              );
            else this.focusInput(this.form_holding, "descripcion");
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
            this.reg_holding.descripcion == "" ||
            this.reg_holding.descripcion == undefined
          )
            this.CON851("02", "info");
          else if (this.reg_holding.descripcion.length > 0)
            this.focusInput(this.form_holding, "activa");
          break;

        case 8:
          if (
            this.reg_holding.descripcion == "" ||
            this.reg_holding.descripcion == undefined
          )
            this.CON851("02", "info");
          else if (this.reg_holding.descripcion.length > 0)
            this.focusInput(this.form_holding, "activa");
          break;

        default:
          break;
      }
    },

    /* Functions activado */
    async validateActivado() {
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
          if (this.reg_holding.codigo == "") {
            this.CON851("02", "info");
          } else if (this.reg_holding.codigo.length > 0) {
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
          this.focusInput(this.form_holding, "codigo");
          break;

        case "enter":
          this.validateDescrip();

        default:
          break;
      }
    },

    keyDownActivado(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_holding, "descripcion");
          break;

        case "enter":
          if (
            this.reg_holding.activa == "" ||
            this.reg_holding.activa == undefined
          ) {
            this.CON851("02", "info");
          } else if (this.reg_holding.activa.toString().length > 0) {
            this.validateActivado();
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
