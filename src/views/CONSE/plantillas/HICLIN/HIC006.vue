<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto" class="pr-5">
        <v-text-field
          :value="$moment(fecha_actual, `YYYYMMDD`).format(`YYYY/MM/DD`)"
          label="Fecha"
          readonly
          outlined></v-text-field>
      </v-col>
      <v-col class="col-auto">
        <v-text-field
          :value="$moment(hora_actual, `HHmm`).format(`HH:mm`)"
          label="Hora"
          readonly
          outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="d-flex justify-center text-center">
        <p>
          <span class="font-weight-bold">
            CONSENTIMIENTO INFORMADO DEL PADRE, MADRE, O TUTOR, AUTORIZANDO A SU
            HIJA MENOR PARA VACUNARSE CONTRA EL VIRUS DEL PAPILOMA HUMANO (VPH)
          </span>
        </p>
      </v-col>
      <v-row row="12" class="d-flex justify-center caption">
        <p class="text-center ma-0">
          El Ministerio de Salud de Colombia, desde el año 2012, incluyo en el
          Plan Ampliado de Inmunización – PAI, la vacuna contra el Virus del
          Papiloma Humano – VPH.
        </p>

        <p class="text-center ma-0">
          La cual se ofrece en forma gratuita a las niñas entre 9 a 17 años de
          edad en los establecimientos de salud del territorio nacional.
        </p>
      </v-row>
    </v-row>
    <v-row class="pt-5">
      <v-col class="col-12 px-0">
        <v-card class="col-12" flat outlined>
          <v-col cols="12">
            <span class="font-weight-bold">BENEFICIOS</span>
            <ul>
              <li>
                <p class="ma-0 text-justify">
                  Esta vacuna previene la infección por el Virus del Papiloma
                  Humano (VPH) responsable del cáncer de cuello uterino,
                  verrugas genitales y otros tipos de cáncer frecuentes en
                  regiones genitales.
                </p>
              </li>
              <li>
                <p class="ma-0 text-justify">
                  Para gozar de la protección de la vacuna, es necesario que la
                  niña reciba las 2 dosis de vacuna: La 1ra dosis al primer
                  contacto con la niña y la 2da dosis 6 meses después de la
                  primera dosis.
                </p>
              </li>
            </ul>
          </v-col>
          <v-col class="col-12">
            <span class="font-weight-bold">LA VACUNA ES</span>
            <ul>
              <li>
                <p class="text-justify ma-0">Muy segura</p>
              </li>
              <li>
                <p class="text-justify ma-0">
                  Previene el cáncer de cuello del útero, pero no cura el cáncer
                </p>
              </li>
            </ul>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 py-5">
        <v-card flat class="font-weight-bold text-center grey lighten-3">
          <v-card-subtitle>
            <span class="font-weight-bold">IMPORTANTE:</span>
            Toda niña vacunada, igualmente a futuro, debe realizarse control
            ginecológico regular y la realización periódica del Papanicolaou.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 px-0">
        <v-card class="col-12" flat outlined>
          <v-col class="col-12 text-center font-weight-bold">
            POSIBLES REACCIONES DESPUÉS DE LA VACUNACIÓN
          </v-col>
          <v-col class="col-12">
            <p class="text-justify">
              <span class="font-weight-bold">
                La reacción más frecuente es en el sitio de inyección puede ser:
              </span>
              dolor, enrojecimiento e hinchazón en el lugar de vacunación.
              Desaparece (sin tratamiento médico) dentro de las 48 horas
            </p>

            <p class="text-justify">
              Otras reacciones poco frecuentes son: dolor de cabeza, fatiga,
              fiebre, náuseas, que desaparecen en las siguientes 48 horas. Si
              persisten, buscar atención en los establecimientos de salud.
            </p>
          </v-col>
          <v-col class="col-12">
            <span class="font-weight-bold">
              Reacciones menos frecuentes no asociadas a la vacuna pero
              reportadas:
            </span>
            <ul>
              <li>
                <p class="ma-0 text-justify">
                  Desmayo: Esta reacción puede producirse por temor o miedo y no
                  por la vacuna propiamente. Para evitar esta reacción se
                  recomienda administrar la vacuna a la niña sentada y
                  permanecer así en observación 15 minutos después de la
                  administración de la vacuna.
                </p>
              </li>
              <li>
                <p class="ma-0 text-justify">
                  Reacciones alérgicas como ronchas o picazón que pasan
                  rápidamente. Si persisten, buscar atención en el
                  establecimiento de salud.
                </p>
              </li>
            </ul>
          </v-col>
        </v-card>
      </v-col>
      <v-col class="col-12 px-0">
        <v-card class="col-12" flat outlined>
          <v-col class="col-12 text-center font-weight-bold">DECLARACIÓN</v-col>
          <v-col class="col-12">
            <p class="text-justify">
              Yo
              <span class="font-weight-bold">{{ reg_acomp.descrip }}</span>
              identificado con
              <span class="font-weight-bold">{{ reg_acomp.tipo_id }}</span>
              N°:
              <span class="font-weight-bold">{{ mask_id(reg_acomp.cod) }}</span>
              familiar, tutor o representante legal de la niña
              <span class="font-weight-bold">{{ reg_paci.descrip }},</span>
              identificada con el
              <span class="font-weight-bold">{{ reg_paci.tipo_id }}</span>
              No.
              <span class="font-weight-bold">{{ mask_id(reg_paci.cod) }}</span>
              dejo constancia de haber sido informado sobre los beneficios,
              seguridad y posibles reacciones a la administración de la vacuna
              contra el Virus del Papiloma Humano.
            </p>
            <p class="text-justify">
              Por lo tanto autorizo al Personal de la entidad
              <span class="font-weight-bold">{{ entidad.NOMUSU }}</span> a
              vacunar a mi menor hija por voluntad propia y me comprometo a
              completar las 2 dosis que son necesarias para su protección contra
              el cáncer de cuello uterino.
            </p>
          </v-col>
        </v-card>
      </v-col>
      <v-divider class="my-5"></v-divider>
    </v-row>
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
            : val.motivo_retiro;
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
      if (this.firma_consen.trim()) return false;
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

    if (this.paci_firma) {
      this.$emit("modal_error_msj", {
        titulo: "El paciente debe tener acompañante",
        texto: "",
        btn_salir: true,
      });
    } else this.get_historia();
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
      };
      this.grabadoHICOO6(datos);

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
    async grabadoHICOO6(data) {
      const RES = await this.postData_({
        url: "HIC006/guardar",
        data,
        methods: "POST",
      });
      console.log(RES, "NODEJS");
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
