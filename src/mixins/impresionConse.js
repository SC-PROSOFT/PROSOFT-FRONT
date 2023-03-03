import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function impresion({ docDefinition }) {
  return new Promise(function(resolve, reject) {
    try {
      pdfMake.createPdf(docDefinition).open();
      setTimeout(() => resolve(), 300);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export default impresion;
