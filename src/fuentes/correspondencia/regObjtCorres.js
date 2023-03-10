function getObjCorres() {
  return {
    ubicacion: "string",
    direct: "",
    subdirect: "",
    llave: {
      anoLlave: "",
      cont: "",
    },
    soy_una_perra: "",
    fecha: "",
    hora: "",
    nit: "",
    descripTer: "",
    tipoCorres: "",
    descripTipco: "",
    descrip: "",
    ser: "",
    descripSer: "",
    operdiri: "",
    dep: "",
    responsableDep: "",
    correoDep: "",
    fol: "",
    fold: "",
    esta: "",
    anex: "",
    tipoAnexo: "",
    otroAnexo: "",
    nroFact: "",
    monto: 0,
    fechaFact: "",
    fechaEntre: "",
    nroGuia: "",
    persentre: "",
    tercero: "",
    observ: "",
    tablaDep: JSON.parse(JSON.stringify(Array(5).fill({ depTap: "", estaTab: 0 }))),
    codAux: "",
    descripAux: "",
    tablaOper: JSON.parse(JSON.stringify(Array(5).fill({ operdiri1: "" }))),
    llaveResp: {
      anoRes: "",
      contResPon: "",
    },
    errorRips: JSON.parse(JSON.stringify(Array(11).fill({ nroRips: "" }))),
    nroEnvio: "",
    proceden: "",
    deptoremi: "",
    descripDeptoremi: "",
    manejo: "",
    holding: "",
    centroCos: "",
    ciudad: "",
    cargoOps: "",
    loteCau: "",
    comprobCau: "",
    fechaCau: "",
    lotePag: "",
    comprobPag: "",
    fechaPag: "",
    oper: "",
    operModi: "",
    fechaModi: "",
    diasTipco: "",
    medioIng: "",
    contAtnt: 0,
    contAtnt1: 0,
    contAtnt2: 0,
    contAtnt3: 0,
    archivo_file: {},
  };
}

