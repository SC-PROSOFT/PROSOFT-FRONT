<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto" class="pr-5">
        <v-text-field
          :value="fecha_actual"
          label="Fecha"
          readonly
          outlined
        ></v-text-field>
      </v-col>
      <v-col class="col-auto">
        <v-text-field
          :value="hora_actual"
          label="Hora"
          readonly
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="text-justify">
        <p>
          Yo,
          <span class="font-weight-bold">{{ reg_paci.descrip }}</span>
          identificado con documento No.
          <span class="font-weight-bold">{{ reg_paci.cod }},</span>
          mayor de edad y/o responsable del paciente
          <span>____________________________________</span>
          identificado con
          <span>____</span>
          de
          <span>____________</span>
          , actuando en nombre propio en pleno uso de mis facultades, libre y
          consciente declaro:
        </p>
        <p>
          Yo,
          <span class="font-weight-bold">{{}}</span>
          identificado con documento No.
          <span class="font-weight-bold">{{}}</span>
          , mayor de edad y/o responsable del paciente
          <span class="font-weight-bold">{{}}</span>
          identificado con {{}} No.
          <span class="font-weight-bold">{{}}</span>
          de
          <span class="font-weight-bold"> {{}} </span>
          , actuando en nombre propio en pleno uso de mis facultades, libre y
          consciente declaro:
        </p>
      </v-col>
      <v-col cols="12" class="text-justify">
        <p>
          Que por mi propia voluntad y pleno conocimiento de riesgos
          complicaciones explicadas por el personal médico, he decidido
          solicitar el retiro voluntario, eximiendo de toda responsabilidad a
          esta institución y al personal que en ella labora, por las
          consecuencias que puedan sobrevenir por mi determinación
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pr-5 col-auto">
        <v-text-field
          :value="reg_hc.fecha || ``"
          label="Fecha ingreso"
          readonly
          outlined
        ></v-text-field>
      </v-col>
      <v-col class="col-auto">
        <v-text-field
          :value="reg_hc.hora"
          label="Hora ingreso"
          readonly
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="pt-3">
      <v-col cols="12">
        <span class="subtitle-1 text-uppercase font-weight-bold">
          Diagnósticos ingreso
        </span>
      </v-col>
      <v-col cols="12">
        <p>
          <span class="font-weight-bold">{{ reg_hc.rips.diagn[3].cod }}</span>
          - {{ reg_hc.rips.diagn[3].descrip }}
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters class="pt-3">
      <v-col cols="12">
        <span class="subtitle-1 text-uppercase font-weight-bold">
          Motivo del retiro
        </span>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="HIC002.motivo_retiro"
          counter
          maxlength="300"
          :rules="rules_textarea"
          :error-messages="errores_mitivo_retiro"
          outlined
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>

    <!--  -->
    <v-row no-gutters class="pt-3">
      <v-col cols="12">
        <span class="subtitle-1 text-uppercase font-weight-bold">
          Observaciones
        </span>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="HIC002.observaciones"
          counter
          maxlength="300"
          :rules="rules_textarea"
          outlined
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    <!-- Firmas -->
    <v-divider class="my-5"></v-divider>
    <v-row class="mt-5 justify-center">
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
            {{ reg_paci.cod }}
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
            {{ reg_acomp.cod }}
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
      <v-col class="col-6">
        <v-card class="d-flex flex-column align-center" outlined disabled>
          <v-card-title class="pt-0">FIRMA PROFESIONAL</v-card-title>
          <v-img alt="img" max-height="150px" contain :src="firma_prof"></v-img>
          <v-card-subtitle class="pa-0">
            <span>{{ reg_prof.descrip.trim() }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pa-0">
            <span class="font-weight-bold">Doc.</span>
            {{ reg_prof.cod }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>
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
    <v-dialog
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
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      fecha_actual: "20/02/2023",
      hora_actual: "14:48",

      reg_paci: {
        descrip: "GONZALEZ                      YELICA",
        cod: "1",
        tipo_id: "RC",
      },

      reg_hc: {
        cierre: {
          estado: "1",
          fact: "000000",
          temporal: "0",
        },
        descrip_med: "BOHORQUEZ CASTAÑO GABRIEL",
        fecha: "2023/02/10",
        hora: "15:45",
        llave: "00000000000000101000019",
        med: "0017329215",
        motiv: "EXAMEN DE PRE-INGRESO",
        oper_elab: "ADMI",
        rips: {
          diagn: [
            {
              cod: "A000",
              descrip: "COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            },
            {
              cod: "A001",
              descrip: "COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            },
            {
              cod: "A002",
              descrip: "COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            },
            {
              cod: "A003",
              descrip: "COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            },
          ],
        },
        serv: "02",
        unid_edad: "A",
        vlr_edad: "028",
      },
      reg_acomp: {
        ciudad: "00000",
        cod: "",
        descrip: "",
        descrip_ciudad: "00000",
        descrip_depart: "00000",
        descrip_eps: "",
        descrip_etnia: "",
        descrip_tipo: "",
        descrip_zona: "",
        direccion: "",
        eps: "",
        etnia: "",
        nacim: "00000000",
        sexo: "",
        telefono: "",
        tipo: "",
        tipo_id: "",
        zona: "",
        _1er_apel: "",
        _1er_nom: "",
        _2do_apel: "",
        _2do_nom: "",
      },

      HIC002: {
        motivo_retiro: "",
        observaciones: "",
      },
      datos_sesion: {
        admi: "ADMI",
        cod_acomp: "",
        cod_prof: "0017329215",
        llave_hc: "00000000000000101000019",
        modulo: "HIC",
        parentesco: "",
      },

      reg_prof: {
        atiende: "2",
        cod: "0017329215",
        descrip: "BOHORQUEZ CASTAÑO GABRIEL",
        descrip_atiende: "MEDICO GENERAL",
      },
      dialog_firma: false,
      firma_consen: "",
      paci_firma: false,

      rules_textarea: [(v) => v.length <= 300 || "Max 300 characters"],
    };
  },
  watch: {},
  components: {
    FirmaConsen: () => import("@/components/CONSE/firma.conse.vue"),
  },
  computed: {
    llave_consen() {
      // return `${this.reg_hc.llave}${this.fecha_actual}${this.hora_actual}${this.datos_session.admin}`;
    },
    validar_paci_firma() {
      // return !this.reg_acomp.cod.trim() ? true : false;
    },
    disable_btn_grabado() {
      // if (this.text_edit.motivo_retiro.trim() && this.firma_consen.trim)
      //   return false;
      // else return true;
    },
    errores_mitivo_retiro() {},
  },
  async created() {
    this.fecha_actual = "";
    this.hora_actual = "";
    this.datos_session = "";

    // await this.get_img_firmas(parseInt(this.reg_prof.cod), true).then(
    //   (data) => {
    //     this.firma_prof = sessionStorage.firma_prof = data;
    //   }
    // );

    // this.paci_firma = this.validar_paci_firma;

    // this.get_historia();
  },
};
</script>
