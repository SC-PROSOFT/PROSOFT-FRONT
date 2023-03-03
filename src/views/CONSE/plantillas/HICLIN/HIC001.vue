<template>
 <v-container>
  <v-row>
    <v-flex class="text-center">
      <span class="text-h6">
        CONSENTIMIENTO INFORMADO PARA LA PRUEBA DE VIH (Prueba de Inmunodeficiencia Humana)
      </span>
    </v-flex>
  </v-row>
  <v-row>
   <v-col class="col-12">
    <p class="text-justify">
      El presente documento tiene como objetivo que usted, luego de haber
      recibido información, manifieste de manera libre y voluntaria, a
      través de su firma, la autorización o rechazo a la realización del
      examen de detección del VIH, según se establece en la normatividad
      Decreto 1543 de 1997 del Ministerio de la Protección Social por el
      cual reglamenta los mecanismos de prevención, diagnóstico, manejo y
      reporte epidemiológico de la infección por VIH.
    </p>
      </v-col>
      <v-col class="col-12">
       <p>
          Yo
          <span class="font-weight-bold"> {{ reg_paci.descrip.trim() }}</span>
          {{ reg_paci.sexo == "M" ? "identificado" : "identificada" }} con
          <span class="font-weight-bold">{{ reg_paci.tipo_id }}</span> número
          <span class="text-uppercase font-weight-bold">
            {{ mask_id(reg_paci.cod) }}</span
          >. Acepto y autorizo al laboratorio clínico del
          <span class="font-weight-bold">{{ entidad.NOMUSU }}</span
          >, para que me realice el exámen de detección de VIH.
        </p>
      </v-col>
    </v-row>
    <v-col class="col-12 pl-0">
      <span class="font-weight-bold">MOTIVO DE PRUEBA</span>
    </v-col>
    <v-card outlined>
      <v-card-text>
        <v-row class="pt-0">
         <v-col class="col-md-4 col-sm-6 col-12">
          <v-checkbox
              v-model="HIC001.sosp_cli"
              label="Sospecha Clinica"
              true-value="S"
              false-value="N"
              dense
              hide-details>
          </v-checkbox>
         </v-col>
         <v-col class="col-md-4 col-sm-6 col-12">
          <v-checkbox
            v-model="HIC001.trans_alt"
            label="Transfusión Antes 1990"
            true-value="S"
            false-value="N"
            dense
            hide-details>
          </v-checkbox>
         </v-col>
         <v-col class="col-md-4 col-sm-6 col-12">
           <v-checkbox
             v-model="HIC001.pep_kit"
             label="PEP KIT"
             true-value="S"
             false-value="N"
             dense
             hide-details>
           </v-checkbox>
         </v-col>
         <v-col class="col-md-4 col-sm-6 col-12">
            <v-checkbox
              v-model="HIC001.contact_sex"
              label="Contacto Sexual de Riesgo"
              true-value="S"
              false-value="N"
              dense
              hide-details>
            </v-checkbox>
         </v-col>
         <v-col class="col-md-4 col-sm-6 col-12">
            <v-checkbox
              v-model="HIC001.uso_frec_agu"
              label="Uso Frecuente de Agujas"
              true-value="S"
              false-value="N"
              dense
              hide-details>
            </v-checkbox>
         </v-col>
         <v-col class="col-md-4 col-sm-6 col-12">
          <v-checkbox
              v-model="HIC001.pep_control_mes"
              label="PEP Control Mes"
              true-value="S"
              false-value="N"
              dense
              hide-details>
         </v-checkbox>
        </v-col>
        <v-col class="col-md-4 col-sm-6 col-12">
            <v-checkbox
             v-model="HIC001.contact_vih"
             label="Contacto VIH"
             true-value="S"
             false-value="N"
             dense
             hide-details>
            </v-checkbox>
        </v-col>
        <v-col class="col-md-4 col-sm-6 col-12">
          <v-checkbox
             v-model="HIC001.resul_tam"
             label="Resultado Prueba de Tamizaje Positivo"
             true-value="S"
             false-value="N"
             dense
             hide-details>
          </v-checkbox>
        </v-col>
        <v-col class="col-md-4 col-sm-6 col-12">
         <v-checkbox
             v-model="HIC001.pep_control_3_mes"
             label="PEP Control 3 Meses"
             true-value="S"
             false-value="N"
             dense
             hide-details>
          </v-checkbox>
         </v-col>
    </v-row>
        </v-card-text>
    </v-card>
    <v-col class="col-12 pl-0">
        <span class="font-weight-bold">DEMANDA INDUCIDA</span>
    </v-col>
    <v-card class="col-12" outlined>
        <v-card-text>
           <v-row class="pt-0 align-center">
             <v-col class="col-md-4 col-sm-6 col-12">
              <v-checkbox
                v-model="HIC001.prog_prom"
                label="Programa Promoción y Mantenimiento de la Salud"
                true-value="S"
                false-value="N"
                dense
                hide-details>
              </v-checkbox>
             </v-col>
             <v-col class="col-md-4 col-sm-6 col-12">
              <v-checkbox
                v-model="HIC001.cons_ext"
                label="Consulta Externa"
                true-value="S"
                false-value="N"
                dense
                hide-details>
              </v-checkbox>
             </v-col>
             <v-col class="col-md-4 col-sm-6 col-12">
               <v-checkbox
                v-model="HIC001.med_legal"
                label="Medico Legal"
                true-value="S"
                false-value="N"
                dense
                hide-details>
               </v-checkbox>
             </v-col>
             <v-col class="col-md-4 col-sm-6 col-12">
              <v-checkbox
                v-model="HIC001.cons_urg"
                label="Consulta Urgencias"
                true-value="S"
                false-value="N"
                dense
                hide-details>
              </v-checkbox>
            </v-col>
            <v-col class="col-md-4 col-sm-6 col-12">
             <v-checkbox
                v-model="HIC001.cons_esp"
                label="Consulta Especializada"
                true-value="S"
                false-value="N"
                dense
                hide-details>
             </v-checkbox>
            </v-col>
            <v-col class="col-12">
             <v-text-field
                v-model="HIC001.cual_cons_esp"
                ref="inputCualConsEsp"
                label="Cual consulta especializada?"
                :disabled="HIC001.cons_esp != 'S'"
                outlined
                hide-details
                maxlength="90">
             </v-text-field>
            </v-col>
           </v-row> 
        </v-card-text>
    </v-card>
    <v-row class="pt-5">
      <v-col class="col-12">
        <span class="font-weight-bold">INTRODUCCION:</span>
      </v-col>
      <v-col class="col-12 text-justify pt-0">
        <p>
          Este procedimiento se realiza con el fin de brindar consejería sobre
          la realización de la prueba para detectar el virus de la
          inmunodeficiencia humana (VIH) y dar así cumplimiento a la
          normatividad
        </p>
      </v-col>

      <v-col class="col-12">
        <span class="font-weight-bold">¿QUE ES EL SINDROME DE INMUNODEFICIENCIA ADQUIRIDA (SIDA)?</span>
      </v-col>
      <v-col class="col-12 text-justify pt-0">
        <p>
          Es una enfermedad producida por un virus conocido como el VIH, el cual
          infecta y destruye las células encargadas de la defensa del organismo,
          originando una falla progresiva y grave de este sistema, quedando el
          cuerpo expuesto a las infecciones. No tiene cura, pero si tratamiento
          que puede mejorar la calidad de vida del paciente si se detecta a
          tiempo.
        </p>
      </v-col>
      <v-col class="col-12">
        <span class="font-weight-bold">¿COMO SE ADQUIERE LA ENFERMEDAD?</span>
      </v-col>
      <v-col class="col-12 text-justify pt-0">
        <p>
          La enfermedad se adquiere principalmente por contacto sexual con
          personas infectadas con el VIH. Por exposición a la sangre y fluidos
          corporales, al compartir agujas para el suministro de ciertas drogas
          como la heroína (drogadictos). Además durante el embarazo las madres
          infectadas con el VIH pueden transmitir la enfermedad a su hijo a
          través de la placenta.
        </p>
      </v-col>
      <v-col class="col-12">
        <span class="font-weight-bold"
          >¿COMO SE HACE EL DIAGNOSTICO DE LA INFECCION?</span>
      </v-col>
      <v-col class="col-12 text-justify pt-0">
        <p>
          El diagnóstico se realiza examinando una muestra de sangre para
          detectar la presencia del Virus de Inmunodeficiencia Humana (VIH).
          Existen varias pruebas de laboratorio. El primer paso es examinar la
          sangre utilizando una prueba rápida; si esta resulta “POSITIVA”, se
          repite nuevamente y se debe realizar una prueba confirmatoria (Western
          Blot); si esta última se confirma como “POSITIVA” significa que la
          persona está infectada con el VIH y que la puede transmitir (si no se
          toma las medidas de protección adecuadas) el virus a otras personas.
          Si el resultado es NEGATIVO, significa que no hay evidencia de
          laboratorio, hasta ese momento, de que la persona esté infectada con
          el VIH
        </p>
      </v-col>
      <v-col class="col-12">
        <span class="font-weight-bold">CONSENTIMIENTO</span>
      </v-col>
      <v-col class="col-12 text-justify pt-0">
        <p>
          Declaro haber comprendido este documento y haber recibido Consejería
          ASESORÍA PRE TEST y entiendo que la toma de la muestra es voluntaria
          Acepto la responsabilidad de retirar personalmente el resultado; en
          caso de no retirarlo en la fecha acordada, acepto que se me contacte
          confidencialmente, según los procedimientos que me han informado
          (llamado telefónico, visita domiciliaria, carta certificada, correo
          electrónico).
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3 col-sm-4">
        <v-text-field
          :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
          label="Fecha de Notificación"
          outlined
          readonly></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="mt-5 justify-center">
      <v-col class="col-12 text-center">
        <span class="font-weight-bold"
          >CALIDAD EN LA QUE SE OTORGA ESTE CONSENTIMIENTO</span>
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
            :src="paci_firma ? firma_consen : ''"></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_paci.descrip.trim() }}</span>
            </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">
                {{ reg_paci.tipo_id }}
            </span>
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
            :src="!paci_firma ? firma_consen : ''"></v-img>
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
          <v-btn color="primary" @click="grabar(true)"> Aceptar </v-btn>
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
        v-on="$listeners">
      </FirmaConsen>
    </v-dialog> -->
 </v-container>
