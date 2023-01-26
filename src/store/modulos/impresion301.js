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
    async _getImpresion({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `correspondenciaimpresion`,
          data,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_getImpresion", error);
        commit("isLoading", null, { root: true });
        return error;
      } finally {
      }
    },
  },
};
