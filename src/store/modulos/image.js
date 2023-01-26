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
    async _postImagen({ commit }, { nit, file }) {
      console.log("lo que capture: ", nit, file);
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `image/${nit}`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data: file,
        });
        return RES;
      } catch (error) {
        console.error("_postImage", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getImgen({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `getImage/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_getImage", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
