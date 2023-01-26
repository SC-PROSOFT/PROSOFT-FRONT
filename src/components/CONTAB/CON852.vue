<!-- CON852  By: Cristian Suarez -->
<template>
  <v-dialog v-model="alerta.estado" max-width="600" persistent>
    <v-card :class="btnCancelar ? 'pb-3' : 'pb-0'">
      <v-card-text>
        <v-row style="padding-bottom: 10px; padding-top: 10px;">
          <v-col md="2" sm="2" cols="3">
            <v-card height="120%" width="12%" :color="color">
              <v-icon
                :color="color"
                size="50"
                class="ml-4 pt-3"
                style="margin: 0%; padding: 0%;"
              >
                {{ icono }}
              </v-icon>
            </v-card>
          </v-col>
          <v-col md="10" sm="10" cols="auto" xs="10" style="padding: 0px;">
            <v-row>
              <v-col
                md="10"
                sm="10"
                cols="auto"
                xs="10"
                style="padding: 0px; margin-top: 15px;"
              >
                <v-card-title :class="`${color}--text text-center my-0 `">
                  {{ titulo }}
                </v-card-title>
                <v-card-subtitle>
                  {{ cuerpo }}
                  <v-divider></v-divider>
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-row style="margin-right: 1%;">
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn ref="btn1" text color="success" @click="confirmar">
                  Aceptar
                </v-btn>
                <v-btn color="error" text dark @click="cancelar" ref="btn2">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    alerta: Object,
  },
  data() {
    return {
      icono: '',
      color: '',
      iconos: {
        warning: ['mdi-alert-circle', '¡Precaución!'],
        error: ['mdi-close-octagon-outline', '¡Error!'],
        success: ['mdi-check-circle-outline', '¡Hecho!'],
        info: ['mdi-information-outline', '¡Atención!'],
      },
      titulo: '',
      cuerpo: '',
      btnCancelar: false,
    }
  },
  methods: {
    CON852() {
      for (const key of Object.keys(this.iconos)) {
        if (this.alerta.tipo == key) {
          this.icono = this.iconos[key][0]
          this.color = key
          this.titulo = this.iconos[key][1]
          break
        }
      }
      switch (this.alerta.code) {
        case '01':
          this.cuerpo =
            ' Usted adquirio! una version del programa restringida. Supera el numero de comprobantes Comuniquese con PROSOFT SAS '
          break
        case '02':
          this.cuerpo =
            ' El visualizador de listados soporta solo hasta 500 paginas. Su archivo supera este numero pero solo mostraremos en pantalla las primeras 30.000 lineas '
          break
        case '10':
          this.cuerpo =
            ' Intento seguir leyendo un archivo que llego a su fin. Informe al programador '
          break
        case '22':
          this.cuerpo = ' Intento escribir en una secuencia que ya existe! '
          break
        case '30':
          this.cuerpo =
            ' No se pudo accesar el archivo. El problema es de hardware, revise conexiones de RED, Impresoras o espacio disponible en disco duro '
          break
        case '35':
          this.cuerpo = ' No existe el archivo '
          break
        case '37':
          this.cuerpo =
            ' No tiene acceso al hardware. El disco duro no esta compartido o el archivo esta protejido con atributos o la impresora no esta disponible '
          break
        case '39':
          this.cuerpo =
            ' La estructura del archivo cambio. Es posible que se trate de un daño en el archivo o que el archivo sea de una version anterior y requiera actualizar '
          break
        case '41':
          this.cuerpo =
            ' Intento abrir  un archivo que ya se habia abierto. Este error puede ser consecuencia de un error anterior o un error de programacion sin consecuencias '
          break
        case '42':
          this.cuerpo =
            ' Intento cerrar un archivo que no se habia abierto. Este error puede ser consecuencia de un error anterior o un error de programacion sin consecuencias '
          break
        case '47':
          this.cuerpo =
            ' Error de programacion. Se intento cerrar un archivo que No estaba abierto. Informe este error y la opcion al soporte tecnico Prosoft '
          break
        case '48':
          this.cuerpo =
            ' Intento leer en un archivo que no se habia abierto. Este error es consecuencia de otro error, para solucionar el problema basese en el primer mensaje '
          break
        case '90':
          this.cuerpo =
            ' Se intento crear un archivo que esta siendo utilizado por otro usuario o por usted mismo en otra ventana '
          break
        case '91':
          this.cuerpo =
            ' Archivo abierto previamente, Por favor Reporte a Prosoft '
          break
        case '93':
          this.cuerpo =
            ' Se intento borrar o modificar un registro que esta ocupado por otro usuario o por usted mismo en otra ventana '
          break
        case '98':
          this.cuerpo =
            ' Daño en las llaves del archivo causado por fallas de luz o caidas. Reinicie el servidor, salga al DOS ubiquese en el directorio y corra LUZ-XXX segun el archivo dañado'
          break
        case '99':
          this.cuerpo =
            ' No se pudo leer o escribir un registro porque esta siendo usado por otro usuario en este momento'
          break
        case 'BD':
          this.cuerpo =
            ' Ha ocurrido un error consultando la base de datos, consulte al asesor '
          break
        default:
          this.cuerpo = this.alerta.code
          break
      }
      return this.cuerpo
    },

    confirmar() {
      this.$emit('confirmar')
    },
    cancelar() {
      this.$emit('cancelar')
    },
    cancelarAlerta() {
      this.$emit('cancelarAlerta')
    },
    salir() {
      if (event.keyCode === 27) {
        if (this.btnCancelar) {
          this.$emit('cancelar')
        } else {
          this.$emit('salirEsc')
        }
      }
    },
    checkKey(event) {
      switch (event.which) {
        case 39: //derecha
          this.$refs.btn2.$el.focus()
          break
        case 83: //tecla s para que no se Crucen eventos al momento del focusear el dialogo
          this.$refs.btn2.$el.focus()
          break
        case 37: //izquierda
          this.$refs.btn1.$el.focus()
          break
        case 38: //izquierda
          this.$refs.btn1.$el.focus()
          break
        default:
          //teclas por defaul
          break
      }
    },
  },
  watch: {},
  mounted() {
    this.CON852(this.alerta.code)
    setTimeout(() => {
      this.$refs.btn2.$el.focus()
    }, 100)

    document.addEventListener('keydown', this.salir)
    document.addEventListener('keydown', this.checkKey)
  },
  destroyed() {
    // recordar v-if en el componente para evitar inconvenientes con otros eventos externos
    document.removeEventListener('keydown', this.salir)
    document.removeEventListener('keydown', this.checkKey)
  },
}
</script>
