<template>
  <v-card>
    <v-toolbar color="primary">
      <h2 class="text-center white--text">Contabilidades</h2>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab v-bind="attrs" v-on="on" dark small color="white" class="botone" @click="modalAgregarContab()">
            <v-icon color="primary">mdi-book-plus-multiple</v-icon>
          </v-btn>
        </template>
        <span>Añadir nueva contabilidad</span>
      </v-tooltip>
    </v-toolbar>
    <v-data-table height="300px" hide-default-footer :headers="header_contab" :items="contabilidades">
      <template v-slot:[`item.index`]="{ item, index }"> {{ index + 1 }} </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="red" small class="mr-2" @click="opcEliminarContab(item)"> mdi-delete </v-icon>
        <v-icon color="primary" small class="mr-2" @click="verModulos(item)"> mdi-eye </v-icon>
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
        <h2>No hay contabilidades</h2>
      </template>
    </v-data-table>
    <v-dialog v-model="show_contab" max-width="300px">
      <v-card>
        <v-card-title class="mx-auto">
          <h3 class="primary--text text-center mx-auto">
            {{ titulo }}
          </h3>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-text-field
            @input="contab = contab.toUpperCase()"
            @keyup.enter="opcAgregarContab()"
            label="Contabilidad"
            v-model="contab"
            autofocus
            outlined
            dense
          ></v-text-field>
        </v-card-text>

        <div class="text-center">
          <v-btn color="red" class="mb-2" text @click="closeModal()"> Cancelar </v-btn>
          <v-btn color="green" class="mb-2" text @click="opcAgregarContab()"> Guardar </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @salirEsc="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      v-if="alerta.estado"
      :alerta="alerta"
    ></CON851>
  </v-card>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
import { global } from "../../mixins/global";
import { mapActions } from "vuex";
export default {
  name: "TABLACONTAB",
  props: {
    contabilidades: Array,
  },
  components: { LottieAnimation },
  mixins: [global],
  data() {
    return {
      show_contab: false,

      contab: "",
      header_contab: [
        {
          text: "",
          align: "center",
          sortable: true,
          value: "index",
        },
        {
          text: "Contabilidad",
          align: "center",
          sortable: true,
          value: "contab",
        },
        {
          text: "Opción",
          align: "center",
          sortable: true,
          value: "actions",
        },
      ],
      novedad: "",
      index: "",
    };
  },
  computed: {
    titulo() {
      return this.novedad === 7 ? "Nueva Contabilidad" : "Modificar Contabilidad";
    },
  },
  methods: {
    ...mapActions({
      _addContab: "server/_addContab",
      _deleteContab: "server/_deleteContab",
      _getConfig: "server/_getConfig",
    }),
    closeModal() {
      this.show_contab = false;
      this.contab = "";
      this.novedad = "";
    },
    verModulos(item) {
      this.$emit("verModulos", item);
    },
    opcAgregarContab() {
      this.CON851("CONFI-07", "warning", null, "P");
    },
    modalAgregarContab() {
      this.novedad = 7;
      this.show_contab = true;
    },
    opcEditarContab(item) {
      this.novedad = 8;
      this.show_contab = true;
      this.contab = item.contab;
    },
    opcEliminarContab(item) {
      this.novedad = 9;
      this.index = this.contabilidades.indexOf(item);
      this.contab = item.contab;
      this.CON851("CONFI-01", "warning", null, "P");
    },
    cancelarAlerta() {
      this.closeModal();
      this.cerrar_CON851();
    },
    confirmar() {
      switch (this.novedad) {
        case 7:
          this.guardarContab();
          break;
        case 8:
          this.editarContab();
          break;
        case 9:
          this.eliminarContab();
          break;
      }
    },
    async guardarContab() {
      const RES = await this._addContab({ contab: this.contab });
      if (RES.N1) {
        let resp = await this._getConfig();
        this.contabilidades.push(resp.contab[resp.contab.length - 1]);
        this.CON851("N1", "success", "Contabilidad agregada correctamente");
      }
      RES.msg == "contab-01" && this.CON851("N1", "info", `Ya existe la contabilidad ${this.contab}`);
      RES.msg && this.CON851("PNZ", "info", "No existe ninguna configuración inicial");
      this.cancelarAlerta();
    },
    async editarContab() {
      const RES = await this._addContab({ contab: this.contab });
      if (RES.N1) {
        let resp = await this._getConfig();
        this.contabilidades.push(resp.contab[resp.contab.length - 1]);
        this.CON851("N1", "success", "Contabilidad agregada correctamente");
      }
      this.cancelarAlerta();
    },
    async eliminarContab() {
      const RES = await this._deleteContab({ contab: this.contab });
      if (RES.N1) {
        this.contabilidades.splice(this.index, 1);
        this.CON851("N1", "success", "Contabilidad eliminada correctamente");
      }
      this.cancelarAlerta();
    },
  },
};
</script>
