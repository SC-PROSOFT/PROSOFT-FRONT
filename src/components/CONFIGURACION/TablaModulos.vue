<template>
  <v-card>
    <v-toolbar color="primary">
      <h2 class="text-center white--text" v-if="modulos.contab">Modulos {{ `de ${modulos.contab}` }}</h2>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="white" class="botone" @click="config_modulos.estado = true">
        <v-icon color="primary">mdi-bookmark-plus-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table height="300px" hide-default-footer :headers="header_modulos" :items="modulos.modulos">
      <template v-slot:item.estado="{ item }">
        <v-checkbox class="py-0 my-0" @click="prueba(item)" v-model="item.estado"></v-checkbox>
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
        <h2>No has seleccionado ningún modulo</h2>
      </template>
    </v-data-table>
    <CONFIGMODULOS :config_modulos="config_modulos" v-if="config_modulos.estado" />
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @confirmar="confirmar()"
      @cancelar="cancelar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    />
  </v-card>
</template>

<script>
import CONFIGMODULOS from "./ConfigModulos.vue";
import { global } from "../../mixins/global";
import LottieAnimation from "lottie-web-vue";
import { mapActions } from "vuex";
export default {
  name: "TABLAMODULOS",
  mixins: [global],
  props: {
    modulos: {
      contab: String,
      modulos: Array,
    },
  },
  components: { LottieAnimation, CONFIGMODULOS },
  data() {
    return {
      config_modulos: {
        estado: false,
      },
      header_modulos: [
        {
          text: "Modulo",
          align: "center",
          sortable: true,
          value: "cod",
        },
        {
          text: "Descripción modulo",
          aling: "center",
          sortable: true,
          value: "descripcion",
        },
        { text: "Opción", value: "estado", sortable: false },
      ],
    };
  },
  watch: {
    "config_modulos.estado": {
      handler: function (val, oldVal) {},
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      _editEstadoModulo: "server/_editEstadoModulo",
    }),
    async prueba(item) {
      const data = {
        contab: this.modulos.contab,
        modulo: item.cod,
        estado: item.estado,
      };

      const RES = await this._editEstadoModulo({ data });
      if (RES.msg) {
        this.CON851("PNZ", "info", "No existe ninguna configuración inicial");
      }
    },
  },
};
</script>
