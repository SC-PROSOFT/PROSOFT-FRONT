<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto" class="pr-5">
        <v-text-field
          :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
          label="Fecha"
          readonly
          hide-details
          outlined></v-text-field>
      </v-col>
      <v-col class="col-auto">
        <v-text-field
          :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
          label="Hora"
          readonly
          hide-details
          outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="col-12 pt-5">
        <p class="ma-0 text-justify">
          Yo,
          <span class="font-weight-bold">{{ reg_paci.descrip }},</span>
          identificado(a) con
          <span class="font-weight-bold">{{ reg_paci.tipo_id }}</span>
          No.
          <span class="font-weight-bold">{{ mask_id(reg_paci.cod) }},</span>
          residente en
          <span class="font-weight-bold">{{ reg_paci.descrip_ciudad }}.</span>
          Declaro voluntariamente mi aceptación para recibir el tratamiento para
          tuberculosis:
        </p>
      </v-col>
      <v-col class="col-12">
        <v-text-field
          outlined
          v-model="text_edit.tipo_tuberculosis"
          class="py-2"
          hide-details
          label="Tipo de tuberculosis"
          maxlength="90"
          @input="
            HIC007.tipo_tuberculosis = text_edit.tipo_tuberculosis
              .replaceEsp()
              .enterReplace()
          " ></v-text-field>
      </v-col>
      <v-col class="col-12">
        <p class="text-justify">
          Y haber sido informado(a) por el Médico
          <span class="font-weight-bold">{{ reg_prof.descrip }}</span>
          de las posibilidades de curación o fracaso de este tratamiento.
        </p>
        <p class="text-justify">
          Declaro también, haber sido informado acerca de esta enfermedad, sus
          complicaciones, signos y síntomas, de las reacciones adversas que
          pudieran presentarse con el esquema de tratamiento que a continuación
          se señala: (Marcar con X y diligenciar donde corresponde).
        </p>
      </v-col>
      <v-row no-gutters class="col-12 justify-space-between">
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.rifampicina"
            label="Rifampicina"
            class="mt-0"
            true-value="S"
            false-value="N"
            hide-details></v-checkbox>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.isoniacida"
            label="Isoniacida"
            class="mt-0"
            true-value="S"
            false-value="N"></v-checkbox>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.pirazinamida"
            label="Pirazinamida"
            class="mt-0"
            true-value="S"
            false-value="N"></v-checkbox>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.etambutol"
            label="Etambutol"
            class="mt-0"
            true-value="S"
            false-value="N"></v-checkbox>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.estreptomicina"
            label="Estreptomicina"
            class="mt-0"
            true-value="S"
            false-value="N"></v-checkbox>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="HIC007.rifabutina"
            label="Rifabutina"
            class="mt-0"
            true-value="S"
            false-value="N"></v-checkbox>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="text_edit.otros"
            label="Otros"
            outlined
            class="col-auto"
            maxlength="90"
            @input="HIC007.otros = text_edit.otros.replaceEsp().enterReplace()"
            ></v-text-field>
        </v-col>
      </v-row>

      <v-col cols="12">
        <p class="text-justify">
          Manifiesto mi conformidad para recibirlo en forma regular (sin
          inasistencias ni abandono), totalmente supervisado por el personal
          designado para tal fin, con estricto cumplimiento de las normas de la
          estrategia nacional del programa Control de Tuberculosis. También me
          comprometo a facilitar el examen de mis contactos. En señal de
          conformidad, firmo el presente consentimiento informado.
        </p>
      </v-col>
      <v-row class="mt-5 justify-center">
        <v-col class="col-6">
          <v-card class="d-flex flex-column align-center" outlined disabled>
            <v-card-title class="pt-0">FIRMA PROFESIONAL</v-card-title>
            <v-img
              alt="img"
              max-height="150px"
              contain
              :src="firma_prof"></v-img>
            <v-card-subtitle class="pa-0">
              <span>{{ reg_prof.descrip.trim() }}</span>
            </v-card-subtitle>
            <v-card-subtitle class="pa-0">
              <span class="font-weight-bold">Doc.</span>
              {{ mask_id(reg_prof.cod) }}
              <span class="font-weight-bold">Cargo:</span>
              {{ reg_prof.descrip_atiende }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-col cols="12" class="pt-12">
        <p class="text-justify">
          En caso de menores de edad, el padre o tutor será quien firme el
          consentimiento informado. Este documento se anexará a la Historia
          Clínica del paciente.
        </p>
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
            :src="!paci_firma ? firma_consen : ''" ></v-img>
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
              elevation="0" >
              <v-icon>mdi-book-edit-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-row class="justify-center">
        <v-card class="pt-5" elevation="0" :disabled="disable_btn_grabado">
          <v-card-actions>
            <v-btn outlined color="secondary" @click="grabar(false)">
              Revocar
            </v-btn>
            <v-btn color="primary" @click="grabar(true)"> Aceptar </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
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
        rips: {},
        cierre: {},
      },

      reg_paci: JSON.parse(sessionStorage.reg_paci),
      reg_acomp: JSON.parse(sessionStorage.reg_acomp),
      reg_prof: JSON.parse(sessionStorage.reg_prof),
      entidad: JSON.parse(sessionStorage.datos_empresa),

      fecha_actual: "",
      hora_actual: "",
      datos_session: {},

      HIC007: {
        tipo_tuberculosis: "",
        rifampicina: "",
        isoniacida: "",
        pirazinamida: "",
        etambutol: "",
        estreptomicina: "",
        rifabutina: "",
        otros: "",
      },

      text_edit: {
        otros: "",
        tipo_tuberculosis: "",
      },
      firma_prof: "",
      otros_checkbox: false,
      dialog_firma: false,
      firma_consen: "",
      paci_firma: false,
    };
  },
  components: {
    // FirmaConsen: () => import("@/components/firma.consen.vue"),
  },
  watch: {
    text_edit: {
      handler(val) {
        this.$nextTick(() => {
          this.text_edit.otros = val ? val.otros.replaceEsp() : val.otros;
          this.text_edit.tipo_tuberculosis = val
            ? val.tipo_tuberculosis.replaceEsp()
            : val.tipo_tuberculosis;
        });
      },
      deep: true,
    },
  },
  computed: {
    llave_consen() {
      return `${this.reg_hc.llave}${this.fecha_actual}${this.hora_actual}${this.datos_session.admin}`;
    },
    validar_paci_firma() {
      return !this.reg_acomp.cod.trim() ? true : false;
    },
    disable_btn_grabado() {
      if (
        this.firma_consen.trim() &&
        this.HIC007.tipo_tuberculosis.trim() &&
        (this.HIC007.rifampicina == "S" ||
          this.HIC007.isoniacida == "S" ||
          this.HIC007.pirazinamida == "S" ||
          this.HIC007.etambutol == "S" ||
          this.HIC007.estreptomicina == "S" ||
          this.HIC007.rifabutina == "S" ||
          this.HIC007.otros.trim())
      )
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

        ...this.HIC007,
      };
      this.grabadoHIC007(datos);

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
    async grabadoHIC007(data) {
      const RES = this.postData_({
        url: "gradaboHIC007",
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
};
</script>
