import postData from "../../postData";

export default {
  namespaced: true,
  state: {
    lista: [],
    modulos: [],
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
    async _guardarConfig({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        console.log(data, codigo);
        const RES = await postData({
          url: `crear_config`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_guardarConfig", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _addContab({ commit }, { contab }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `agergar_contabilidad/${contab}`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_addContab", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _deleteContab({ commit }, { contab }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `eliminar_contabilidad/${contab}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_deleteContab", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _editConfig({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `editar_config`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_editConfig", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _editContab({ commit }, { data, codigo }) {
      commit("isLoading", null, { root: true });
      try {
        console.log(data, codigo);
        const RES = await postData({
          url: `Operps/${codigo}`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editContab", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _editEstadoModulo({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const { contab, modulo, estado } = data;
        console.log(data);
        const RES = await postData({
          url: `editar_estado_modulos/${modulo}/${contab}/${estado}`,
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

    async _getModulos({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `obtener_modulos`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        RES.msg && commit("modificarLista", { lista: "modulos", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "modulos", res: RES });
        return RES;
      } catch (error) {
        console.error(error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _editModulo({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `editar_modulo`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_editModulo", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _deleteModulo({ commit }, { modulo }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `eliminar_modulo/${modulo}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_deleteModulo", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _addModulo({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `agregar_modulo`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_addModulo", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getConfig({ commit }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `config`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error(error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
