<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="pa-4 mx-auto">
      <v-card-text class="text-center primary--text py-0 pb-5 mt-6">
        <v-row class="input-row">
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="nextStep(form_informe, $event, datoAno)"
              :field="form_informe.anio"
              :reg="reg.anio"
              @onChange="onChange"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CON851 v-if="alerta.estado" :alerta="alerta" />
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
  </v-container>
</template>

<script>
import {
  getInformeTrimestral,
  getInformeTrimestral_,
} from '../../fuentes/correspondencia/regInformeTrimestral'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { global, image_base64 } from '../../mixins/global'
import { nextAction } from '../../mixins/nextAction'
import { informeCORR307 } from '../../Pdf/index'
import moment from 'moment'

export default {
  name: 'COR307',
  mixins: [global, nextAction],
  components: {},

  data() {
    return {
      titulo: '3.7 - Informe trimestral correspondencia',

      reg: getInformeTrimestral(),
      form_informe: getInformeTrimestral_(),
    }
  },
  computed: {
    ...mapGetters({ get: 'formularios/get' }),
  },

  mounted() {
    this.initialData()
  },
  methods: {
    onChange(data) {
      this.reg_serco[data.key] = data.value
    },
    ...mapMutations({
      setDialogType: 'formularios/setDialogType',
    }),
    ...mapActions({
      getCorr869: 'corr/getCorr869',
    }),
    initialData() {
      this.reg.anio = moment().format('YYYY-MM-DD').slice(0, 4)
      this.focusInput(this.form_informe, 'anio')
    },

    datoAno(key) {
      switch (key) {
        case 'esc':
          return this.validarSalir()
        case 'enter':
          return this.consultarCorrespondencia()
      }
    },
    async consultarCorrespondencia() {
      try {
        const RES = await this.getCorr869({ anio: this.reg.anio })

        RES.length > 0 && this.solicitarImpresion(RES)
        if (RES.msg) {
          this.CON851(
            'PNZ',
            'info',
            'No existen datos de la correspondencia de este año',
            null,
            () => {
              this.focusInput(this.form_informe, 'anio')
            },
          )
        }
      } catch (error) {
        console.error(error)
      }
    },
    solicitarImpresion(data) {
      this.CON851P(
        '00',
        'info',
        '',
        () => {
          this.imprimirInforme(data)
        },
        () => {
          this.focusInput(this.form_informe, 'anio')
        },
      )
    },
    async imprimirInforme(data) {
      await informeCORR307(data, this.reg.anio)
      this.focusInput(this.form_informe, 'anio')
    },
    validarSalir() {
      this.CON851P(
        'MENU',
        'info',
        '',
        () => {
          this.$router.push('/Menu-Principal')
        },
        () => {
          this.focusInput(this.form_informe, 'anio')
        },
      )
    },
  },
}
</script>
