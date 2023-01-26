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
    async _newDiaNoHabil({ commit }, data) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `agregarDia`,
          method: "POST",
          data,
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_newDiaNoHabil", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _editDiaNoHabil({ commit }, { data }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `editarDia`,
          method: "PUT",
          data,
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("_editDiaNoHabil", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _delDiaNoHabil({ commit }, { date }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `eliminarDia/${date}`,
          method: "DELETE",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch (error) {
        console.error("_delDiaNoHabil", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getDiaNoHabil({ commit }, { date }) {
      commit("isLoading", null, { root: true });
      try {
        const RES = await postData({
          url: `buscarDia/${date}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_getDiaNoHabil", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
    async _getDiasNoHabil({ commit }) {
      commit("isLoading", null, { root: true });

      try {
        const RES = await postData({
          url: `buscarDias`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });
        return RES;
      } catch {
        console.error("_getDiaNoHabil", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _getDiaNoHabilF8({ commit }, { desde, cantidad, filtro }) {
      try {
        commit("isLoading", null, { root: true });
        const RES = await postData({
          url: `f8&dia/${desde}/${cantidad}/?dato=${filtro}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        RES.msg && commit("modificarLista", { lista: "lista", res: [] });
        if (!RES.msg) commit("modificarLista", { lista: "lista", res: RES });

        return RES;
      } catch (error) {
        console.error("_getDiaNoHabilF8", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
