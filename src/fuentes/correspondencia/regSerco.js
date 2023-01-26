function getObjRegSerco() {
  return {
    codigo: "",
    descripcion: "",
    operCre: "",
    fechaCre: "",
    operMod: "",
    fechaMod: "",
  };
}
function getObjRegSerco_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    descripcion: {
      id: "descripcion",
      label: "Descripción",
      max_length: "30",
      required: true,
      disabled: true,
    },
    operCre: {
      id: "operCre",
      label: "Creado por",
      max_length: "30",
      disabled: true,
    },
    operMod: {
      id: "operMod",
      label: "Modificado por",
      max_length: "30",
      disabled: true,
    },
    fechaCre: {
      id: "fechaCre",
      label: "Fecha creación",
      max_length: "30",
      disabled: true,
    },
    fechaMod: {
      id: "fechaMod",
      label: "Fecha creación",
      max_length: "30",
      disabled: true,
    },
  };
}
export { getObjRegSerco_, getObjRegSerco };
