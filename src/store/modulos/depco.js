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
    async _newDepco({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `depco`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_newDepco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _editDepco({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `depco/${codigo}`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editDepco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _delDepco({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `depco/${codigo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_delDepco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getDepco({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `depco/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_getDepco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getDepcoF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&depco/${desde}/${cantidad}/?dato=${filtro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });
        return RES;
      } catch (error) {
        console.error("_getDepcoF8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
