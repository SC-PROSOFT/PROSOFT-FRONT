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
    async _getCorr864({ commit }, { codResp }) {
      const { anoLlave, cont } = codResp;
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `getResLlave/${anoLlave}/${cont}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_getCorr", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getCorr864f8({ commit }, { desde, cantidad, filtro }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `f8&corr864/${desde}/${cantidad}/?dato=${filtro}`,
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
