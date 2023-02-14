<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="pa-4 mx-auto">
      <v-card-text class="text-center primary--text py-0 pb-5">
        <v-row class="input-row" justify="center">
          <v-col cols="6" md="6" sm="6" class="mx-auto">
            <v-icon :color="tipo_impresion.color">
              {{ tipo_impresion.icono }}
            </v-icon>
            {{ tipo_impresion.text }}
          </v-col>
        </v-row>

        <v-row class="input-row">
          <!-- entidad -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownEntidad)
              "
              @abrirF8="openCON802"
              :field="form_distribucion_interna.entidad"
              :reg="reg_distribucion_interna.entidad"
              @onChange="onChange"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="4" md="4" class="input-col">
            <data-card
              :field="form_distribucion_interna.entidad_dataCard"
              :reg="reg_distribucion_interna.entidad_dataCard"
            ></data-card>
          </v-col>

          <!-- dependencia -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownDepenCorres)
              "
              @abrirF8="openCOR866"
              :field="form_distribucion_interna.depen_corres"
              :reg="reg_distribucion_interna.depen_corres"
              @onChange="onChange"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="4" md="4" class="input-col">
            <data-card
              :field="form_distribucion_interna.depen_corres_dataCard"
              :reg="reg_distribucion_interna.depen_corres_dataCard"
            ></data-card>
          </v-col>

          <!-- tipo correspondencia -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownTipoCorres)
              "
              @abrirF8="openCOR867"
              :field="form_distribucion_interna.tipo_corres"
              :reg="reg_distribucion_interna.tipo_corres"
              @onChange="onChange"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="4" md="4" class="input-col">
            <data-card
              :field="form_distribucion_interna.tipo_corres_dataCard"
              :reg="reg_distribucion_interna.tipo_corres_dataCard"
            ></data-card>
          </v-col>
          <v-col cols="12" sm="6" md="6"></v-col>

          <!-- descargar por tipo de correspondencia -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="
                nextStep(
                  form_distribucion_interna,
                  $event,
                  keyDownDescartarTipoCorres,
                )
              "
              :field="form_distribucion_interna.descartar_tipo_corres"
              :reg="reg_distribucion_interna.descartar_tipo_corres"
            ></AUTOCOMPLETE>
          </v-col>

          <!-- fecha inicial -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <FECHA
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownFechaInit)
              "
              :field="form_distribucion_interna.fecha_init"
              :reg="reg_distribucion_interna.fecha_init"
            ></FECHA>
          </v-col>

          <!-- fecha final -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <FECHA
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownFechaFin)
              "
              :field="form_distribucion_interna.fecha_fin"
              :reg="reg_distribucion_interna.fecha_fin"
            ></FECHA>
          </v-col>

          <!-- jornada -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownJornada)
              "
              :field="form_distribucion_interna.jornada"
              :reg="reg_distribucion_interna.jornada"
            ></AUTOCOMPLETE>
          </v-col>

          <!-- procedencia -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownProcedencia)
              "
              :field="form_distribucion_interna.procedencia"
              :reg="reg_distribucion_interna.procedencia"
            ></AUTOCOMPLETE>
          </v-col>

          <!-- manejo -->
          <v-col cols="12" sm="2" md="2" class="input-col">
            <AUTOCOMPLETE
              @next-action="
                nextStep(form_distribucion_interna, $event, keyDownManejo)
              "
              :field="form_distribucion_interna.manejo"
              :reg="reg_distribucion_interna.manejo"
              @onChange="(data) => (busqueda = data.value)"
            ></AUTOCOMPLETE>
          </v-col>
        </v-row>
      </v-card-text>
      <CON890P
        :modal_impresion="modal_impresion"
        @impresionSelec="impresionSelec"
        class="mx-auto"
      ></CON890P>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta"
      @cancelar="cerrarDialogo"
      @salirEsc="cerrarDialogo"
      @confirmar="confirmar"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>

    <CON802
      v-if="show_con802"
      @callBack="callbackCON802"
      @callbackEsc="callbackCON802"
    ></CON802>

    <COR866
      v-if="show_COR866"
      @callBack="callbackCOR866"
      @callbackEsc="callbackCOR866"
    ></COR866>

    <COR867
      v-if="show_COR867"
      @callBack="callbackCOR867"
      @callbackEsc="callbackCOR867"
    ></COR867>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { global, image_base64 } from '../../mixins/global'
