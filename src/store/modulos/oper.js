import postData from "../../postData";

export default {
  namespaced: true,
  state: {
    lista: [],
    usuarios: [],
    modulos_x_oper: [],
  },
  getters: {
    getLista: (state) => (lista) => state[lista],
  },
  mutations: {
    modificarLista(state, data) {
      state[data.lista] = data.res;
    },
    editModulosPorOper(state, data) {
      const indice = state[data.lista].map((e) => e.cod).indexOf(data.res.codModulo);

      state[data.lista][indice].estado = data.res.estado;
    },
  },
  actions: {
    async _editOper({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `Operps/${codigo}`,
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

    async _getOper({ commit }, { codigo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `usuvue&llave/${codigo}`,
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
    async _getModulosPorOper({ commit }, { llave }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `consultar_modulos_asignados/${llave}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        RES.msg && commit("modificarLista", { lista: "modulos_x_oper", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "modulos_x_oper", res: RES.modulos });
        return RES;
      } catch (error) {
        console.error("_getModulosPorOper", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _putModulosPorOper({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `asignar_modulo`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        if (!RES.msg) commit("editModulosPorOper", { lista: "modulos_x_oper", res: data });

        return RES;
      } catch (error) {
        console.error("_putModulosPorOper", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getOperadores({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `usuvues`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        RES.msg && commit("modificarLista", { lista: "usuarios", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "usuarios", res: RES });
        return RES;
      } catch (error) {
        console.error("_getOperadores", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _changePassword({ commit }, { data }) {
      const { llaveOper, new_clave } = data;
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `/usuvue/${llaveOper}/${new_clave}`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_changePassword", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getOperF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&usuvue/${desde}/${cantidad}/?dato=${filtro}`,
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
