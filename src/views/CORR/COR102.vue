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
            @next-action="nextStep(form_depen, $event, datoCodDep)"
            @abrirF8="openCOR866"
            :field="form_depen.codigo"
            :reg="reg_dep.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_depen, $event, datoSerco)"
            @abrirF8="openCOR865"
            :field="form_depen.codSerco"
            :reg="reg_dep.codSerco"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_depen.descripcion"
            :reg="reg_dep.descripcion"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT
            @next-action="nextStep(form_depen, $event, datoResponsableDep)"
            :field="form_depen.responsable"
            :reg="reg_dep.responsable"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_depen, $event, datoCargoDep)"
            :field="form_depen.cargo"
            :reg="reg_dep.cargo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_depen, $event, datoCorreoDep)"
            :field="form_depen.correo"
            :reg="reg_dep.correo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_depen, $event, datoOperDep)"
            :field="form_depen.oper"
            @abrirF8="openCON982"
            @onChange="onChange"
            :reg="reg_dep.oper"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card :field="form_oper.nombre" :reg="reg_rest.nombre" />
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
    <COR865
      v-if="show_cor865"
      @callBack="callbackCOR865"
      @callbackEsc="callbackCOR865"
    />
    <COR866
      v-if="show_cor866"
      @callBack="callbackCOR866"
      @callbackEsc="callbackCOR866"
    />
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
import {
  getObjRegDep_,
  getObjRegDep,
} from "../../fuentes/correspondencia/regDepen";
import { getObjRegSerco } from "../../fuentes/correspondencia/regSerco";

import { mapMutations, mapActions, mapGetters } from "vuex";

import CON982 from "../../components/CONTAB/CON982.vue";
import COR865 from "../../components/COR/COR865.vue";
import COR866 from "../../components/COR/COR866.vue";

import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

