function getObjRegRest() {
  return {
    llaveOper: "",
    bloq: "",
    depen: "",
    dias: "",
    direct: "",
    fecha: "",
    id: "",
    clave: "",
    new_clave: "",
    admin: "",
    ser: "",
    nombre: "",
    restr: "",
    ser: "",
    serial: "",
    subdirect: "",
    sucur: "",
    ubicacion: "",
    vend: "",
  };
}
function getObjRegRest_() {
  return {
    llaveOper: {
      id: "llaveOper",
      label: "Operador",
      max_length: "4",
      disabled: true,
      f8: true,
    },
    clave: {
      id: "clave",
      label: "Clave",
      max_length: "8",
      disabled: true,
    },
    new_clave: {
      id: "new_clave",
      label: "Nueva clave",
      max_length: "8",
      disabled: true,
    },
    nombre: {
      id: "nombre",
      label: "Nombre",
      max_length: "30",
      disabled: true,
    },
    fecha: {
      id: "fecha",
      label: "Fecha",
      max_length: "30",
      disabled: true,
    },
    admin: {
      id: "admin",
      label: "Admin",
      max_length: "30",
      disabled: true,
    },
    dias: {
      id: "dias",
      label: "Dias",
      tipo: "number",
      max_length: "30",
      disabled: true,
    },
    depen: {
      id: "depen",
      label: "Depen",
      max_length: "30",
      disabled: true,
    },
    ser: {
      id: "ser",
      label: "Ser",
      max_length: "30",
      disabled: true,
    },
    serial: {
      id: "serial",
      label: "Serial",
      max_length: "30",
      disabled: true,
    },
    id: {
      id: "id",
      label: "Id",
      max_length: "30",
      disabled: true,
    },
    bloq: {
      id: "bloq",
      label: "Id",
      max_length: "30",
      disabled: true,
    },
    sucur: {
      id: "sucur",
      label: "Sucursal",
      max_length: "30",
      disabled: true,
    },
    ven: {
      id: "ven",
      label: "Ven",
      max_length: "30",
      disabled: true,
    },
  };
}
export { getObjRegRest, getObjRegRest_ };
