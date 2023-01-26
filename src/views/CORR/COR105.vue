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
            @next-action="nextStep(form_unifun, $event, datoUnifun)"
            @abrirF8="openCOR876"
            :field="form_unifun.codigo"
            :reg="reg_unifun"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_unifun, $event, datoDescrip)"
            :field="form_unifun.descripcion"
            :reg="reg_unifun"
          />
        </v-col>
      </v-row>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    />
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <COR876
      v-if="show_cor876"
      @callBack="callbackCOR876"
      @callbackEsc="callbackCOR876"
    />
  </v-container>
</template>
<script>
import {
  getObjRegUnifun_,
  getObjRegUnifun,
} from "../../fuentes/correspondencia/regUnifun";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global, currentUser } from "../../mixins/global";
import COR876 from "../../components/COR/COR876.vue";

export default {
  name: "COR105",
  mixins: [nextAction, global],
  components: { COR876 },
  data() {
    return {
      titulo: " 1.5 Crear unidad funcional",
      show_cor876: false,

      novedad_activa: false,
      novedad: {},
      form_unifun: getObjRegUnifun_(),
      reg_unifun: getObjRegUnifun(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaUnifun: "unifun/getLista",
    }),
  },

  mounted() {
    this.abrirNovedad();
  },
  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _deleteUnifun: "unifun/_delUnifun",
      _getUnifun: "unifun/_getUnifun",
      _newUnifun: "unifun/_newUnifun",
      _editUnifun: "unifun/_editUnifun",
    }),

    openCOR876() {
      this.offField();
      this.show_cor876 = true;
    },

    callbackCOR876(item) {
      if (item) {
        this.reg_unifun = item;
      }
      this.show_cor876 = false;
      this.focusInput(this.form_unifun, "codigo");
    },

    async datoUnifun(val) {
      switch (val) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          if (this.reg_unifun.codigo == "") return this.CON851("02", "info");
          await this.validateUnifun();
          break;
      }
    },

    async validateUnifun() {
      try {
        const codigo = this.reg_unifun.codigo;
        const RES = await this._getUnifun({ codigo });
        this.reg_unifun.descripcion = RES.descripcion;

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_unifun.codigo} ya existe`
              );
            else this.focusInput(this.form_unifun, "descripcion");
            break;
          case 8:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_unifun.codigo} no existe`
              );
            else this.focusInput(this.form_unifun, "descripcion");
            break;
          case 9:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_unifun.codigo} no existe`
              );
            if (RES.codigo)
              this.CON851(
                "PNZ",
                "info",
                `¿Seguro que desea eliminar servicio de correspondencia?`,
                "P"
              );
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },

    datoDescrip(even) {
      switch (even) {
        case "esc":
          this.focusInput(this.form_unifun, "codigo");
          break;
        case "enter":
          this.form_unifun.descripcion.value == "" && this.CON851("02", "info");
          this.novedad.acceso == 7 &&
            this.CON851("PNZ", "info", `¿Deseas crear Unidad funcional?`, "p");
          this.novedad.acceso == 8 &&
            this.CON851("PNZ", "info", `Desea cambiar Unidad funcional?`, "p");
          break;
      }
    },

    async confirmar() {
      this.cerrar_CON851();
      this.setDialogType("done");
      this.novedad.acceso == 7 && this.guardar();
      this.novedad.acceso == 8 && this.editar();
      this.novedad.acceso == 9 && this.eliminar();
    },

    async guardar() {
      try {
        const RES = await this._newUnifun({ ...this.reg_unifun });
        RES.N1 && this.CON851("N1", "success", `Unidad funcional guardado`);
        RES.msg &&
          this.CON851("N1", "error", `No se pudo crear Unidad funcional`);
      } catch (error) {
        console.error(error);
      }
    },

    async eliminar() {
      try {
        const codigo = this.reg_unifun.codigo;
        const RES = await this._deleteUnifun({ codigo });
        RES.N1 && this.CON851("N1", "success", `Unidad funcional eliminado`);
        RES.msg && this.CON851("N1", "error", `No existe Unidad funcional`);
      } catch (error) {
        console.error(error);
      }
    },

    async editar() {
      try {
        const codigo = this.reg_unifun.codigo;
        const data = this.reg_unifun;
        const RES = await this._editUnifun({ data, codigo });

        RES.N1 && this.CON851("N1", "success", `Unidad funcional modificado`);
        RES.msg &&
          this.CON851("N1", "error", `No se pudo modificar Unidad funcional`);
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
      this.reg_unifun = getObjRegUnifun();
      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.firstField(this.form_unifun);
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
