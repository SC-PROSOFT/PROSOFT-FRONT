function getCorrespondenciaImpresion() {
  return {
    entidad: "",
    entidad_descripcion: "",
    depenTipoCorres: "",
    depen_descripcion: "",
    tipoCorres: "",
    corres_descripcion: "",
    descartarTipoCorres: "",
    incluirRadiRes: "",
    fechaIni: "",
    fechaFin: "",
    jornada: "",
    procedencia: "",
    manejo: "",
    estado: "",
  };
}

function getCorrespondenciaImpresion_() {
  return {
    entidad: {
      id: "entidad",
      label: "Entidad",
      max_length: "10",
      disabled: true,
      f8: true,
    },
    entidad_descripcion: {
      id: "entidad_descripcion",
      label: "Descripción entidad",
      max_length: "30",
      disabled: true,
    },
    depenTipoCorres: {
      id: "depenTipoCorres",
      label: "Dependencia Correspondencia",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    depen_descripcion: {
      id: "depen_descripcion",
      label: "Descripción dependencia",
      max_length: "30",
      disabled: true,
    },
    tipoCorres: {
      id: "tipoCorres",
      label: "Tipo de Correspondencia",
      max_length: "2",
      disabled: true,
      f8: true,
    },
    corres_descripcion: {
      id: "corres_descripcion",
      label: "Tipo correspondenica",
      max_length: "30",
      disabled: true,
    },
    descartarTipoCorres: {
      id: "descartarTipoCorres",
      label: "Descartar Tipo Correspondencia",
      disabled: true,
      items: [
        { id: "S", text: "SI" },
        { id: "N", text: "NO " },
      ],
      item_value: "id",
      item_text: "text",
    },
    incluirRadiRes: {
      id: "incluirRadiRes",
      label: "Incluir Radicado Correspondencia",
      disabled: true,
      items: [
        { id: "S", text: "INCLUIR RESPUESTA" },
        { id: "N", text: "NO INCLUIR RESPUESTA" },
      ],
      item_value: "id",
      item_text: "text",
    },

    fechaIni: {
      id: "fechaIni",
      label: "Fecha Inicial",
      max_length: "10",
      tipo: "date",
      disabled: true,
    },
    fechaFin: {
      id: "fechaFin",
      label: "Fecha Final",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },
    jornada: {
      id: "jornada",
      label: "Jornada",
      disabled: true,
      items: [
        { id: "M", text: "MAÑANA" },
        { id: "T", text: "TARDE" },
        { id: "**", text: "TODAS" },
      ],
      item_value: "id",
      item_text: "text",
    },
    procedencia: {
      id: "procedencia",
      label: "Procedencia",
      disabled: true,
      items: [
        { id: "1", text: "EXTERNO" },
        { id: "2", text: "INTERNO" },
        { id: "**", text: "TODAS" },
      ],
      item_value: "id",
      item_text: "text",
    },

    manejo: {
      id: "manejo",
      label: "Manejo",
      disabled: true,
      items: [
        { id: "1", text: "INFORMATIVO" },
        { id: "2", text: "RESOLUTIVO" },
        { id: "**", text: "TODAS" },
      ],
      item_value: "id",
      item_text: "text",
    },
    estado: {
      id: "estado",
      label: "Estado",
      disabled: true,
      items: [
        { id: "1", text: "EN TRAMITE" },
        { id: "2", text: "VENCIDAS" },
        { id: "3", text: "RESUELTAS" },
        { id: "4", text: "PRORROGADA" },
        { id: "5", text: "ANULADO" },
        { id: "**", text: "TODAS" },
      ],
      item_value: "id",
      item_text: "text",
    },
  };
}

export { getCorrespondenciaImpresion, getCorrespondenciaImpresion_ };
