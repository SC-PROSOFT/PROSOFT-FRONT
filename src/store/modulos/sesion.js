import postData from "../../postData";


export default {
  namespaced: true,
  mutations: {
    reinicioAcceso() {
      sessionStorage.removeItem("auth_code");
      sessionStorage.removeItem("x_token");
      sessionStorage.removeItem("USUARIO_GLOBAL");
      location.reload();
    },
  },
  actions: {
    async getUsuarios({ commit }, datos) {
      commit("isLoading", null, { root: true });
      const password = btoa(datos.contraseña);
      const { usuario } = datos;

      try {
        const RES = await postData({ url: `usuvue?llave=${usuario}&clave=${password}`, method: "GET" });
        console.log(RES, "RESSS")

        const USUARIO = await postData({
          url: `usuar`,
          method: "GET",
          header: { x_token: sessionStorage.x_token },
        });

        if (!USUARIO.msg) {
          const USER = JSON.stringify(USUARIO);
          sessionStorage.USUARIO_GLOBAL = USER;
        }
        if (!RES.msg) {
          const base64 = btoa(JSON.stringify(RES));
          sessionStorage.auth_code = base64;
          sessionStorage.x_token = RES.token;
          location.reload();
        }

        return RES;
      } catch (error) {
        console.error(error);
        return error.status;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
