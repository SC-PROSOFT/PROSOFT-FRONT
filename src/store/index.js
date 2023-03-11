import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import impresion301 from "./modulos/impresion301";
import formularios from "./modulos/formularios";
import envioemail from "./modulos/envioemail";
import dianhabil from "./modulos/dianhabil";
import favorito from "./modulos/favorito";
import archivos from "./modulos/archivos";
import depremi from "./modulos/depremi";
import holding from "./modulos/holding";
import remidep from "./modulos/remidep";
import rescorr from "./modulos/rescorr";
import unifun from "./modulos/unifun";
import sesion from "./modulos/sesion";
import server from "./modulos/server";
import auxtip from "./modulos/auxtip";
import COR304 from "./modulos/COR304";
import serco from "./modulos/serco";
import depco from "./modulos/depco";
import tipco from "./modulos/tipco";
import cargo from "./modulos/cargo";
import terce from "./modulos/terce";
import macro from "./modulos/macro";
import usuar from "./modulos/usuar";
import oper from "./modulos/oper";
import corr from "./modulos/corr";
import descorr from "./modulos/descorr";
import image from "./modulos/image";
import usuario from "./modulos/usuario";
import servidor from "./modulos/servidor";

export default new Vuex.Store({
  state: {
    empresa: sessionStorage.USUARIO_GLOBAL
      ? JSON.parse(sessionStorage.USUARIO_GLOBAL)[0].nombre
      : "",
    spinnerConfig: {
      name: "",
      textProgressValues: {
        waitingData: "",
        downloadingData: "",
        generateDocument: "",
      },
      showLoadingBar: false,
    },
    isLoading: false,
    CON851: {},
    acceso: false,
    downloadProgress: 0,
    cantidad: 0,
  },

  getters: {
    getSpinnerConfig(state) {
      return state.spinnerConfig;
    },
    estadoLoading(state) {
      return state.isLoading;
    },
    getDownloadProgress(state) {
      return state.downloadProgress;
    },
    getCantidad(state) {
      return state.cantidad;
    },
    CON851(state) {
      return state.CON851;
    },
  },

  mutations: {
    spinnerConfig(state, spinnerConfig) {
      state.spinnerConfig = spinnerConfig;
    },
    isLoading(state) {
      state.isLoading = !state.isLoading;
    },
    startDownload(state, downloadStatus) {
      state.startDownload = downloadStatus;
    },
    downloadProgress(state, progress) {
      state.downloadProgress = progress;
    },
    cantidad(state, data) {
      state.cantidad = data;
    },
    CON851(state, [code, tipo, descrip, func1]) {
      state.CON851 = { code, tipo, descrip, func1 };
    },
    CON851_DELETE(state) {
      state.CON851 = "";
    },
  },

  modules: {
    impresion301,
    formularios,
    envioemail,
    dianhabil,
    archivos,
    favorito,
    remidep,
    holding,
    rescorr,
    depremi,
    sesion,
    COR304,
    auxtip,
    unifun,
    server,
    depco,
    serco,
    usuar,
    tipco,
    cargo,
    terce,
    macro,
    oper,
    corr,
    descorr,
    image,
    usuario,
    servidor,
  },
});
