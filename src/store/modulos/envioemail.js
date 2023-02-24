import postData from "../../postData";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async _sendEmail({ commit }, { data }) {
      commit("isLoading", null, { root: true });

      //   server_email: "mail.prosoft.com.co",
      // remitente: "correo@prosoft.com.co",
      //   clave: "PROSOFT999999",
      const datos_envio = {
        server_email: "smtp.gmail.com",
        remitente: "pruebasprosofts@gmail.com",
        clave: "ldpddvqikedwhpqq",
        puerto: 587,
        id: data.id,
        propietario: data.propietario,
        anoLlave: data.anoLlave,
        cont: data.cont,
        destino: data.destino,
        nom_empresa: data.nom_empresa,
      };
      try {
        const RES = await postData({
          url: `enviocCorreo`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data: datos_envio,
        });
        return RES;
      } catch (error) {
        console.error("_sendEmail", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },

    async _sendEmailRescorr({ commit }, { data }) {
      commit("isLoading", null, { root: true });

      const datos_envio = {
        server_email: "smtp.gmail.com",
        remitente: "pruebasprosofts@gmail.com",
        clave: "ldpddvqikedwhpqq",
        puerto: 587,
        id: data.id,
        anoLlave: data.anoLlave,
        cont: data.cont,
        destino: data.destino,
        observacion: data.observacion,
        nom_empresa: data.nom_empresa,
      };
      try {
        const RES = await postData({
          url: `enviocCorreo&rescorres`,
          method: "POST",
          header: { x_token: sessionStorage.x_token },
          data: datos_envio,
        });
        return RES;
      } catch (error) {
        console.error("_sendEmail", error);
        return error;
      } finally {
        commit("isLoading", null, { root: true });
      }
    },
  },
};
