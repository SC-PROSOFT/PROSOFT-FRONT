<template>
  <v-container class="mt-4" fluid>
    <form-titulo :titulo="titulo" @salir="abrirDialogo"></form-titulo>
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="10">
          <v-alert color="primary" border="left" elevation="2" colored-border icon="mdi-information">
            Digite el numero de radicado y precione f2 para realizar la busqueda del anexo.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col cols="12" sm="3" md="3" xs="3" class="input-col">
          <INPUT
            @next-action="nextStep(form, $event, abrirDialogo, abrirDialogo)"
            :field="form.nro_radicado"
            @alerta="abrirDialogo"
            @f8="abrirTablaBusqueda"
          ></INPUT>
        </v-col>
      </v-row>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
    <TABLE
      @selected-row="selected_row($event)"
      @cerrar="cerrarTablaBusqueda"
      @next-data="nextData"
      v-if="f8.estado"
      :f8="f8"
    ></TABLE>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global } from "../../mixins/global";

export default {
  mixins: [nextAction, global],
  data() {
    return {
      titulo: "1.1 Actualiza Dptos o Servicios",
      f8: {
        estado: false,
        headers: [],
        body: [],
        nroPeticion: 0,
        buscar: "",
      },
      form: {
        nro_radicado: {
          id: "nro_radicado",
          label: "Numero de radicado",
          max_length: "10",
          tipo: "number",
          value: "",
          disabled: true,
          f8: true,
          busqueda: "cod",
          validation: this.enterCod,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      get: "formularios/get",
      _getListaMotcn: "motcn/getLista",
    }),
  },
  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _getMotcnF8: "motcn/f8_motcn",
      _getMotcn: "motcn/get_motcn",
      _postMotcn: "motcn/post_motcn",
      _putMotcn: "motcn/edit_motcn",
      _deleteMotcn: "motcn/delete_motcn",
    }),

    abrirDialogo() {
      this.cerrar_CON851();
      let dialogType = this.get("dialogType");
      const { id } = this.get("enCaja");
      this.offField();

      switch (dialogType) {
        case "input":
          this.CON851("02", "info");
          break;
        case "salir":
          setTimeout(() => {
            this.CON851("MENU", "warning", "", "P");
          }, 100);
          break;
        case "done":
          if (this.desicion.acceso == 7) {
            /* switch anidado */
            switch (id) {
              case "descripcion":
                this.CON851(
                  "personalizada",
                  "info",
                  `¿ Seguro que desea crear el motivo "${this.form.descripcion.value}" con clase (${this.form.opcion.value}) y codigo (${this.form.cod.value}) ?`,
                  "p"
                );
                break;

              default:
                break;
            }
          } else if (this.desicion.acceso == 8) {
            /* switch anidado */
            switch (id) {
              case "descripcion":
                this.CON851(
                  "personalizada",
                  "info",
                  `¿ Seguro que desea cambiar la descripcion de clase (${this.form.opcion.value}) y código ${this.form.cod.value} por "${this.form.descripcion.value}"?`,
                  "p"
                );
                break;

              default:
                break;
            }
          } else if (this.desicion.acceso == 9) {
            /* switch anidado */
            switch (id) {
              case "cod":
                console.log("LLEGAMOS");
                this.CON851(
                  "personalizada",
                  "info",
                  `¿Seguro que desea eliminar el código ${this.form.cod.value} ${this.form.descripcion.value}?`,
                  "P"
                );
                break;

              default:
                break;
            }
          } else {
            this.CON851("personalizada", "error", "Error desconocido, por favor contacte con PROSOFT.");
          }
      }
    },

    async abrirTablaBusqueda() {
      console.log("Entrandoooo a abarir tabla");
      let f8 = this.f8;
      let filtro = this.f8.buscar;
      let enCaja = this.get("enCaja");
      let desde = 0;
      let cantidad = 9;
      this.offField();

      switch (enCaja.busqueda) {
        case "cod":
          const res = await this._getMotcnF8({ desde, cantidad, filtro });

          f8.headers = [
            {
              title: "Motivo",
              body_conector: "llave",
            },
            {
              title: "Descripción",
              body_conector: "descrip",
            },
          ];

          f8.body = this._getListaMotcn("lista_efeocho").slice(0, 8);
          res.status == -1 ? (f8.estado = false) : (f8.estado = true);
          break;
      }
    },

    async nextData(data) {
      console.log(data);
      let f8 = this.f8;
      let filtro = f8.buscar;
      let enCaja = this.get("enCaja");
      let cantidad = 9;
      let desde = 0;

      switch (enCaja.busqueda) {
        case "cod":
          switch (data) {
            case "adelante":
              if (this._getListaMotcn("lista_efeocho").length === 9) {
                f8.nroPeticion += 1;
                desde = cantidad * f8.nroPeticion - 1 * f8.nroPeticion;
                this.nextDataValidation(desde, cantidad, filtro);
              }
              break;
            case "atras":
              desde = cantidad * (f8.nroPeticion - 1) - 1 * (f8.nroPeticion - 1);
              if (desde >= 0) {
                f8.nroPeticion -= 1;
                this.nextDataValidation(desde, cantidad, filtro);
              }
              break;
            case "filtro":
              console.log(filtro);
              this.nextDataValidation(desde, cantidad, filtro);
              break;
            default:
              this.nextDataValidation(desde, cantidad, filtro);
              break;
          }
          break;
      }
    },

    async nextDataValidation(desde, cantidad, filtro) {
      switch (this.get("enCaja").busqueda) {
        case "cod":
          await this._getMotcnF8({ desde, cantidad, filtro });
          this.f8.body = this._getListaMotcn("lista_efeocho").slice(0, 8);
          break;

        default:
          break;
      }
    },
    async selected_row(item) {
      this.f8.estado = false;
      console.log(item);
      console.log("Entrandoooo a encaja", this.get("enCaja").busqueda);
      switch (this.get("enCaja").busqueda) {
        case "cod":
          if (this.desicion.acceso == 7) {
            console.log("Entrandoooo al select row 7");
            this.form.cod.value = item.llave.cod;
            this.form.descripcion.value = item.descrip;
            this.onField();
          }
          if (this.desicion.acceso == 8) {
            console.log("Entrando al 8");
            this.form.cod.value = item.llave.cod;
            this.form.descripcion.value = item.descrip;
            this.onField();
          }
          if (this.desicion.acceso == 9) {
            this.form.cod.value = item.llave.cod;
            this.form.descripcion.value = item.descrip;
            this.onField();
          }
          break;
        default:
          break;
      }
    },

    cerrarTablaBusqueda() {
      console.log("Entrandoooo a cerrar tabla busqueda");
      this.f8.estado = false;
      setTimeout(() => {
        this.onField();
      }, 100);
    },

    async confirmar() {
      console.log("Entrandoooo a confirmar");
      this.cerrar_CON851();
      let dialogType = this.get("dialogType");
      switch (dialogType) {
        case "input":
          this.onField();
          break;
        case "salir":
          this.$router.push("/Menu-Principal");
          break;
        case "done":
          switch (this.desicion.acceso) {
            case 7:
              console.log("Entrandoooo a guardar 7 confirmar");
              this.guardar();
              break;
            case 8:
              this.editar();
              break;
            case 9:
              this.eliminar();
              break;
          }
          break;
      }
    },

    async guardar() {
      console.log("Entrandoooo a guardar funcion");
      let data = {
        llave: {
          clase: this.form.opcion.value,
          cod: this.form.cod.value,
        },
        descrip: this.form.descripcion.value,
      };
      try {
        const res = await this._postMotcn(data);
        console.log("Entrandoooo a guardar funcion entre a try");
        console.log(res);

        switch (res.N1) {
          case "guardado":
            console.log("entre al case");
            this.CON851(
              "N1",
              "success",
              `${this.form.descripcion.value} con codigo ${this.form.opcion.value}${this.form.cod.value} guardado`
            );
            break;

          default:
            break;
        }
      } catch (error) {
        console.log("Entrandoooo a guardar funcion entre a catch");
      }
    },

    async eliminar() {
      let data = {
        llave: {
          clase: this.form.opcion.value,
          cod: this.form.cod.value,
        },
      };
      console.log("Esta es la data de eliminar ", data);
      try {
        const res = await this._deleteMotcn(data);
        console.log("elimine2: ", res);

        switch (res.N1) {
          case "eliminado":
            console.log("elimine3");
            this.CON851(
              "N1",
              "success",
              `${this.form.descripcion.value} con codigo ${this.form.opcion.value}${this.form.cod.value} eliminado`
            );
            break;
          default:
            break;
        }
      } catch (error) {}
    },

    async editar() {
      const data = {
        descrip: this.form.descripcion.value,
      };

      try {
        const res = await this._putMotcn({
          clase: this.form.opcion.value,
          codigo: this.form.cod.value,
          data,
        });
        console.log("Saliendo del try de editar");
        switch (res.N1) {
          case "editado":
            this.CON851(
              "N1",
              "success",
              `${this.form.descripcion.value} con codigo ${this.form.opcion.value}${this.form.cod.value} editado`
            );
            break;

          default:
            break;
        }
      } catch (error) {}
    },

    cancelar() {
      setTimeout(() => {
        this.onField();
      }, 100);
      this.cerrar_CON851();
    },

    cancelarAlerta() {
      let dialogType = this.get("dialogType");
      switch (dialogType) {
        case "input":
          if ([7, 8, 9].includes(this.desicion.acceso)) {
            this.cerrar_CON851();
            this.onField();
          }
          break;
        case "done":
          if ([7, 8, 9].includes(this.desicion.acceso)) {
            this.cerrar_CON851();
            this.abrirNovedad();
          }
          break;
        default:
          this.cerrar_CON851();
          if (this.f8.estado == true) {
            setTimeout(() => {
              return document.getElementById("buscar").focus();
            }, 100);
          } else this.onField();
          break;
      }
    },

    abrirNovedad() {
      console.log("Entrandoooo a abrir novedad");
      this.clean_form(this.form);
      this.novedadActiva = true;
      this.offField();
    },

    //Enter functions

    enterDescrip() {
      console.log("Entrandoooo a enter function descrip");
      switch (this.desicion.acceso) {
        case 7:
          this.setDialogType("done");
          this.abrirDialogo();

          break;
        case 8:
          this.setDialogType("done");
          this.abrirDialogo();
          this.editar();
          break;
        case 9:
          this.eliminar();
          break;

        default:
          break;
      }
    },

    async enterCod() {
      console.log("Entrandoooo a enter function cod");
      const data = {
        clase: this.form.opcion.value,
        cod: this.form.cod.value,
      };
      const res = await this._getMotcn(data);
      console.log("getMotcn: ", res);
      switch (this.desicion.acceso) {
        case 7:
          if (res && res.cod_error == "01") {
            this.focusInput(this.form, "descripcion");
          } else if (res.llave) {
            this.CON851("personalizada", "info", `El código ${this.form.cod.value} ya existe`);
          } else {
            this.CON851("personalizada", "error", `Error desconocido porfavor contacte con PROSOFT`);
          }
          break;

        case 8:
          if (res && res.cod_error != "01") {
            console.log("Entrando case 8 if", res);
            this.form.descripcion.value = res.descrip;
            this.focusInput(this.form, "descripcion");
            console.log("Saliendo case 8 if");
          } else if (res && res.cod_error == "01") {
            // console.log("Entrando case 8 elseee if")
            this.CON851("personalizada", "info", `El código ${this.form.cod.value} no existe`);
          } else {
            this.CON851("personalizada", "error", `Error desconocido porfavor contacte con PROSOFT`);
          }

        case 9:
          if (res && res.cod_error != "01") {
            console.log("Entrando case 9 if", res);
            this.form.descripcion.value = res.descrip;
            this.setDialogType("done");
            this.abrirDialogo();
          } else if (res && res.cod_error == "01") {
            this.CON851("personalizada", "info", `El código ${this.form.cod.value} no existe`);
          } else {
            this.CON851("personalizada", "error", `Error desconocido porfavor contacte con PROSOFT`);
          }

        default:
          break;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.firstField(this.form);
    }, 100);
  },
};
</script>
