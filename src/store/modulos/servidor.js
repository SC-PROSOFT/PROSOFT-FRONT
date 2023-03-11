import postData from "../../postData";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async _infoServe({ commit }) {
      return new Promise((resolve, reject) => {
        console.log("USUNET");
        const DATA = {
          //url: "app/INDEX/SC-USUNET.DLL",
          //metodo: "POST",
          data: "GEBC|",
          ip: localStorage.IP?.replace(/^0+/, ""),
        };
        postData({
          url: `GET_SC_USUNET`,
          method: "POST",
          data: DATA,
          header: {},
        })
          .then((data) => {
            console.log("🚀 ~ file: servidor.js:27 ~ .then ~ data:", data.MENSAJE)
            resolve(data.MENSAJE);
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        console.error(error);
        reject(error);
        env;
      });
    },
    async _CON904({ commit }, data) {
      return new Promise((resolve, reject) => {
        const DATA = {
          //url: "APP/CONTAB/CON904.DLL",
          metodo: "POST",
          data,
          ip: localStorage.IP?.replace(/^0+/, ""),
        };
        
        postData({
          url: `GET_CON904`,
          method: "POST",
          data: DATA,
          header: {},
        })
          .then((data) => {
            resolve(data.MENSAJE);
            console.log(data,"data CON904❤️")
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    },

    // async _CON904s({ commit }, data) {
    //   console.log("🚀 ~ file: servidor.js:64 ~ _CON904s ~ data:", data)
    //   return new Promise((resolve, reject) => {
    //     const DATA = {
    //       url: "APP/CONTAB/CON904S_V3.DLL",
    //       data,
    //       ip: localStorage.IP?.replace(/^0+/, ""),

    //     };
    //     postData({
    //       url: `GET_DLL`,
    //       method: "POST",
    //       data: DATA,

    //       header: {},
    //     })
    //       .then((data) => {
    //         resolve(data);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //     }).catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    // },
  },
};
