import moment from "moment";
import impresion from "@/mixins/impresionConse";
import formato_impresiones from "@/components/pdf/formato_impresiones";
import { default as axios } from "axios";

// const nit_empresa = 892000264; // Acacias
const nit_empresa = 900193162; // UTM

const info_empresa = empresas[nit_empresa] || {};
info_empresa.ip_servicio = "http://34.234.185.158/consentimientos/v2/"; // PROSOFT
// info_empresa.ip_servicio = "http://190.90.100.204:81"; // EMPRESA

// info_empresa.ip_servicio = "http://192.168.123.32/consentimientos/v2/"; // UTM 13131
const datos_url = "ZGF0b3NfdXJs";

const default_img_base64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

var postData = function (dll, data, setUrl) {
  console.log(dll, data, setUrl);
  return new Promise((resolve, reject) => {
    var url = setUrl ? dll : `${info_empresa.ip_servicio}inc/service.dll.php`;
    var formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (!setUrl) formData.append("url", dll);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) reject(res);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        let decoder = new TextDecoder("iso-8859-1");
        let text = decoder.decode(buffer);
        return text;
      })
      .then((data) => {
        let encode = encodeURI(data);
        encode = encode.replace(
          /%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/g,
          ""
        );
        encode = encode.replace(/%0A/g, "");
        let decode = decodeURI(encode);
        try {
          var res = JSON.parse(decode.replace(/"\s+|\s+"/g, '"'));
          if (setUrl) {
            resolve(res);
          } else {
            if (!res) {
              error_console("GLOBAL", data);
              reject({
                MENSAJE:
                  "Ha ocurrido un error durante la solicitud. Inténtalo de nuevo más tarde.",
              });
            } else if (res.STATUS == "00") {
              resolve(res.MENSAJE);
            } else {
              error_console("GLOBAL", res);
              reject(res);
            }
          }
        } catch (err) {
          error_console("GLOBAL", err);
          reject(err);
        }
      })
      .catch((err) => {
        error_console("GLOBAL", err);
        reject();
      });
  });
};

function subir_firma({ name_img, img_base64 }) {
  return new Promise((resolve, reject) => {
    const empresa = JSON.parse(sessionStorage.datos_empresa);
    const path_unid = empresa.IPUSU.trim().split("/")[1];

    let datos_envio = new FormData();

    datos_envio.append("name_img", name_img);
    datos_envio.append("img_base64", img_base64);
    datos_envio.append("path_unid", path_unid);

    fetch(`${info_empresa.ip_servicio}inc/service.save_img.firm.php`, {
      method: "POST",
      body: datos_envio,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.STATUS == 99) resolve(data);
        else reject(data);
      })
      .catch(reject);
  });
}