</template>

<script>
export default {
  data() {
    return {
      reg_hc: {
        rips: {},
        cierre: {},
      },
      // reg_paci: JSON.parse(sessionStorage.reg_paci),
      // reg_acomp: JSON.parse(sessionStorage.reg_acomp),
      // reg_prof: JSON.parse(sessionStorage.reg_prof),
      // entidad: JSON.parse(sessionStorage.datos_empresa),

      fecha_actual: "",
      hora_actual: "",
      datos_session: {},

      firma_prof: "",

       HIC001: {
        // MOTIVO PRUEBA
        sosp_cli: "",
        trans_alt: "",
        pep_kit: "",
        contact_sex: "",
        uso_frec_agu: "",
        pep_control_mes: "",
        contact_vih: "",
        resul_tam: "",
        pep_control_3_mes: "",
        // DEMANDA INDUCIDA
        prog_prom: "",
        cons_ext: "",
        med_legal: "",
        cons_urg: "",
        cons_esp: "",
        cual_cons_esp: "",
      },
      
      dialog_firma: false,
      firma_consen: "",
      paci_firma: false,
    }
    },
  mounted() {
    if (this.$route.query.data) {
      const {
        sosp_cli,
        trans_alt,
        pep_kit,
        contact_sex,
        uso_frec_agu,
        pep_control_mes,
        contact_vih,
        resul_tam,
        pep_control_3_mes,

        prog_prom,
        cons_ext,
        med_legal,
        cons_urg,
        cons_esp,
        cual_cons_esp,
      } = JSON.parse(this.$route.query.data);
      this.HIC001.sosp_cli= sosp_cli
      this.HIC001.trans_alt= trans_alt
      this.HIC001.pep_kit= pep_kit
      this.HIC001.contact_sex= contact_sex
      this.HIC001.uso_frec_agu= uso_frec_agu
      this.HIC001.pep_control_mes= pep_control_mes
      this.HIC001.contact_vih= contact_vih
      this.HIC001.resul_tam= resul_tam
      this.HIC001.pep_control_3_mes= pep_control_3_mes
      this.HIC001.prog_prom= prog_prom
      this.HIC001.cons_ext= cons_ext
      this.HIC001.med_legal= med_legal
      this.HIC001.cons_urg= cons_urg
      this.HIC001.cons_esp= cons_esp
      this.HIC001.cual_cons_esp= cual_cons_esp
    }
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
        if (
          (this.HIC001.sosp_cli == "S" ||
            this.HIC001.trans_alt == "S" ||
            this.HIC001.pep_kit == "S" ||
            this.HIC001.contact_sex == "S" ||
            this.HIC001.uso_frec_agu == "S" ||
            this.HIC001.pep_control_mes == "S" ||
            this.HIC001.contact_vih == "S" ||
            this.HIC001.resul_tam == "S" ||
            this.HIC001.pep_control_3_mes == "S" ||
            this.HIC001.prog_prom == "S" ||
            this.HIC001.cons_ext == "S" ||
            this.HIC001.med_legal == "S" ||
            this.HIC001.cons_urg == "S") &&
          this.HIC001.cons_esp != "S"
        ) {
          return false;
        } else if (this.HIC001.cual_cons_esp.trim()) {
          return false;
        } else return true;
      } else return true;
    },
  },
  async created() {
    this.fecha_actual = this.$moment().format("YYYYMMDD");
    this.hora_actual = this.$moment().format("HHmm");
    this.datos_session = JSON.parse(atob(sessionStorage[this.datos_url]));

    await this.get_img_firmas(parseInt(this.reg_prof.cod), "2").then((data) => {
      this.firma_prof = sessionStorage.firma_prof = data;
      console.log("real sign", this.firma_prof);
    });

    this.paci_firma = this.validar_paci_firma;

    this.get_historia();
  },
   watch: {
    HIC001: {
      handler(val) {
        if (val.cons_esp != "S") val.cual_cons_esp = "";
        else {
          this.$nextTick(() => {
            setTimeout(() => this.$refs.inputCualConsEsp.$refs.input.focus());
          });
        }
      },
      deep: true,
    },
    "HIC001.cual_cons_esp": function (val) {
      this.$nextTick(() => {
        this.$set(this.HIC001, "cual_cons_esp", val ? val.replaceEsp() : "");
      });
    },
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

        ...this.HIC001,
      };
      this.grabadoHIC001(this.HIC001);

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
    async grabadoHIC001(data) {
      const RES = await this.postData_({
        url: "HIC001/guardar",
        data,
        methods: "POST",
      });
      console.log(RES, "NODE");
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
}
</script>