function getObjCorres_() {
  return {
    anoLlave: {
      id: "anoLlave",
      label: "Año radicado",
      tipo: "number",
      max_length: "4",
      disabled: true,
      required: true,
    },
    cont: {
      id: "cont",
      label: "Nro radicado",
      tipo: "number",
      max_length: "10",
      required: true,
      disabled: true,
      f8: true,
    },
    manejo: {
      id: "manejo",
      label: "Manejo",
      items: [
        { id: 1, text: "1 - INFORMATIVO" },
        { id: 2, text: "2 - RESOLUTIVO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    proceden: {
      id: "proceden",
      label: "Procedencia",
      items: [
        { id: 1, text: "1 - EXTERNO" },
        { id: 2, text: "2 - INTERNO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    fecha: {
      id: "fecha",
      label: "Fecha",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },
    hora: {
      id: "hora",
      label: "Hora",
      tipo: "time",
      max_length: "5",
      disabled: true,
    },
    nit: {
      id: "nit",
      label: "Remitente",
      max_length: "10",
      tipo: "number",
      disabled: true,
      f8: true,
    },
    descripTer: {
      id: "descripTer",
      label: "Descripción",
      max_length: "30",
      disabled: true,
    },
    deptoremi: {
      id: "deptoremi",
      label: "Dependencia",
      max_length: "5",
      disabled: true,
      required: true,
      f8: true,
    },
    descripDeptoremi: {
      id: "descripDeptoremi",
      label: "Descripción remitentes",
      max_length: "30",
      disabled: true,
    },
    tipoCorres: {
      id: "tipoCorres",
      max_length: "2",
      disabled: true,
      required: true,
      label: "Tipo correspondencia",
      f8: true,
    },
    descripTipco: {
      id: "descripTipco",
      label: "Descripción tipo correspondencia",
      max_length: "50",
      disabled: true,
    },
    diasTipco: {
      id: "diasTipco",
      label: "Máximo dias",
      max_length: "10",
      disabled: true,
    },
    fechaCau: {
      id: "fechaCau",
      label: "Fecha limite",
      max_length: "30",
      disabled: true,
    },
    contAtnt: {
      id: "contAtnt",
      label: "Radicados anteriores",
      max_length: "10",
      tipo: "number",
      disabled: true,
      required: true,
      f8: true,
    },
    contAtnt1: {
      id: "contAtnt1",
      label: "Radicado Ant. 1 Nro",
      max_length: "10",
      tipo: "number",
      disabled: true,
    },
    contAtnt2: {
      id: "contAtnt2",
      label: "Radicado Ant. 2 Nro",
      max_length: "10",
      tipo: "number",
      disabled: true,
    },
    contAtnt3: {
      id: "contAtnt3",
      label: "Radicado Ant. 3 Nro",
      max_length: "10",
      tipo: "number",
      disabled: true,
    },
    codAux: {
      id: "codAux",
      label: "Aux tip",
      tipo: "number",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    descripAux: {
      id: "descripAux",
      label: "Descripción",
      max_length: "30",
      disabled: true,
    },
    descrip: {
      id: "descrip",
      label: "Descripción",
      max_length: "45",
      disabled: true,
    },
    ser: {
      id: "ser",
      label: "Dependencia destino",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    descripSer: {
      id: "descripSer",
      label: "Descripción",
      max_length: "40",
      disabled: true,
    },
    dep: {
      id: "dep",
      label: "Personal destino",
      max_length: "3",
      tipo: "number",
      disabled: true,
      required: true,
      f8: true,
    },
    responsableDep: {
      id: "responsableDep",
      label: "Responsable",
      max_length: "50",
      disabled: true,
    },

    fol: {
      id: "fol",
      label: "Folios",
      max_length: "3",
      disabled: true,
    },
    fold: {
      id: "fold",
      label: "De",
      max_length: "3",
      disabled: true,
    },
    anex: {
      id: "anex",
      label: "Anexos",
      max_length: "3",
      tipo: "number",
      disabled: true,
    },
    tipoAnexo: {
      id: "tipoAnexo",
      label: "Tipo anexo",
      items: [
        { id: 1, text: "1 - DISQUETE" },
        { id: 2, text: "2 - CD-R" },
        { id: 3, text: "3 - DISCO DURO" },
        { id: 4, text: "4 - USB" },
        { id: 5, text: "5 - PC-CARDS" },
        { id: 6, text: "6 - OTROS" },
      ],
      item_value: "id",
      disabled: true,
    },
    otroAnexo: {
      id: "otroAnexo",
      label: "Otro anexo",
      max_length: "20",
      disabled: true,
    },

    nroFact: {
      id: "nroFact",
      label: "Nro factura",
      max_length: "20",
      disabled: true,
    },
    monto: {
      id: "monto",
      label: "Valor factura",
      max_length: "15",
      tipo: "moneda",
      disabled: true,
    },
    fechaFact: {
      id: "fechaFact",
      label: "Fecha documento",
      max_length: "10",
      disabled: true,
      tipo: "date",
    },
    fechaEntre: {
      id: "fechaEntre",
      max_length: "10",
      label: "Fecha entrega",
      tipo: "date",
      disabled: true,
    },
    medioIng: {
      id: "medioIng",
      label: "Medio de ingreso",
      max_length: "20",
      items: [
        { id: 1, text: "1 - CORREO CERTIFICADO" },
        { id: 2, text: "2 - E-MAIL" },
        { id: 3, text: "3 - PERSONAL" },
        { id: 4, text: "4 - PERSONAL ESCRITO" },
        { id: 5, text: "5 - PERSONAL VERBAL" },
        { id: 6, text: "6 - PAGINA WEB" },
      ],
      item_value: "id",
      disabled: true,
    },
    nroGuia: {
      id: "nroGuia",
      label: "Nro guia",
      max_length: "20",
      disabled: true,
    },
    persentre: {
      id: "persentre",
      label: "Nombre de persona/Empresa",
      max_length: "50",
      disabled: true,
    },
    observ: {
      id: "observ",
      label: "Observaciones",
      max_length: "5700",
      disabled: true,
      rows: "6",
    },
    esta: {
      id: "esta",
      label: "Estado de correspondencia",
      items: [
        { id: 1, text: "1 - EN TRAMITE" },
        { id: 2, text: "2 - VENCIDA" },
        { id: 3, text: "3 - RESUELTA" },
        { id: 4, text: "4 - RESUELTA" },
        { id: 5, text: "5 - PRORROGA" },
        { id: 6, text: "6 - ANULADO" },
      ],
      item_value: "id",
      disabled: true,
    },
    oper: {
      id: "oper",
      label: "Operador",
      max_length: "60",
      disabled: true,
    },
    archivo_file: {
      id: "archivo_file",
      label: "Seleccionar archivo",
      file: "application/pdf, application/vnd.ms-excel",
    },
  };
}

export { getObjCorres, getObjCorres_ };
