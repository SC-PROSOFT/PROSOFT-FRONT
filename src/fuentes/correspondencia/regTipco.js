function getObjRegTipco() {
  return {
    codigo: "",
    descripcion: "",
    dias: "",
  };
}

function getObjRegTipco_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "2",
      disabled: true,
      f8: true,
    },

    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "20",
      disabled: true,
    },

    dias: {
      id: "dias",
      label: "Maximo dias respuesta",
      max_length: "10",
      disabled: true,
    },
  };
}

export { getObjRegTipco_, getObjRegTipco };
