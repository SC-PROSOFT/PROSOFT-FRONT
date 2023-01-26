function getObjRegDepremi() {
  return {
    codigo: "",
    descripcion: "",
  };
}

function getObjRegDepremi_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "5",
      disabled: true,
      f8: true,
    },

    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "30",
      disabled: true,
    },
  };
}

export { getObjRegDepremi_, getObjRegDepremi };
