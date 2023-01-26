function getObjRegMacroRespuesta() {
  return {
    tipo: "",
    tipo_descripcion: "",
    codigo: "",
    descripcion: "",
    text: "",
  };
}

function getObjRegMacroRespuesta_() {
  return {
    tipo: {
      id: "tipo",
      label: "Tipo",
      max_length: "6",
      disabled: true,
      f8: true,
      required: true,

    },
    tipo_descripcion: {
      id: "tipo_descripcion",
      label: "Descripción Tipo",
      max_length: "30",
      disabled: true,
    },
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "6",
      disabled: true,
      required: true,

      f8: true,
    },

    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "50",
      required: true,
      disabled: true,
    },
    text: {
      id: "text",
      label: "Macros Correspondencia",
      max_length: "1000",
      required: true,
      disabled: true,
    },
  };
}
export { getObjRegMacroRespuesta_, getObjRegMacroRespuesta };
