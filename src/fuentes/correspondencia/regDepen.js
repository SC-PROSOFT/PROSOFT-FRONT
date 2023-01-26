function getObjRegDep() {
  return {
    codigo: "",
    descripcion: "",
    responsable: "",
    oper: "",
    codSerco: "",
    cargo: "",
    correo: "",
  };
}
function getObjRegDep_() {
  return {
    codigo: {
      id: "codigo",
      label: "Codigo",
      tipo: "number",
      max_length: "3",
      disabled: true,
      required: true,
      f8: true,
    },
    codSerco: {
      id: "codSerco",
      label: "Codigo",
      f8: true,
      max_length: "3",
      disabled: true,
    },
    descripcion: {
      id: "descripcion",
      label: "Descripción dependencia",
      max_length: "30",
      disabled: true,
    },
    responsable: {
      id: "responsable",
      label: "Funcionario responsable",
      max_length: "30",
      disabled: true,
    },
    cargo: {
      id: "cargo",
      label: "Cargo funcionario",
      max_length: "30",
      disabled: true,
    },
    correo: {
      id: "correo",
      label: "Correo electronico",
      max_length: "150",
      disabled: true,
    },
    oper: {
      id: "oper",
      f8: true,
      label: "Operador",
      max_length: "4",
      disabled: true,
    },
  };
}
export { getObjRegDep_, getObjRegDep };
