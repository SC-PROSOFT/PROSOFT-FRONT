import { data, post } from "jquery";
import postData from "../../postData";

export default {
  namespaced: true,
  state: {
    lista: [],
  },
  getters: {
    getLista: (state) => (lista) => state[lista],
  },
  mutations: {
    modificarLista(state, data) {
      state[data.lista] = data.res;
    },
  },
  actions: {
    async _getRescorr({ commit }, { radi_ano, radi_numero }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          /* url: `corr864/${radi_ano}/${radi_numero}`, */
          url: `getResLlave/${radi_ano}/${radi_numero}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_getCorr864", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getUltRescorr({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: "ultRescorr",
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _postRescorr({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: "rescorr",
          method: "POST",
          data: data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _putRescorr({ commit }, { radi_ano, radi_numero, data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `rescorr/${radi_ano}/${radi_numero}`,
          method: "PUT",
          data: data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _deleteRescorr({ commit }, { radi_ano, radi_numero }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `rescorr/${radi_ano}/${radi_numero}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _postRescorrUploadPdf({ commit }, { ano, radi, file }) {
      console.log("1", ano);
      console.log("2", radi);
      console.log("3", file);
      commit("isLoading", null, { root: true });
      let InstFormData = new FormData();
      InstFormData.append("file", file);
      console.log(file);
      try {
        const RES = await postData({
          url: `guardarPdf_res/${ano}/${radi}`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data: InstFormData,
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
