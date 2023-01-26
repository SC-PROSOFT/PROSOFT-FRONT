<template>
  <v-card>
    <v-toolbar color="primary">
      <h2 class="text-center white--text">Modulos {{ `de ${modulos.nombre}` }}</h2>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="white" class="botone" @click="$emit('cerrar')">
        <v-icon color="primary" size="40" dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table height="300px" hide-default-footer :headers="header_modulos" :items="array_modulos('modulos_x_oper')">
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
import { global } from "../../mixins/global";
import LottieAnimation from "lottie-web-vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TABLAMODULOS",
  mixins: [global],
  props: {
    modulos: {
      contab: String,
      modulos: Array,
    },
  },
  components: { LottieAnimation },
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
  computed: {
    ...mapGetters({
      array_modulos: "oper/getLista",
    }),
  },
  watch: {},
  mounted() {
    this.traerModulos();
  },
  methods: {
    ...mapActions({
      _getModulos: "server/_getModulos",
      _putModulosPorOper: "oper/_putModulosPorOper",
    }),
    async traerModulos() {
      const RES = await this._getModulos();
    },
    async prueba(item) {
      const data = {
        llave: this.modulos.llaveOper,
        codModulo: item.cod,
        estado: item.estado,
      };
      const RES = await this._putModulosPorOper({ data });
      RES.N1 && this.CON851("PNZ", "success", `${item.estado ? "Modulo asignado" : "Modulo eliminado"}`, null, this.cerrar_CON851);
      RES.msg && this.CON851("PNZ", "error", "Algo salio mal intentelo de nuevo", null, this.cerrar_CON851);
    },
  },
};
</script>
