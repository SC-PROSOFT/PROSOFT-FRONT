function msgCON851P(data) {
  let texto = "";
  switch (data.code) {
    case "00":
      texto = `¿Generar Impresión${data.descrip}?`;
      break;
    case "01":
      texto = "¿Desea grabar datos?";
      break;
    case "02":
      texto = "¿Eliminar documento?";
      break;
    case "03":
      texto = "¿Salir sin grabar?";
      break;
    case "04":
      texto = "¿Continuar el proceso?";
      break;
    case "05":
      texto = "¿Proceso total?";
      break;
    case "06":
      texto = "¿Abrir excel?";
      break;
    case "07":
      texto = "¿Documento ya existe, desea reprocesar?";
      break;
    case "08":
      texto = "¿Codigo NO existe, desea crear?";
      break;
    case "09":
      texto = `¿Desea actualizar ${data.descrip}?`;
      break;
    case "10":
      texto = "¿Desea marcar el documento fact?";
      break;
    case "11":
      texto = "¿Imprimir Stiker ?";
      break;
    case "12":
      texto = "¿Mostrar Preparaciòn ?";
      break;
    case "13":
      texto = "¿Abrir Nuevo Folio   ?";
      break;
    case "14":
      texto = "¿Adicionar mas Registros?";
      break;
    case "15":
      texto = "¿Factura ya existe, adicionar?";
      break;
    case "16":
      texto = "¿Liquidar Flete?";
      break;
    case "17":
      texto = "¿Enviar directo a la impres.?";
      break;
    case "18":
      texto = "¿Desea convertir CRT EN SCL ?";
      break;
    case "19":
      texto = "¿Pretende un cambio peligroso ";
      break;
    case "20":
      texto = "¿Diligenciar formulario NOPOS?";
      break;
    case "21":
      texto = "¿Generar Imagen?";
      break;
    case "22":
      texto = "¿Solicitar Autorizacion EPS  ?";
      break;
    case "23":
      texto = "¿Bloquear impresion?";
      break;
    case "24":
      texto = "¿Actualizar corresponsalia?";
      break;
    case "25":
      texto = "¿Desea trasladar documento";
      break;
    case "26":
      texto = "¿Desea actualizar votante?";
      break;
    case "27":
      texto = "¿Desea imprimir recomendaciones";
      break;
    case "28":
      texto = "¿Diligenciar procedimien. NOPOS";
      break;
    case "29":
      texto = "¿Historia perinatal ?";
      break;
    case "30":
      texto = "¿Aplica para exam. laboratorio?";
      break;
    case "31":
      texto = "¿Aplica para exam. paraclinicos";
      break;
    case "32":
      texto = "¿Ya fue radicada, es un reenvio?";
      break;
    case "33":
      texto = "¿Imprimir recomendaciones dengue?";
      break;
    case "34":
      texto = "¿Desea Cancelar solicitud?";
      break;
    case "35":
      texto = "¿Desea Instalar JAVA?";
      break;
    case "37":
      texto = "¿FINALIZAR PARTOGRAMA?";
      break;
    case "38":
      texto = "¿REABRIR PARTOGRAMA?";
      break;
    case "39":
      texto = "¿Desea crear nueva factura?";
      break;
    case "40":
      texto = "¿Desea diligenciar Apache ?";
      break;
    case "41":
      texto = "¿Llenar formular. Complementario?";
      break;
    case "42":
      texto = "¿Desea formula trimestral?";
      break;
    case "43":
      texto = "¿Desea mostrar Bases?";
      break;
    case "44":
      texto = "¿Enviar Reporte via Email?";
      break;
    case "45":
      texto = "¿Continuar sin cita Medica";
      break;
    case "46":
      texto = "¿Enviar Mensaje de texto";
      break;
    case "47":
      texto = "¿Ya Escaneo el documento";
      break;
    case "48":
      texto = "¿Demanda inducida";
      break;
    case "49":
      texto = "¿Cerrar historioas clinicas";
      break;
    case "50":
      texto = "¿Desea Reliquidar Comprobantes";
      break;
    case "51":
      texto = "¿Asignar Cama";
      break;
    case "52":
      texto = "¿Cerrar control de transfusion?";
      break;
    case "53":
      texto = "¿Imprimir Anexo tecnico?";
      break;
    case "54":
      texto = `¿Desea eliminar ${data.descrip}?`;
      break;
    case "55":
      texto = "¿Mostrar los eventos marcados como leídos?";
      break;
    case "56":
      texto = "¿Desea formular semestral?";
      break;
    case "58":
      texto = "¿Vacuna para covid-19";
      break;
    case "59":
      texto = "¿Víctima de conflicto?";
      break;
    case "consen":
      texto = "¿Seguro que quiere revocar consentimiento?";
      break;
    case "macro":
      texto = "¿Seguro que quiere reemplazar por la macro?";
      break;
    case "90":
      texto = "¿Licencia proxima a expirar";
      break;
    case "IC":
      texto = "Guardar cofiguración de impresora?";
      break;
    case "temp":
      texto = "La historia fue creada como TEMPORAL, seguro que desea salir sin finalizar ?";
      break;
    case "CONFI-07":
      texto = "¿Desea crear contabilidad?";
      break;
    case "CONFI-01":
      texto = "¿Desea eliminar contabilidad?";
      break;
    case "SALIR":
      texto = "¿Desea cerrar sesión?";
      break;
    case "MENU":
      texto = "¿Desea volver al menu principal?";
      break;
    case "PNZ":
      texto = `${data.descrip}`;
      break;
    default:
      texto = data.code;
      break;
  }
  return texto;
}
export { msgCON851P };
