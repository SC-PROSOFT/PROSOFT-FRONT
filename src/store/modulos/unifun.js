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
    async _newUnifun({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `unifun`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_newUnifun", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _editUnifun({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        console.log(data, codigo);
        const RES = await postData({
          url: `unifun/${codigo}`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editUnifun", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _delUnifun({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `unifun/${codigo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_delUnifun", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getUnifun({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `unifun/${codigo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        console.log("llego aqui: ", RES)
        return RES;
      } catch {
        console.error("_getUnifun", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getUnifunF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&unifun/${desde}/${cantidad}/?dato=${filtro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });

        return RES;
      } catch (error) {
        console.error("_getUnifunF8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
