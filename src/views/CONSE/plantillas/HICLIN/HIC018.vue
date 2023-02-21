<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="col-12">
        <h3 class="text-center">
          CONSENTIMIENTO INFORMADO PARA CONTRACCIÓN PUPILAR INDUCIDA (MIOSIS)
          CON MEDICAMENTOS
        </h3>
      </v-col>
      <v-col class="col-12">
        <h5 class="text-center">(En cumplimiento de la ley 23 de 1981)</h5>
      </v-col>
      <v-col class="col-12">
        <v-col class="d-flex justify-center">
          <v-col cols="auto" class="pr-5">
            <v-text-field
              :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
              label="Fecha"
              readonly
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="col-auto">
            <v-text-field
              :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
              label="Hora"
              readonly
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-col>
        <v-col class="col-12">
          <h3 class="text-start">DESCRIPCIÓN MEDICAMENTO</h3>
        </v-col>
        <v-col class="col-12">
          <p class="ma-0">
            La pilocarpina ® oftálmica se usa para tratar el glaucoma, es una
            clase de medicamentos llamados mióticos. Se utiliza dentro de la
            Cirugía Oftalmológica para la inducción de la Miosis o contracción
            pupilar, como preparación quirúrgica, dándole un buen todo al Iris
            previo al procedimiento de Iridotomía con Láser.
            <br />
            <br />
            Actúa en un subtipo de receptor muscarínico de la acetilcolina (M3),
            el cual se encuentra ubicado en el esfínter del iris, causando que
            el músculo se contraiga y provoque miosis. Ello causa que la red
            trabecular se abra y facilite la salida del humor acuoso del ojo y
            se reduzca la presión intraocular.
            <br />
            <br />
            El uso de la pilocarpina reduce el tamaño de las pupilas, aliviando
            los síntomas de fotofobia en estos casos postquirúrgicos.
          </p>
        </v-col>
        <v-col class="col-12">
          <h3 class="text-start">PRECAUCIONES PRE OPERATORIAS:</h3>
        </v-col>
        <v-col class="col-12">
          <p class="ma-0">
            Informar si alérgico a la pilocarpina o a otros medicamentos.
            Embarazo, Lactancia Se debe informar al médico qué medicamentos con
            y sin prescripción está tomando, incluyendo vitaminas. Informar al
            médico si estoy sufriendo o he sufrido de asma, enfermedades
            intestinales, úlceras, hipertensión, enfermedades al corazón,
            glándula tiroides demasiado activa (hipertiroidismo), crisis
            convulsivas, enfermedad de Parkinson o una obstrucción en las vías
            urinarias.
          </p>
        </v-col>
        <v-col class="col-12">
          <h3 class="text-start">EFECTOS SECUNDARIOS:</h3>
        </v-col>
        <v-col class="col-12">
          <p class="ma-0">
            Los efectos secundarios de este medicamento no son comunes, podrían
            llegar a presentarse. Por la acción del colirio se producirá miosis
            y espasmo ciliar. Es normal que se produzca una disminución de la
            agudeza visual, especialmente en condiciones de iluminación
            deficiente y en pacientes de edad avanzada, por lo que debe evitarse
            la conducción nocturna.
          </p>
        </v-col>
        <v-col class="col-12">
          <p class="ma-0 ml-4">
            • hipersensibilidad local y dolor de cabeza temporal o supraorbital
          </p>
          <p class="ma-0 ml-4">• Visión empañada o tenue</p>
          <p class="ma-0 ml-4">• Picazón, ardor o dolor en los ojos</p>
          <p class="ma-0 ml-4">• Prurito o enrojecimiento de los ojos</p>
          <p class="ma-0 ml-4">
            • Lagrimeo o hinchazón (inflamación) de los ojos
          </p>
          <p class="ma-0 ml-4">• Enrojecimiento de los párpados</p>
          <p class="ma-0 ml-4">• Cefalea (dolor de cabeza)</p>
        </v-col>
        <div v-if="this.paci_firma">
          <v-col class="col-12">
            <h3 class="text-center">AUTORIZACIÓN (CONSENTIMIENTO)</h3>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              He entendido las condiciones y objetivos del procedimiento que se
              me va a practicar en
              <span class="font-weight-bold">
                ATENCIÓN MÉDICA DE COLOMBIA SAS</span
              >., los cuidados que debo tener antes y después de ella. Estoy
              satisfecho (a) con la información recibida del médico oftalmólogo
              tratante quien lo ha hecho en un lenguaje claro y sencillo, y me
              ha dado la oportunidad de preguntar y resolver las dudas a
              satisfacción, además comprendo y acepto el alcance y los riesgos
              justificados de posible o imposible previsión que conlleva el
              procedimiento oftalmológico que aquí autorizo. En tales
              condiciones consiento que se me realice dicho procedimiento.
            </p>
          </v-col>
        </div>
        <div v-if="!this.paci_firma">
          <v-col class="col-12 mt-6">
            <h3 class="text-start">
              DECLARACION DEL REPRESENTANTE LEGAL, FAMILIAR, TUTOR O ACUDIENTE
              DEL PACIENTE:
            </h3>
          </v-col>
          <v-col class="col-12 py-3 px-2">
            <p class="mb-0" style="text-align: justify">
              Se que el paciente por sus condiciones de ____________________ es
              considerado por ahora incapaz de tomar por sí mismo la decisión de
              aceptar o rechazar la anestesia antes indicada, por lo cual, YO
              {{ this.reg_acomp.descrip }} identificado con documento de
              identidad Nº
              <span class="font-weight-bold">
                {{ mask_id(this.reg_acomp.cod) }}
              </span>
              en calidad de (colocar parentesco o tipo de representatividad
              legal) __________________ doy mi consentimiento para que el (los)
              Doctor (a) (es)
              <span class="font-weight-bold">
                {{ this.reg_prof.descrip.trim() }}
              </span>
              y el personal auxiliar que el precise, efectúen la anestesia antes
              descrita, y los procedimientos complementarios que sean necesarios
              durante la realización de esta, a juicio de los profesionales que
              lo lleven a cabo. En cualquier caso, deseo respeten las siguientes
              condiciones:
            </p>
          </v-col>
          <v-col>
            <v-textarea label="" rows="4" outlined> </v-textarea>
          </v-col>
        </div>
        <v-col class="col-12 mt-6">
          <h3 class="text-start">DECLARACION DEL MEDICO TRATANTE.</h3>
        </v-col>
        <v-col class="col-12 mt-6">
          <p class="mb-0" style="text-align: justify">
            Medico(s) responsable(s):
            <span class="font-weight-bold">
              {{ this.reg_prof.descrip.trim() }}
            </span>
            he informado al Paciente del propósito y naturaleza del
            procedimiento descrito arriba, de sus alternativas, posibles riesgos
            y de los resultados que se esperan. Considero que el (la) paciente,
            comprende completamente lo explicado.
          </p>
        </v-col>
        <v-col class="col-12 mt-6">
          <h3 class="text-start">DENEGACIÓN O REVOCACIÓN.</h3>
        </v-col>
        <v-col class="col-12 mt-6">
          <p class="mb-0" style="text-align: justify">
            Después de ser informado/a de la naturaleza y riesgos del
            procedimiento propuesto, manifiesto de forma libre y consciente mi
            denegación/revocación (táchese lo que no proceda) para su
            realización, haciéndome responsable de las consecuencias que puedan
            derivarse de esta decisión
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
          :disabled="!paci_firma"
        >
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
              elevation="0"
            >
              <v-icon>mdi-book-edit-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="col-6">
        <v-card
          class="d-flex flex-column align-center"
          outlined
          :disabled="paci_firma"
        >
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
              elevation="0"
            >
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
      <v-card class="pt-5" elevation="0" :disabled="!firma_consen">
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
      transition="dialog-bottom-transition"
    >
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

      fecha_actual: "",
      hora_actual: "",
      datos_session: {},

      firma_prof: "",

      HIC016: {
        cardioversion: "",
        redu_luxa_fract: "",
        toracostomia: "",
        aten_parto: "",
        maniobra_reani: "",
      },
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
      if (this.firma_consen.trim()) {
        return true;
      } else return true;
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
          console.log(datos);
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
      this.$emit("modal_loader");

      let datos = {
        llave_consen: this.llave_consen,
        cod_consen: this.$route.name,
        cod_med: this.reg_prof.cod.padStart(10, "0"),
        paci_acept: this.paci_firma ? "S" : "N",
        acomp_acept: this.paci_firma ? "N" : "S",
        id_acomp: this.reg_acomp.cod.padStart(15, "0"),
        paren_acomp: this.datos_session.parentesco,
        disentimiento: acepta ? "N" : "S",

        ...this.HIC016,
      };
      this.grabadoHIC018(datos);

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
    async grabadoHIC018(data) {
      const RES = await this.postData_({
        url: "grabadoHIC018",
        data,
        methods: "POST",
      });
      console.log(RES,"NODE")
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
          this.$emit("modal_loader", false);
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
          this.$emit("modal_loader", false);
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
