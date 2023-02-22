<template>
  <v-container fluid>
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
            @next-action="nextStep(form_serco, $event, datoSerco)"
            @abrirF8="openCOR865"
            :field="form_serco.codigo"
            :reg="reg_serco.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_serco, $event, datoDescrip)"
            :field="form_serco.descripcion"
            :reg="reg_serco.descripcion"
            @onChange="onChange"
          />
        </v-col>
      </v-row>
    </v-card>
    <CON850
      @novedadSelec="novedadSelec($event)"
      :novedad_activa="novedad_activa"
      v-if="novedad_activa"
    />
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    />
    <COR865
      v-if="show_cor865"
      @callBack="callbackCOR865"
      @callbackEsc="callbackCOR865"
    />
  </v-container>
</template>
<script>
import {
  getObjRegSerco_,
  getObjRegSerco,
} from "../../fuentes/correspondencia/regSerco";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global, currentUser } from "../../mixins/global";
import COR865 from "../../components/COR/COR865.vue";
import moment from "moment";

export default {
  name: "COR101",
  mixins: [nextAction, global],
  components: { COR865 },
  data() {
    return {
      titulo: "1.1 Actualiza Dptos o Servicios",
      novedad_activa: false,
      novedad: {},

      show_cor865: false,

      form_serco: getObjRegSerco_(),
      reg_serco: getObjRegSerco(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaSerco: "serco/getLista",
    }),
  },

  mounted() {
    this.abrirNovedad();
  },

  methods: {
    onChange(data) {
      this.reg_serco[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _delSerco: "serco/_delSerco",
      _getSerco: "serco/_getSerco",
      _newSerco: "serco/_newSerco",
      _editSerco: "serco/_editSerco",
    }),

    openCOR865() {
      this.offField();
      this.show_cor865 = true;
    },
    callbackCOR865(item) {
      if (item) {
        this.reg_serco = item;
      }
      this.show_cor865 = false;
      this.focusInput(this.form_serco, "codigo");
    },

    async datoSerco(val) {
      switch (val) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          await this.validateSerco();
          break;
      }
    },
    async validateSerco() {
      try {
        const codigo = this.reg_serco.codigo;

        const RES = await this._getSerco({ codigo });
        console.log("my RES: ", RES);
        this.reg_serco.descripcion = RES.descripcion;

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo) {
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_serco.codigo} ya existe`
              );
            } else {
              this.focusInput(this.form_serco, "descripcion");
            }
            break;
          case 8:
            if (RES.msg) {
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_serco.codigo} no existe`
              );
            } else {
              this.focusInput(this.form_serco, "descripcion");
              this.reg_serco = RES;
            }
            break;
          case 9:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_serco.codigo} no existe`
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
          this.focusInput(this.form_serco, "codigo");
          break;
        case "enter":
          this.form_serco.descripcion.value == "" && this.CON851("02", "info");
          this.novedad.acceso == 7 &&
            this.CON851(
              "PNZ",
              "info",
              `¿Deseas crear servicio de correspondencia?`,
              "p"
            );
          this.novedad.acceso == 8 &&
            this.CON851(
              "PNZ",
              "info",
              `Desea cambiar servicio de correspondencia?`,
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
        this.reg_serco.fechaCre = moment().format("YYYY-MM-DD");
        this.reg_serco.operCre = currentUser.llaveOper;

        const RES = await this._newSerco({ ...this.reg_serco });

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
        const codigo = this.reg_serco.codigo;
        const RES = await this._delSerco({ codigo });
        RES.N1 &&
          this.CON851("N1", "success", `Servicio de correspondencia eliminado`);
        RES.msg &&
          this.CON851("N1", "error", `No existe servicio de correspondencia`);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      const { codigo } = this.reg_serco;

      this.reg_serco.fechaMod = moment().format("YYYY-MM-DD");
      this.reg_serco.operMod = currentUser.llaveOper;

      try {
        const RES = await this._editSerco({ data: this.reg_serco, codigo });
        console.log("my res: ", RES);

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
            `No se pudo modifica servicio de correspondencia`
          );
      } catch (error) {
        this.CON851("personalizada", "error", "Verifica los datos ingresados");
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
      this.reg_serco = getObjRegSerco();
      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.firstField(this.form_serco);
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
