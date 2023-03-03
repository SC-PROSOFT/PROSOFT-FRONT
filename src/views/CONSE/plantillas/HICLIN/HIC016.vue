<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="col-12">
        <h3 class="text-center">
          CONSENTIMIENTO INFORMADO PARA DILATACION BAJO CICLOPEJIA
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
          <h3 class="text-center">DESCRIPCION DEL PROCEDIMIENTO</h3>
        </v-col>
        <v-row dense class="text-justify">
          <v-col class="col-12">
            <p class="ma-0">
              Este procedimiento consiste en la aplicación de medicamentos (Que
              pueden producir ardor en el momento de aplicación) los cuales
              dilatan y paralizan la pupila del paciente, causando visión
              borrosa y molestia a la luz, su efecto es transitorio de horas,
              aunque en algunos casos su efecto puede durar varios días después
              de su aplicación. Por estas razones es requisito acudir acompañado
              de una persona responsable que colabore con su movilización
              después del procedimiento. El objetivo de procedimiento es conocer
              de forma más exacta el defecto visual que debe ser corregido con
              anteojos o lentes de contacto, y poder evaluar las estructuras
              internas del ojo.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Los medicamentos utilizados para este procedimiento pueden
              ocasionar además de los ya mencionados, rubor y calor en el
              rostro, somnolencia y en algunas ocasiones dolor de cabeza
              momentáneo.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Estos medicamentos
              <span class="font-weight-bold"> NO deben </span> ser aplicados en
              los pacientes que tengan las siguientes condiciones
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0 ml-4">• Síndrome compulsivo</p>
            <p class="ma-0 ml-4">• Epilepsia</p>
            <p class="ma-0 ml-4">• Enfermedades de corazón</p>
            <p class="ma-0 ml-4">
              • Enfermedades de pulmón (Asma, Bronquitis, etc.)
            </p>
            <p class="ma-0 ml-4">• Gripa aguda</p>
            <p class="ma-0 ml-4">• Alternaciones neurológicas severas</p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              <span class="font-weight-bold">
                ¿Que son las gotas cicloplejias?
              </span>
            </p>
            <p class="ma-0">Hay dos tipo de gotas:</p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0 ml-4">
              - Unas que fundamentalmente dilatan la pupila (midriasis) y que se
              usan para ver el fondo del ojo.
            </p>
            <p class="ma-0 ml-4">
              - Otras que además de lo anterior relajan los músculos que enfocan
              el cristalino y que se usan para graduar la refracción de las
              personas.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              <span class="font-weight-bold"> ¿Para qué se utilizan? </span>
            </p>
          </v-col>

          <v-col class="col-12">
            <p class="ma-0 ml-4">
              ✓ Para ver la necesidad y potencia de los lentes de gafas
              fundamentalmente en niños.
            </p>
            <p class="ma-0 ml-4">✓ Para ver el fondo del ojo.</p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              <span class="font-weight-bold"> Posologia </span>
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Dependiendo del tipo de gota y de las características de cada
              niño/adulto el número de gotas que se aplica, dadas sus
              condiciones como en las personas de ojos claros el efecto es más
              rápido y se hace uso de menor dosis (1 gota) mientras que en los
              ojos más oscuros el efecto es retardado, por tanto, se precisa de
              más dosificación (2 gotas) en ocasiones.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              <span class="font-weight-bold"> ¿Cuanto dura el efecto? </span>
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Depende del tipo de gota y de factores individuales entre 4 a 12
              horas o 1 a 3 días. La mayoría de los niños les dura 24 - 48
              horas. Algunas gotas como la atropina pueden durar entre una a dos
              semanas.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              <span class="font-weight-bold"> Efectos segundarios </span>
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Sensación de ardor, es momentáneo. Añadimos una gota de anestesia
              antes de las gotas de cicloplejia para minimizar esta sensación de
              ardor.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Fotofobia (molestias con la luz). Desaparece gradualmente con la
              recuperación de la pupila. Aconsejamos evitar grandes exposiciones
              a la luz solar. La fotofobia mejora llevando gafas de sol o una
              gorra en la calle. Si es posible se debe evitar actividades al
              exterior durante los días que dure la cicloplejia para evitar las
              molestias.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Visión borrosa o dificultad en el enfoque especialmente de cerca.
              Desaparece gradualmente con la recuperación de la pupila. Se debe
              avisar al colegio sobre la dificultad de lectura durante las
              primeras 24 horas. Si son miopes pueden probar a quitarse las
              gafas para ver si puede así facilitarse la lectura durante este
              tiempo. Los adultos deben evitar conducir con la pupila dilatada.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Es frecuente que los niños se pongan rojos y somnolientos con las
              gotas sobre todo los más pequeños.
            </p>
          </v-col>
          <v-col class="col-12">
            <p class="ma-0">
              Es infrecuente que tengamos reales reacciones alérgicas (ojos
              inflamados y rojos). Ocasionalmente se puede presentar con
              atropina fiebre, sequedad de boca, enrojecimiento facial y
              taquicardia. Ante cualquier problema avise al especialista.
            </p>
          </v-col>
        </v-row>
        <v-col class="col-12 mt-6">
          <h3 class="text-center">AUTORIZACIÓN (CONSENTIMIENTO)</h3>
        </v-col>
        <v-col class="col-12 py-3 px-2">
          <p class="mb-0" style="text-align: justify">
            Yo,
            <span class="font-weight-bold">
              {{
                this.paci_firma ? this.reg_paci.descrip : this.reg_acomp.descrip
              }}
            </span>
            , identificado con documento N°:
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
            y en nombre propio he entendido las condiciones y objetivos del
            procedimiento que se me va a practicar en
            <span class="font-weight-bold"
              >ATENCION MEDICA DEL COLOMBIA SAS.</span
            >, los cuidados que debo tener antes y después de él. He sido
            advertido sobre los riesgos previsibles que pueden presentarse por
            la administración del medicamento. Estoy satisfecho (a) con la
            información recibida del profesional tratante quien lo ha hecho en
            un lenguaje claro y sencillo, y me ha dado la oportunidad de
            preguntar y resolver las dudas a satisfacción, además comprendo y
            acepto el alcance y los riesgos justificados de posible o imposible
            previsión que conlleva el procedimiento que aquí autorizo. En tales
            condiciones consiento que se me realice el procedimiento descrito.
            <br />
            <br />
            Certifico con mi firma todo lo leído y entendido por mi integridad.
          </p>
        </v-col>
        <div v-if="!this.paci_firma">
          <v-col class="col-12 mt-6">
            <h3 class="text-center">
              DECLARACION DEL REPRESENTANTE LEGAL, FAMILIAR, TUTOR O ACUDIENTE
              DEL PACIENTE:
            </h3>
          </v-col>
          <v-col class="col-12 py-3 px-2">
            <p class="mb-0" style="text-align: justify">
              Se que el paciente por sus condiciones de ____________________ es
              considerado por ahora incapaz de tomar por si mismo la desición de
              aceptar o rechaza el procesimiento antes indicado, por lo cual, YO
              {{ this.reg_acomp.descrip }} identificado con documento de
              identidad N°
              <span class="font-weight-bold">
                {{ mask_id(this.reg_acomp.cod) }}
              </span>
              en calidad de (colocar parentesco o tipo de representatividad
              legal) doy mi consentimiento para que el(los) Profesional(es)
              <span class="font-weight-bold">
                {{ reg_prof.descrip.trim() }}
              </span>
              y el personal auxiliar que el precise, efectúen el procedimiento
              antes descrito, y los procedimientos complementarios que sean
              necesarios durante la realización de este, a juicio del (los)
              profesional(es) que lo lleve(n) a cabo.
            </p>
          </v-col>
        </div>
        <v-col class="col-12 mt-6">
          <h3 class="text-center">DECLARACION DEL PROFESIONAL TRATANTE.</h3>
        </v-col>
        <v-col class="col-12 py-3 px-2">
          <p class="mb-0" style="text-align: justify">
            Medico(s) responsable(s):
            <span class="font-weight-bold">
              {{ this.reg_prof.descrip.trim() }}
            </span>
            he informado al Paciente del propósito y naturaleza del
            procedimiento descrito arriba, de sus alternativas, posibles riesgos
            y de los resultados que se esperan. Considero que el (la) paciente,
            comprende completamente lo explicado.
            <br />
            <br />
            Considero que el (la) paciente y/o familiares o tutor legal,
            comprende(n) completamente lo explicado.
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
      this.grabadoHIC016(datos);
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
    async grabadoHIC016(data) {
      const RES = await this.postData_({
        url: "grabadoHIC016",
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
