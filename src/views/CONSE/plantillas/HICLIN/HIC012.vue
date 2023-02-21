<template>
  <div class="col-md-12 align-self-center" style="padding: 0">
    <v-row no-gutters>
      <v-col class="col-12 py-2">
        <v-row no-gutters>
          <v-col cols="auto" class="pr-5">
            <v-text-field
              :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
              label="Fecha"
              readonly
              outlined
              dense>
            </v-text-field>
          </v-col>
          <v-col class="col-auto">
            <v-text-field
              :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
              label="Hora"
              readonly
              outlined
              dense>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="col-12 text-center font-weight-bold">
            <span>
              CONSENTIMIENTO INFORMADO INSERCIÓN Y/O RETIRO IMPLANTE SUBDÉRMICO
              JADELL
            </span>
          </v-col>
          <v-row no-gutters class="pt-5">
            <v-col cols="12" class="text-justify">
              <p v-if="paci_firma">
                Yo,
                <span class="font-weight-bold">
                  {{ reg_paci.descrip.trim() }}
                </span>
                {{ reg_paci.sexo == "F" ? "identificada" : "identificado" }} con
                documento No.
                <span class="font-weight-bold">
                  {{ mask_id(reg_paci.cod) }}
                </span>
                , mayor de edad y/o responsable del paciente
                <span>____________________________________</span>
                identificada con
                <span>____</span>
                de
                <span>____________</span>
                , actuando en nombre propio en pleno uso de mis facultades,
                libre y consciente declaro:
              </p>
              <p v-else>
                Yo,
                <span class="font-weight-bold">
                  {{ reg_acomp.descrip.trim() }}
                </span>
                {{ reg_acomp.sexo == "F" ? "identificada" : "identificado" }}
                con documento No.
                <span class="font-weight-bold">
                  {{ mask_id(reg_acomp.cod) }}
                </span>
                , mayor de edad y/o responsable del paciente
                <span class="font-weight-bold">
                  {{ reg_paci.descrip }}
                </span>
                {{ reg_paci.sexo == "F" ? "identificada" : "identificado" }} con
                {{ reg_paci.tipo_id }} No.
                <span class="font-weight-bold">
                  {{ mask_id(reg_paci.cod) }}
                </span>
                de
                <span class="font-weight-bold">
                  {{ reg_paci.descrip_ciudad.trim() }}
                </span>
                , actuando en nombre propio en pleno uso de mis facultades,
                libre y consciente declaro que:
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-card flat outlined class="col-12">
              <v-row class="justify-center">
                <v-col class="col-12">
                  <p class="text-center ma-0 text-uppercase font-weight-bold">
                    Otorgo mi consentimiento para que sea practicado el
                    procedimiento de
                  </p>
                </v-col>
                <v-col class="col-auto pt-0">
                  <v-radio-group
                    v-model="HIC012.tipo_proced"
                    dense
                    row
                    hide-details
                    class="mt-0">
                    <v-radio
                      label="INSERCIÓN"
                      value="I"
                      class="font-weight-bold">
                    </v-radio>
                    <v-radio
                      label="RETIRO"
                      value="R"
                      class="font-weight-bold">
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col
                  class="col-12 pt-0 text-center text-uppercase font-weight-bold">
                  <p class="ma-0">implante subdérmico</p>
                </v-col>
                <v-col
                  class="col-12 pt-0 text-center text-uppercase font-weight-bold">
                  <p class="ma-0">
                    del cual se me brindo información y se me han explicado
                    tanto la necesidad de hacerlo como los riesgos
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
          <!-- <v-divider class="my-5"></v-divider> -->
          <v-row>
            <v-col>
              <span class="col-12 font-weight-bold text-uppercase"
                >declaro que</span>
            </v-col>
            <v-col class="col-12 text-justify pt-0">
              <ol>
                <li>
                  <p>
                    Me han explicado en un lenguaje claro y comprensible la
                    naturaleza y propósito del procedimiento, también me han
                    informado de las ventajas, complicaciones, molestias y
                    riesgos que pueden producirse, tales como dolor, equimosis,
                    edema, infeccione en el sitio de la incisión, entre otras.
                  </p>
                </li>
                <li>
                  <p>
                    Se me ha dado la oportunidad de hacer preguntas y mis
                    preguntas han sido contestadas satisfactoriamente.
                  </p>
                </li>
                <li>
                  <p>
                    Se me ha informado plenamente que retirado el implante y al
                    no iniciar inmediatamente otro método de planificación
                    familiar tengo la oportunidad de quedar embarazada.
                  </p>
                </li>
                <li>
                  <p>
                    Se me ha informado de todos los signos de alarma por los
                    cuales debo consultar una vez se me haya realizado el
                    procedimiento tales como: dolor, moderado a severo, fiebre,
                    sangrado y salida de secreción por el sitio de incisión,
                    escalofríos, entre otras.
                  </p>
                </li>
                <li>
                  <p>Tengo la opción de decidir en contra del procedimiento.</p>
                </li>
              </ol>
            </v-col>
          </v-row>
          <v-row class="text-justify">
            <v-col class="col-12">
              <p class="ma-0">
                Certifico que he leído y comprendido perfectamente lo anterior y
                que todos los espacios en blanco han sido completados antes de
                mi firma y por tanto
                <span class="font-weight-bold">
                  ACEPTO REALIZAR EL PROCEDIMIENTO
                </span>
                .
              </p>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="mt-5 justify-center">
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
            :src="paci_firma ? firma_consen : ''">
          </v-img>
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
            :src="!paci_firma ? firma_consen : ''">
          </v-img>
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
    <v-row no-gutters class="mt-5 justify-center">
      <v-col class="col-6">
        <v-card class="d-flex flex-column align-center" outlined>
          <v-card-title class="pt-0">FIRMA PROFESIONAL</v-card-title>
          <v-img alt="img" max-height="150px" contain :src="firma_prof"></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_prof.descrip.trim() }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            {{ mask_id(reg_prof.cod) }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card class="pt-5" elevation="0" :disabled="disable_btn_grabado">
        <v-card-actions>
          <!-- <v-btn outlined color="secondary" @click="grabar(false)">
            Revocar
          </v-btn> -->
          <v-btn color="primary" @click="grabar(true)"> Aceptar </v-btn>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      reg_hc: {
        rips: {},
        cierre: {},
      },

      reg_paci: JSON.parse(sessionStorage.reg_paci),
      reg_acomp: JSON.parse(sessionStorage.reg_acomp),
      reg_prof: JSON.parse(sessionStorage.reg_prof),
      entidad: JSON.parse(sessionStorage.datos_empresa),

      HIC012: {
        tipo_proced: "",
      },

      fecha_actual: "",
      hora_actual: "",
      datos_session: {},

      firma_prof: "",

      dialog_firma: false,
      firma_consen: "",
      paci_firma: false,
    };
  },
  components: {
    // FirmaConsen: () => import("@/components/firma.consen.vue"),
  },
  computed: {
    llave_consen() {
      return `${this.reg_hc.llave}${this.fecha_actual}${this.hora_actual}${this.datos_session.admin}`;
    },
    validar_paci_firma() {
      return !this.reg_acomp.cod.trim() ? true : false;
    },
    disable_btn_grabado() {
      if (this.firma_consen.trim() && this.HIC012.tipo_proced.trim())
        return false;
      else return true;
    },
  },
  async created() {
    this.fecha_actual = this.$moment().format("YYYYMMDD");
    this.hora_actual = this.$moment().format("HHmm");
    this.datos_session = JSON.parse(atob(sessionStorage[this.datos_url]));

    await this.get_img_firmas(parseInt(this.reg_prof.cod), true).then(
      (data) => {
        this.firma_prof = sessionStorage.firma_prof = data;
      }
    );

    this.paci_firma = this.validar_paci_firma;

    this.get_historia();
  },
  methods: {
    get_historia() {
      this.$emit("loader_modal");

      this.postData("get_hc", { llave_hc: this.datos_session.llave_hc })
        .then((datos) => {
          this.reg_hc = datos.reg_hc;
          this.$emit("loader_modal", false);
        })
        .catch((err) => {
          this.$emit("loader_modal", false);
          console.error("Error consultando historia clínica: ", err);
          this.$emit("modal_error_msj", {
            titulo: "Error consultando historia clínica",
            texto: err?.MENSAJE || null,
            btn_salir: true,
            callback: this.get_historia,
          });
        });
    },
    grabar(acepta) {
      this.$emit("loader_modal");
      let datos = {
        llave_consen: this.llave_consen,
        cod_consen: this.$route.name,
        cod_med: this.reg_prof.cod.padStart(10, "0"),
        paci_acept: this.paci_firma ? "S" : "N",
        acomp_acept: this.paci_firma ? "N" : "S",
        id_acomp: this.reg_acomp.cod.padStart(15, "0"),
        paren_acomp: this.datos_session.parentesco,
        disentimiento: acepta ? "N" : "S",

        ...this.HIC012,
      };
      this.grabadoHIC012(datos);

      console.log("grabar", datos);

      this.postData("save_consen", datos)
        .then(() => {
          this.$emit("msj", "Consentimiento grabado correctamente.", "green");
          this.grabar_firma();
        })
        .catch((err) => {
          this.$emit("loader_modal", false);
          console.error("Error grabando consentimiento.", err?.MENSAJE || err);
          this.$emit("modal_error_msj", {
            titulo: "Error grabando consentimiento",
            texto: err?.MENSAJE || null,
            callback: this.grabar,
          });
        });
    },
    async grabadoHIC012(data) {
      const RES = await this.postData_({
        url: "grabadoHIC012",
        data,
        methods: "POST",
      });
      console.log(RES, "node");
    },
    grabar_firma() {
      this.$emit("loader_modal");
      this.subir_firma({
        name_img: this.llave_consen,
        img_base64: this.firma_consen,
      })
        .then(() => {
          this.$emit("msj", "Firma grabada correctamente", "green");
          this.get_datos_impresion();
        })
        .catch((err) => {
          console.error("Error grabando firma", err);
          this.$emit("loader_modal", false);
          this.$emit("modal_error_msj", {
            titulo: "Error grabando firma",
            texto: `<p class="pa-0">No se ha grabado la firma, por favor intente nuevamente</p>`,
            callback: this.grabar_firma,
          });
        });
    },
    get_datos_impresion() {
      this.$emit("loader_modal");
      this.postData("get_consen", {
        llave_consen: this.llave_consen,
        modulo: this.datos_session.modulo,
        paso: "1",
      })
        .then((datos) => {
          let consen = {
            ...datos.CONSENTIMIENTOS[0],
            img_firma_consen: this.firma_consen,
            firma_prof: this.firma_prof,
            reg_hc: this.reg_hc,
          };
          this.imprimir(consen);
        })
        .catch((err) => {
          console.error("Error consultando consentimiento", err);
          this.$emit("loader_modal", false);
          this.$emit("modal_error_msj", {
            titulo: "Error consultando consentimiento",
            texto: err?.MENSAJE || err,
            callback: this.get_datos_impresion,
          });
        });
    },

    imprimir(consen) {
      this.$emit("loader_modal");
      this.impresion({ docDefinition: this.formato_impresiones(consen) })
        .then(() => {
          this.$emit("loader_modal", false);
          this.$emit("msj", "Generando impresión", "green");
          if (this.datos_session.admin == "GEBC")
            this.$router.push({ name: "inicio" });
          else window.close();
        })
        .catch((err) => {
          console.error(
            "Error imprimiendo consentimiento:",
            err?.MENSAJE || err
          );
          this.$emit("loader_modal", false);
          this.$emit("modal_error_msj", {
            titulo: "Error imprimiendo consentimiento",
            texto: err?.MENSAJE || err,
            callback: this.get_datos_impresion,
          });
        });
    },
  },
};
</script>
