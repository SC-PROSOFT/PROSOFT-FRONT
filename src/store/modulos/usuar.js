import postData from "../../postData";

export default {
  namespaced: true,
  state: {},
  getters: {
    getLista: (state) => (lista) => state[lista],
  },
  mutations: {
    modificarLista(state, data) {
      state[data.lista] = data.respuesta;
    },
  },
  actions: {
    async nuevoUsuario({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const respuesta = await postData({
          url: `usuar`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        commit("isLoading", null, { root: true });
        return respuesta;
      } catch (error) {
        commit("isLoading", null, { root: true });
        console.error("error al o crear usuario: ", error);
        return error;
      }
    },

    async getUsuario({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const respuesta = await postData({
          url: `usuar`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        commit("isLoading", null, { root: true });
        return respuesta;
      } catch {
        commit("isLoading", null, { root: true });
        console.error("error al o getUsuario: ", error);
        return error;
      }
    },

    async actualizarUsuario({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const respuesta = await postData({
          url: `usuar`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        commit("isLoading", null, { root: true });
        return respuesta;
      } catch {
        commit("isLoading", null, { root: true });
        console.error("error al o getUsuario: ", error);
        return error;
      }
    },
  },
};
