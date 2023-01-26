function getObjRegHolding() {
  return {
    codigo: "",
    descripcion: "",
    activa: "",
  };
}

function getObjRegHolding_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "10",
      disabled: true,
      f8: true,
    },

    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "30",
      disabled: true,
    },

    activa: {
      id: "activa",
      label: "Activado",
      max_length: "1",
      disabled: true,
    },
  };
}

export { getObjRegHolding_, getObjRegHolding };
