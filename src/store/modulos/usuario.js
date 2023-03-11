import postData from "../../postData";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    reinicioAcceso() {
      sessionStorage.removeItem("auth_code");
      sessionStorage.removeItem("x_token");
      sessionStorage.removeItem("USUARIO_GLOBAL");
      location.reload();
    },
  },
  actions: {
    async _getUsuario({ commit }, datos) {
      console.log(datos,"😈getUsuario")
      return new Promise((resolve, reject) => {
        let { usuario, contrasena, modulo } = datos;
        if (contrasena == undefined) contrasena = "";
        postData({
          url: `login?usuario=${usuario}&clave=${contrasena}&modulo=${modulo.toUpperCase()}`,
          method: "GET",
          data: {},
          header: {},
        })
          .then((data) => {
            console.log("🚀 ~ file: usuario.js:28 ~ .then ~ data:", data)
            sessionStorage.x_token = data.TOKEN
            if (Array.isArray(data.MENSAJE.Usunet)) resolve(data.MENSAJE.Usunet[0]);
            else reject(data);
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    },
  },
};
