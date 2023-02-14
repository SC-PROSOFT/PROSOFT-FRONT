const Excel = require("exceljs");
import * as FileSaver from "file-saver";
import index from "../store/index";

class impresionExcel {
  workbook = new Excel.Workbook();
  worksheet = null;
  content = {
    ruta_logo: null,
    logo: "",
    tabla: null,
    header: [],
    merge_header: ["B", "D"],
    sheetName: null,
  };
  nombre_archivo = null;
  ruta_guardado = null;
  tabla_render = null;
  constructor(params) {
    this.content.sheetName = params.sheetName || "HOJA";
    this.nombre_archivo = params.archivo || `INFORME-${Math.random()}`;
    this.worksheet = this.workbook.addWorksheet(this.content.sheetName);
    this.content.header = params.header || null;
    this.content.logo = params.logo || null;
    this.content.tabla = params.tabla || null;
    this.content.scale = params.scale || 100;
    this.content.orientation = params.orientation || "portrait";
    this.ruta_guardado = params.ruta_guardado || " ";
    this.content.filas = params.filas || [];
  }

  imprimir() {
    let $this = this;
    return new Promise(function (resolve, reject) {
      if ($this.encabezado_excel())
        if ($this.tablaExcel()) {
          if ($this.estilo_excel())
            if ($this.insertar_filas())
              writexlsx()
                .then(resolve)
                .catch((err) => {
                  index.commit("isLoading", null, { root: true });

                  console.log(err);
                  reject();
                });
        }
    });
  }

  insertar_filas() {
    /* Este script recibe un objeto content que contiene un header y unas filas, luego realiza una serie de validaciones para comprobar si existe el preTable y el postTable, de existir los dos, recorrerá para cada uno de ellos y comprobará si hay un merge o una columna para insertar los datos.
Finalmente devolverá true. */
    let final_encabezado = this.content.header.length + 2;
    let filas = this.content.filas;
    if (filas) {
      let preTable = filas.preTable;
      if (preTable) {
        let row = this.worksheet.getRow(final_encabezado);
        preTable.forEach((el) => {
          if (el.merge) {
            let rango = el.merge;
            this.worksheet.mergeCells(final_encabezado, rango[0], final_encabezado, rango[1]);
            row.getCell(rango[0]).value = el.text;
          } else {
            let column = parseInt(el.columna);
            row.getCell(column).value = el.text;
          }
        });
      }

      let posTable = filas.posTable;
      if (posTable) {
        let lastRow = this.worksheet.lastRow._number + 1;
        let row = this.worksheet.getRow(lastRow);
        posTable.forEach((el) => {
          if (el.merge) {
            let rango = el.merge;
            this.worksheet.mergeCells(final_encabezado, rango[0], final_encabezado, rango[1]);
            row.getCell(rango[0]).value = el.text;
          } else {
            let column = parseInt(el.columna);
            row.getCell(column).value = el.text;
          }
        });
      }
    }

    //return true;
    this.writexlsx();
  }

  tablaExcel() {
    /* Este script es una función que permite crear una tabla en un archivo Excel. La función recibe como argumento el contenido de la tabla, como las columnas y los datos, y se los asigna a variables para su posterior uso. Luego, utiliza la función addTable de la librería worksheet para crear la tabla, se le asigna un nombre, una referencia de inicio, una fila de totales si es necesario, y se definen los estilos que tendrá la tabla. Finalmente, se llama a la función writexlsx para guardar la tabla en el archivo excel. */
    let final_encabezado = this.content.header.length;
    let inicio_tabla = `A${final_encabezado + 3}`;
    this.tabla_render = this.worksheet.addTable({
      name: "table",
      ref: inicio_tabla,
      totalsRow: this.content.tabla.totalsRow || false,
      headerRow: true,
      style: {
        theme: "TableStyleMedium16",
        showRowStripes: true,
      },
      columns: this.tabla_header(),
      rows: this.tabla_datos(),
    });
    return true;

    //this.writexlsx();
  }

  tabla_header() {
    let columnas = this.content.tabla.columnas;
    columnas.map((el) => {
      el.name = el.name;
    });
    return columnas;
  }

