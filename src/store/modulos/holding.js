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
    async _newHolding({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `holding`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _editHolding({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        console.log(data, codigo);
        const RES = await postData({
          url: `holding/${codigo}`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editSerco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _delHolding({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `holding/${codigo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_delSerco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getHolding({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `holding/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getHoldingF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&holding/${desde}/${cantidad}/?dato=${filtro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });

        return RES;
      } catch (error) {
        console.error("_getSercoF8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
