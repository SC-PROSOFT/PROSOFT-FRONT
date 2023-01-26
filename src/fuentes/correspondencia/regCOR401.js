function getObjCOR401() {
  return {
    ano_llave: "",

    radicado: "",

    fecha: "",

    hora: "",

    remitente: "",
    remitente_dataCard: "",

    depto_remit: "",
    depto_remit_dataCard: "",

    tipo: "",
    tipo_dataCard: "",

    aux_tip: "",
    aux_tip_dataCard: "",

    manejo: "",

    procedencia: "",

    descripcion: "",

    drig_depto: "",
    drig_depto_dataCard: "",

    personal_destino: "",
    personal_destino_dataCard: "",

    folios: "",

    de: "",

    anexos: "",

    nro_factura: "",

    valor_factura: "",

    fecha_documento: "",

    fecha_entrega: "",

    centro_costos: "",
    centro_costos_dataCard: "",

    nro_guia: "",

    persona_entrega_corres: "",

    observaciones: "",

    estado_corres: "",
  };
}

function getObjCOR401_() {
  return {
    ano_llave: {
      id: "ano_llave",
      label: "Año llave",
      max_length: "4",
      required: true,
      disabled: true,
    },

    radicado: {
      id: "radicado",
      label: "Radicado",
      max_length: "9",
      disabled: true,
      required: true,
      f8: true,
    },

    fecha: {
      id: "fecha",
      label: "Fecha",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },

    hora: {
      id: "hora",
      label: "Hora",
      max_length: "5",
      disabled: true,
    },

    remitente: {
      id: "remitente",
      label: "Remitente",
      max_length: "12",
      disabled: true,
      f8: true,
    },
    remitente_dataCard: {
      id: "remitente_dataCard",
    },

    depto_remit: {
      id: "depto_remit",
      label: "Depto remit",
      max_length: "5",
      disabled: true,
      f8: true,
    },
    depto_remit_dataCard: {
      id: "depto_remit_dataCard",
    },

    tipo: {
      id: "tipo",
      label: "Tipo",
      max_length: "2",
      disabled: true,
      f8: true,
    },
    tipo_dataCard: {
      id: "tipo_dataCard",
    },

    aux_tip: {
      id: "tipo",
      label: "Aux Tip",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    aux_tip_dataCard: {
      id: "aux_tip_dataCard",
    },

    manejo: {
      id: "manejo",
      label: "Manejo",
      max_length: "15",
      disabled: true,

      items: [
        {
          id: "1",
          text: "Informativo",
        },
        {
          id: "2",
          text: "Resolutivo",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    procedencia: {
      id: "procedencia",
      label: "Procedencia",
      max_length: "15",
      disabled: true,

      items: [
        {
          id: "1",
          text: "Externo",
        },
        {
          id: "2",
          text: "Interno",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    descripcion: {
      id: "descripcion",
      label: "Descripcion",
      max_length: "50",
      disabled: true,
    },

    drig_depto: {
      id: "drig_depto",
      label: "Drig_depto",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    drig_depto_dataCard: {
      id: "drig_depto_dataCard",
    },

    personal_destino: {
      id: "personal_destino",
      label: "Personal destino",
      max_length: "3",
      disabled: true,
      f8: true,
    },
    personal_destino_dataCard: {
      id: "personal_destino_dataCard",
    },

    folios: {
      id: "folios",
      label: "Folios",
      max_length: "3",
      disabled: true,
    },

    de: {
      id: "de",
      label: "De",
      max_length: "3",
      disabled: true,
    },

    anexos: {
      id: "procedencia",
      label: "Procedencia",
      max_length: "10",
      disabled: true,
      items: [
        {
          id: "1",
          text: "Externo",
        },
        {
          id: "2",
          text: "Interno",
        },
        {
          id: "**",
          text: "Todas",
        },
      ],
      item_value: "id",
      item_text: "text",
    },

    nro_factura: {
      id: "nro_factura",
      label: "Nro. factura",
      max_length: "20",
      disabled: true,
    },

    valor_factura: {
      id: "valor_factura",
      label: "Valor factura",
      max_length: "15",
      disabled: true,
    },

    fecha_documento: {
      id: "fecha_documento",
      label: "Fecha documento",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },

    fecha_entrega: {
      id: "fecha_entrega",
      label: "Fecha entrega",
      tipo: "date",
      max_length: "10",
      disabled: true,
    },

    centro_costos: {
      id: "centro_costos",
      label: "Centro costos",
      max_length: "4",
      disabled: true,
      f8: true,
    },
    centro_costos_dataCard: {
      id: "centro_costos_dataCard",
    },

    nro_guia: {
      id: "nro_guia",
      label: "Nro. guia",
      max_length: "20",
      disabled: true,
    },

    persona_entrega_corres: {
      id: "persona_entrega_corres",
      label: "Nombre de persona/empresa que trae el paquete",
      max_length: "50",
      disabled: true,
    },

    observaciones: {
      id: "observaciones",
      label: "Observaciones",
      max_length: "5700",
      disabled: true,
    },

    estado_corres: {
      id: "estado_corres",
      label: "Estado de correspondencia",
      max_length: "50",
      disabled: true,
    },
  };
}

export { getObjCOR401, getObjCOR401_ };
