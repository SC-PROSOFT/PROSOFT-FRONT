import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import JsBarcode from "jsbarcode";
import { currentUser } from "@/mixins/global";
import moment from "moment";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function (info) {
  return new Promise((resolve) => {
    let filterInfo = {};
    Object.entries(info).forEach(([key, value]) => {
      if (
        key === "llave" ||
        key === "fecha" ||
        key === "hora" ||
        key === "contLlave" ||
        key === "proceden" ||
        key === "deptoremi" ||
        key === "descripDeptoremi" ||
        key === "tipoCorres" ||
        key === "descripTipco" ||
        key === "fol" ||
        key === "fold" ||
        key === "USUARIO"
      ) {
        filterInfo[key] = value;
      }
    });
    let canvas = document.createElement("canvas");
    JsBarcode(canvas, `${filterInfo.llave.anoLlave}${filterInfo.llave.cont}`, {
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
                      text: `${filterInfo.deptoremi} - ${
                        filterInfo.descripDeptoremi == null
                          ? ""
                          : filterInfo.descripDeptoremi
                      }`,
                      bold: true,
                    },
                  ],
                },
                {
                  text: `Al contestar cite este no. ${
                    filterInfo.llave.anoLlave
                  }${filterInfo.llave.cont}-${
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
                  text: `${filterInfo.fecha}    ${filterInfo.hora}`,
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
                    `${filterInfo.descripTipco}`,
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
