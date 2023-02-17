function getObjRegPaci() {
  return {
    cod: "",
    tipo_id: "",
    _1er_apel: "",
    _2do_apel: "",
    _1er_nom: "",
    _2do_nom: "",
    descrip: "",
    nacim: {
      anio: "",
      mes: "",
      dia: "",
    },
    sexo: "",
    ciudad: "",
    nombre_ciudad: "",
    zona: "",
    tipo: "",
    eps: "",
    nombre_eps: "",
    tipo_afil: "",
    nro_afil: "",
    id_cotiz: "",
    contrato: "",
    ficha: "",
    estrato: "",
    acompa: {
      _1er_apela: "",
      _2do_apela: "",
    },
    clasif: "",
    est_civ: "",
    num_tele: {
      indic: "",
      telefono: "",
    },
    direcc: "",
    ocup: "",
    descrip_ocup: "",
    derecho: "",
    resultado_covid19: "",
    lgbti: "",
    cronico: "",
    parent: "",
    empresa: "",
    observ: "",
    nov: "",
    fecha_nov: {
      anio: "",
      mes: "",
      dia: "",
    },
    fecha_vence: {
      anio: "",
      mes: "",
      dia: "",
    },
    fecha_afil: {
      anio: "",
      mes: "",
      dia: "",
    },
    restric: {
      rest_apli: "",
      rest_drog: "",
      rest_ciru: "",
      rest_labo: "",
      rest_imag: "",
      rest_esta: "",
      rest_cons: "",
      rest_terf: "",
      rest_tero: "",
      rest_odon: "",
      rest_pyp: "",
    },
    hemoclas: {
      grp_sang: "",
      rh: "",
    },
    ult_mamo: {
      anio: "",
      mes: "",
    },
    nit_fact: "",
    nombre_nit_fact: "",
    fecha_nit: {
      anio: "",
      mes: "",
      dia: "",
    },
    anteced_cancer: "",
    etnia: "",
    padre: "",
    madre: "",
    num_cel: {
      indic_cel: "",
      cel: "",
    },
    num_acom: {
      tel_indic_acom: "",
      tel_acom: "",
    },
    copago: "",
    alt_cos: "",
    emb_alto_riesg: "",
    niv_estud: "",
    cert_estud: {
      anio: "",
      mes: "",
    },
    fecha_ret: {
      anio: "",
      mes: "",
      dia: "",
    },
    e_mail: "",
    med_fami: "",
    instituto: "",
    patol_cronic: "",
    peri_estud: "",
    cert_econo: {
      anio: "",
      mes: "",
    },
    peri_eco: "",
    etnia_ind: "",
    tipo_pobl: "",
    discap: "",
    cabeza_fam: "",
    tutela: "",
    ocup_v8: "",
    prog_esp: "",
    multiconsul: "",
    cod_origen: "",
    deman_indu: "",
    fecha_deman_indu: {
      anio: "",
      mes: "",
      dia: "",
    },
    victi_conflicto: "",
    bloqueo_hc: "",
    nom_comunidad: "",
    nom_resguardo: "",
    pais_orig: "",
    cont_web: "",
    regis_web: "",
    portabilidad: "",
    ciudad_aseg: "",
    vict_abuso_sex: "",
    lugar_id: "",
    candidato_pyp: "",
    diabetes: "",
    finalidad_pyp: "",
    tiene_pagare: "",
    fact_pagare: {
      pref_fact_pagare: "",
      nro_fact_pagare: "",
    },
    valor_parage: "",
    datos_acomp: {
      tipo_id_acomp: "",
      id_acomp: "",
    },
    acompa2: {
      _1er_nomac: "",
      _2do_nomac: "",
    },
    cod_barrio: "",
    descrip_barrio: "",
    comunidad: "",
    notas: {
      fecha_nota_pac2: {
        anio: "",
        mes: "",
        dia: "",
      },
      observ_nota_pac2: "",
      oper_obse_nota_pac2: "",
      fact_nota_pac2: {
        prefijo_nota_pac2: "",
        numero_nota_pac2: "",
      },
    },
    dato_act: {
      oper_crea: "",
      fecha_crea: {
        anio: "",
        mes: "",
        dia: "",
      },
      hora_crea: {
        hr: "",
        mn: "",
      },
      oper_corr: "",
      fecha_corr: {
        anio: "",
        mes: "",
        dia: "",
      },
      hora_corr: {
        hr: "",
        mn: "",
      },
    },
  };
}

function getObjRegPaci_() {
  return {
    descrip: {
      id: "descrip",
      label: "Paciente",
      placeholder: "Paciente",
      disable: true,
      require: true,
    },
    cod: {
      id: "cod",
      label: "ID Paciente",
      placeholder: "ID Paciente",
      disable: true,
      require: true,
    },
  };
}

export { getObjRegPaci, getObjRegPaci_ };
