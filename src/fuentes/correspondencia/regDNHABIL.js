function getObjectDNHABIL() {
  return {
    date: "",
    descripcion: "",
  };
}

function getObjectDNHABIL_() {
  return {
    date: {
      id: "date",
      label: "Fecha",
      max_length: "10",
      tipo: "date",
      disabled: true,
    },
    descripcion: {
      id: "descripcion",
      label: "Descripción",
      tipo: "string",
      max_length: "70",
    },
  };
}

export { getObjectDNHABIL_, getObjectDNHABIL };
