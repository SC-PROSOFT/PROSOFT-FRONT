function getObjRegSucur() {
  return {
    cod: "",
    descrip: "",
    almacen: "",
    cod_ciu: "",
    tel: "",
    direcc: "",
    activo: "",
    fe_vtacontado: "",
  };
}

function getObjRegSucur_() {
  return {
    cod: {
      id: "cod",
      label: "Sucursal",
      max_length: "2",
      disable: true,
      require: true,
      f8: " true",
    },
    descrip: {
      id: "descrip",
      label: "Clase servicio",
      // max_length: "1",
      disable: true,
      require: true,
      f8: " true",
    },
    almacen: {
      id: "almacen",
      label: "Almacen",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
    cod_ciu: {
      id: "cod_ciu",
      label: "Codigo ciudad",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
    tel: {
      id: "tel",
      label: "Telefono",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
    direcc: {
      id: "direcc",
      label: "Direccion",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
    activo: {
      id: "activo",
      label: "Activo",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
    fe_vtacontado: {
      id: "fe_vtacontado",
      label: "fe_vtacontado",
      max_length: "6",
      disable: true,
      require: true,
      // f8: " true",
    },
  };
}

export { getObjRegSucur, getObjRegSucur_ };
