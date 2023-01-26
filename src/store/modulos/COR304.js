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
    async _listadoRespuesta({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: "listadoRespuesta",
          data,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        commit("isLoading", null, { root: true });
        return error;
      } finally {
      }
    },
  },
};
