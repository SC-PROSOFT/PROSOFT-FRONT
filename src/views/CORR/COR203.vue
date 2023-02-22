<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row mt-4">
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_traslado, $event, datoAnoLlave)"
            :field="form_traslado.anoLlave"
            :reg="reg_traslado.llave.anoLlave"
            @onChange="
              (data) => {
                reg_traslado.llave[data.key] = data.value;
              }
            "
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_traslado, $event, datoAnoCont)"
            @abrirF8="openCOR868"
            :field="form_traslado.cont"
            :reg="reg_traslado.llave.cont"
            @onChange="
              (data) => {
                reg_traslado.llave[data.key] = data.value;
              }
            "
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.fecha" :reg="reg_traslado.fecha" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.hora" :reg="reg_traslado.hora" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_traslado, $event)"
            :field="form_traslado.proceden"
            :reg="reg_traslado.proceden"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.nit" :reg="reg_traslado.nit" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card :field="form_traslado.descripTer" :reg="reg_traslado.descripTer" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_traslado, $event)"
            :field="form_traslado.tipoCorres"
            :reg="reg_traslado.tipoCorres"
            @onChange="onChange"
          />
        </v-col>
        <v-col cols="12" sm="4" md="4" xs="4" class="input-col">
          <data-card :field="form_traslado.descripTipco" :reg="reg_traslado.descripTipco" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.descrip" :reg="reg_traslado.descrip" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.ser" :reg="reg_traslado.ser" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <data-card :field="form_traslado.descripSer" :reg="reg_traslado.descripSer" />
        </v-col>
        <v-col cols="12" sm="1" md="1" xs="1" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.fol" :reg="reg_traslado.fol" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="1" md="1" xs="1" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.fold" :reg="reg_traslado.fold" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_traslado, $event)" :field="form_traslado.anex" :reg="reg_traslado.anex" @onChange="onChange" />
        </v-col>
        <v-col cols="12" sm="12" md="12" xs="12" class="ma-0 pa-0" v-for="item in 5" :key="item">
          <v-row justify="start" align="center" class="ma-0 pa-0">
            <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
              <INPUT
                @next-action="
                  nextStep(form_traslado, $event, () => {
                    datoPeronal($event, item);
                  })
                "
                @abrirF8="openCOR866(item)"
                @onChange="
                  (data) => {
                    reg_traslado[`personal_${item}`] = data.value;
                  }
                "
                @F2="validarTranslado()"
                :field="form_traslado[`personal_${item}`]"
                :reg="reg_traslado[`personal_${item}`]"
              />
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
              <data-card :field="form_traslado[`descripPer_${item}`]" :reg="reg_traslado[`descripPer_${item}`]" />
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
              <data-card :field="form_traslado[`correoPer_${item}`]" :reg="reg_traslado[`correoPer_${item}`]" />
            </v-col>
            <v-col cols="12" sm="1" md="1" xs="1" class="input-col">
              <data-card :field="form_traslado[`oper_${item}`]" :reg="reg_traslado[`oper_${item}`]" />
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
              <AUTOCOMPLETE
                @next-action="
                  nextStep(form_traslado, $event, () => {
                    datoManejo($event, item);
                  })
                "
                @onChange="
                  (data) => {
                    reg_traslado[`manejo_${item}`] = data.value;
                  }
                "
                :field="form_traslado[`manejo_${item}`]"
                :reg="reg_traslado[`manejo_${item}`]"
              />
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
              <CHECKBOX
                @next-action="
                  nextStep(form_traslado, $event, () => {
                    datoCorreo($event, item);
                  })
                "
                :field="form_traslado[`inluir_correo_${item}`]"
                :reg="reg_traslado[`inluir_correo_${item}`]"
                @onChange="
                  (data) => {
                    reg_traslado[`incluir_correo_${item}`] = data.value;
                  }
                "
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <COR866 v-if="show_cor866" @callBack="callbackCOR866" @callbackEsc="callbackCOR866" />
    <COR868 v-if="show_cor868" @callBack="callbackCOR868" @callbackEsc="callbackCOR868" />
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
    <CON851
      @cancelarAlerta="cancelar()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-container>
</template>
<script>
import { getObjCorres, getObjCorres_ } from "../../fuentes/correspondencia/regCorres203";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { global, currentUser } from "../../mixins/global";
import { nextAction } from "../../mixins/nextAction";
import COR866 from "../../components/COR/COR866.vue";
import COR868 from "../../components/COR/COR868.vue";

