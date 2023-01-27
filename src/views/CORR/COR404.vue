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

      <v-row>
        <!-- ano respuesta -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event, datoAnoLlave)"
            :field="form_init_resp.anoLlave"
            :reg="reg_init_resp.codResp.anoLlave"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- radicado -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event, datoRadicado)"
            @abrirF8="openCOR864"
            :field="form_init_resp.cont"
            :reg="reg_init_resp.codResp.cont"
            @onChange="
              (data) => {
                reg_init_resp.codResp[data.key] = data.value
              }
            "
          ></INPUT>
        </v-col>

        <v-col cols="8"></v-col>

        <!-- tiene radicado? -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.swRadi"
            :reg="reg_init_resp.swRadi"
          ></AUTOCOMPLETE>
        </v-col>

        <!-- radicado ano -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.anoRadi"
            :reg="reg_init_resp.anoRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- radicado codigo -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.contRadi"
            :reg="reg_init_resp.contRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- fecha -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.fechaRadi"
            :reg="reg_init_resp.fechaRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- hora -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.horaRadi"
            :reg="reg_init_resp.horaRadi"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <v-col cols="2"></v-col>

        <!-- remitente -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.nit"
            :reg="reg_init_resp.nit"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.nit_dataCard"
            :reg="reg_init_resp.nit_dataCard"
          ></data-card>
        </v-col>

        <!-- depto remit -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.dptoRemit"
            :reg="reg_init_resp.dptoRemit"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.dptoRemit_dataCard"
            :reg="reg_init_resp.dptoRemit_dataCard"
          ></data-card>
        </v-col>

        <!-- procedencia -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <AUTOCOMPLETE
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.proceden"
            :reg="reg_init_resp.proceden"
          ></AUTOCOMPLETE>
        </v-col>

        <v-col cols="10"></v-col>

        <!-- tipo -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.tipoCorres"
            :reg="reg_init_resp.tipoCorres"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.tipoCorres_dataCard"
            :reg="reg_init_resp.tipoCorres_dataCard"
          ></data-card>
        </v-col>

        <!-- aux_tip -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.codAuxco"
            :reg="reg_init_resp.codAuxco"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.codAuxco_dataCard"
            :reg="reg_init_resp.codAuxco_dataCard"
          ></data-card>
        </v-col>

        <!-- dpto -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.ser"
            :reg="reg_init_resp.ser"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.ser_dataCard"
            :reg="reg_init_resp.ser_dataCard"
          ></data-card>
        </v-col>

        <!-- responsable -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.dep"
            :reg="reg_init_resp.dep"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.dep_dataCard"
            :reg="reg_init_resp.dep_dataCard"
          ></data-card>
        </v-col>

        <!-- descripcion -->
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.descrip"
            :reg="reg_init_resp.descrip"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- asunto -->
        <v-col cols="12" sm="12" md="12" xs="12" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.asunto"
            :reg="reg_init_resp.asunto"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- macro -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.clMacro"
            :reg="reg_init_resp.clMacro"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.codigoMacro"
            :reg="reg_init_resp.codigoMacro"
            @onChange="onChange"
          ></INPUT>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.macro_dataCard"
            :reg="reg_init_resp.macro_dataCard"
          ></data-card>
        </v-col>

        <!-- fecha_2 -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.fecha"
            :reg="reg_init_resp.fecha"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- hora_2 -->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.hora"
            :reg="reg_init_resp.hora"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- macro -->
        <v-col cols="12" class="input-col">
          <TEXTAREA
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.macro"
            :reg="reg_init_resp.macro"
          ></TEXTAREA>
        </v-col>

        <!-- medio respuesta -->

        <!-- firma -->
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.firma"
            :reg="reg_init_resp.firma"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <v-col cols="12" sm="4" md="4" class="input-col">
          <data-card
            :field="form_init_resp.firma_dataCard"
            :reg="reg_init_resp.firma_dataCard"
          ></data-card>
        </v-col>

        <!-- cargo -->
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.cargo"
            :reg="reg_init_resp.cargo"
            @onChange="onChange"
          ></INPUT>
        </v-col>

        <!-- estado correspondencia -->
        <v-col cols="12" sm="6" md="6" xs="6" class="input-col">
          <INPUT
            @next-action="nextStep(form_init_resp, $event)"
            :field="form_init_resp.estaR"
            :reg="reg_init_resp.estaR"
            @onChange="onChange"
          ></INPUT>
        </v-col>
      </v-row>
    </v-card>

    <!-- componentes adicionales -->

    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />

    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>

    <COR864
      v-if="show_cor864"
      @callBack="callbackCOR864"
      @callbackEsc="callbackCOR864"
    ></COR864>
  </v-container>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { nextAction } from '../../mixins/nextAction'
