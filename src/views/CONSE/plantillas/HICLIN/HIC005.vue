<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto" class="pr-5">
        <v-text-field
          :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
          label="Fecha"
          readonly
          outlined
          hide-details></v-text-field>
      </v-col>
      <v-col class="col-auto"><v-text-field
          :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
          label="Hora"
          readonly
          outlined
          hide-details></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="ma-0 text-justify">
          <span v-if="paci_firma">
            Yo,
            <span class="font-weight-bold"> {{ reg_paci.descrip }}, </span>
            mayor de edad identificado con documento N°:
            <span class="font-weight-bold"> {{ mask_id(reg_paci.cod) }} </span>
            de
            <span class="font-weight-bold">
              {{ reg_paci.descrip_ciudad }}
            </span>
            actuando en nombre propio en pleno uso de mis facultades, libre y
            consciente, o como responsable del menor
            ________________________________
          </span>
          <span v-else>
            Yo, <span class="font-weight-bold"> {{ reg_acomp.descrip }} </span>,
            Mayor de edad identificado con el documento N°:
            <span class="font-weight-bold"> {{ mask_id(reg_acomp.cod) }} </span>
            de
            <span class="font-weight-bold">
              {{ reg_acomp.descrip_ciudad }}
            </span>
            actuando en nombre propio en pleno uso de mis facultades, libre y
            consciente, o como responsable del menor
            <span class="font-weight-bold"> {{ reg_paci.descrip }}</span>
          </span>
          , declaro que:
        </p>
      </v-col>
      <v-col class="col-12">
        <v-text-field
          v-model="text_edit.remitido_a"
          label="RECHAZO SER REMITIDO A"
          outlined
          hide-details
          maxlength="90"
          @input="
            HIC005.remitido_a = text_edit.remitido_a.replaceEsp().enterReplace()
          "></v-text-field>
      </v-col>
      <v-col class="col-12">
        <p class="ma-0 text-justify">
          El doctor (a) / o responsable:
          <span class="font-weight-bold"> 
            {{ reg_prof.descrip }}
          </span> me ha
          explicado claramente la necesidad de ser trasladado a centro de mayor
          complejidad a razón de mis condiciones clínicas. Igualmente me han
          explicado de los riesgos y consecuencias al rechazar esta remisión,
          declaro la decisión de permanecer en esta institución por:
        </p>
      </v-col>
      <v-col class="col-12">
        <v-textarea
          v-model="text_edit.motivo_rechazo"
          label="MOTIVO RECHAZO"
          outlined
          no-resize
          maxlength="500"
          auto-grow
          @input="
            HIC005.motivo_rechazo = text_edit.motivo_rechazo
              .replaceEsp()
              .enterReplace()
          " ></v-textarea>
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
          <v-card-subtitle class="pa-0"
            ><span>{{ reg_paci.descrip.trim() }}</span></v-card-subtitle>
          <v-card-subtitle class="pa-0"
            ><span class="font-weight-bold">{{ reg_paci.tipo_id }}</span>
            {{ mask_id(reg_paci.cod) }}</v-card-subtitle>
          <v-card-actions class="col-12 justify-center">
            <v-btn
              icon
              color="primary"
              @click="dialog_firma = true"
              elevation="0"
              ><v-icon>mdi-book-edit-outline</v-icon>
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
            <span>
                {{ reg_acomp.descrip.trim() }}
            </span>
            </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">
                {{ reg_acomp.tipo_id }}
            </span>
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
    <v-row>
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
      HIC005: {
        remitido_a: "",
        motivo_rechazo: "",
      },

      text_edit: {
        remitido_a: "",
        motivo_rechazo: "",
      },
      firma_prof: "",

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
          this.text_edit.remitido_a = val
            ? val.remitido_a.replaceEsp()
            : val.remitido_a;
          this.text_edit.motivo_rechazo = val
            ? val.motivo_rechazo.replaceEsp()
            : val.motivo_rechazo;
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
        this.HIC005.motivo_rechazo.trim() &&
        this.HIC005.remitido_a.trim()
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

        ...this.HIC005,
      };
      this.grabadoHIC005(datos);

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
    async grabadoHIC005(data){
      const RES = await this.postData_({
        url:"HIC005/guardar",
        data,
        methods: "POST",
      })
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
