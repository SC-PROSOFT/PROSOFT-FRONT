// CONSENTIMIENTO INFORMADO PROCEDIMIENTOS ESPECIALES - HOSPITAL ACACIAS
<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="col-12">
        <v-col class="d-flex justify-end">
          <v-col cols="auto" class="pr-5">
            <v-text-field
              :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
              label="Fecha"
              readonly
              outlined
              hide-details></v-text-field>
          </v-col>
          <v-col class="col-auto">
            <v-text-field
              :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
              label="Hora"
              readonly
              outlined
              hide-details>
            </v-text-field>
          </v-col>
        </v-col>
        <v-col class="col-12 py-3 px-2">
          <p class="mb-0" style="text-align: justify">
            Yo,
            <span class="font-weight-bold">
              {{
                this.paci_firma ? this.reg_paci.descrip : this.reg_acomp.descrip
              }}
            </span>
            , mayor de edad identificado con documento N°:
            <span class="font-weight-bold">
              {{
                mask_id(
                  this.paci_firma ? this.reg_paci.cod : this.reg_acomp.cod
                )
              }}
            </span>
            de
            <span class="font-weight-bold">
              {{
                this.paci_firma
                  ? this.reg_paci.descrip_ciudad
                  : this.reg_acomp.descrip_ciudad
              }}
            </span>
            actuando en nombre propio en pleno uso de mis facultades, libre y
            consciente, o como responsable del menor
            <span class="font-weight-bold">
              {{
                this.paci_firma
                  ? "____________________ "
                  : this.reg_paci.descrip
              }}
            </span>
            N°:
            <span class="font-weight-bold">
              {{ mask_id(this.paci_firma ? "" : this.reg_paci.cod) }}
            </span>
            declaro que:
            <br />
            <br />
            Otorgo mi consentimiento para que sea practicado el procedimiento:
            <strong>
              (marque con una x el/los procedimiento(s) que le van a realizar
              mencionados en el cuadro 1.)
            </strong>
            del cual se me brinda información y se me han explicado tanto la
            necesidad de hacerlo como los riesgos del mismo
          </p>
        </v-col>
        <v-col class="col-12 py-3 px-2">
          <table class="col-12 pa-0">
            <thead>
              <tr>
                <th>Procedimientos</th>
                <th>Selección</th>
                <th colspan="2">Riesgos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Cardioversión (Por medio de descarga eléctrica o medicamentos)
                </td>
                <td>
                  <v-checkbox
                    v-model="HIC015.cardioversion"
                    dense
                    hide-details
                    true-value="S"
                    false-value="N"
                  ></v-checkbox>
                </td>
                <td>
                  Arritmias, quemaduras, lesiones de estructuras, parada
                  cardiaca, muerte.
                </td>
              </tr>
              <tr>
                <td>Reducción de luxaciones o fracturas.</td>
                <td>
                  <v-checkbox
                    v-model="HIC015.redu_luxa_fract"
                    dense
                    hide-details
                    true-value="S"
                    false-value="N">
                  </v-checkbox>
                </td>
                <td>
                  Lesión de estructuras, fracturas Oseas, dolor, requerimiento
                  de reintervención.
                </td>
              </tr>
              <tr>
                <td>Toracostomia cerrada</td>
                <td>
                  <v-checkbox
                    v-model="HIC015.toracostomia"
                    dense
                    hide-details
                    true-value="S"
                    false-value="N"
                  ></v-checkbox>
                </td>
                <td>
                  Lesión de estructuras, neumotórax, hemotórax, insuficiencia
                  respiratoria, parada cardiaca, muerte.
                </td>
              </tr>
              <tr>
                <td>Atención del parto</td>
                <td>
                  <v-checkbox
                    v-model="HIC015.aten_parto"
                    dense
                    hide-details
                    true-value="S"
                    false-value="N"
                  ></v-checkbox>
                </td>
                <td>
                  Hemorragia, lesiones de estructuras, infecciones, muerte
                  materna o fetal.
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col class="col-12 py-3 px-2">
          <div class="d-flex align-center">
            <p>
              Maniobras de reanimación avanzada (compresiones torácicas,
              desfibrilación, intubación orotraqueal y ventilación mecánica):
            </p>
            <v-radio-group
              v-model="HIC015.maniobra_reani"
              class="mt-0 pl-5"
              row
            >
              <v-layout row wrap class="pa-0 ma-0">
                <v-flex md6 xs6>
                  <v-radio label="SI" value="S"></v-radio>
                </v-flex>
                <v-flex md6 xs6 class="pl-2">
                  <v-radio label="NO" value="N"></v-radio>
                </v-flex>
              </v-layout>
            </v-radio-group>
          </div>
        </v-col>
        <v-col class="col-12 py-3 px-2 text-justify">
          <p>
            Certifico que se me ha explicado el procedimiento y entiendo los
            posibles riesgos y complicaciones, también he sido explicado de los
            cuidados que debo tener posterior al egreso, Así mismo he sido
            explicado de los riesgos y posibles complicaciones de no aceptar la
            realización de los procedimientos indicados por el profesional, por
            lo cual tomo la decisión con la suficiente información, de manera
            libre y consiente, bajo mi responsabilidad
          </p>
        </v-col>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="mt-5 justify-center">
      <v-col class="col-12 text-center">
        <span class="font-weight-bold">
          CALIDAD EN LA QUE SE OTORGA ESTE CONSENTIMIENTO
        </span>
      </v-col>
      <v-col class="col-6">
        <v-card
          class="d-flex flex-column align-center"
          outlined
          :disabled="!paci_firma">
          <v-card-title class="pt-0">FIRMA PACIENTE</v-card-title>
          <v-img
            alt="img"
            max-height="150px"
            contain
            :src="paci_firma ? firma_consen : ''"
          ></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_paci.descrip.trim() }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">{{ reg_paci.tipo_id }}</span>
            {{ mask_id(reg_paci.cod) }}
          </v-card-subtitle>
          <v-card-actions class="col-12 justify-center">
            <v-btn
              icon
              color="primary"
              @click="dialog_firma = true"
              elevation="0">
              <v-icon>mdi-book-edit-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="col-6">
        <v-card
          class="d-flex flex-column align-center"
          outlined
          :disabled="paci_firma">
          <v-card-title class="pt-0">FIRMA TUTOR O FAMILIAR</v-card-title>
          <v-img
            alt="img"
            max-height="150px"
            contain
            :src="!paci_firma ? firma_consen : ''"
          ></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_acomp.descrip.trim() }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">{{ reg_acomp.tipo_id }}</span>
            {{ mask_id(reg_acomp.cod) }}
          </v-card-subtitle>
          <v-card-actions class="col-12 justify-center">
            <v-btn
              icon
              color="primary"
              @click="dialog_firma = true"
              elevation="0">
              <v-icon>mdi-book-edit-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>
    <v-row class="mt-5 justify-center">
      <v-col class="col-12 text-center">
        <span class="font-weight-bold">QUIEN REALIZA LA ASESORÍA</span>
      </v-col>
      <v-col class="col-6">
        <v-card class="d-flex flex-column align-center" outlined disabled>
          <v-card-title class="pt-0">FIRMA PROFESIONAL</v-card-title>
          <v-img alt="img" max-height="150px" contain :src="firma_prof"></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_prof.descrip.trim() }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">Doc.</span>
            {{ mask_id(reg_prof.cod) }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>
    <v-row class="justify-center">
      <v-card class="pt-5" elevation="0" :disabled="disable_btn_grabado">
        <v-card-actions>
          <v-btn outlined color="secondary" @click="grabar(false)">
            No Autorizo
          </v-btn>
          <v-btn color="primary" @click="grabar(true)"> Autorizo </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <!-- <v-dialog
      v-model="dialog_firma"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <FirmaConsen
        @close="dialog_firma = false"
        @get_img="firma_consen = $event"
        v-on="$listeners"
      ></FirmaConsen>
    </v-dialog> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      reg_hc: {
        rips: {
          diagn: [{}],
        },
        cierre: {},
      },
      reg_paci: JSON.parse(sessionStorage.reg_paci),
      reg_acomp: JSON.parse(sessionStorage.reg_acomp),
      reg_prof: JSON.parse(sessionStorage.reg_prof),
      entidad: JSON.parse(sessionStorage.datos_empresa),

      fecha_actual: '',
      hora_actual: '',
      datos_session: {},

      firma_prof: '',

      HIC015: {
        cardioversion: '',
        redu_luxa_fract: '',
        toracostomia: '',
        aten_parto: '',
        maniobra_reani: '',
      },
      dialog_firma: false,
      firma_consen: '',
      paci_firma: false,
    }
  },
  components: {
    // FirmaConsen: () => import('@/components/firma.consen.vue'),
  },
  computed: {
    llave_consen() {
      return `${this.reg_hc.llave}${this.fecha_actual}${this.hora_actual}${this.datos_session.admin}`
    },
    validar_paci_firma() {
      return !this.reg_acomp.cod.trim() ? true : false
    },
    disable_btn_grabado() {
      if (this.firma_consen.trim()) {
        if (
          this.HIC015.maniobra_reani != '' &&
          (this.HIC015.canal_inyec == 'S' ||
            this.HIC015.cardioversion == 'S' ||
            this.HIC015.redu_luxa_fract == 'S' ||
            this.HIC015.toracostomia == 'S' ||
            this.HIC015.aten_parto == 'S' ||
            this.HIC015.maniobra_reani == 'S')
        )
          return false
        else return true
      } else return true
    },
  },
  async created() {
    this.fecha_actual = this.$moment().format('YYYYMMDD')
    this.hora_actual = this.$moment().format('HHmm')
    this.datos_session = JSON.parse(atob(sessionStorage[this.datos_url]))

    await this.get_img_firmas(parseInt(this.reg_prof.cod), true).then(
      (data) => {
        this.firma_prof = sessionStorage.firma_prof = data
      },
    )

    this.paci_firma = this.validar_paci_firma

    this.get_historia()
  },
  methods: {
    get_historia() {
      this.$emit('loader_modal')

      this.postData('get_hc', { llave_hc: this.datos_session.llave_hc })
        .then((datos) => {
          this.reg_hc = datos.reg_hc
          this.$emit('loader_modal', false)
        })
        .catch((err) => {
          this.$emit('loader_modal', false)
          console.error('Error consultando historia clínica: ', err)
          this.$emit('modal_error_msj', {
            titulo: 'Error consultando historia clínica',
            texto: err?.MENSAJE || null,
            btn_salir: true,
            callback: this.get_historia,
          })
        })
    },
    grabar(acepta) {
      this.$emit('modal_loader')

      let datos = {
        llave_consen: this.llave_consen,
        cod_consen: this.$route.name,
        cod_med: this.reg_prof.cod.padStart(10, '0'),
        paci_acept: this.paci_firma ? 'S' : 'N',
        acomp_acept: this.paci_firma ? 'N' : 'S',
        id_acomp: this.reg_acomp.cod.padStart(15, '0'),
        paren_acomp: this.datos_session.parentesco,
        disentimiento: acepta ? 'N' : 'S',

        ...this.HIC015,
      }
      this.grabadoHIC015(datos)
      console.log('grabar', datos)

      this.postData('save_consen', datos)
        .then(() => {
          this.$emit('msj', 'Consentimiento grabado correctamente.', 'green')
          this.grabar_firma()
        })
        .catch((err) => {
          this.$emit('loader_modal', false)
          console.error('Error grabando consentimiento.', err?.MENSAJE || err)
          this.$emit('modal_error_msj', {
            titulo: 'Error grabando consentimiento',
            texto: err?.MENSAJE || null,
            callback: this.grabar,
          })
        })
    },
     async grabadoHIC015(data){
      const RES = await this.postData_({
        url:"grabadoHIC015",
        data,
        methods:"POST"
      })
      console.log(RES,"NODE")
     },
    grabar_firma() {
      this.$emit('loader_modal')
      this.subir_firma({
        name_img: this.llave_consen,
        img_base64: this.firma_consen,
      })
        .then(() => {
          this.$emit('msj', 'Firma grabada correctamente', 'green')
          this.get_datos_impresion()
        })
        .catch((err) => {
          console.error('Error grabando firma', err)
          this.$emit('modal_loader', false)
          this.$emit('modal_error_msj', {
            titulo: 'Error grabando firma',
            texto: `<p class="pa-0">No se ha grabado la firma, por favor intente nuevamente</p>`,
            callback: this.grabar_firma,
          })
        })
    },
    get_datos_impresion() {
      this.$emit('loader_modal')
      this.postData('get_consen', {
        llave_consen: this.llave_consen,
        modulo: this.datos_session.modulo,
        paso: '1',
      })
        .then((datos) => {
          let consen = {
            ...datos.CONSENTIMIENTOS[0],
            img_firma_consen: this.firma_consen,
            firma_prof: this.firma_prof,
            reg_hc: this.reg_hc,
          }
          this.imprimir(consen)
        })
        .catch((err) => {
          console.error('Error consultando consentimiento', err)
          this.$emit('modal_loader', false)
          this.$emit('modal_error_msj', {
            titulo: 'Error consultando consentimiento',
            texto: err?.MENSAJE || err,
            callback: this.get_datos_impresion,
          })
        })
    },

    imprimir(consen) {
      this.$emit('loader_modal')
      this.impresion({ docDefinition: this.formato_impresiones(consen) })
        .then(() => {
          this.$emit('modal_loader', false)
          this.$emit('msj', 'Generando impresión', 'green')
          if (this.datos_session.admin == 'GEBC')
            this.$router.push({ name: 'inicio' })
          else window.close()
        })
        .catch((err) => {
          console.error(
            'Error imprimiendo consentimiento:',
            err?.MENSAJE || err,
          )
          this.$emit('modal_loader', false)
          this.$emit('modal_error_msj', {
            titulo: 'Error imprimiendo consentimiento',
            texto: err?.MENSAJE || err,
            callback: this.get_datos_impresion,
          })
        })
    },
  },
}
</script>

<style>
table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: left;
}

.v-input__slot {
  align-items: center;
  justify-content: center;
}
</style>