export default {
  name: "COR203",
  mixins: [nextAction, global],
  components: { COR866, COR868 },
  data() {
    return {
      titulo: `2.3 Tralado de Correspondencia`,

      novedad_activa: false,
      novedad: {},
      index: 0,

      show_cor866: false,
      show_cor868: false,

      listado_email: [],

      form_traslado: getObjCorres_(),
      reg_traslado: getObjCorres(),
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
    }),
  },
  mounted() {
    this.buscarUltimaCorres();
  },
  methods: {
    onChange(data) {
      this.reg_traslado[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _deleteCorres: "corr/_deleteCorres",
      _getUltCorr: "corr/_getUltCorr",
      _postCorres: "corr/_postCorres",
      _putCorres: "corr/_putCorres",
      _getCorr: "corr/_getCorr",

      _sendEmail: "envioemail/_sendEmail",
      _uploadFile: "archivos/_uploadFile",
      _getDepremi: "depremi/_getDepremi",
      _getAuxco: "auxtip/_getAuxco",
      _getTerce: "terce/_getTerce",
      _getTipco: "tipco/_getTipco",
      _getDepco: "depco/_getDepco",
      _getSerco: "serco/_getSerco",
    }),
    async buscarUltimaCorres() {
      try {
        const RES = await this._getUltCorr();
        if ("llave" in RES) {
          this.reg_traslado.llave.anoLlave = RES.llave.anoLlave;
          this.reg_traslado.llave.cont = RES.llave.cont;
          this.reg_traslado.fecha = RES.fechaR;
          this.reg_traslado.hora = RES.hora;
          this.firstField(this.form_traslado);
        } else if ("msg" in RES) {
          this.CON851("PNZ", "info", "No se encontro correspondencia");
        }
      } catch (error) {
        console.error(error);
      }
    },
    datoAnoLlave(key) {
      switch (key) {
        case "esc":
          return this.validarSalir();
        case "enter":
          return this.focusInput(this.form_traslado, "cont");
      }
    },
    datoAnoCont(val) {
      !val && this.focusInput(this.form_traslado, "cont");
      switch (val) {
        case "esc":
          return this.focusInput(this.form_traslado, "anoLlave");
        case "enter":
          return this.leerCorrespondecia();
      }
    },
    async leerTranslados() {
      try {
        for (let i = 0; i <= 4; i++) {
          if (this.reg_traslado.tablaDep[i]?.depTap.trim() != "") {
            const RES = await this._getDepco({
              codigo: this.reg_traslado.tablaDep[i]?.depTap,
            });
            this.reg_traslado[`personal_${i + 1}`] = RES.codigo;
            this.reg_traslado[`descripPer_${i + 1}`] = RES.descripcion;
            this.reg_traslado[`correoPer_${i + 1}`] = RES.correo;
            this.reg_traslado[`oper_${i + 1}`] = RES.oper;
            this.reg_traslado[`manejo_${i + 1}`] = this.reg_traslado.tablaDep[i]?.estaTab;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async leerCorrespondecia() {
      try {
        const RES = await this._getCorr({ llave: this.reg_traslado.llave });

        if (RES.msg) return this.CON851("N1", "info", `La correspondencia no existe`);
        else if (RES?.llave) {
          this.reg_traslado = Object.assign(this.reg_traslado, RES);
          this.reg_traslado.hora = this.reg_traslado.hora.padStart(5, "0");
          await this.leerTranslados();
          this.focusInput(this.form_traslado, "personal_1");
        } else this.CON851("N1", "error", `Algo salio mal, intentelo de nuevo`);
      } catch (error) {
        console.error(error);
      }
    },
    async datoPeronal(val, item) {
      switch (val.key) {
        case "esc":
          if (item == 1) return this.focusInput(this.form_traslado, "cont");
          else return this.focusInput(this.form_traslado, `inluir_correo_${item - 1}`);
        case "enter":
          await this.validarPersonal(item);
      }
    },
    async validarPersonal(item) {
      try {
        const RES = await this._getDepco({
          codigo: this.reg_traslado[`personal_${item}`],
        });
        if ("codigo" in RES) {
          this.reg_traslado[`descripPer_${item}`] = RES.descripcion;
          this.reg_traslado[`correoPer_${item}`] = RES.correo;
          this.reg_traslado[`oper_${item}`] = RES.oper;
          this.focusInput(this.form_traslado, `manejo_${item}`);
        } else if (RES.msg) {
          return this.CON851("PNZ", "info", "No existe correspondencia");
        } else return this.CON851("PNZ", "error", "Error consultando datos");
      } catch (error) {
        console.error(error);
      }
    },
    datoManejo(val, item) {
      switch (val.key) {
        case "esc":
          return this.focusInput(this.form_traslado, `personal_${item}`);
        case "enter":
          return this.focusInput(this.form_traslado, `inluir_correo_${item}`);
      }
    },
    datoCorreo(val, item) {
      switch (val.key) {
        case "esc":
          return this.focusInput(this.form_traslado, `manejo_${item}`);
        case "enter":
          if (item == 5) return this.validarTranslado();
          else return this.focusInput(this.form_traslado, `personal_${item + 1}`);
      }
    },
    async validarTranslado() {
      this.offField();
      if (!this.reg_traslado.personal_1)
        return this.CON851("PNZ", "info", "Debes ingresar almenos un destino", null, () => {
          this.focusInput(this.form_traslado, "personal_1");
        });
      if (!this.reg_traslado.manejo_1) {
        return this.CON851("PNZ", "info", "Completa el tramite de destino", null, () => {
          this.focusInput(this.form_traslado, "manejo_1");
        });
      }

      for (let i = 0; i <= 4; i++) {
        this.reg_traslado.tablaDep[i] = {
          depTap: this.reg_traslado[`personal_${i + 1}`],
          estaTab: this.reg_traslado[`manejo_${i + 1}`],
        };
        if (this.reg_traslado[`inluir_correo_${i + 1}`] == true) {
          this.listado_email.push({
            archivo: this.reg_traslado[`personal_${i + 1}`],
            anoLlave: this.reg_traslado.llave.anoLlave,
            cont: this.reg_traslado.llave.cont,
            destino: this.reg_traslado[`correoPer_${i + 1}`],
            nom_empresa: this.USUARIO_GLOBAL.nombre,
          });
        }
      }
      this.CON851P(
        "PNZ",
        "info",
        "¿Desea guardar los translados?",
        () => {
          this.guardar();
        },
        () => {
          this.focusInput(this.form_traslado, "personal_1");
        }
      );
    },
    async guardar() {
      try {
        const data = JSON.parse(JSON.stringify(this.reg_traslado));
        data.fecha = this.formatFecha_(data.fecha, data.hora);
        const RES = await this._putCorres({ data });
        if (RES.N1) {
          if (this.listado_email.length > 0) return this.CON851("N1", "success", `¡Traslado realizado correctamente!`, null, this.enviarEmail);
          else this.CON851("N1", "success", `¡Traslado realizado correctamente!`, null, this.limpiarDatos);
        }

        RES.msg && this.CON851("N1", "error", `Error grabando datos!`);
      } catch (error) {
        this.onField();
        console.error(error);
      }
    },
    async enviarEmail() {
      try {
        for (let i = 0; i < this.listado_email.length; i++) {
          const RES = await this._sendEmail({ data: this.listado_email[i] });
          if ("accepted" in RES) {
            if (this.listado_email.length == i + 1) {
              this.cerrar_CON851();
              this.CON851("N1", "success", `Correo enviado correctamente  a ${this.listado_email[i]?.destino}`, null, this.limpiarDatos);
            } else {
              this.CON851("N1", "success", `Correo enviado correctamente  a ${this.listado_email[i]?.destino}`, null, this.offField);
              this.cerrar_CON851();
            }
          }
          RES.msg && this.CON851("N1", "error", `¡Error enviando el correo!`);
        }
      } catch (error) {
        console.error(error);
        this.limpiarDatos();
      }
    },
    openCOR868() {
      this.offField();
      this.show_cor868 = true;
    },
    callbackCOR868(item) {
      this.show_cor868 = false;
      if (item) {
        this.reg_traslado = item;
        return this.leerCorrespondecia();
      }
      this.focusInput(this.form_corres, "cont");
    },
    openCOR866(item) {
      this.index = item;
      this.offField();
      this.show_cor866 = true;
    },
    callbackCOR866(item) {
      this.show_cor866 = false;
      if (item) {
        this.reg_traslado[`personal_${this.index}`] = item.codigo;
        this.reg_traslado[`descripPer_${this.index}`] = item.descripcion;
        this.reg_traslado[`correoPer_${this.index}`] = item.correo;
        this.reg_traslado[`oper_${this.index}`] = item.oper;
        return this.validarPersonal(this.index);
      }
      this.focusInput(this.form_traslado, `personal_${this.index}`);
    },

    limpiarDatos() {
      this.listado_email = [];
      this.reg_traslado = getObjCorres();
      this.buscarUltimaCorres();
    },
    validarSalir() {
      this.CON851P(
        "PNZ",
        "warning",
        "¿Seguro que desea volver al menu principal?",
        () => {
          this.$router.push("/Menu-Principal");
        },
        () => {
          this.focusInput(this.form_traslado, "anoLlave");
        }
      );
    },
    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
  },
};
</script>
