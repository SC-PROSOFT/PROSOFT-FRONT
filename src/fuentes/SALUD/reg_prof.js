function getObjRegProf() {
  return {
    cod: "",
    descrip: "",
    reg_med: "",
    tabla_cl: JSON.parse(JSON.stringify(Array(7).fill(""))),
    tabla_esp: JSON.parse(JSON.stringify(Array(10).fill({ esp: "", descrip: "" }))),
    oper_aut: "",
    oper_aut_ciru: "",
    oper_aut_otro: "",
    rango_bloq: "",
    cta_ret: "",
    cantd_citas: "",
    div2: "",
    int_min: "",
    tabla_turnos: JSON.parse(
      JSON.stringify(
        Array(7).fill(
          JSON.parse(
            JSON.stringify(
              Array(4).fill({
                sucu_ini: "",
                descrip_sucu: "",
                hora_ini: "",
                min_ini: "",
                hora_fin: "",
                min_fin: "",
                int_min: "",
              })
            )
          )
        )
      )
    ),
    deshabil: {
      fecha_ini: {
        anio: "",
        mes: "",
        dia: "",
      },
      hora_ini: {
        hr: "",
        mn: "",
      },
      fecha_fin: {
        anio: "",
        mes: "",
        dia: "",
      },
      hora_fin: {
        hr: "",
        mn: "",
      },
    },
    sobreage: "",
    asoc: "",
    forma_age: "",
    estado: "",
    div: "",
    atiende: "",
    descrip_atiende: "",
    contrato: "",
    porcent: "00",
    imp_birad: "",
    imp_norm: "",
    imp_dvd: "",
    oper_aut_4: "",
    oper_aut_5: "",
    operador_asigna: "",
    detalle: "",
    sucursal: { sucur: "", ciud_sucu: "" },
    oper: "",
    fecha: "",
    oper_aut_6: "",
    oper_aut_7: "",
    oper_aut_8: "",
    oper_aut_9: "",
    oper_aut_10: "",
  };
}

function getObjRegProf_() {
  return {
    cod: {
      id: "cod",
      label: "ID Profesional",
      placeholder: "Insertar codigo profesional",
      disable: true,
      require: true,
      f8: true,
    },
    descrip: {
      id: "descrip",
      label: "Atendió",
      placeholder: "Atendió",
      disable: true,
      require: true,
    },
    descrip_atiende: {
      id: "descrip_atiende",
      label: "Detalle",
      placeholder: "Detalle",
      disable: true,
      require: true,
    },
  };
}

export { getObjRegProf, getObjRegProf_ };
