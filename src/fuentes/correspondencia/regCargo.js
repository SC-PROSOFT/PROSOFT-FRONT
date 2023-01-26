function getObjRegCargo() {
  return {
    codigo: "",
    descripcion: "",
    prueba: "",
  };
}
function getObjRegCargo_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "2",
      disabled: true,
      f8: true,
    },
    descripcion: {
      disabled: true,
      max_length: "30",
      id: "descripcion",
      label: "Descripción",
    },
    prueba: {
      rows: "3",
      id: "prueba",
      disabled: true,
      max_length: "30",
      label: "Descripción",
    },
  };
}
export { getObjRegCargo_, getObjRegCargo };