import CON890P from '../../components/CONTAB/CON890P.vue'
import { nextAction } from '../../mixins/nextAction'
import { alert } from '../../mixins/CON851'
import {
  getObjRegDistribucionInterna,
  getObjRegDistribucionInterna_,
} from '../../fuentes/correspondencia/regDistribucionInterna'
import { getImpresion301 } from '../../Excel/impresionCORR301'
import generadorImpresion from '../../Excel/generadorImpresion'

/* f8 */
import CON802 from '../../components/CONTAB/CON802'
import COR866 from '../../components/COR/COR866.vue'
import COR867 from '../../components/COR/COR867.vue'

/* index vuex  */
import index from '../../store/index'

export default {
  name: 'COR305',
  mixins: [global, nextAction, alert],
  components: {
    CON890P,
    CON802,
    COR866,
    COR867,
  },
  data() {
    return {
      titulo: '3-5 - Informe de distribución interna',
      modal_impresion: true,
      tipo_impresion: {
        icono: '',
        acceso: '',
        text: '',
        color: '',
      },

      show_con802: false,
      show_COR866: false,
      show_COR867: false,

      reg_distribucion_interna: getObjRegDistribucionInterna(),
      form_distribucion_interna: getObjRegDistribucionInterna_(),
    }
  },
  computed: {
    ...mapGetters({ list: 'ciudad/list', get: 'formularios/get' }),
  },
  created() {},
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
      obtenerDepartamentos: 'ciudad/obtenerDepartamentos',
      get_ciudad_impresion: 'ciudad/getCiudadImpresion',
      getDepartamento: 'ciudad/getDepartamento',
      getCiuDptPais: 'ciudad/getCiuDptPais',
      getCiudad: 'ciudad/getCiudad',

      /* terce */
      _getTerceF8: 'terce/_getTerceF8',

      /* depco */
      _getDepco: 'depco/_getDepco',

      /* tipco */
      _getTipco: 'tipco/_getTipco',

      /* impresion COR301 */
      _getImpresion301: 'impresion301/_getImpresion',
    }),

    /* standard functions */

    initialData() {
      this.reg_distribucion_interna.entidad = '99'

      this.reg_distribucion_interna.depen_corres = '**'

      this.reg_distribucion_interna.tipo_corres = '**'

      this.reg_distribucion_interna.fecha_init = moment().format('YYYY-MM-DD')

      this.reg_distribucion_interna.fecha_fin = moment().format('YYYY-MM-DD')

      this.reg_distribucion_interna.descartar_tipo_corres = 'N'

      this.reg_distribucion_interna.jornada = '**'

      this.reg_distribucion_interna.procedencia = '2'

      this.reg_distribucion_interna.manejo = '**'
    },

    async confirmar() {
      try {
        let dialogType = this.get('dialogType')
        switch (dialogType) {
          case 'salir':
            this.$router.push('/Menu-Principal')
            break
          case 'done':
            this.imprimirCiudad()
            break
        }
        this.firstField(this.form)
      } catch (error) {
        console.error(error)
      }
    },

    impresionSelec(data) {
      switch (data.acceso) {
        case 'F':
          this.$router.push('/Menu-Principal')
          break
        default:
          this.tipo_impresion.icono = data.icono
          this.tipo_impresion.acceso = data.acceso
          this.tipo_impresion.text = data.text
          this.tipo_impresion.color = data.color
          this.ocultarImpresion()
          setTimeout(() => {
            this.focusInput(this.form_distribucion_interna, 'entidad')
          }, 100)
          break
      }
    },

    ocultarImpresion() {
      this.modal_impresion = false
    },

    abrirImpresion() {
      this.modal_impresion = true
    },

    cancelarAlerta() {
      setTimeout(() => {
        this.onField()
      }, 100)
      this.cerrar_CON851()
    },

    cerrarDialogo() {
      this.firstField(this.form)
      this.cerrar_CON851()
    },

    openCON802() {
      this.offField()
      this.show_con802 = true
    },

    async callbackCON802(item) {
      if (item) {
        this.reg_distribucion_interna.entidad = item.codigo
      }
      this.focusInput(this.form_distribucion_interna, 'codigo')
      this.show_con802 = false
      this.focusInput(this.form_distribucion_interna, 'entidad')
    },

    openCOR866() {
      this.offField()
      this.show_COR866 = true
    },

    async callbackCOR866(item) {
      if (item) {
        this.reg_distribucion_interna.depen_corres = item.codigo
      }
      this.show_COR866 = false
      this.focusInput(this.form_distribucion_interna, 'depen_corres')
    },

    openCOR867() {
      this.offField()
      this.show_COR867 = true
    },

    async callbackCOR867(item) {
      if (item) {
        this.reg_distribucion_interna.tipo_corres = item.codigo
      }
      this.show_COR867 = false
      this.focusInput(this.form_distribucion_interna, 'tipo_corres')
    },

    /* entidad functions */
    async validateEntidad() {
      const { entidad } = this.reg_distribucion_interna

      if (entidad.length > 0) {
        const RES = await this._getTerceF8({
          desde: '0',
          cantidad: '1',
          filtro: entidad,
        })

        if (entidad == '99') {
          this.reg_distribucion_interna.entidad_dataCard = 'TODAS LAS ENTIDADES'
          this.focusInput(this.form_distribucion_interna, 'depen_corres')
        } else if (RES.msg) {
          this.reg_distribucion_interna.entidad_dataCard = ''
          this.CON851('01', 'info', `${entidad}`)
        } else if (RES[0].codigo != entidad) {
          this.reg_distribucion_interna.entidad_dataCard = ''
          this.CON851('01', 'info', `${entidad}`)
        } else {
          this.reg_distribucion_interna.entidad_dataCard = RES[0].descrip
          this.focusInput(this.form_distribucion_interna, 'depen_corres')
        }
      } else if (entidad.length == 0) {
        this.CON851('personalizada', 'info', 'Ingrese un valor')
      }
    },

    /* depenCorres functions */
    async validateDepenCorres() {
      let { depen_corres } = this.reg_distribucion_interna

      if (depen_corres.length > 0) {
        const RES = await this._getDepco({ codigo: depen_corres })

        if (depen_corres == '**') {
          this.reg_distribucion_interna.depen_corres_dataCard =
            'Todas las dependencias'
          this.focusInput(this.form_distribucion_interna, 'tipo_corres')
        } else if (RES.msg) {
          this.reg_distribucion_interna.depen_corres_dataCard = ''
          this.CON851('01', 'info', `${depen_corres}`)
        } else {
          this.reg_distribucion_interna.depen_corres_dataCard = RES.descripcion
          this.focusInput(this.form_distribucion_interna, 'tipo_corres')
        }
      } else if (depen_corres.length == 0) {
        this.CON851('personalizada', 'info', 'Ingrese un valor')
      }
    },

    /* tipoCorres functions */
    async validateTipoCorres() {
      const { tipo_corres } = this.reg_distribucion_interna

      if (tipo_corres.length > 0) {
        const RES = await this._getTipco({ codigo: tipo_corres })

        if (tipo_corres == '**') {
          this.reg_distribucion_interna.tipo_corres_dataCard = 'Todos los tipos'
          this.focusInput(
            this.form_distribucion_interna,
            'descartar_tipo_corres',
          )
        } else if (RES.msg) {
          this.reg_distribucion_interna.tipo_corres_dataCard = ''
          this.CON851('01', 'info', `${tipo_corres}`)
        } else {
          this.reg_distribucion_interna.tipo_corres_dataCard = RES.descripcion
          this.focusInput(
            this.form_distribucion_interna,
            'descartar_tipo_corres',
          )
        }
      } else if (tipo_corres.length == 0) {
        this.CON851('personalizada', 'info', 'Ingrese un valor')
      }
    },

    /* fechaInit functions */
    async validateFechaInit() {
      const { fecha_init } = this.reg_distribucion_interna
      const { max_length } = this.form_distribucion_interna.fecha_init

      if (fecha_init.length == 0) {
        this.CON851('personalizada', 'info', 'Ingrese un valor')
      } else if (fecha_init.length < max_length) {
        this.CON851('personalizada', 'info', 'Verifique la fecha inicial')
      } else if (fecha_init.length == max_length) {
        this.focusInput(this.form_distribucion_interna, 'fecha_fin')
      }
    },

    /* fechaFin functions */
    async validateFechaFin() {
      const { fecha_fin } = this.reg_distribucion_interna
      const { max_length } = this.form_distribucion_interna.fecha_fin

      if (fecha_fin.length == 0) {
        this.CON851('personalizada', 'info', 'Ingrese un valor')
      } else if (fecha_fin.length < max_length) {
        this.CON851('personalizada', 'info', 'Verifique la fecha inicial')
      } else if (fecha_fin.length == max_length) {
        this.focusInput(this.form_distribucion_interna, 'jornada')
      }
    },

    /* manejo functions */
    async requestPrint() {
      const {
        entidad,
        depen_corres,
        tipo_corres,
        descartar_tipo_corres,
        fecha_init,
        fecha_fin,
        jornada,
        procedencia,
        manejo,
      } = this.reg_distribucion_interna

      const data = {
        nit: entidad,
        dep: depen_corres,
        tipoCorr: tipo_corres,
        jornada: jornada,
        proceden: procedencia,
        manejo: manejo,
        fechaIni: fecha_init,
        fechaFin: fecha_fin,
      }

      const spinnerConfig = {
        name: 'descargarListadoControlDeRespuestasXLSX',
        textProgressValues: {
          waitingData: 'Procesando solicitud',
          downloadingData: 'Preparando documento XLSX',
          generateDocument: 'Descargando documento XLSX',
        },
        showLoadingBar: true,
      }
      index.commit('spinnerConfig', spinnerConfig, { root: true })
      const RES = await this._getImpresion301(data)

      if (RES.length < 1) {
        this.CON851('personalizada', 'warning', 'No hay datos disponibles.')
      } else {
        let columnas = getImpresion301().columnas
        let logo = getImpresion301().logo

        const impre = {
          USUARIO: this.USUARIO_GLOBAL.nombre,
          NIT: this.USUARIO_GLOBAL.nit,
        }
        let header = [
          { text: `${impre.USUARIO}`, bold: true, size: 16 },
          `CONTROL DE CORRESPONDENCIA  NIT: ${impre.NIT}`,
          `Periodo desde: ${data.fechaIni.slice(
            0,
            10,
          )}  Hasta: ${data.fechaFin.slice(0, 10)}`,
        ]

        if (RES && RES.msg) {
          this.CON851('personalizada', 'warning', 'No hay datos disponibles.')
          index.commit('isLoading', null, { root: true })
        } else if (RES[0].nit) {
          setTimeout(() => {
            generadorImpresion({
              header,
              logo,
              tabla: {
                columnas,
                data: RES,
              },
            })
            this.initialData()
            this.abrirImpresion()
          }, 700)
        } else {
          this.CON851(
            'personalizada',
            'warning',
            'Verifique la informacion y intentelo de nuevo',
          )
        }
      }
    },

    /* enter funcions */
    keyDownEntidad(key) {
      switch (key) {
        case 'esc':
          this.abrirImpresion()
          break

        case 'enter':
          this.validateEntidad()
          break

        default:
          break
      }
    },

    keyDownDepenCorres(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'entidad')
          break

        case 'enter':
          this.validateDepenCorres()
          break

        default:
          break
      }
    },

    keyDownTipoCorres(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'depen_corres')
          break

        case 'enter':
          this.validateTipoCorres()
          break

        default:
          break
      }
    },

    keyDownDescartarTipoCorres(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'tipo_corres')
          break

        case 'enter':
          this.focusInput(this.form_distribucion_interna, 'fecha_init')
          break

        default:
          break
      }
    },

    keyDownFechaInit(key) {
      switch (key) {
        case 'esc':
          this.focusInput(
            this.form_distribucion_interna,
            'descartar_tipo_corres',
          )
          break

        case 'enter':
          this.validateFechaInit()
          break

        default:
          break
      }
    },

    keyDownFechaFin(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'fecha_init')
          break

        case 'enter':
          this.validateFechaFin()
          break

        default:
          break
      }
    },

    keyDownJornada(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'fecha_fin')
          break

        case 'enter':
          this.focusInput(this.form_distribucion_interna, 'procedencia')
          break

        default:
          break
      }
    },

    keyDownProcedencia(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'jornada')
          break

        case 'enter':
          this.focusInput(this.form_distribucion_interna, 'manejo')
          break

        default:
          break
      }
    },

    keyDownManejo(key) {
      switch (key) {
        case 'esc':
          this.focusInput(this.form_distribucion_interna, 'procedencia')
          break

        case 'enter':
          this.requestPrint()
          break

        default:
          break
      }
    },
  },
}
</script>
