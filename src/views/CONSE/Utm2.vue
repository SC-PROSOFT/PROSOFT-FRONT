<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row align="center">
        <v-col class="font-weight-light text-center"> </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <!-- buscar por paciente -->
        <v-col cols="6" sm="2" md="2" xs="2" class="input-col">
          <CHECKBOX
            @next-action="nextStep(form_validar, $event, buscarpaciente)"
            :field="form_validar.buscar_paci"
            :reg="reg_validar.buscar_paci"
            @onChange="
              (data) => {
                reg_validar[data.key] = data.value;
              }
            "
          />
        </v-col>
        <!-- sucursal -->
        <v-col cols="12" sm="2" md="1" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_fact, $event, datoSucursal)"
            :field="form_fact.suc"
            :reg="reg_fact.llave.suc"
            @onChange="
              (data) => {
                reg_fact.llave[data.key] = data.vale;
              }
            "
          />
        </v-col>
        <!-- clase de servicio -->
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <v-row label="clase servico">
            <v-col>
              <INPUT
                @next-action="nextStep(form_fact, $event, datoTipo)"
                :field="form_fact.cl"
                :reg="reg_fact.llave.cl"
                @onChange="
                  (data) => {
                    reg_fact.llave[data.key] = data.vale;
                  }
                "
              />
            </v-col>
            <!-- text-fiel-clase de servicio -->
            <!-- <v-col cols="6" sm="2" md="2" xs="2" class="input-col"> -->
            <v-col>
              <INPUT @next-action="nextStep(form_fact, $event, datoNom1a)" :field="form_fact.cl2" :reg="descripTipo" @onChange="onChange" />
            </v-col>
          </v-row>
        </v-col>
        <!-- </v-col> -->
        <!-- comprobante -->
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_fact, $event, aceptarComprobante)"
            :field="form_fact.nro"
            :reg="reg_fact.llave.nro"
            @onChange="
              (data) => {
                reg_fact.llave[data.key] = data.vale;
              }
            "
          />
        </v-col>
        <!-- paciente -->
        <v-col cols="6" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_paci, $event, datoNom1a)"
            :field="form_paci.descrip"
            :reg="reg_paci.descrip"
            @onChange="
              (data) => {
                reg_paci[data.key] = data.vale;
              }
            "
          />
        </v-col>
        <!-- id-paciente -->
        <v-col cols="6" sm="2" md="1" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_fact, $event, datoNom1a)" :field="form_paci.cod" :reg="reg_paci.cod" @onChange="onChange" />
        </v-col>
        <!-- secon_Line: paciente firma consentimiento? -->
        <v-col cols="6" sm="2" md="2" xs="2" class="input-col">
          <CHECKBOX
            @next-action="nextStep(form_pfirma, $event, pacienteFirma)"
            :field="form_pfirma.p_firma"
            :reg="reg_pfirma.p_firma"
            @onChange="onChange"
          />
        </v-col>
        <!-- id-acompañante -->
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form_acomp, $event, aceptarAcompañante)"
            :field="form_acomp.acomp"
            :reg="reg_acomp.acomp"
            @onChange="
              (data) => {
                reg_acomp[data.key] = data.vale;
              }
            "
          />
        </v-col>
        <!-- acompañante -->
        <v-col cols="6" sm="2" md="4" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_acomp, $event, datoNom1a)"
            :field="form_acomp.descripcion"
            :reg="reg_acomp.descripcion"
            @onChange="onChange"
          />
        </v-col>
        <!-- parentesco -->
        <v-col cols="6" sm="2" md="3" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_acomp, $event, datoNom1a)"
            :field="form_acomp.parentesco"
            :reg="reg_acomp.parentesco"
            @onChange="onChange"
          />
        </v-col>
        <!-- tree_Line: id-prodecioanal-->
        <v-col cols="12" sm="2" md="2" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_prof, $event, aceptarProfesional)"
            :field="form_prof.cod"
            :reg="reg_prof.cod"
            @onChange="
              (data) => {
                reg_prog[data.key] = data.vale;
              }
            "
          />
        </v-col>
        <!-- atendio -->
        <v-col cols="6" sm="3" md="6" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_prof, $event, datoNom1a)" :field="form_prof.descrip" :reg="reg_prof.descrip" @onChange="onChange" />
        </v-col>
        <!-- detalle -->
        <v-col cols="6" sm="2" md="4" xs="2" class="input-col">
          <INPUT
            @next-action="nextStep(form_prof, $event, datoNom1a)"
            :field="form_prof.descrip_atiende"
            :reg="reg_prof.descrip_atiende"
            @onChange="onChange"
          />
        </v-col>
        <!-- four_Line: auxiliar-firma-consentimiento -->
        <v-col cols="6" sm="2" md="2" xs="2" class="input-col">
          <CHECKBOX
            @next-action="nextStep(form_auxFirma, $event, auxFirma)"
            :field="form_auxFirma.aux_firma"
            :reg="reg_auxFirma.aux_firma"
            @onChange="onChange"
          />
        </v-col>
        <!-- id-auxiliar -->
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT @next-action="nextStep(form_aux, $event, aceptarAuxiliar)" :field="form_aux.aux" :reg="reg_aux.aux" @onChange="onChange" />
        </v-col>
        <!-- atendio -->
        <v-col cols="6" sm="2" md="4" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_aux, $event, datoNom1a)" :field="form_aux.descripcion" :reg="reg_aux.descripcion" @onChange="onChange" />
        </v-col>
        <!-- detalle -->
        <v-col cols="6" sm="2" md="3" xs="2" class="input-col">
          <INPUT @next-action="nextStep(form_aux, $event, datoNom1a)" :field="form_aux.detalle" :reg="reg_aux.detalle" @onChange="onChange" />
        </v-col>
      </v-row>
    </v-card>
    <CON850 @novedadSelec="novedadSelec($event)" :novedad_activa="novedad_activa" v-if="novedad_activa" />
    <CON851P v-if="con851_p.estado" :con851_p="con851_p" />
  </v-container>
