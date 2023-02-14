<template>
  <v-dialog v-model="config_modulos.estado" persistent>
    <v-card>
      <v-toolbar color="primary" class="white--text">
        <h1>Gestión de modulos</h1>
        <v-spacer></v-spacer>
        <v-btn text icon class="botone" @click="config_modulos.estado = false">
          <v-icon color="white">mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row class="my-2">
          <v-col cols="4">
            <v-text-field
              append-icon="mdi-magnify"
              label="Buscar modulo"
              class="elevation-10"
              v-model="search"
              hide-details
              single-line
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="text-end">
            <v-btn color="primary" class="botone" @click="opcCrearModulo()">agregar <v-icon>mdi-plus</v-icon></v-btn>
          </v-col>
          <v-col cols="12">
            <v-data-table :search="search" class="elevation-12" :headers="header_modulos" :items="modulos">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon color="orange" small class="mr-2" @click="opcEditarModulo(item)"> mdi-pencil </v-icon>
                <v-icon color="red" small class="mr-2" @click="opcEliminarModulo(item)"> mdi-delete </v-icon>
              </template>
              <template v-slot:no-data>
                <lottie-animation
                  :animationData="require('@/assets/image/no_found.json')"
                  style="height: 180px; width: 300px"
                  class="text-center mx-auto"
                  :autoPlay="true"
                  :loop="true"
                  :speed="2"
                  ref="anim"
                />
                <h2>No hay modulos</h2>
              </template></v-data-table
            >
          </v-col>
        </v-row>
        <v-dialog v-model="show_modulo" max-width="500">
          <v-card>
            <v-toolbar color="primary">
              <h1 class="text-center white--text">{{ titulo }}</h1>
            </v-toolbar>
            <v-container>
              <v-row class="mt-4 mb-2">
                <v-col cols="4">
                  <v-text-field
                    @input="form.cod = form.cod.toUpperCase()"
                    class="elevation-10"
                    v-model="form.cod"
                    label="Codigo "
                    maxlength="3"
                    hide-details
                    single-line
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    @input="form.descripcion = form.descripcion.toUpperCase()"
                    v-model="form.descripcion"
                    label="Descripción"
                    class="elevation-10"
                    maxlength="20"
                    hide-details
                    single-line
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mb-0 pb-0">
                  <div class="text-center">
                    <v-btn color="red" class="mx-1 white--text" @click="show_modulo = false"> Cancelar </v-btn>
                    <v-btn color="green" class="mx-1 white--text" @click="confirmar()"> Guardar </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-dialog
        >
      </v-container>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @salirEsc="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-dialog>
</template>
<script>
import LottieAnimation from "lottie-web-vue";
import { global } from "../../mixins/global";
import { mapActions } from "vuex";

export default {
  props: {
    config_modulos: Object,
  },
  mixins: [global],
  components: { LottieAnimation },
  data() {
    return {
      estado: false,
      search: "",
      modulo: null,
      modulos: [],
      form: {
        cod: "",
        descripcion: "",
      },
      novedad: "",
      show_modulo: false,
      header_modulos: [
        {
          text: "Modulo",
          align: "center",
          sortable: true,
          value: "cod",
        },
        {
          text: "Descripción modulo",
          align: "center",
          sortable: true,
          value: "descripcion",
        },
        {
          text: "Opción",
          align: "center",
          sortable: true,
          value: "actions",
        },
      ],
      index: null,
    };
  },
  computed: {
    titulo() {
      return this.novedad == 7 ? "Agregar modulo" : "Editar modulo";
    },
  },
  mounted() {
    this.cargarModulos();
  },
  methods: {
    ...mapActions({
      _getModulos: "server/_getModulos",
      _deleteModulo: "server/_deleteModulo",
      _addModulo: "server/_addModulo",
      _editModulo: "server/_editModulo",
    }),
    cancelarAlerta() {
      this.novedad = "";
      this.show_modulo = "";
      this.cerrar_CON851();
      location.reload();
    },
    async cargarModulos() {
      const RES = await this._getModulos();
      if (!RES.msg) this.modulos = RES;
    },
    opcCrearModulo() {
      this.form = {};
      this.novedad = 7;
      this.show_modulo = true;
    },
    opcEditarModulo(item) {
      this.form = item;
      this.modulo = item;
      this.show_modulo = true;
      this.novedad = 8;
    },
    opcEliminarModulo(item) {
      this.index = this.modulos.indexOf(item);
      this.modulo = item;
      this.novedad = 9;
      this.CON851("PNZ", "warning", "¿Seguro que desea eliminar este modulo?", "P");
    },
    confirmar() {
      this.cerrar_CON851();
      switch (this.novedad) {
        case 7:
          this.crearModulo();
          break;
        case 8:
          this.editarModulo();
          break;
        case 9:
          this.eliminarModulo();
          break;
      }
    },
    async crearModulo() {
      const RES = await this._addModulo({ data: this.form });
      if (RES.N1) {
        this.CON851("N1", "success", "Modulo creado correctamente", null, () => {
          this.modulos.push(this.form);
          this.cancelarAlerta();
        });
      }
      RES.msg && this.CON851("N1", "error", "Modulo no se creo correctamente");
    },
    async editarModulo() {
      const data = {
        cod: this.modulo.cod,
        descripcion: this.form.descripcion,
      };
      const RES = await this._editModulo({ data });
      console.log(RES,"RES MODULOS")
      if (RES.N1) {
        const RES = await this._getModulos();
        if (!RES.msg) this.modulos = RES;
        this.CON851("N1", "success", "Modulo editado correctamente", null, () => {
          this.cancelarAlerta();
        });
      }

      RES.msg && this.CON851("N1", "error", "Modulo no se creo correctamente");
    },

    async eliminarModulo() {
      const RES = await this._deleteModulo({ modulo: this.modulo.cod });
      if (RES.N1) {
        this.modulos.splice(this.index, 1);
        this.CON851("N1", "success", "Modulo eliminado correctamente", null, () => {
          this.cancelarAlerta();
        });
      }
      RES.msg && this.CON851("N1", "error", "Este modulo no se elimino");
    },
  },
};
</script>
