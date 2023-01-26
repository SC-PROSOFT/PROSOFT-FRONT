import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import JsBarcode from "jsbarcode";
import { currentUser } from "@/mixins/global";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function (info) {
  console.log("lo que llega al info: ", info.fecha, info.hora);
  return new Promise((resolve) => {
    let canvas = document.createElement("canvas");
    JsBarcode(canvas, `${info.anoRadi}${info.contRadi}`, {
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
              width: "65%",
              stack: [
                {
                  text: `${info.USUARIO}`,
                  bold: true,
                },
                {
                  text: [
                    {
                      text: `${info.NIT}`,
                      bold: true,
                    },
                  ],
                },
                {
                  text: `Al contestar cite este no. ${info.codResp.anoLlave}${info.codResp.cont} -S`.toUpperCase(),
                  bold: true,
                },
                {
                  text: `Referencia: ` + info.asunto,
                  bold: true,
                },
              ],
            },
            {
              width: "35%",
              alignment: "right",
              stack: [
                {
                  text: `${info.fecha} - ${info.hora}`,
                  bold: true,
                },
                {
                  text: [
                    { text: "Origen: ", bold: true },
                    `${info.dep_dataCard}`,
                  ],
                },
                {
                  text: [
                    { text: "Destino:", bold: true },
                    `${info.nit_dataCard}`,
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
    resolve(true);
  });
}