export default {
  name: "COR102",
  mixins: [nextAction, global],
  components: { COR865, COR866, CON982 },
  data() {
    return {
      titulo: " 1.2 Actualiza Funcionarios",
      novedad_activa: false,
      novedad: {},

      show_cor865: false,
      show_cor866: false,
      show_con982: false,

      form_depen: getObjRegDep_(),
      form_oper: getObjRegRest_(),

      reg_rest: getObjRegRest(),
      reg_dep: getObjRegDep(),
      reg_serco: getObjRegSerco(),
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
    this.abrirNovedad();
  },
  methods: {
    onChange(data) {
      this.reg_dep[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _delDepco: "depco/_delDepco",
      _getDepco: "depco/_getDepco",
      _newDepco: "depco/_newDepco",
      _editDepco: "depco/_editDepco",

      _delSerco: "serco/_delSerco",
      _getSerco: "serco/_getSerco",
      _newSerco: "serco/_newSerco",
      _editSerco: "serco/_editSerco",

      _getOper: "oper/_getOper",
    }),

    openCON982() {
      this.offField();
      this.show_con982 = true;
    },
    callbackCON982(item) {
      if (item) {
        this.reg_dep.oper = item.llaveOper;
        this.reg_dep.descripcion = item.nombre;
        this.validarOperDep();
      }
      this.show_con982 = false;
      this.focusInput(this.form_depen, "oper");
    },
    openCOR866() {
      this.offField();
      this.show_cor866 = true;
    },
    callbackCOR866(item) {
      if (item) {
        this.mostrarDatosCodDep(item);
      }
      this.show_cor866 = false;
      this.focusInput(this.form_depen, "codigo");
    },
    openCOR865() {
      this.offField();
      this.show_cor865 = true;
    },
    callbackCOR865(item) {
      if (item) {
        this.reg_dep.codSerco = item.codigo;
        this.reg_dep.descripcion = item.descripcion;
      }
      this.show_cor865 = false;
      this.focusInput(this.form_depen, "codSerco");
    },
    async datoCodDep(val) {
      //serco
      switch (val) {
        case "esc":
          this.abrirNovedad();
          break;
        case "enter":
          console.log("HARRY triple hpta", this.reg_dep.codigo);
          if (this.reg_dep.codigo == "") return this.CON851("03", "info");
          await this.validarCodDep(this.reg_dep.codigo);
          break;
      }
    },
    async validarCodDep(codigo) {
      try {
        const RES = await this._getDepco({ codigo });
        console.log("jajaj: ", RES);

        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo) {
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_dep.codigo} ya existe`
              );
              this.mostrarDatosCodDep(RES);
            } else this.focusInput(this.form_depen, "codSerco");

            break;
          case 8:
            this.mostrarDatosCodDep(RES);
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El funcionario ${this.reg_dep.codigo} no existe`
              );
            else this.focusInput(this.form_depen, "codSerco");
            break;
          case 9:
            if (RES.msg)
              this.CON851(
                "N1",
                "info",
                `El código ${this.reg_dep.codigo} no existe`
              );
            if (RES.codigo)
              this.CON851(
                "PNZ",
                "info",
                `¿Seguro que desea eliminar funcionario?`,
                "P"
              );
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },
    async mostrarDatosCodDep(datos) {
      if (!datos.msg) {
        this.reg_dep = datos;

        const res_getSerco = await this._getSerco({ codigo: datos.codSerco });
        this.reg_dep.descripcion = res_getSerco.descripcion;

        const res_getOper = await this._getOper({ codigo: datos.oper });
        this.reg_rest.nombre = res_getOper.nombre;
      }
    },
    async datoSerco(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_depen, "codigo");
          break;
        case "enter":
          if (this.reg_dep.codSerco == "") return this.CON851("02", "info");
          await this.validateSerco(this.reg_dep.codSerco);
          break;
      }
    },
    async validateSerco(codigo) {
      try {
        const RES = await this._getSerco({ codigo });
        if (RES.msg)
          this.CON851(
            "N1",
            "info",
            `El código ${this.reg_dep.codSerco} no existe`
          );
        else {
          this.reg_dep.descripcion = RES.descripcion;
          this.focusInput(this.form_depen, "responsable");
        }
      } catch (error) {
        console.error(error);
      }
    },
    datoResponsableDep(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_depen, "codSerco");
          break;
        case "enter":
          if (this.reg_dep.responsable == "") return this.CON851("02", "info");
          this.focusInput(this.form_depen, "cargo");
          break;
      }
    },
    datoCargoDep(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_depen, "responsable");
          break;
        case "enter":
          if (this.reg_dep.cargo == "") return this.CON851("02", "info");
          this.focusInput(this.form_depen, "correo");
          break;
      }
    },
    datoCorreoDep(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_depen, "cargo");
          break;
        case "enter":
          if (this.reg_dep.correo == "") return this.CON851("02", "info");
          this.focusInput(this.form_depen, "oper");
          break;
      }
    },
    datoOperDep(val) {
      switch (val) {
        case "esc":
          this.focusInput(this.form_depen, "correo");
          break;
        case "enter":
          if (this.reg_dep.oper == "") return this.CON851("02", "info");
          else this.validarOperDep();
          break;
      }
    },
    async validarOperDep() {
      try {
        this.reg_rest = await this._getOper({ codigo: this.reg_dep.oper });
        if ("llaveOper" in this.reg_rest) {
          this.reg_dep.oper = this.reg_rest.llaveOper;
          this.novedad.acceso == 7 &&
            this.CON851("PNZ", "info", `¿Deseas crear funcionario?`, "p");
          this.novedad.acceso == 8 &&
            this.CON851("PNZ", "info", `Desea cambiar funcionario?`, "p");
        } else {
          this.CON851(
            "N1",
            "info",
            `No existe el operador ${this.reg_dep.oper}`
          );
        }
      } catch (error) {
        console.error(error);
        this.focusInput(this.form_depen, "oper");
      }
    },
    async confirmar() {
      this.setDialogType("done");
      this.cerrar_CON851();
      this.novedad.acceso == 7 && this.guardar();
      this.novedad.acceso == 8 && this.editar();
      this.novedad.acceso == 9 && this.eliminar();
    },
    async guardar() {
      try {
        const data = this.reg_dep;
        const RES = await this._newDepco(data);
        if (RES.N1) {
          this.CON851("N1", "success", `Funcionario guardado`);
        }
        RES.msg && this.CON851("N1", "error", `No se pudo crear funcionario`);
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const codigo = this.reg_dep.codigo;
        const RES = await this._delDepco({ codigo });
        if (RES.N1) {
          this.reg_dep = getObjRegDep();
          this.CON851("N1", "success", `Funcionario eliminado`);
        }
        RES.msg && this.CON851("N1", "error", `No existe funcionario`);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      try {
        const data = this.reg_dep;
        const codigo = this.reg_dep.codigo;
        const RES = await this._editDepco({ data, codigo });
        if (RES.N1) {
          this.reg_dep = getObjRegDep();
          this.CON851("N1", "success", `Funcionario modificado`);
        }
        RES.msg &&
          this.CON851("N1", "error", `No se pudo modifica funcionario`);
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
      this.reg_serco = getObjRegSerco();
      this.reg_rest = getObjRegRest();
      this.reg_dep = getObjRegDep();
      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.firstField(this.form_depen);
      data.acceso == "F"
        ? this.$router.push("/Menu-Principal")
        : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