import { global, currentUser } from '../../mixins/global'

/* variables */
import {
  getRescorr,
  getRescorr_,
} from '../../fuentes/correspondencia/regRescorr'
import COR864 from '../../components/COR/COR864.vue'
/* PDF */
import { informeCORR404p } from '../../Pdf/index'

export default {
  name: 'COR404',

  mixins: [nextAction, global],
  components: { COR864 },

  data() {
    return {
      titulo: '4.4 REIMPRIME RESPUESTA',

      novedad_activa: false,
      novedad: {
        acceso: null,
      },
      show_cor864: false,

      reg_init_resp: getRescorr(),
      form_init_resp: getRescorr_(),
    }
  },

  computed: {
    ...mapGetters({
      get: 'formularios/get',
    }),
  },

  created() {
    this.inicialData()
  },

  mounted() {},

  methods: {
    onChange(data) {
      this.reg_init_resp[data.key] = data.value
    },
    ...mapActions({
      /* F8 */
      _getCorr864f8: 'descorr/_getCorr864f8',
      _getCorr864: 'descorr/_getCorr864',

      /* resCorr */
      _getUltRescorr: 'rescorr/_getUltRescorr',
    }),

    openCOR864() {
      this.offField()
      this.show_cor864 = true
    },

    callbackCOR864(item) {
      console.log('ITEM', item)
      if (item) {
        this.reg_init_resp.codResp.anoLlave = item.anoLlave

        this.reg_init_resp.codResp.cont = item.contLlave
        console.log(this.reg_init_resp)

        this.reg_init_resp.swRadi = item.swRadi

        this.reg_init_resp.anoRadi = item.llaveRadi.slice(0, 4)

        this.reg_init_resp.contRadi = item.llaveRadi.slice(4, 10)

        this.reg_init_resp.fechaRadi = item.fechaR

        this.reg_init_resp.horaRadi = item.horaRadi

        this.reg_init_resp.nit = item.nit

        this.reg_init_resp.nit_dataCard = item.descripTer

        this.reg_init_resp.dptoRemit = item.codUnifun

        this.reg_init_resp.dptoRemit_dataCard = item.descripTipco //no llega el dato

        this.reg_init_resp.proceden = item.procedenR

        this.reg_init_resp.tipoCorres = item.tipoCorres

        this.reg_init_resp.tipoCorres_dataCard = item.descripTipco

        this.reg_init_resp.codAuxco = item.codAuxco

        this.reg_init_resp.codAuxco_dataCard = item.perRec

        this.reg_init_resp.ser = item.ser

        this.reg_init_resp.ser_dataCard = item.operdiri

        this.reg_init_resp.ser_dataCard = item.operdiri

        this.reg_init_resp.dep = item.dep

        this.reg_init_resp.descrip = item.descrip

        this.reg_init_resp.asunto = item.asunto

        this.reg_init_resp.clMacro = item.codigoMacro

        this.reg_init_resp.codigoMacro = item.codigoMacro

        this.reg_init_resp.fecha = item.fechaR

        this.reg_init_resp.hora = item.horaModi

        this.reg_init_resp.macro = item.macro

        this.reg_init_resp.firma = item.oper

        this.reg_init_resp.firma = item.firma

        this.reg_init_resp.firma_dataCard = item.respon

        this.reg_init_resp.cargo = item.cargo

        this.reg_init_resp.estaR = item.estaR
      }
      this.show_cor864 = false

      this.focusInput(this.form_init_resp, 'cont')
    },
    async inicialData() {
      const res_getUltRescorr = await this._getUltRescorr()

      this.reg_init_resp.codResp.anoLlave = res_getUltRescorr.fecha.slice(0, 4)
      this.reg_init_resp.codResp.cont = res_getUltRescorr.cont
      this.focusInput(this.form_init_resp, 'cont')
    },

    async validateAnoLlave() {
      const { anoLlave } = this.reg_init_resp
      if (anoLlave == '') {
        this.CON851('02', 'info', null)
      } else {
        this.focusInput(this.form_init_resp, 'cont')
      }
    },
    async validateRadicado() {
      let { codResp } = this.reg_init_resp

      const RES = await this._getCorr864({ codResp })

      if (RES?.msg) {
        this.CON851('01', 'info', `${codResp.anoLlave}${codResp.cont}`)
      } else if (RES?.codResp) {
        this.completeInputs(RES)
        // this.CON851("PNZ", "info", "¿Imprimir documento?", "P");
      } else {
        this.CON851(
          'PNZ',
          'error',
          'Error desconocido, compruebe las entradas de datos',
        )
      }
    },

    async completeInputs(RES) {
      const select_data = {
        // anoLlave: this.reg_init_resp.codResp.anoLlave, //año llave

        // contLlave: this.reg_init_resp.codResp.cont, //radicado

        codResp: {
          anoLlave: this.reg_init_resp.codResp.anoLlave,
          cont: this.reg_init_resp.codResp.cont,
        },

        cont: RES.contLlave, // Radicado

        swRadi: RES.swRadi === 'S' ? 1 : 2, // tiene radicado?

        anoRadi: RES.llaveRadi.slice(0, 4), //Año radicado

        contRadi: RES.llaveRadi.slice(4, 10), //Nro radicado

        fechaRadi: RES.fechaRadi, //fecha

        horaRadi: RES.horaRadi, //hora

        nit: RES.nit, //remitente

        nit_dataCard: RES.descripTer, //descripcion de remitente "FALTA"

        dptoRemit: RES.codUnifun, //Depto Remit

        dptoRemit_dataCard: RES.descripUnifun, //descripcion Dpto" proceso

        proceden: RES.proceden, //procedencia

        tipoCorres: RES.tipoCorres, //tipo

        tipoCorres_dataCard: RES.descripSer, //descripcion tipo

        codAuxco: RES.codAuxco, //aux Tip

        codAuxco_dataCard: RES.descrip, // descripcion aux

        ser: RES.ser, //Dpto

        ser_dataCard: RES.descripSer, // descripcion Dpto

        dep: RES.dep, //Responsable

        dep_dataCard: RES.descripSer, //DESCRIPCION RESPONSABLE

        descrip: RES.descrip, //Input descripcion

        asunto: RES.asunto, //Inut asunto

        clMacro: RES.tipoCorres, //Tipo macro

        codigoMacro: RES.codigoMacro, //codigo macro

        macro_dataCard: RES.operdiri, //descripcion codigo macro

        fecha: RES.fecha.slice(0, 10), //fecha

        hora: RES.horaModi, //hora

        macro: RES.macro, //macro textarea

        firma: RES.oper, //Input firma

        firma: RES.firma, //Input firma

        firma_dataCard: RES.respon, //descripcion firma

        cargo: RES.cargo, //Input cargo

        estaR: RES.estaR, //Input estado corresponencia
      }
      this.reg_init_resp = select_data

      this.solicitarImpresion()
    },

    async solicitarImpresion() {
      this.CON851P('00', 'info', '', this.generarImpresion, () => {
        this.reg_init_resp = getRescorr()
        this.focusInput(this.form_init_resp, 'anoLlave')
      })
    },

    async generarImpresion() {
      let { codResp } = this.reg_init_resp

      const RES = await this._getCorr864({ codResp })

      // let fecha = new Date(
      //   `${this.reg_init_resp.fecha}T${this.reg_init_resp.hora}:00Z`
      // );
      const data = {
        USUARIO: this.USUARIO_GLOBAL.nombre,
        ...this.reg_init_resp,
        ...RES,
        NIT: this.USUARIO_GLOBAL.nit,
        //fecha: fecha.toLocaleDateString("es"),
      }
      await informeCORR404p(data)
      this.focusInput(this.form_init_resp, 'anoLlave')
      this.reg_init_resp = getRescorr()
    },

    cancelar() {
      this.onField()
      this.cerrar_CON851()
    },

    async confirmar() {
      this.cerrar_CON851()
      let dialogType = this.get('dialogType')

      switch (dialogType) {
        case 'salir':
          this.$router.push('/Menu-Principal')
          break
        case 'input':
          this.generarImpresion()
          break

        default:
          break
      }
    },

    cancelarAlerta() {
      this.cerrar_CON851()
      this.onField()
    },

    datoAnoLlave(key) {
      switch (key) {
        case 'esc':
          this.CON851('MENU', 'info', null, 'P')
          break

        case 'enter':
          this.validateAnoLlave()
          break
      }
    },

    datoRadicado(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_init_resp, 'anoLlave')
          break

        case 'enter':
          this.validateRadicado()
          break

        default:
          break
      }
    },
  },
}
</script>

<style></style>
