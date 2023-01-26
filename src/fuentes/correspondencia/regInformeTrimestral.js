function getInformeTrimestral() {
  return {
    anio: "",
  };
}

function getInformeTrimestral_() {
  return {
    anio: {
      id: "anio",
      label: "Año de consulta",
      max_length: "10",
      disabled: true,
    },
  };
}

export { getInformeTrimestral, getInformeTrimestral_ };
