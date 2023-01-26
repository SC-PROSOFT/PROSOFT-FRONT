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
    async _postCorres({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `corres`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data,
        });
        return RES;
      } catch {
        console.error("_postCorres", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
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
        console.log(RES);
        return RES;
      } catch (error) {
        console.error("_uploadFile", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _putCorres({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `corres`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
          data,
        });
        return RES;
      } catch (error) {
        console.error("_putCorres", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _deleteCorres({ commit }, { llave }) {
      const { anoLlave, cont } = llave;
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `corres/${anoLlave}/${cont}`,
          method: "DELETE",
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
    async _getCorr({ commit }, { llave }) {
      const { anoLlave, cont } = llave;
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `corres/${anoLlave}/${cont}`,
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
    async _getCORR891({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `getCorrId/?=dato${codigo}`,
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

    async _getCorr868F8({ commit }, { desde, cantidad, filtro, parametro }) {
      try {
        console.log(filtro, parametro);
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&corr868/${desde}/${cantidad}/?dato=${filtro}&columna=${parametro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });

        return RES;
      } catch (error) {
        console.error("_getCorr868F8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async getCorr869({ commit }, { anio }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `get&corr869/${anio}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("getCorr869", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
