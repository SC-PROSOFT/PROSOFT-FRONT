function getObjRegAuxco() {
  return {
    codigo: "",
    codSerco: "",
    descripcion: "",
  };
}
function getObjRegAuxco_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    codSerco: {
      id: "codSerco",
      label: "Tipo serco",
      max_length: "2",
      disabled: true,
      f8: true,
    },

    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "50",
      disabled: true,
    },
  };
}

export { getObjRegAuxco, getObjRegAuxco_ };
