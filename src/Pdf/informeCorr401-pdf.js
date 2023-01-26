import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import JsBarcode from "jsbarcode";
import { currentUser } from "@/mixins/global";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const informeCorr401_pdf = (info) => {
  let filterInfo = {};

  Object.entries(info).forEach(([key, value]) => {
    if (
      key === "llave" ||
      key === "fecha" ||
      key === "hora" ||
      key === "contLlave" ||
      key === "proceden" ||
      key === "deptoremi" ||
      key === "tipoDescrip" ||
      key === "tipoCorres" ||
      key === "tipoCorresDescrip" ||
      key === "fol" ||
      key === "fold" ||
      key === "usuar"
    ) {
      filterInfo[key] = value;
    }
  });
  console.log("filtradito: ", filterInfo);

  let canvas = document.createElement("canvas");
  JsBarcode(canvas, `${filterInfo.llave.anoLlave}${filterInfo.llave.cont}`, {
    format: "CODE39",
    displayValue: false,
  });
  let cod_bar = new Image();
  cod_bar.src = canvas.toDataURL("../assets/image/codeBar.png");

  let impresion = {
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
                text: `${filterInfo.usuar}`,
                bold: true,
              },
              {
                text: [
                  {
                    text: `${filterInfo.deptoremi} - ${filterInfo.tipoDescrip}`,
                    bold: true,
                  },
                ],
              },
              {
                text: `Al contestar cite este no. ${filterInfo.llave.anoLlave}${
                  filterInfo.llave.cont
                }-${
                  filterInfo.proceden == 1
                    ? "E"
                    : filterInfo.proceden == 2
                    ? "I"
                    : ""
                }`.toUpperCase(),
                bold: true,
              },
            ],
          },
          {
            width: "40%",
            alignment: "right",
            stack: [
              {
                text: `${filterInfo.fecha} - ${filterInfo.hora}`,
                bold: true,
              },
              {
                text: [
                  { text: "Folio: ", bold: true },
                  `${filterInfo.fol} de ${filterInfo.fold}`,
                ],
              },
              {
                text: [
                  { text: "Tipo:", bold: true },
                  `${filterInfo.tipoCorresDescrip}`,
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
  pdfMake.createPdf(impresion).open();
};

export { informeCorr401_pdf };
