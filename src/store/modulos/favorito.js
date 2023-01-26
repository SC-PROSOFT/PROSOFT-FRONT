import postData from "../../postData";
export default {
  namespaced: true,
  state: {
    list_favorito: [],
  },
  getters: {
    list: (state) => (lista) => state[lista],
  },
  mutations: {
    list(state, data) {
      state[data.lista] = data.data;
    },
  },
  actions: {
    async getFavorito({ commit }, [user, modulo]) {
      try {
        const RES = await postData({
          url: `/favoritos/${user}/${modulo}`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        if (!RES.msg) {
          commit("list", {
            lista: "list_favorito",
            data: RES,
          });
        }

        return RES;
      } catch (error) {
        console.error("getFavorito", error);
        return error;
      }
    },
    async addFavorito({ commit }, { user, route, nombre, modulo }) {
      try {
        let RES = await postData({
          url: `agregarfavorito/${user}/?route=${route}&nombre=${nombre}&modulo=${modulo}`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("addFavorito", error);
        return error;
      }
    },
    async deleteFavorito({ commit }, { user, route, modulo }) {
      try {
        let RES = await postData({
          url: `eliminarfavoritos/${user}/?route=${route}&modulo=${modulo}`,
          method: "PUT",
          header: { x_token: sessionStorage.x_token },
        });

        return RES;
      } catch (error) {
        console.error("deleteFavorito", error);
        return error;
      }
    },
  },
};
