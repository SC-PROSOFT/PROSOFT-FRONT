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
    monto: "",
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
    contAtnt: "",
    contAtnt1: "",
    contAtnt2: "",
    contAtnt3: "",

    personal_1: "",
    personal_2: "",
    personal_3: "",
    personal_4: "",
    personal_5: "",

    descripPer_1: "",
    descripPer_2: "",
    descripPer_3: "",
    descripPer_4: "",
    descripPer_5: "",

    correoPer_1: "",
    correoPer_2: "",
    correoPer_3: "",
    correoPer_4: "",
    correoPer_5: "",

    oper_1: "",
    oper_2: "",
    oper_3: "",
    oper_4: "",
    oper_5: "",

    manejo_1: "",
    manejo_2: "",
    manejo_3: "",
    manejo_4: "",
    manejo_5: "",

    inluir_correo_1: false,
    inluir_correo_2: false,
    inluir_correo_3: false,
    inluir_correo_4: false,
    inluir_correo_5: false,
  };
}

function getObjCorres_() {
  return {
    anoLlave: {
      id: "anoLlave",
      label: "A??o radicado",
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
    manejo_1: {
      id: "manejo_1",
      label: "Tramite",
      items: [
        { id: 1, text: "1 - INFORMATIVO" },
        { id: 2, text: "2 - RESOLUTIVO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    manejo_2: {
      id: "manejo_2",
      label: "Tramite",
      items: [
        { id: 1, text: "1 - INFORMATIVO" },
        { id: 2, text: "2 - RESOLUTIVO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    manejo_3: {
      id: "manejo_3",
      label: "Tramite",
      items: [
        { id: 1, text: "1 - INFORMATIVO" },
        { id: 2, text: "2 - RESOLUTIVO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    manejo_4: {
      id: "manejo_4",
      label: "Tramite",
      items: [
        { id: 1, text: "1 - INFORMATIVO" },
        { id: 2, text: "2 - RESOLUTIVO" },
      ],
      item_text: "text",
      item_value: "id",
      disabled: true,
    },
    manejo_5: {
      id: "manejo_5",
      label: "Tramite",
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
      max_length: "12",
      tipo: "number",
      disabled: true,
      f8: true,
    },
    descripTer: {
      id: "descripTer",
      label: "Descripci??n",
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
      label: "Descripci??n remitentes",
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
      label: "Descripci??n tipo correspondencia",
      max_length: "50",
      disabled: true,
    },
    diasTipco: {
      id: "diasTipco",
      label: "M??ximo dias",
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
      label: "Descripci??n",
      max_length: "30",
      disabled: true,
    },
    descrip: {
      id: "descrip",
      label: "Descripci??n",
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

    personal_1: {
      id: "personal_1",
      label: "Personal traslado",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    personal_2: {
      id: "personal_2",
      label: "Personal traslado",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    personal_3: {
      id: "personal_3",
      label: "Personal traslado",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    personal_4: {
      id: "personal_4",
      label: "Personal traslado",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    personal_5: {
      id: "personal_5",
      label: "Personal traslado",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },

    descripPer_1: {
      id: "descripPer_1",
      label: "Descripci??n",
    },
    descripPer_2: {
      id: "descripPer_2",
      label: "Descripci??n",
    },
    descripPer_3: {
      id: "descripPer_3",
      label: "Descripci??n",
    },
    descripPer_4: {
      id: "descripPer_4",
      label: "Descripci??n",
    },
    descripPer_5: {
      id: "descripPer_5",
      label: "Descripci??n",
    },

    correoPer_1: {
      id: "correoPer_1",
      label: "Correo",
    },
    correoPer_2: {
      id: "correoPer_2",
      label: "Correo",
    },
    correoPer_3: {
      id: "correoPer_3",
      label: "Correo",
    },
    correoPer_4: {
      id: "correoPer_4",
      label: "Correo",
    },
    correoPer_5: {
      id: "correoPer_5",
      label: "Correo",
    },

    oper_1: {
      id: "oper_1",
      label: "Operador",
    },
    oper_2: {
      id: "oper_2",
      label: "Operador",
    },
    oper_3: {
      id: "oper_3",
      label: "Operador",
    },
    oper_4: {
      id: "oper_4",
      label: "Operador",
    },
    oper_5: {
      id: "oper_5",
      label: "Operador",
    },

    descripSer: {
      id: "descripSer",
      label: "Descripci??n",
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
    inluir_correo_1: {
      id: "inluir_correo_1",
      label: "Enviar correo",
      disabled: true,
    },
    inluir_correo_2: {
      id: "inluir_correo_2",
      label: "Enviar correo",
      disabled: true,
    },
    inluir_correo_3: {
      id: "inluir_correo_3",
      label: "Enviar correo",
      disabled: true,
    },
    inluir_correo_4: {
      id: "inluir_correo_4",
      label: "Enviar correo",
      disabled: true,
    },
    inluir_correo_5: {
      id: "inluir_correo_5",
      label: "Enviar correo",
      disabled: true,
    },
    oper: {
      id: "oper",
      label: "Operador",
      max_length: "60",
      disabled: true,
    },
  };
}

export { getObjCorres, getObjCorres_ };
