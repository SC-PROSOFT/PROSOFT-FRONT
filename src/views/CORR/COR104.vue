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
            @next-action="nextStep(form_auxco, $event, datoCodAux)"
            @abrirF8="openCOR871"
            :field="form_auxco.codigo"
            :reg="reg_auxco.codigo"
            @onChange="onChange"
            
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_auxco, $event, datoCodSerco)"
            @abrirF8="openCOR867"
            :field="form_auxco.codSerco"
            :reg="reg_auxco.codSerco"
            @onChange="onChange"

          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <data-card :field="form_tipico.descripcion" :reg="reg_tipco.descripcion" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_auxco, $event, datoDescripcion)"
            :field="form_auxco.descripcion"
            :reg="reg_auxco.descripcion"
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
    <COR871
      v-if="show_cor871"
      @callBack="callbackCOR871"
      @callbackEsc="callbackCOR871"
    ></COR871>
    <COR867
      v-if="show_cor867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    ></COR867>
  </v-container>
</template>
<script>
import {
  getObjRegAuxco,
  getObjRegAuxco_,
} from "../../fuentes/correspondencia/regAuxco";
import {
  getObjRegTipco,
  getObjRegTipco_,
} from "../../fuentes/correspondencia/regTipco";
import { mapMutations, mapActions, mapGetters } from "vuex";
import COR871 from "../../components/COR/COR871.vue";
import COR867 from "../../components/COR/COR867.vue";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

export default {
  name: "COR104",
  mixins: [nextAction, global],
  components: { COR871, COR867 },

  data() {
    return {
      titulo: " 1.4 Aux Tipo Correspondencia",
      novedad_activa: false,
      novedad: {},

      show_cor871: false,
      show_cor867: false,

      form_auxco: getObjRegAuxco_(),
      form_tipico: getObjRegTipco_(),

      reg_auxco: getObjRegAuxco(),
      reg_tipco: getObjRegTipco(),
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
    onChange(data){
      this.reg_auxco[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _delAuxco: "auxtip/_delAuxco",
      _getAuxco: "auxtip/_getAuxco",
      _getTipco: "tipco/_getTipco",
      _newAuxco: "auxtip/_newAuxco",
      _editAuxco: "auxtip/_editAuxco",
    }),

    openCOR867() {
      this.offField();
      this.show_cor867 = true;
    },
    callbackCOR867(item) {
      if (item) {
        this.reg_auxco.codSerco = item.codigo;
        this.reg_tipco = item;
      }
      this.show_cor867 = false;
      this.focusInput(this.form_auxco, "descripcion");
    },
    openCOR871() {
      this.offField();
      this.show_cor871 = true;
    },
    async callbackCOR871(item) {
      if (item) {
        this.reg_auxco = item;
        this.mostrarDatos();
      }
      this.focusInput(this.form_auxco, "codigo");
      this.show_cor871 = false;
    },
    async datoCodAux(val) {
      switch (val) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          if (this.reg_auxco.codigo == "") return this.CON851("02", "info");
          await this.validateAuxco();
          break;
      }
    },
    async validateAuxco() {
      try {
        const RES = await this._getAuxco({ codigo: this.reg_auxco.codigo });
        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo) {
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_auxco.codigo} ya existe`
              );
              this.reg_auxco = RES;
              this.mostrarDatos();
            } else this.focusInput(this.form_auxco, "codSerco");

            break;
          case 8:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `Aux tipo correspondencia ${this.reg_auxco.codigo} no existe`
              );
            else {
              this.reg_auxco = RES;
              this.mostrarDatos();
              this.focusInput(this.form_auxco, "codSerco");
            }
            break;
          case 9:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código  Auxiliar ${this.reg_auxco.codigo} no existe`
              );
            if (RES.codigo) {
              this.reg_auxco = RES;
              this.CON851(
                "PNZ",
                "info",
                `¿Seguro que desea eliminar auxiliar?`,
                "P"
              );
            }
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },
    async mostrarDatos() {
      try {
        const RES = await this._getTipco({ codigo: this.reg_auxco.codSerco });
        if (RES.codigo) {
          this.reg_tipco = RES;
        } else if (RES.msg)
          return this.CON851(
            "N1",
            "info",
            `Aux tipo correspondencia ${this.reg_tipco.codigo} no existe`
          );
      } catch (error) {
        console.error(error);
      }
    },
    async datoCodSerco(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_auxco, "codigo");
          break;
        case "enter":
          if (this.reg_auxco.codSerco == "") return this.CON851("02", "info");
          await this.validateCodSerco();

          break;
      }
    },
    async validateCodSerco() {
      try {
        const RES = await this._getTipco({ codigo: this.reg_auxco.codSerco });
        if (RES.codigo) {
          this.reg_tipco = RES;
          this.focusInput(this.form_auxco, "descripcion");
        } else if (RES.msg)
          return this.CON851(
            "N1",
            "info",
            `Aux tipo correspondencia ${this.reg_tipco.codigo} no existe`
          );
      } catch (error) {
        console.error(error);
      }
    },
    datoDescripcion(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_auxco, "codSerco");
          break;
        case "enter":
          if (this.reg_auxco.descripcion == "")
            return this.CON851("02", "info");
          this.novedad.acceso == 7 &&
            this.CON851(
              "PNZ",
              "info",
              `¿Deseas crear Aux tipo de correspondencia?`,
              "p"
            );
          this.novedad.acceso == 8 &&
            this.CON851(
              "PNZ",
              "info",
              `Desea cambiar Aux tipo de correspondencia?`,
              "p"
            );
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
        const RES = await this._newAuxco({ ...this.reg_auxco });
        RES.N1 &&
          this.CON851("N1", "success", `Servicio de correspondencia guardado`);
        RES.msg &&
          this.CON851(
            "N1",
            "error",
            `No se pudo crear Servicio de correspondencia`
          );
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const RES = await this._delAuxco({ codigo: this.reg_auxco.codigo });
        RES.N1 &&
          this.CON851("N1", "success", `Servicio de correspondencia eliminado`);
        RES.msg &&
          this.CON851("N1", "error", `No existe Aux tipo de correspondencia`);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      try {
        const RES = await this._editAuxco({
          data: this.reg_auxco,
          codigo: this.reg_auxco.codigo,
        });
        RES.N1 &&
          this.CON851(
            "N1",
            "success",
            `Servicio de correspondencia modificado`
          );
        RES.msg &&
          this.CON851(
            "N1",
            "error",
            `No se pudo modifica Aux tipo de correspondencia`
          );
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
      this.reg_auxco = getObjRegAuxco();
      this.reg_tipco = getObjRegTipco();

      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.firstField(this.form_auxco);
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
