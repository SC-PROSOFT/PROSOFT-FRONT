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
    async _postTerce({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `terce`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data,
        });
        return RES;
      } catch {
        console.error("_postTerce", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _putTerce({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `terce/${codigo}`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
          data,
        });
        return RES;
      } catch {
        console.error("_putTerce", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getTerce({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `terce/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_getTerce", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _deleteTerce({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `terce/${codigo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_deleteTerce", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getTerceF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `terceF8/${desde}/${cantidad}/?dato=${filtro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });

        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
