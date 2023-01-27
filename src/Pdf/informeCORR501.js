import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import JsBarcode from "jsbarcode";
import { currentUser } from "@/mixins/global";
import moment from "moment";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function (info) {
  console.log(info);
  return new Promise((resolve) => {
    let filterInfo = {};
    Object.entries(info).forEach(([key, value]) => {
      if (
        key === "hora" ||
        key === "descripSer" ||
        key === "fecha" ||
        key === "anoLlave" ||
        key === "contLlave" ||
        key === "proceden" ||
        key === "asunto" ||
        key === "descripDeptoremi" ||
        key === "tipoCorres" ||
        key === "respon" ||
        key === "llaveRadi" ||
        key === "firma_dataCard" ||
        key === "descripTer" ||
        key === "NIT" ||
        key === "USUARIO"
      ) {
        filterInfo[key] = value;
      }
    });
    console.log("keys de impresion", filterInfo);
    let canvas = document.createElement("canvas");
    JsBarcode(canvas, `${filterInfo.anoLlave}${filterInfo.contLlave}-S`, {
      format: "CODE39",
      displayValue: false,
    });
    let cod_bar = new Image();
    cod_bar.src = canvas.toDataURL("../assets/image/codeBar.png");

    let impresion = {
      info: {
        title: `${currentUser.llaveOper}-${moment().format(
          "YYMMDD-HHmmss"
        )}.pdf`,
        author: "SC PROSOFT SAS",
      },
      defaultStyle: {
        fontSize: 10,
      },
      pageSize: {
        width: 350,
        height: "auto",
      },
      pageMargins: [10, 10, 10, 0],
      content: [
        {
          columns: [
            {
              width: "60%",
              stack: [
                {
                  text: `${filterInfo.USUARIO}`,
                  bold: true,
                },
                {
                  text: [
                    {
                      text: `${filterInfo.NIT}`,
                      bold: true,
                    },
                  ],
                },
                {
                  text: `Nro. Radicado salida ${filterInfo.anoLlave}${filterInfo.contLlave}-S`,
                  bold: true,
                },
                {
                  text: `Referencia ${filterInfo.asunto}`,
                  bold: true,
                },
              ],
            },
            {
              width: "40%",
              alignment: "right",
              stack: [
                {
                  text: `${filterInfo.fecha}    ${filterInfo.hora}`,
                  bold: true,
                },
                {
                  text: [
                    { text: "Origen: ", bold: true },
                    `${filterInfo.descripSer}`,
                  ],
                },
                {
                  text: [
                    { text: "Destino:", bold: true },
                    `${filterInfo.descripTer}`,
                  ],
                },
              ],
            },
          ],
        },
        {
          margin: [0, 0, 0, 0],
          width: 230,
          height: 50,
          alignment: "center",
          image: cod_bar.src,
        },
      ],
    };

    try {
      pdfMake.createPdf(impresion).open();
    } catch (error) {
      console.error(error);
    }
    resolve(true);
  });
}
