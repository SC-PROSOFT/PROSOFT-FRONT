<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" @salir="abrirDialogo"></form-titulo>
    <v-card elevation="20" class="pa-4 mx-auto">
      <v-card-text v-if="!modal_impresion" class="text-center primary--text py-0">
        <v-row class="input-row" justify="center">
          <v-col cols="6" md="6" sm="6" class="mx-auto">
            <v-icon :color="tipo_impresion.color">
              {{ tipo_impresion.icono }}
            </v-icon>
            {{ tipo_impresion.text.slice(6) }}
          </v-col>
        </v-row>

        <v-row class="input-row">
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT :field="form.entidad" @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"></INPUT>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <data-card :field="form.entidad.dataCard"></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              :field="form.depen_corres"
              @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <data-card :field="form.depen_corres.dataCard"></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              :field="form.tipo_corres"
              @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="input-col">
            <data-card :field="form.tipo_corres.dataCard"></data-card>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              :field="form.incluir_radicado"
              @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"
            ></INPUT>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT :field="form.descartar" @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"></INPUT>
          </v-col>
          <v-col cols="12" sm="2" md="2" class="input-col">
            <INPUT
              :field="form.incluir_radicado"
              @next-action="nextStep(form, $event, abrirDialogo, abrirImpresion)"
            ></INPUT>
          </v-col>
        </v-row>
      </v-card-text>
      <CON890P :modal_impresion="modal_impresion" @impresionSelec="impresionSelec" class="mx-auto"></CON890P>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta"
      @cancelar="cerrarDialogo"
      @salirEsc="cerrarDialogo"
      @confirmar="confirmar"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { global, image_base64 } from "../../mixins/global";
import CON890P from "../../components/CONTAB/CON890P.vue";
import { nextAction } from "../../mixins/nextAction";
import { alert } from "../../mixins/CON851";