async function get_img_logos() {
  const datos_empresa = JSON.parse(sessionStorage.datos_empresa);
  const url = `${info_empresa.ip_servicio}logos/${parseInt(
    datos_empresa.NITUSU
  )}.png`;

  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (xhr.readyState == 4 && xhr.response.type == "image/png") {
          resolve(reader.result);
        } else {
          resolve(default_img_base64);
        }
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = () => {
      resolve(default_img_base64);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

async function get_img_firmas(name, tipo) {
  console.log("info firma", info_empresa.ip_servicio, tipo);
  let url = "";
  if (tipo == "2") url = require(`../src/assets/${name}.png`);
  else if (tipo == true)
    url = `${info_empresa.ip_servicio}firmas_medicos/${name}.png`;
  else url = `${info_empresa.ip_servicio}firmas_consen/${name}.png`;

  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
        if (xhr.readyState == 4 && xhr.response.type == "image/png") {
          resolve(reader.result);
        } else {
          resolve(default_img_base64);
        }
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = () => {
      resolve(default_img_base64);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}

function fecha_edit(date) {
  return parseInt(date)
    ? moment(date.toString(), "YYYYMMDD").format("YYYY-MM-DD")
    : "";
}
// "STRING DE PRUEBA".replaceEsp()
// Reemplazo carácteres especiales

String.prototype.replaceEsp = function () {
  return this.toString().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ""); //eslint-disable-line
};

// "STRING DE PRUEBA".enterReplace()
// Reemplazo salto de línea/enter por caracter &
String.prototype.enterReplace = function () {
  return this.toString().replace(/(\r\n|\n|\r)/gm, "&");
};

// "STRING DE PRUEBA".enterPut()
// Reemplazo caracter & por salto de línea
String.prototype.enterPut = function () {
  return this.toString().replace(/(?:\&)/g, "\n"); //eslint-disable-line
};

function mask_id(id) {
  let mask = null;
  if (!isFinite(id)) return id;

  mask = new Intl.NumberFormat().format(id);
  if (!parseInt(mask)) return "";
  else return mask;
}

function descrip_sexo(sexo) {
  return !sexo.trim() ? "" : sexo == "F" ? "Femenino" : "Masculino";
}

const nav_links = {
  principal: [
    {
      text: "Maestro",
      icono: "mdi-cog",
      to: { name: "maestro" },
    },
    {
      text: "Consentimientos",
      icono: "mdi-account-edit-outline",
      to: { name: "elaborar" },
    },
    {
      text: "Imprimir",
      icono: "mdi-cloud-print",
      to: { name: "imprimir" },
    },
  ],
};

function arrayParentesco() {
  return [
    { COD: "1", DESCRIP: "MADRE" },
    { COD: "2", DESCRIP: "PADRE" },
    { COD: "3", DESCRIP: "HIJO(A)" },
    { COD: "4", DESCRIP: "ESPOSO(A)" },
    { COD: "5", DESCRIP: "HERMANO(A)" },
    { COD: "6", DESCRIP: "TIO(A)" },
    { COD: "7", DESCRIP: "SOBRINO(A)" },
    { COD: "8", DESCRIP: "PRIMO(A)" },
    { COD: "9", DESCRIP: "MADRASTRA" },
    { COD: "10", DESCRIP: "PADRASTRO" },
    { COD: "11", DESCRIP: "AMIGO(A)" },
    { COD: "12", DESCRIP: "ABUELO(A)" },
  ];
}

function descripParentesco(val) {
  let parentesco = this.arrayParentesco().find((el) => el.COD == val);
  return parentesco ? parentesco.DESCRIP : "";
}

function arrayProfesionales() {
  return [
    { cod: "1", text: "MEDICO ESPECIALISTA" },
    { cod: "2", text: "MEDICO GENERAL" },
    { cod: "3", text: "ENFERMERA" },
    { cod: "4", text: "AUXILIAR ENFERMERIA" },
    { cod: "5", text: "TERAPEUTAS Y OTROS" },
    { cod: "6", text: "ENFERMERA JEFE PYP" },
    { cod: "7", text: "SICOLOGIA" },
    { cod: "8", text: "NUTRICIONISTA " },
    { cod: "9", text: "SIN DETERMINAR" },
    { cod: "A", text: "ODONTOLOGO" },
    { cod: "H", text: "HIGIENISTA ORAL" },
    { cod: "I", text: "INSTRUMENTACION" },
    { cod: "O", text: "OPTOMETRA" },
    { cod: "T", text: "TRABAJO SOCIAL" },
  ];
}

function arrayDocumentos() {
  return [
    { cod: "CC", text: "Cédula ciudadania" },
    { cod: "CE", text: "Cédula extranjera" },
    { cod: "PA", text: "Numero pasaporte" },
    { cod: "RC", text: "Registro civil" },
    { cod: "TI", text: "Tarjeta identidad" },
    { cod: "ASI", text: "Adulto sin identificar" },
    { cod: "MSI", text: "Menor sin identificar" },
    { cod: "NUI", text: "Numero unico identidad. NUID." },
    { cod: "CD", text: "Carnet diplomatico" },
    { cod: "SC", text: "Salvo conducto" },
    { cod: "PE", text: "Permiso especial permanente" },
    { cod: "CN", text: "Certificado nacido vivo" },
  ];
}

const hora_edit = (data) => {
  data = data.toString() || "";
  return `${data.slice(0, 2)}:${data.slice(2)}`;
};

const URl = "http://localhost:3001/api/";

export const postData_ = ({
  url,
  data = {},
  method = "POST",
  header = {},
  responseType = "json",
}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URl}${url}`,
      method,
      data,
      headers: {
        ...header,
        "Content-Type": "application/json",
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
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
        } else if (response.request) response.message = error.request;
        else response.message = error.message;
        error_console("global", error);
        reject(response);
      });
  });
};

var instance = {
  data: () => ({
    nav_links,
    postData,
    postData_,
    arrayProfesionales,
    arrayDocumentos,
    arrayParentesco,
    descripParentesco,
    fecha_edit,
    datos_url,
    impresion,
    hora_edit,
    subir_firma,
    get_img_firmas,
    get_img_logos,
    formato_impresiones,
    info_empresa,
    default_img_base64,
    nit_empresa,
    mask_id,
    descrip_sexo,
  }),
};

export default instance;
