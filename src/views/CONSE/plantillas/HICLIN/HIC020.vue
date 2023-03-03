<template>
    <v-container>
      <v-row>
        <v-col class="col-12">
        <h3 class="text-center">
            CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTOS DE ENDODONCIA
        </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
            <p class="text-justify">
                En pleno uso de mis facultades mentales, libre y conscientemente declaro que doy mi consentimiento al Odontólogo(a) de la IPS, para formular y realizar el tratamiento requerido. Autorizo al odontólogo(a) para proveer servicios adicionales que considere razonables y necesarios para la salud, incluyendo la administración de anestesia que sea necesaria, exámenes de laboratorio, y la preparación de servicios que incluyan estudios de patología, estudios de radiología. Se entiende como endodoncia el procedimiento odontológico por medio del cual se retira la pulpa o nervio dental y los conductos radiculares (raíz del diente) son sellados con un material específico para la conservación del diente, posterior a una enfermedad pulpar irreversible. 
            </p>
            <p class="text-justify">
                Certifico que el odontólogo(a) de la IPS, me ha explicado el procedimiento a realizar, las causas por las cuales es necesario, el pronóstico del diente a tratar y las posibles complicaciones más frecuentes que pueden surgir durante el mismo, tales como :  laceración de tejidos blandos, fractura del diente, perforaciones apical, escalones, fracturas de instrumentos en el canal radicular, sobrepaso de material sellador en zona apical en el momento de la obturación, accidente por hipoclorito, contaminación de conductos, perdida de obturación temporal,broncoaspiracion de instrumental, alergia a los guantes u otros materiales usados en la práctica. Igualmente certifico que me han explicado la importancia de realizar el tratamiento rehabilitador posterior al tratamiento endodóntico, y asumo la responsabilidad de efectuarlo en un periodo no  mayor a 2 meses.
            </p>
            <p class="text-justify">
                Leí cuidadosamente y antes de firmarlo he tenido la oportunidad de hacer las preguntas que he considerado necesarias y todas han sido contestadas satisfactoriamente; así como se me ha explicado que no es posible garantizar los resultados esperados con este procedimiento. De la misma manera manifiesto que se me ha informado sobre la posible necesidad de una cirugía Endodóntica, o técnica no convencionales, eventos no incluidos en el plan obligatorio de salud, en caso de no lograrse los resultados obtenidos con este tratamiento. Por otra parte autorizo a que el odontólogo(a) de la IPS aplique anestesia local en el momento en que el tratamiento lo requiera y que conozco las posibles complicaciones más frecuentes, que pueden surgir durante dicha aplicación tales como parestesia, hematoma, dolor, isquemia de la piel en el lugar de la infiltración, parálisis del velo el paladar, trismus y afectación muscular. Igualmente estoy enterado (a) que las coronas, las prótesis totales, las prótesis removible, los tratamientos de ortodoncia, los tratamientos periodontales y las  radiografías panorámicas, no están cubiertos por el Plan Obligatorio de Salud.
            </p>
        </v-col>
      </v-row>
      <v-row>
      <v-col class="col-12 col-md-3 col-sm-4">
        <v-text-field
          :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
          label="Fecha de Notificación"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-5 justify-center">
      <v-col class="col-12 text-center">
        <span class="font-weight-bold"
          >CALIDAD EN LA QUE SE OTORGA ESTE CONSENTIMIENTO</span
        >
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
          <v-card-subtitle class="pa-0"
            ><span>{{ reg_paci.descrip.trim() }}</span></v-card-subtitle
          >
          <v-card-subtitle class="pa-0"
            ><span class="font-weight-bold">{{ reg_paci.tipo_id }}</span>
            {{ mask_id(reg_paci.cod) }}</v-card-subtitle
          >
          <v-card-actions class="col-12 justify-center"
            ><v-btn
              icon
              color="primary"
              @click="dialog_firma = true"
              elevation="0"
              ><v-icon>mdi-book-edit-outline</v-icon></v-btn
            ></v-card-actions
          >
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
          <v-card-subtitle class="pa-0"
            ><span>{{ reg_acomp.descrip.trim() }}</span></v-card-subtitle
          >
          <v-card-subtitle class="pa-0"
            ><span class="font-weight-bold">{{ reg_acomp.tipo_id }}</span>
            {{ mask_id(reg_acomp.cod) }}</v-card-subtitle
          >
          <v-card-actions class="col-12 justify-center"
            ><v-btn
              icon
              color="primary"
              @click="dialog_firma = true"
              elevation="0"
              ><v-icon>mdi-book-edit-outline</v-icon></v-btn
            ></v-card-actions
          >
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
      reg_acomp: JSON.parse(sessionStorage.reg_acomp),
      reg_paci: JSON.parse(sessionStorage.reg_paci),
      entidad: JSON.parse(sessionStorage.datos_empresa),
      reg_prof: JSON.parse(sessionStorage.reg_prof),

      dialog_firma: false,
      fecha_actual: "",

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
      return !this.reg_acomp?.cod.trim() ? true : false;
    },
    disable_btn_grabado() {
      if (this.firma_consen.trim()) {
        return true;
      } else return true;
    },
  },
  async created() {
    this.fecha_actual = this.$moment().format("YYYYMMDD");
    this.paci_firma = this.validar_paci_firma;
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
      console.log("datos");
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
      if (acepta) {
        this.$emit("loader_modal");
        let datos = {
          llave_consen: this.llave_consen,
          cod_consen: this.$route.name,
          cod_med: this.reg_prof?.cod.padStart(10, "0"),
          paci_acept: this.paci_firma ? "S" : "N",
          acomp_acept: this.paci_firma ? "N" : "S",
          id_acomp: this.reg_acomp?.cod.padStart(15, "0"),
          paren_acomp: this.datos_session.parentesco,
          disentimiento: acepta ? "N" : "S",

          ...this.HIC0019,
        };
        this.postData("save_consen", datos)
          .then(() => {
            this.$emit("msj", "Consentimiento grabado correctamente.", "green");
            this.grabar_firma();
          })
          .catch((err) => {
            this.$emit("loader_modal", false);
            console.error(
              "Error grabando consentimiento.",
              err?.MENSAJE || err
            );
            this.$emit("modal_error_msj", {
              titulo: "Error grabando consentimiento",
              texto: err?.MENSAJE || null,
              callback: this.grabar,
            });
          });
      }
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
      console.log("Firma grabada");
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
      console.log("Impresion hecha");
    },
  },
};
</script>
