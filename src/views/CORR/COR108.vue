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
            @next-action="nextStep(form_cargo, $event, datoCodigo)"
            @abrirF8="openCOR888"
            :field="form_cargo.codigo"
            :reg="reg_cargo.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_cargo, $event, datoDescripcion)"
            :field="form_cargo.descripcion"
            :reg="reg_cargo.descripcion"
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
    <COR888
      v-if="show_cor888"
      @callBack="callbackCOR888"
      @callbackEsc="callbackCOR888"
    />
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";
import COR888 from "../../components/COR/COR888.vue";
import {
  getObjRegCargo_,
  getObjRegCargo,
} from "../../fuentes/correspondencia/regCargo";

export default {
  name: "COR108",
  mixins: [nextAction, global],
  components: { COR888 },
  data() {
    return {
      titulo: "1.8 ACTUALIZA CARGOS OPS",
      novedad_activa: false,

      novedad: {},

      show_cor888: false,

      form_cargo: getObjRegCargo_(),
      reg_cargo: getObjRegCargo(),
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
      this.reg_cargo[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getCargo: "cargo/_getCargo",
      _newCargo: "cargo/_newCargo",
      _editCargo: "cargo/_editCargo",
      _delCargo: "cargo/_delCargo",
    }),
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
        const RES = await this._newCargo({ ...this.reg_cargo });
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente`);
        RES.msg && this.CON851("N1", "error", `Error escribiendo datos!`);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      try {
        const codigo = this.reg_cargo.codigo;
        const data = this.reg_cargo;
        const RES = await this._editCargo({ data, codigo });
        RES.N1 && this.CON851("N1", "success", `Datos grabados correctamente!`);
        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const codigo = this.reg_cargo.codigo;
        const RES = await this._delCargo({ codigo });
        RES.N1 && this.CON851("N1", "success", `Datos borrados correctamente!`);
        RES.msg &&
          this.CON851("N1", "error", `No se encontraron coincidencias`);
      } catch (error) {
        console.error(error);
      }
    },

    abrirNovedad() {
      this.reg_cargo = getObjRegCargo();

      this.novedad_activa = true;
      this.offField();
    },

    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_cargo, "codigo");

      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },

    openCOR888() {
      this.offField();
      this.show_cor888 = true;
    },

    callbackCOR888(item) {
      if (item) {
        this.reg_cargo = item;
      }
      this.show_cor888 = false;
      this.focusInput(this.form_cargo, "codigo");
    },

    async validateCodigo() {
      try {
        const codigo = this.reg_cargo.codigo;
        const RES = await this._getCargo({ codigo });

        if (RES.codigo) this.reg_cargo = RES;
        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_cargo.codigo} ya existe`
              );
            else this.focusInput(this.form_cargo, "descripcion");
            break;

          case 8:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_cargo.codigo} no existe`
              );
            else this.focusInput(this.form_cargo, "descripcion");
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
    async validateDescripcion() {
      switch (this.novedad.acceso) {
        case 7:
          this.CON851("PNZ", "info", `¿Desea grabar datos?`, "p");
          break;
        case 8:
          this.CON851("PNZ", "info", `¿Desea grabar datos?`, "p");
          break;
      }
    },
    datoCodigo(key) {
      switch (key) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          if (this.reg_cargo.codigo == "") {
            this.CON851("02", "info");
          } else if (this.reg_cargo.codigo.length > 0) {
            this.validateCodigo();
          }
          break;
      }
    },
    datoDescripcion(key) {
      switch (key) {
        case "esc":
          this.focusInput(this.form_cargo, "codigo");
          break;

        case "enter":
          if (this.reg_cargo.descripcion == "") {
            this.CON851("02", "info");
          } else if (this.reg_cargo.descripcion.length > 0) {
            this.validateDescripcion();
          }

        default:
          break;
      }
    },
  },
  mounted() {
    this.abrirNovedad();
  },
};
</script>
