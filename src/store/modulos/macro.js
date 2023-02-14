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
    async _newMacro({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `macorr`,
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

    async _editMacro({ commit }, { cl, codigo, data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `macorr/${cl}/${codigo}`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editMarco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _delMacro({ commit }, { cl, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `macorr/${cl}/${codigo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_delMarco", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getMacro({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `macorrAll/${cl}${codigo}`,
          data,
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
    async _getMacroId({ commit }, { cl, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `macorr/${cl}/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getMacroF8({ commit }, { desde, cantidad, filtro, tipo = "" }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&macorr/${desde}/${cantidad}/?dato=${filtro}&tipo=${tipo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        console.log("RES", RES);
        console.log("this.F8", RES);
        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });
        return RES;
      } catch (error) {
        console.error("_getMarcoF8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