  encabezado_excel() {
    let $this = this;
    let bordes = {
      top: { style: "thin", color: { argb: "000" } },
      left: { style: "thin", color: { argb: "000" } },
      bottom: { style: "thin", color: { argb: "000" } },
      right: { style: "thin", color: { argb: "000" } },
    };

    let header = $this.content.header;
    let columnas_final = $this.content.tabla.columnas.length;
    let columnas_limite = columnas_final > 26 ? 20 : columnas_final;
    let final_text = String.fromCharCode(96 + columnas_limite);

    let inicial = $this.content.merge_header[0];
    let final = columnas_final < 4 ? $this.content.merge_header[1] : final_text.toUpperCase();
    header.forEach((val, index) => {
      index++;
      let key_inicial = `${inicial + index}`;
      let key_final = `${final + index}`;
      let text = typeof val == "object" ? val.text : val;
      $this.worksheet.mergeCells(`${key_inicial}:${key_final}`);

      $this.worksheet.getRow(index).height = 20;

      let cell = $this.worksheet.getCell(key_inicial);
      cell.value = text;
      cell.font = {
        bold: typeof val == "object" ? val.bold : false,
        size: typeof val == "object" ? val.size : 12,
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      cell.border = bordes;
    });
    let logo_merge = `A1:A${header.length}`;

    let logo = this.content.logo;

    const image = $this.workbook.addImage({
      base64: logo,
      extension: "png",
    });

    $this.worksheet.addImage(image, logo_merge);
    $this.worksheet.mergeCells(logo_merge);
    $this.worksheet.getColumn("A").width = 20;
    $this.worksheet.getCell("A1").border = bordes;

    return true;
  }

  tabla_datos() {
    let datos = this.content.tabla.data;
    let columnas = this.content.tabla.columnas;
    let formato_datos = [];

    datos.forEach((row, index) => {
      formato_datos.push([]);
      columnas.forEach((columna) => {
        let val = row[columna.value] || "";
        val = val.toString().trim();
        formato_datos[index].push(val || "");
      });
    });
    return formato_datos;
  }

  estilo_excel() {
    let final_encabezado2 = this.content.header.length;
    let columnas_final_2 = this.content.tabla.columnas.length;

    let $this = this;
    let tabla = this.tabla_render;
    let rango = tabla.table.tableRef.split(":");
    let limite_ini = rango[0].substr(1); // Row inicio de tabla
    // Row final de tabla
    let limite_fin = null;
    columnas_final_2 > 26 ? (limite_fin = rango[1].substr(2)) : (limite_fin = rango[1].substr(1));

    // David.M 17/07/2020
    // Se agrega escala, orientacion y encabezado repetible en cada pagina
    // Se elimina printArea para que sea automatico.

    this.worksheet.pageSetup.scale = this.content.scale;
    this.worksheet.pageSetup.orientation = this.content.orientation;
    this.worksheet.pageSetup.printTitlesRow = `1:${final_encabezado2 + 2}`;

    // Ajusta la altura (height) de cada fila
    let heightRow = this.content.tabla.heightRow || false;
    this.worksheet._rows.forEach((row) => {
      if (row._number >= limite_ini && row._number <= limite_fin) row.height = heightRow || 30;
    });

    //Ajusta todas las celdas al tamaño del texto
    //Asigna formato (money) a las columnas seleccionadas
    this.worksheet.columns.forEach((column) => {
      let width = 0;
      let id_columna = column._number;
      let config_column = $this.content.tabla.columnas[id_columna - 1] || false;

      column.eachCell({ includeEmpty: false }, (cell) => {
        let coord = null;
        let columna = null;
        let parent_columna = null;
        let col2 = cell._address.substring(1, 2);
        // Condicion evaluando si hay mas de 26 columnas
        if (isNaN(parseFloat(col2))) {
          coord = parseInt(cell._address.substr(2));
          columna = String.fromCharCode(96 + id_columna).toUpperCase();
          parent_columna = cell._address.substr(0, 2);
        } else {
          coord = parseInt(cell._address.substr(1));
          columna = String.fromCharCode(96 + id_columna).toUpperCase();
          parent_columna = cell._address.substr(0, 1);
        }

        cell.alignment = {
          vertical: "middle",
        };

        if (coord >= parseInt(limite_ini) && coord < parseInt(limite_fin) && cell._address != "A1") {
          let actual = cell.value ? (cell.value.length || 10) + 5 : 10;
          width = actual > width ? actual : width;
        }

        if (coord > parseInt(limite_ini) && columna == parent_columna && config_column && config_column.format && config_column.format == "money")
          cell.numFmt = "$#,##0.00;[Red]-$#,##0.00";

        if (coord > parseInt(limite_ini) && columna == parent_columna && config_column && config_column.format && config_column.format == "fecha")
          cell.numFmt = "dd/mm/yyyy";
      });

      column.width = column._number == 1 && width < 20 ? 20 : width;
    });

    return true;
  }

  async writexlsx() {
    let name = `${this.ruta_guardado}${this.nombre_archivo}.xlsx`;
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: this.blobType });
      FileSaver.saveAs(blob, name);
    });

    // await this.workbook.xlsx.writeFile(name);
    // child(name);
  }
}

const impresion = function (params) {
  let formato = new impresionExcel(params);
  formato.imprimir();
  index.commit("isLoading", null, { root: true });
};

export default impresion;