</template>
<script>
import { getObjRegFact, getObjRegFact_ } from "../../fuentes/SALUD/reg_fact";
import { getObjRegPaci, getObjRegPaci_ } from "../../fuentes/SALUD/reg_paci";
import { getObjRegProf, getObjRegProf_ } from "../../fuentes/SALUD/reg_prof";
import { getObjRegSucur } from "../../fuentes/SALUD/reg_sucur";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

export default {
  name: "Laboratorio",
  mixins: [nextAction, global],
  data() {
    return {
      titulo: "laboratorio-consentimiento",
      novedad_activa: false,
      novedad: {},

      form_fact: getObjRegFact_(),
      reg_fact: getObjRegFact(),
      form_paci: getObjRegPaci_(),
      reg_paci: getObjRegPaci(),
      form_prof: getObjRegProf_(),
      reg_prof: getObjRegProf(),
      sucursal: getObjRegSucur(),

      reg_validar: {
        buscar_paci: "",
      },
      form_validar: {
        buscar_paci: {
          id: "buscar_paci",
          label: "¿Buscar por paciente?",
          disabled: true,
          max_length: "1",
        },
      },
      reg_pfirma: {
        p_firma: "",
      },
      form_pfirma: {
        p_firma: {
          id: "p_firma",
          disabled: true,
          label: "¿Paciente firma consentimiento?",
          max_length: "1",
        },
      },
      reg_acomp: {
        acomp: "",
      },
      form_acomp: {
        acomp: {
          id: "acomp",
          label: "ID Acompañante",
          disabled: true,
          placeholder: "Insertar codigo acompañante",
          max_length: "1",
          f8: true,
        },
        descripcion: {
          id: "descrip",
          label: "Acompañante",
          disabled: true,
          placeholder: "Acompañante",
          max_length: "1",
        },
        parentesco: {
          id: "parent",
          label: "Parentesco",
          disabled: true,
          placeholder: "Parentesco",
          max_length: "1",
        },
      },
      reg_auxFirma: {
        aux_firma: "",
      },
      form_auxFirma: {
        aux_firma: {
          id: "aux_firma",
          disabled: true,
          label: "¿Auxiliar firma consentimiento?",
          max_length: "1",
        },
      },
      reg_aux: {
        aux: "",
      },
      form_aux: {
        aux: {
          id: "aux",
          label: "ID Auxiliar",
          disabled: true,
          placeholder: "Insertar codigo auxiliar",
          max_length: "1",
          f8: true,
        },
        descripcion: {
          id: "descrip",
          label: "Aauxiliar",
          disabled: true,
          placeholder: "Aauxiliar",
          max_length: "1",
        },
        detalle: {
          id: "detalle",
          label: "Detalle",
          disabled: true,
          placeholder: "Detalle",
          max_length: "1",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
    }),
    descripTipo() {
      switch (parseInt(this.reg_fact.llave.cl)) {
        case 0:
          return "DROGUERIA";
        case 1:
          return "CIRUGIA";
        case 2:
          return "LABORATORIO CLINICO";
        case 3:
          return "RX - IMAGENOLOGIA";
        case 4:
          return "OTROS SERVICIOS";
        case 5:
          return "CONSULTAS-TERAPIAS";
        case 6:
          return "RESONANCIA NUCLEAR";
        case 7:
          return "PROMOCION Y PREVENCION";
        default:
          return "";
      }
    },
  },
  mounted() {
    this.focusInput(this.form_validar, "buscar_paci");
  },
  methods: {
    onChange(data) {
      this.reg_dep[data.key] = data.value;
    },
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({}),
    buscarpaciente(key) {
      switch (key) {
        case "esc":
          return this.validarSalir();
        case "enter":
          return this.focusInput(this.form_fact, "suc");
      }
    },
    datoSucursal(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_validar, "buscar_paci");
        case "enter":
          return this.focusInput(this.form_fact, "cl");
      }
    },
    datoTipo(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_fact, "suc");
        case "enter":
          return this.focusInput(this.form_fact, "nro");
      }
    },
    aceptarComprobante(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_fact, "cl");
        case "enter":
          return this.focusInput(this.form_pfirma, "p_firma");
      }
    },
    datoComprobante(key) {
      switch (key) {
        case "esc":
          return this.aceptarComprobante();
        case "enter":
          return this.pacienteFirma();
      }
    },
    pacienteFirma(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_fact, "nro");
        case "enter":
          return this.focusInput(this.form_acomp, "acomp");
      }
    },
    aceptarAcompañante(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_pfirma, "p_firma");
        case "enter":
          return this.focusInput(this.form_prof, "cod");
      }
    },
    aceptarProfesional(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_pfirma, "p_firma");
        case "enter":
          return this.focusInput(this.form_auxFirma, "aux_firma");
      }
    },
    auxFirma(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_prof, "cod");
        case "enter":
          return this.focusInput(this.form_aux, "aux");
      }
    },
    aceptarAuxiliar(key) {
      switch (key) {
        case "esc":
          return this.focusInput(this.form_auxFirma, "aux_firma");
        case "enter":
          return this.validarSalir();
      }
    },
    validarSalir() {
      this.CON851P(
        "PNZ",
        "warning",
        "¿Seguro que desea volver al menu principal?",
        () => {
          this.$router.push("/Menu-Principal");
        },
        () => {
          this.focusInput(this.form_validar, "buscar_paci");
        }
      );
    },
  },
};
</script>
