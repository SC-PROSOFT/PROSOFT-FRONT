<template>
    <v-dialog v-model="config.estado" width="700">
      <v-card width="700">
        <v-toolbar color="primary">
          <h1 class="white--text">Dirección IP y Módulo</h1>
          <v-spacer></v-spacer>
          <v-btn dark @click="cerrar" class="botone" color="primary" fav> <v-icon color="white">mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-container>
          <v-row justify="center" class="mt-4">
            <INPUT_ class="col-12 col-sm-12 col-md-6 col-xs-6" :field="form.ip" v-model="configuracion.ip" />
            <AUTOCOMPLETE_ :items="modulos" class="col-12 col-sm-12 col-md-6 col-xs-6" :field="form.modulo" v-model="configuracion.modulo" />
            <INPUT_ class="col-12 col-sm-12 col-md-6 col-xs-6" :field="form.sucursal" v-model="configuracion.sucursal" />
            <INPUT_ class="col-12 col-sm-12 col-md-6 col-xs-6" :field="form.id_maquina" v-model="configuracion.id_maquina" />
          </v-row>
          <v-row justify="end" class="my-4">
            <v-btn @click="cerrar" class="mx-1" color="error">cerrar</v-btn>
            <v-btn @click="guardar" class="mr-3" color="success">guardar</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapActions, mapMutations } from "vuex";
  import { global} from "@/mixins/global";
  export default {
    mixins: [global],
    props: { config: Object },
    data() {
      return {
        form: {
          ip: {
            id: "ip",
            label: "Ip servidor",
            tipo: "ip",
            maxlength: "15",
            campo_abierto: true,
          },
          modulo: {
            id: "modulo",
            label: "Modulos",
            item_value: "COD",
            item_text: "text",
            campo_abierto: true,
          },
          sucursal: {
            ip: "sucursal",
            label: "Sucursal",
            maxlength: "2",
            placeholder: "01",
            campo_abierto: true,
          },
          id_maquina: {
            id: "id_maquina",
            label: "Id maquina",
            maxlength: "10",
  
            campo_abierto: true,
          },
        },
        configuracion: {
          ip: "",
          modulo: "",
          sucursal: "",
          id_maquina: "",
        },
        modulos: [],
      };
    },
  
    mounted() {
      this.modulos = this.config.modulos;
      this.configuracion.ip = localStorage.IP || "";
      this.configuracion.modulo = localStorage.Modulo || "";
      this.configuracion.sucursal = localStorage.sucursal || "";
      this.configuracion.id_maquina = localStorage.id_maquina || "";
    },
    methods: {
      ...mapMutations({ CON851: "CON851" }),
  
      cerrar() {
        this.$emit("cerrar");
      },
      guardar() {
        this.$emit("guardar", this.configuracion);
      },
    },
  };
  </script>
  