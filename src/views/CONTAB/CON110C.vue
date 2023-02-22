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
            @next-action="nextStep(form_terce, $event, datoCodigo)"
            @abrirF8="openCON802"
            :field="form_terce.codigo"
            :reg="reg_terce.codigo"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE @next-action="nextStep(form_terce, $event, datoTipo)" :field="form_terce.tipoR" :reg="reg_terce.tipoR" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <INPUT @next-action="nextStep(form_terce, $event, datoNom1a)" :field="form_terce.nomb1a" :reg="reg_terce.nomb1a" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_terce, $event, datoNom1b)" :field="form_terce.nomb1b" :reg="reg_terce.nomb1b" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_terce, $event, datoApel1)" :field="form_terce.apel1" :reg="reg_terce.apel1" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_terce, $event, datoApel2)" :field="form_terce.apel2" :reg="reg_terce.apel2" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_terce, $event, datoTelefono)"
            :field="form_terce.telefono"
            :reg="reg_terce.telefono"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_terce, $event, datoEmail)" :field="form_terce.email" :reg="reg_terce.email" @onChange="onChange" />
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
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
    <CON802 v-if="show_con802" @callBack="callbackCON802" @callbackEsc="callbackCON802" />
  </v-container>
</template>
<script>
import { getObjTerce_, getObjTerce } from "../../fuentes/correspondencia/regTerce";
import { mapMutations, mapActions, mapGetters } from "vuex";
import CON802 from "../../components/CONTAB/CON802.vue";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

