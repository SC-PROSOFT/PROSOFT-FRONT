import AUTOCOMPLETE from "../components/GENERAL/ComboBox.vue";
import FILEINPUT from "../components/GENERAL/FileInput.vue";
import CHECKBOX from "../components/GENERAL/CheckBox.vue";
import dataCard from "../components/GENERAL/DataCard.vue";
import TEXTAREA from "../components/GENERAL/TextArea.vue";
import FECHA from "../components/GENERAL/InputFecha.vue";
import TABLE from "../components/GENERAL/DataTable.vue";
import titulo from "../components/GENERAL/Titulo.vue";
import CON850 from "../components/CONTAB/CON850.vue";
import CON851 from "../components/CONTAB/CON851.vue";
import CON851P from "../components/CONTAB/CON851P.vue";
import list from "../components/GENERAL/Lista.vue";
import RADIO from "../components/GENERAL/Radio.vue";
import INPUT from "../components/GENERAL/Input";
import index from "../store/index";
import IMask from "imask";

export function formatNumberMask_(val = 0, scale = 0) {
  let mask = IMask.createMask({
    mask: Number,
    scale,
    min: -9999999999999,
    thousandsSeparator: ",",
    radix: ".",
  });

  let val_num = typeof val == "string" ? val.trim() : val;
  let num = parseFloat(val_num || 0).toString();
  mask.resolve(num);
  return `${mask.value}`;
}

export function formatFecha_(id) {
  var momentFormat = "YYYY-MM-DD";
  var element = document.getElementById(id);
  var momentMask = new IMask(element, {
    mask: Date,
    // pattern: "d`/m`/00000",
    pattern: "0000/m`/d`",
    lazy: false,
  });
}
export function variable_num({ val, max = 0, decimal = undefined }) {
  let v_mask;
  let comas = max < 3 ? 0 : max % 3 === 0 ? Math.trunc(max / 3) - 1 : Math.trunc(max / 3);
  let first_num = max % 3 === 0 ? 3 : max % 3;
  v_mask = Array.from({ length: max + comas }, (v, i) => {
    if (first_num !== 0 && i == first_num) return ",";
    else if (comas !== 0 && (i - first_num) % 4 === 0) return ",";
    else return "0";
  }).join("");

  if (decimal != undefined) v_mask += "." + "0".repeat(decimal);

  let mask = IMask.createMask({
    mask: v_mask,
  });
  mask.resolve(val);
  return mask.value;
}

export function format_ip(ip) {
  let element = document.getElementById(`${ip}`);
  let maskOptions = {
    mask: "000.000.000.000",
  };
  let mask = IMask(element, maskOptions);
}
export function format_Mac() {
  let element = document.getElementById("mac");
  let maskOptions = {
    mask: "**-**-**-**-**-**",
  };
  let mask = IMask(element, maskOptions);
  // mask.updateValue(element.value = element.value.toUpperCase())
}
export function contar(tamaño, progreso) {
  let porcentaje = (progreso / tamaño) * 100;
  porcentaje = Math.round(porcentaje);
  index.commit("operarPorcentaje", [tamaño, progreso], { root: true });
}
export const format_op = (value) => {
  return parseFloat(value) || 0;
};
export function image_base64(url) {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        res(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}
const auth = sessionStorage.auth_code;
export let currentUser = auth ? JSON.parse(atob(auth)).data : null;
export const password_change = auth ? JSON.parse(atob(auth)).changePassword : null;

export const global = {
  components: {
    "form-titulo": titulo,
    "data-card": dataCard,
    "new-list": list,
    "new-date": Date,
    AUTOCOMPLETE,
    FILEINPUT,
    CHECKBOX,
    TEXTAREA,
    CON851P,
    CON850,
    CON851,
    INPUT,
    RADIO,
    FECHA,
    TABLE,
  },
  data() {
    return {
      USUARIO_GLOBAL: sessionStorage.USUARIO_GLOBAL ? JSON.parse(sessionStorage.USUARIO_GLOBAL)[0] : "",
      alerta: {
        estado: false,
        tipo: "",
        code: "",
        descrip: "",
        opcion: "",
        function1: null,
      },
      con851_p: {
        estado: false,
        tipo: "",
        code: "",
        descrip: "",
        function1: null,
        function2: null,
      },
    };
  },

  methods: {
    formatNumber_(number) {
      if (number) return Number(number.split(",").join(""));
    },
    formatFecha_(date, hora) {
      return new Date(`${date}T${hora ? hora : "00:00"}:00Z`);
    },
    CON851(code, tipo, descrip, opcion, func1) {
      setTimeout(() => {
        this.alerta.estado = true;
        this.alerta.code = code;
        this.alerta.tipo = tipo;
        this.alerta.descrip = descrip;
        this.alerta.opcion = opcion;
        this.alerta.function1 = func1;
      }, 100);
    },
    cerrar_CON851() {
      this.alerta.estado = false;
      this.alerta.code = "";
      this.alerta.tipo = "";
      this.alerta.opcion = "";
      this.alerta.descrip = "";
      this.alerta.function1 = null;
    },
    CON851P(code, tipo, descrip, func1, func2) {
      setTimeout(() => {
        this.con851_p.estado = true;
        this.con851_p.code = code;
        this.con851_p.tipo = tipo;
        this.con851_p.descrip = descrip;
        this.con851_p.function1 = func1;
        this.con851_p.function2 = func2;
      }, 100);
    },
    cerrar_CON851P() {
      this.con851_p.estado = false;
      this.con851_p.code = "";
      this.con851_p.tipo = "";
      this.con851_p.descrip = "";
      this.con851_p.function1 = null;
      this.con851_p.function2 = null;
    },
    clean_form(cajas) {
      let objs = Object.values(cajas);
      objs.forEach((obj) => {
        obj.value = "";
        if (obj.dataCard) obj.dataCard = "";
      });
    },

    download_files(data, file_name, format) {
      const config = {
        method: "post",
        url: "http://192.168.0.174:9000/api/example",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
        },
        responseType: "blob",
        data: data,
      };

      try {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${file_name}.${format}`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error al descargar ->", error);
      }
    },
  },
};
