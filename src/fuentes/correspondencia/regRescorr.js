function getRescorr() {
  return {
    codResp: {
      anoLlave: "",
      cont: "",
    },
    swRadi: "",

    anoRadi: "",

    contRadi: "",

    fechaRadi: "",

    horaRadi: "",

    nit: "",
    correoTer: "",
    nit_dataCard: "",

    dptoRemit: "",
    dptoRemit_dataCard: "",

    proceden: "",

    tipoCorres: "",
    tipoCorres_dataCard: "",

    codAuxco: "",
    codAuxco_dataCard: "",

    ser: "",
    ser_dataCard: "",

    dep: "",
    dep_dataCard: "",

    descrip: "",

    asunto: "",

    clMacro: "",
    codigoMacro: "",
    macro_dataCard: "",

    fecha: "",

    hora: "",

    macro: "",

    medio: "",

    numeroFact: "",

    monto: "",

    nroGuia: "",

    perRec: "",

    firma: "",
    firma_dataCard: "",

    cargo: "",

    esta: "",

    file: {},

    operModi: "",
    fechaModi: "",

    estaR: "",
  };
}

function getRescorr_() {
  return {
    anoLlave: {
      id: "anoLlave",
      label: "Res. año llave",
      max_length: "4",
      tipo: "number",
      required: true,
      disabled: true,
    },

    cont: {
      id: "cont",
      label: "Res. Radicado",
      max_length: "6",
      tipo: "number",
      required: true,
      disabled: true,
    },

    swRadi: {
      id: "swRadi",
      label: "¿Tiene radicado?",
      max_length: "1",
      disabled: true,
      items: [
        {
          id: 1,
          text: "Si",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    anoRadi: {
      id: "anoRadi",
      label: "Año radicado",
      max_length: "4",
      disabled: true,
      required: true,
    },

    contRadi: {
      id: "contRadi",
      label: "Nro. radicado",
      max_length: "6",
      disabled: true,
      f8: true,
    },

    fechaRadi: {
      id: "fechaRadi",
      label: "Fecha",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },

    horaRadi: {
      id: "horaRadi",
      label: "Hora",
      max_length: "5",
      disabled: true,
    },

    nit: {
      id: "nit",
      label: "Remitente",
      max_length: "12",
      disabled: true,
      f8: true,
    },
    nit_dataCard: {
      id: "nit_dataCard",
    },

    dptoRemit: {
      id: "dptoRemit",
      label: "Depto remit",
      max_length: "5",
      disabled: true,
      f8: true,
    },
    dptoRemit_dataCard: {
      id: "dptoRemit_dataCard",
    },

    proceden: {
      id: "proceden",
      label: "Procedencia",
      max_length: "15",
      disabled: true,

      items: [
        {
          id: 1,
          text: "Externo",
        },
        {
          id: 2,
          text: "Interno",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    tipoCorres: {
      id: "tipoCorres",
      label: "Tipo",
      max_length: "2",
      disabled: true,
      f8: true,
    },
    tipoCorres_dataCard: {
      id: "tipoCorres_dataCard",
    },

    codAuxco: {
      id: "codAuxco",
      label: "Aux Tip",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    codAuxco_dataCard: {
      id: "codAuxco_dataCard",
    },

    ser: {
      id: "ser",
      label: "Dpto",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    ser_dataCard: {
      id: "ser_dataCard",
    },

    dep: {
      id: "dep",
      label: "Responsable",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    dep_dataCard: {
      id: "dep_dataCard",
    },

    descrip: {
      id: "descrip",
      label: "Descripcion",
      max_length: "50",
      disabled: true,
    },

    asunto: {
      id: "asunto",
      label: "Asunto",
      max_length: "50",
      disabled: true,
    },

    clMacro: {
      id: "clMacro",
      label: "Tipo macro",
      max_length: "2",
      disabled: true,
      f8: true,
    },
    codigoMacro: {
      id: "codigoMacro",
      label: "Codigo macro",
      max_length: "6",
      disabled: true,
      f8: true,
    },
    macro_dataCard: {
      id: "macro_dataCard",
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
      max_length: "5",
      disabled: true,
    },

    macro: {
      id: "macro",
      label: "Macro",
      max_length: "5700",
      disabled: true,
      rows: "6",
    },

    medio: {
      id: "medio",
      label: "Medio de respuesta",
      max_length: "20",
      disabled: true,

      items: [
        {
          id: 1,
          text: "Correo certificado",
        },
        {
          id: 2,
          text: "E-mail",
        },
        {
          id: 3,
          text: "Personal",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    numeroFact: {
      id: "numeroFact",
      label: "Numero factura",
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

    nroGuia: {
      id: "nroGuia",
      label: "Nro guia",
      max_length: "20",
      disabled: true,
    },

    perRec: {
      id: "perRec",
      label: "Persona / Empresa que recibe el paquete",
      max_length: "50",
      disabled: true,
    },

    firma: {
      id: "firma",
      label: "Firma",
      max_length: "50",
      disabled: true,
    },
    firma_dataCard: {
      id: "firma_dataCard",
    },

    cargo: {
      id: "cargo",
      label: "Cargo",
      max_length: "30",
      disabled: true,
    },

    estaR: {
      id: "estaR",
      label: "Estado de Correspondencia",
      max_length: "20",
      disabled: true,
    },

    esta: {
      id: "esta",
      label: "Estado correspondencia",
      max_length: "30",
      disabled: true,

      items: [
        {
          id: 1,
          text: "En tramite",
        },
        {
          id: 2,
          text: "Vencida",
        },
        {
          id: 3,
          text: "Resuelta",
        },
        {
          id: 4,
          text: "Resuelta",
        },
        {
          id: 5,
          text: "Prorroga",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    file: {
      id: "file",
      label: "Agregar archivo",
      file: "application/pdf, application/vnd.ms-excel",
      disabled: true,
    },
  };
}

export { getRescorr, getRescorr_ };
