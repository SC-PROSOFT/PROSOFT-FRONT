import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var structureImage = (image) => {
  let format = { width: "15%" };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [50, 50];
    format.image = image;
  }
  return { ...format };
};
const informeCorr304_pdf = (info, dates, logo) => {
  let filter = info
    .map((val) => {
      return {
        codResp: val.codResp.cont,
        fecha: val.fecha.slice(0, 10),
        hora: val.fecha.slice(11, 16),
        tercero: val.responsableDep,
        tipo: val.descripTipco,
        descripcion: val.descrip,
        dependencia: val.descripSerco,
        dirigido: "", // quemados
        procedencia: val.proceden,
        nroRadi: "", // quemados
        firma: "",
      };
    })
    .map((val) => {
      return Object.values(val);
    });

  let impresion = {
    pageMargins: [35, 100, 35, 60],
    pageOrientation: "landscape",
    header: (currentPage, pageCount, pageSize) => {
      var width_page = pageSize.width - 40;

      return {
        margin: [20, 30, 0, 0],
        stack: [
          {
            columns: [
              structureImage(logo),
              {
                style: "center10Bold",
                fontSize: "11",
                stack: [
                  { text: "HOSPITAL DEPARTAMENTAL DE GRANADA ESE" },
                  { text: "CONTROL LISTADO DE RESPUESTAS" },
                  { text: `FECHA: 1209 - 12312` },
                ],
                width: "80%",
              },
              {
                style: "center10Bold",
                fontSize: "15",
                stack: [{ text: "OPC. 3.4", margin: [-10, 10, 0, 0] }],
              },
            ],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -55,
                w: width_page,
                h: 70,
                r: 0,
                lineWidth: 1,
                lineColor: "#000",
              },
            ],
          },
        ],
      };
    },

    content: [
      {
        layout: "lightHorizontalLines",
        fontSize: "8",
        margin: [-15, 0, -15, 0],
        table: {
          headerRows: 1,
          widths: [20, 50, 20, 80, 60, 140, 70, 60, 50, 20, "*"],

          body: [
            [
              "Nro. resp",
              "Fecha",
              "Hora",
              "Tercero",
              "Tipo",
              "Descripcion",
              "Dependencia",
              "Dirigido",
              "Procedencia",
              "Nro. radi",
              "Firma",
            ],
            ...filter,
            // [
            //   "Value 1",
            //   "Value 2",
            //   "Value 3",
            //   "Value 4",
            //   "value 5",
            //   "value 6",
            //   "value 7",
            //   "value 8",
            //   "value 9",
            //   "value 10",
            //   "value 11",
            // ],
            // [
            //   { text: "Bold value", bold: true },
            //   "Val 2",
            //   "Val 3",
            //   "Val 4",
            //   "val 5",
            //   "val 6",
            //   "val 7",
            //   "val 8",
            //   "val 9",
            //   "val 10",
            //   "val 11",
            // ],
          ],
        },
      },
    ],
  };
  pdfMake.createPdf(impresion).open();
};

export { informeCorr304_pdf };
