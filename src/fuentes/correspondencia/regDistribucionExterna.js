function getObjRegDistribucionExterna() {
    return {
      entidad: "",
      entidad_dataCard: "",
  
      depen_corres: "",
      depen_corres_dataCard: "",
  
      tipo_corres: "",
      tipo_corres_dataCard: "",
  
      fecha_init: "",
      fecha_fin: "",
      
      jornada: "",
  
      procedencia: "",
  
      manejo: "",
    };
  }
  function getObjRegDistribucionExterna_() {
    return {
      entidad: {
        id: "entidad",
        label: "Entidad",
        max_length: "10",
        disabled: true,
        f8: true,
        busqueda: "entidad",
      },
      entidad_dataCard: {
        id: "entidad_dataCard",
      },
  
      depen_corres: {
        id: "depen_corres",
        label: "Dependencia tiene correspondencia",
        max_length: "3",
        disabled: true,
        f8: true,
        busqueda: "depen_corres",
      },
      depen_corres_dataCard: {
        id: "depen_corres_dataCard",
      },
  
      tipo_corres: {
        id: "tipo_corres",
        label: "Tipo de correspondencia",
        max_length: "2",
        disabled: true,
        f8: true,
        busqueda: "tipo_corres",
      },
      tipo_corres_dataCard: {
        id: "tipo_corres_dataCard",
      },
  
      fecha_init: {
        id: "fecha_init",
        label: "Fecha inicial",
        tipo: "date",
        max_length: "10",
        disabled: true,
      },
  
      fecha_fin: {
        id: "fecha_fin",
        label: "Fecha final",
        tipo: "date",
        max_length: "10",
        disabled: true,
      },
  
      jornada: {
        id: "jornada",
        label: "Jornada",
        max_length: "10",
        disabled: true,
        items: [
          {
            id: "M",
            text: "Mañana",
          },
          {
            id: "T",
            text: "Tarde",
          },
          {
            id: "**",
            text: "Todas",
          },
        ],
        item_value: "id",
        item_text: "text",
      },
  
      procedencia: {
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
  
      manejo: {
        id: "manejo",
        label: "Manejo",
        max_length: "10",
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
          {
            id: "**",
            text: "Todas",
          },
        ],
        item_value: "id",
        item_text: "text",
      },
    };
  }
  export { getObjRegDistribucionExterna, getObjRegDistribucionExterna_ };
  