export default {
  name: "COR102",
  mixins: [nextAction, global],
  components: { CON802 },
  data() {
    return {
      titulo: " 1.A Actualiza Terceros",
      novedad_activa: false,
      novedad: {},

      show_con802: false,

      form_terce: getObjTerce_(),
      reg_terce: getObjTerce(),
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
      this.reg_terce[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _deleteTerce: "terce/_deleteTerce",
      _postTerce: "terce/_postTerce",
      _getTerce: "terce/_getTerce",
      _putTerce: "terce/_putTerce",
    }),
    async datoCodigo(val) {
      switch (val) {
        case "esc":
          return this.abrirNovedad();
        case "enter":
          return this.validarCodigo();
      }
    },
    async validarCodigo() {
      try {
        const RES = await this._getTerce({ codigo: this.reg_terce.codigo });
        switch (this.novedad.acceso) {
          case 7:
            if (RES.codigo) {
              this.CON851("N1", "info", `El código ${this.reg_terce.codigo}de tercero ya existe`);
              this.mostrarDatosTerce(RES);
            } else this.focusInput(this.form_terce, "tipoR");
            break;
          case 8:
            this.mostrarDatosTerce(RES);
            if (RES.msg) this.CON851("N1", "info", `El tercero ${this.reg_terce.codigo} no existe`);
            else this.focusInput(this.form_terce, "tipoR");
            break;
          case 9:
            this.mostrarDatosTerce(RES);
            RES.msg && this.CON851("N1", "info", `El tercero ${this.reg_terce.codigo} no existe`);
            RES.codigo && this.validarOpc();
        }
        return RES;
      } catch (error) {
        console.error(error);
      }
    },
    mostrarDatosTerce(datos) {
      if (!datos.msg) {
        this.reg_terce = datos;
      }
    },
    datoTipo(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "codigo");
        case "enter":
          return this.focusInput(this.form_terce, "nomb1a");
      }
    },
    datoNom1a(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "tipoR");
        case "enter":
          return this.focusInput(this.form_terce, "nomb1b");
      }
    },
    datoNom1b(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "nomb1a");
        case "enter":
          return this.focusInput(this.form_terce, "apel1");
      }
    },
    datoApel1(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "nomb1b");
        case "enter":
          return this.focusInput(this.form_terce, "apel2");
      }
    },
    datoApel2(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "apel1");
        case "enter":
          return this.focusInput(this.form_terce, "telefono");
      }
    },
    datoTelefono(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "apel2");
        case "enter":
          return this.focusInput(this.form_terce, "email");
      }
    },
    datoEmail(val) {
      switch (val) {
        case "esc":
          return this.focusInput(this.form_terce, "telefono");
        case "enter":
          return this.validarOpc();
      }
    },
    async validarOpc() {
      this.novedad.acceso == 7 && this.CON851P("PNZ", "info", `¿Deseas crear tercero?`, this.guardar, this.onField);
      this.novedad.acceso == 8 && this.CON851P("PNZ", "info", `Desea cambiar tercero?`, this.editar, this.onField);
      this.novedad.acceso == 9 && this.CON851P("PNZ", "info", `¿Deseas eliminar tercero?`, this.eliminar, this.onField);
    },
    async guardar() {
      try {
        this.reg_terce.tipoR == 1 ? (this.reg_terce.tipo = "CC") : "";
        this.reg_terce.tipoR == 2 ? (this.reg_terce.tipo = "CE") : "";
        this.reg_terce.tipoR == 3 ? (this.reg_terce.tipo = "PA") : "";
        this.reg_terce.tipoR == 4 ? (this.reg_terce.tipo = "RC") : "";
        this.reg_terce.tipoR == 5 ? (this.reg_terce.tipo = "TI") : "";
        this.reg_terce.tipoR == 6 ? (this.reg_terce.tipo = "NU") : "";
        this.reg_terce.tipoR == 7 ? (this.reg_terce.tipo = "NI") : "";
        this.reg_terce.descrip = `${this.reg_terce.apel1} ${this.reg_terce.apel2} ${this.reg_terce.nomb1a} ${this.reg_terce.nomb1b}`;
        const RES = await this._postTerce({ data: this.reg_terce });
        RES.N1 &&
          this.CON851("N1", "success", `tercero guardado`, null, () => {
            if (this.$route.query.codigo) return window.close();
            this.abrirNovedad();
          });
        RES.msg && this.CON851("N1", "error", `No se pudo crear tercero`, null, this.abrirNovedad);
      } catch (error) {
        console.error(error);
      }
    },
    async editar() {
      try {
        this.reg_terce.descrip = `${this.reg_terce.apel1} ${this.reg_terce.apel2} ${this.reg_terce.nomb1a} ${this.reg_terce.nomb1b}`;
        const RES = await this._putTerce({
          data: this.reg_terce,
          codigo: this.reg_terce.codigo,
        });
        RES.N1 && this.CON851("N1", "success", `tercero modificado`, null, this.abrirNovedad);
        RES.msg && this.CON851("N1", "error", `No se pudo modifica tercero`, null, this.abrirNovedad);
      } catch (error) {
        console.error(error);
      }
    },
    async eliminar() {
      try {
        const RES = await this._deleteTerce({ codigo: this.reg_terce.codigo });
        RES.N1 && this.CON851("N1", "success", `tercero eliminado`, null, this.abrirNovedad);
        RES.msg && this.CON851("N1", "error", `No existe tercero`, null, this.abrirNovedad);
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
    openCON802() {
      this.offField();
      this.show_con802 = true;
    },
    callbackCON802(item) {
      if (item) {
        this.reg_terce = item;
      }
      this.show_con802 = false;
      this.focusInput(this.form_terce, "codigo");
    },
    abrirNovedad() {
      this.reg_terce = getObjTerce();
      this.novedad_activa = true;
      this.offField();
    },
    novedadSelec(data) {
      this.novedad_activa = false;
      this.focusInput(this.form_terce, "codigo");
      if ("codigo" in this.$route.query) this.reg_terce.codigo = this.$route.query.codigo;
      data.acceso == "F" ? this.$router.push("/Menu-Principal") : (this.novedad = Object.assign({}, data));
    },
  },
};
</script>
