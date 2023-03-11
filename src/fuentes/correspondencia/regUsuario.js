function getObjRegUsuario() {
  return {
    usuario: "",
    contrasena: "",
  };
}
function getObjRegUsuario_() {
  return {
    usuario: {
      id: "usuario",
      label: "usuario",
      max_length: "4",
      disabled: false,
      required: true,
    },
    contrasena: {
      id: "contrasena",
      label: "contrasena",
      max_length: "10",
      disabled: true,
    },
  };
}
export { getObjRegUsuario, getObjRegUsuario_ };
