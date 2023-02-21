import { default as axios } from "axios";
import index from "./store/index";
import ip from "./ip_config";

const { ip_global, ip_local, puerto } = ip;

// let ip = localStorage.ipPublica || localStorage.ipLocal;
// let puerto = localStorage.puerto;

// const URl = "http://192.168.0.174:8083/api/";

const URl = `http://${ip_global || ip_local}:${puerto}/api/`;

const axios_sc = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URl}${url}`,
      method,
      data,
      headers: {
        // "content-type": "application/json",
        ...header,
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
      onDownloadProgress: (progressEvent) => {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        index.commit("downloadProgress", progress, { root: true });
      },
    };

    axios(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        let response = { status: -1, message: null };
        if (error.response) {
          response.status = error.response.status;
          response.message = error.response.data;
          response.status == -1 ? index.commit("CON851", ["SERV", "error"], { root: true }) : null;
        } else if (response.request) {
          response.message = error.request;
          response.status == -1 ? index.commit("CON851", ["SERV", "error"], { root: true }) : null;
        } else {
          response.message = error.message;
          response.status == -1 ? index.commit("CON851", ["SERV", "error"], { root: true }) : null;
        }
        error_console("global", error);

        reject(response);
      });
  });
};
function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}

export default axios_sc;