export default {
  mixins: [global, nextAction, alert],
  components: {
    CON890P,
  },
  data() {
    return {
      titulo: "3.1 Informe de correspondencia",
      modal_impresion: true,
      tipo_impresion: {},
      f8: {
        estado: false,
        headers: [],
        body: [],
        nroPeticion: 0,
        buscar: "",
      },
      form: {
        entidad: {
          id: "entidad",
          label: "Ciudad",
          f8: true,
          value: "",
          dataCard: {
            value: "",
          },
          max_length: "5",
          disabled: true,
          validation: "",
        },
        depen_corres: {
          id: "depen_corres",
          label: "Dependencia tiene correspondencia",
          f8: true,
          value: "",
          dataCard: {
            value: "",
          },
          max_length: "5",
          disabled: true,
          validation: "",
          busqueda: "DPT",
        },
        tipo_corres: {
          id: "tipo_corres",
          label: "Ciudad",
          f8: true,
          value: "",
          dataCard: {
            value: "",
          },
          max_length: "5",
          disabled: true,
          validation: "",
          busqueda: "DPT",
        },
        descartar: {
          id: "descartar",
          label: "Descartar por tipo de correspondencia",
          value: "",
          max_length: "5",
          disabled: true,
          validation: "",
          busqueda: "DPT",
        },
        incluir_radicado: {
          id: "incluir_radicado",
          label: "Incluir radicado de respuesta",
          value: "",
          max_length: "5",
          disabled: true,
          validation: "",
          busqueda: "DPT",
        },
        ano_fecha_init: {
          id: "ano_fecha_init",
          label: "Año",
          value: "",
          tipo: "number",
          max_length: "4",
          disabled: true,
          validation: "",
        },
        mes_fecha_init: {
          id: "mes_fecha_init",
          label: "Mes",
          value: "",
          tipo: "number",
          max_length: "4",
          disabled: true,
          validation: "",
        },
        dia_fecha_init: {
          id: "dia_fecha_init",
          label: "Dia",
          value: "",
          tipo: "number",
          max_length: "2",
          disabled: true,
          validation: "",
        },
        ano_fecha_fin: {
          id: "ano_fecha_fin",
          label: "Año",
          value: "",
          tipo: "number",
          max_length: "4",
          disabled: true,
          validation: "",
        },
        mes_fecha_fin: {
          id: "mes_fecha_fin",
          label: "Mes",
          value: "",
          tipo: "number",
          max_length: "4",
          disabled: true,
          validation: "",
        },
        dia_fecha_fin: {
          id: "dia_fecha_fin",
          label: "Dia",
          value: "",
          tipo: "number",
          max_length: "2",
          disabled: true,
          validation: "",
        },
        jornada: {
          id: "jornada",
          label: "Jornada",
          value: "",
          max_length: "10",
          disabled: true,
          validation: "",
        },
        procedencia: {
          id: "procedencia",
          label: "Procedencia",
          value: "",
          max_length: "10",
          disabled: true,
          validation: "",
        },
        manejo: {
          id: "manejo",
          label: "Manejo",
          value: "",
          max_length: "10",
          disabled: true,
          validation: "",
        },
        estado: {
          id: "estado",
          label: "Estado",
          value: "",
          max_length: "10",
          disabled: true,
          validation: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters({ list: "ciudad/list", get: "formularios/get" }),
  },
  created() {},
  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      obtenerDepartamentos: "ciudad/obtenerDepartamentos",
      get_ciudad_impresion: "ciudad/getCiudadImpresion",
      getDepartamento: "ciudad/getDepartamento",
      getCiuDptPais: "ciudad/getCiuDptPais",
      getCiudad: "ciudad/getCiudad",

      /* ciudad */
    }),
    async abrirTablaBusqueda() {
      let f8 = this.f8;
      let enCaja = this.get("enCaja");
      let desde = 0;
      let cantidad = 9;
      this.offField();
      switch (enCaja.busqueda) {
        case "DPT":
          let data = await this.getCiuDptPais({ desde, cantidad });
          if (data.status != -1) {
            f8.estado = true;
            f8.headers = ["Código", "Ciudad", "Departamento", "País"];
            f8.body = this.list("list_efeochos").slice(0, 8);
          }
          break;
      }
    },
    async next_data(data) {
      let f8 = this.f8;
      let filtro = f8.buscar;
      let cantidad = 9;
      let desde = 0;
      const max = this.list("list_efeochos");
      switch (data) {
        case "adelante":
          if (max.length === 9) {
            f8.nroPeticion += 1;
            desde = cantidad * f8.nroPeticion - 1 * f8.nroPeticion;
            this.siguiente_validacion(desde, cantidad, filtro);
          }
          break;
        case "atras":
          desde = cantidad * (f8.nroPeticion - 1) - 1 * (f8.nroPeticion - 1);
          if (desde >= 0) {
            f8.nroPeticion -= 1;
            this.siguiente_validacion(desde, cantidad, filtro);
          }
          break;
        case "filtro":
          this.siguiente_validacion(desde, cantidad, filtro);
          break;
        default:
          this.siguiente_validacion(desde, cantidad, filtro);
          break;
      }
    },
    async siguiente_validacion(desde, cantidad, filtro) {
      let key = this.get("enCaja").busqueda;
      switch (key) {
        case "DPT":
          let res = await this.getCiuDptPais({ desde, cantidad, filtro });
          if (res.msg && filtro != "") {
            document.getElementById("buscar").focus();
            return this.CON851("01", "info", "ningún dato");
          } else if (res.status != -1) {
            this.f8.body = this.list("list_efeochos").slice(0, 8);
          }
          break;
        default:
          break;
      }
    },
    selected_row(item) {
      this.f8.estado = false;
      switch (this.get("enCaja").busqueda) {
        case "DPT":
          this.dpt_seleccionar_fila(item);
          break;
      }
    },
    async dpt_seleccionar_fila(item) {
      this.form.tipo.value = item.codCiu.dpt + item.codCiu.ciu;
      this.dptValidacion();
    },
    async dptValidacion() {
      this.setDialogType("input");
      if (["*", "**", "***", "****", "*****"].includes(this.form.tipo.value)) {
        this.form.tipo.value = this.form.tipo.value.padStart(5, "*");
        this.form.tipo.dataCard.value = "Todas las Ciudades";
        this.setDialogType("done");
        return this.abrirDialogo();
      }
      this.form.tipo.value = this.form.tipo.value.padStart(5, 0);
      let codigo = this.form.tipo.value;
      let data = {
        dpt: codigo.slice(0, 2),
        ciu: codigo.slice(2),
      };
      let res = await this.getCiudad(data);
      let res_dpt = await this.getDepartamento(data.dpt);

      if (![res.status, res_dpt.status].includes(-1)) {
        this.offField();
        this.llenarCamposCiudad(res);
        this.setDialogType("done");
        this.abrirDialogo();
      }
      res.msg && this.CON851("01", "error", ` ${codigo.value} de ciudad`);
      res_dpt.msg && this.CON851("01", "error", ` ${data.dpt} de departamento`);
    },
    async llenarCamposCiudad(codCiu) {
      this.form.tipo.value = codCiu.codCiu.dpt + codCiu.codCiu.ciu;
      this.form.tipo.dataCard = codCiu.nombre;
      try {
        this.onField();
      } catch (error) {
        console.error(error);
      }
    },
    cerrarTablaBusqueda() {
      this.f8.estado = false;
      setTimeout(() => {
        this.onField();
      }, 100);
    },

    abrirDialogo() {
      this.offField();
      setTimeout(() => {
        this.alerta.estado = true;
      }, 1);
      let dialogType = this.get("dialogType");
      switch (dialogType) {
        case "input":
          this.CON851("02", "error");
          break;
        case "salir":
          this.CON851("MENU", "warning", "", "p");
          break;
        case "done":
          this.CON851("00", "info", this.tipo_impresion.text, "P");
      }
    },

    async confirmar() {
      try {
        let dialogType = this.get("dialogType");
        switch (dialogType) {
          case "salir":
            this.$router.push("/Menu-Principal");
            break;
          case "done":
            this.imprimirCiudad();
            break;
        }
        this.firstField(this.form);
      } catch (error) {
        console.error(error);
      }
    },

    async imprimirCiudad() {
      console.log("HOLA BEBE LEAN");
      this.cerrar_CON851();

      console.time("Consultando ciudades");
      let info_usunet = {
        nombre: "GRUPO EMPRESARIAL S.A.S",
        nit: "NIT 900.199.958",
        titulo: "CATALOGO DE CIUDADES",
        opcion: "5.C",
      };
      let logo = "";

      try {
        logo = await image_base64(require(`../../assets/image/pensador.png`));
      } catch (e) {
        console.error(e);
      }
      /*  */
      let dpt = this.form.tipo.value.slice(0, 2);

      const res = await this.get_ciudad_impresion({
        dpt,
      });
      /*  */

      if (this.tipo_impresion.acceso == 1) {
        setTimeout(() => {
          informe_ciudades(res, res.length, info_usunet, logo);
        }, 2000);
      } else if (this.tipo_impresion.acceso == 2) {
        setTimeout(() => {
          informe_ciudades_excel(res);
        }, 2000);
      }
    },

    impresionSelec(data) {
      console.log(data);
      switch (data.acceso) {
        case "F":
          this.$router.push("/Menu-Principal");
          break;
        default:
          this.tipo_impresion.icono = data.icono;
          this.tipo_impresion.acceso = data.acceso;
          this.tipo_impresion.text = data.text;
          this.tipo_impresion.color = data.color;
          this.ocultarImpresion();
          setTimeout(() => {
            this.firstField(this.form);
          }, 100);
          break;
      }
    },

    ocultarImpresion() {
      this.modal_impresion = false;
    },
    abrirImpresion() {
      this.modal_impresion = true;
    },
    cancelarAlerta() {
      setTimeout(() => {
        this.onField();
      }, 100);
      this.cerrar_CON851();
    },
    cerrarDialogo() {
      this.firstField(this.form);
      this.cerrar_CON851();
    },
  },
};
</script>
