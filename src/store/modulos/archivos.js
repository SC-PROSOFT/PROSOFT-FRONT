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
    async _uploadFile({ commit }, { data }) {
      const { anoLlave, cont, file } = data;
      commit("isLoading", null, { root: true });
      let InstFormData = new FormData();
      InstFormData.append("file", file);
      try {
        const RES = await postData({
          url: `guardarPdf/${anoLlave}/${cont}`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data: InstFormData,
        });

        return RES;
      } catch (error) {
        console.error("_uploadFile", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getUltCorr({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `ultimaCorres`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_getUltCorr", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
