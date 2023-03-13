export const msgCON851 = (codigo, descripcion) => {
    const mensajes = [
      { cod: "00", text: `Ya existe la llave digitada ${descripcion}` },
      { cod: "01", text: `No existe el codigo ${descripcion}!` },
      { cod: "02", text: `¡${descripcion} es es requerid@!` },
      { cod: "03", text: "¡Este dato es invalido!" },
      { cod: "04", text: " Falta % Ret. en plan cuentas   " },
      { cod: "05", text: " Dato repetido !                " },
      { cod: "06", text: " Documento es de otro NIT       " },
      { cod: "07", text: " No hay saldo disponible        " },
      { cod: "08", text: " No existe movimiento!          " },
      { cod: "09", text: " No hay saldo en el P.A.C.      " },
      { cod: "10", text: " No se pudo crear el archivo    " },
      { cod: "11", text: " Supera cupo asignado credito   " },
      { cod: "12", text: " Cliente lista negra (moroso)   " },
      { cod: "13", text: " Codigo desactivado             " },
      { cod: "14", text: " Transaccion restringida        " },
      { cod: "15", text: " Acceso restringido !!          " },
      { cod: "16", text: " Comprobante ya tiene recibo    " },
      { cod: "17", text: " Es el inicio del archivo !     " },
      { cod: "18", text: " No hay mas registros !         " },
      { cod: "19", text: " Empleado retirado!             " },
      { cod: "20", text: " Error! Concepto SALUD doble    " },
      { cod: "21", text: " Error! Concepto PENSION doble  " },
      { cod: "22", text: " Diferente cargo en una nomina  " },
      { cod: "23", text: " Dif. centro costos en nomina   " },
      { cod: "24", text: " Error en el cargo empleado     " },
      { cod: "25", text: " Error mas de 30 dias al mes    " },
      { cod: "26", text: " Clave de acceso invalida       " },
      { cod: "27", text: " NO existe codigo operador      " },
      { cod: "28", text: " NO se encontro ARCHUSU         " },
      { cod: "29", text: " NO se encontro REGCONT         " },
      { cod: "30", text: " Error! Documento NO aprobado   " },
      { cod: "31", text: " Atencion! cliente en MORA      " },
      { cod: "32", text: " Esta en un periodo no valido   " },
      { cod: "33", text: " Precio venta inferior a costo  " },
      { cod: "34", text: " Valor venta inferior a minimo  " },
      { cod: "35", text: " Error! Pedido YA despachado    " },
      { cod: "36", text: " No se permite descto fac mora  " },
      { cod: "37", text: " Fecha fuera de rango           " },
      { cod: "38", text: " Se actualizo aporte pension    " },
      { cod: "39", text: " Proceso termino satisfactoria  " },
      { cod: "40", text: " Error en el consecutivo        " },
      { cod: "41", text: " Peso inferior al minimo        " },
      { cod: "42", text: " Destare mayor al bruto         " },
      { cod: "43", text: " Destare menor al bruto         " },
      { cod: "44", text: " Debe repasar el renglon antes  " },
      { cod: "45", text: " No practico retencion en la fte" },
      { cod: "46", text: " signo puede estar equivocado   " },
      { cod: "47", text: " No se puede cambiar comprob.   " },
      { cod: "48", text: " Sucursal no permitida          " },
      { cod: "49", text: " Opcion no aplica en esta empresa  " },
      { cod: "50", text: " Plazo mayor a dias financiac.  " },
      { cod: "51", text: " Comprobante descuadrado !      " },
      { cod: "52", text: " Atencion, comprob. tiene mov.  " },
      { cod: "53", text: " Chequera es de otra cuenta     " },
      { cod: "54", text: " Chequera NO existe             " },
      { cod: "55", text: " Cheque NO habilitado           " },
      { cod: "56", text: " Cheque ya esta girado          " },
      { cod: "57", text: " Dato debe ser numerico !       " },
      { cod: "58", text: " Dato debe ser alfanumerico!    " },
      { cod: "59", text: " Precio de compra subio !       " },
      { cod: "60", text: " Para omitir reserva use 99999  " },
      { cod: "61", text: " Codigo no aplica con C.costo   " },
      { cod: "62", text: " Depreciar contra cta 5 OR 7    " },
      { cod: "63", text: " Comprobante NO tiene recibo    " },
      { cod: "64", text: " Serv. pub. no hay tarifas a�o  " },
      { cod: "65", text: " El tercero es exento de retenc." },
      { cod: "66", text: " La empresa no es ag. retenedor " },
      { cod: "67", text: " Si no es % digite 9            " },
      { cod: "68", text: " Falta llenar datos de usuario  " },
      { cod: "69", text: " Directorio Trabajo Errado      " },
      { cod: "70", text: " Documento cerrado              " },
      { cod: "71", text: " No aplica para fact. P o T     " },
      { cod: "72", text: " Factura bloqueada por RIPS     " },
      { cod: "73", text: " SEXO incompatible              " },
      { cod: "74", text: " Edad incompatible              " },
      { cod: "75", text: " Recuerde valoracion pediatra   " },
      { cod: "76", text: " No se puede valoracion pediatra" },
      { cod: "77", text: " No ha actualizado form. contrat" },
      { cod: "78", text: " TIPO NO valido con esta OPC.   " },
      { cod: "79", text: " Medicamento NO POS             " },
      { cod: "80", text: " Usuario NO tiene derecho servic" },
      { cod: "81", text: " Fact.abre solo por oper cerro  " },
      { cod: "82", text: " Medico incompatible con clase  " },
      { cod: "83", text: " Opcion solo para embarazadas   " },
      { cod: "84", text: " La direccion es dato importante" },
      { cod: "85", text: " Arroz se liquida como grupo 2  " },
      { cod: "86", text: " Bloqueado solo menu contab.    " },
      { cod: "87", text: " Bloqueado solo inventarios     " },
      { cod: "88", text: " Periodo de Nomina bloqueado    " },
      { cod: "89", text: " Mes de trabajo NO bloqueado    " },
      { cod: "90", text: " Mes de trabajo bloqueado tot   " },
      { cod: "91", text: " Ubiquese en el mes adecuado    " },
      { cod: "92", text: " Opcion restringida en CONSOL.  " },
      { cod: "93", text: " Hay codigos en un subnivel     " },
      { cod: "94", text: " No corresponde Fuente Financ.  " },
      { cod: "95", text: " Se cambio el numero factura    " },
      { cod: "96", text: " Falta elaborar la glosa        " },
      { cod: "97", text: " Documento tiene endoso         " },
      { cod: "98", text: " Tiquete ya fue liquidado       " },
      { cod: "99", text: " No existe macro para ese artic " },
      { cod: "9A", text: "Falta comp. consulta           " },
      { cod: "9B", text: "El monto facturado supera 75%  " },
      { cod: "9C", text: "Esta a punto de copar contrato " },
      { cod: "9D", text: "Supera en monto del contrato   " },
      { cod: "9E", text: "Supera el promedio historico   " },
      { cod: "9F", text: "No se encontro cita medica     " },
      { cod: "9G", text: "Hace 90 dias no cambia clave   " },
      { cod: "9H", text: "la clave debe ser distinta     " },
      { cod: "9I", text: "Error en digito de verificac.  " },
      { cod: "9J", text: "Factura esta en otro RIPS      " },
      { cod: "9K", text: "ARROZ GRADO 2                  " },
      { cod: "9L", text: "ARROZ GRADO 3                  " },
      { cod: "9M", text: "DOCUMENTO YA ESTA CAUSADO      " },
      { cod: "9N", text: "Clave errada tercer aviso      " },
      { cod: "9O", text: "Supera Nro max de registros    " },
      { cod: "9P", text: "No se ha digitado el resultado " },
      { cod: "9Q", text: "Fuera de horario               " },
      { cod: "9R", text: "No existe cod cups             " },
      { cod: "9S", text: "Paciente es de otra EPS        " },
      { cod: "9T", text: "Tarifa no corresponde reserva  " },
      { cod: "9U", text: "Falta codigo entid administrad." },
      { cod: "9V", text: "No se puede modificar historia " },
      { cod: "9W", text: "Falta config. nomina dispersa  " },
      { cod: "9X", text: "Error en personal que atiende  " },
      { cod: "9Y", text: "Historia debe estar abierta    " },
      { cod: "9Z", text: "No alcanza el tiempo cita      " },
      { cod: "1A", text: "Debe recalcular saldos 963     " },
      { cod: "1B", text: "Falta cerrar la factura        " },
      { cod: "1C", text: "Falta cerrar historia clinica  " },
      { cod: "1D", text: "Presione cualquier tecla       " },
      { cod: "1E", text: "Directorio mas de 10 caracteres" },
      { cod: "1F", text: "Cama no disponible             " },
      { cod: "1G", text: "Cita ya tiene factura          " },
      { cod: "1H", text: "Ya se genero prefactura op949  " },
      { cod: "1I", text: "Recuerde datos recien nacido   " },
      { cod: "1J", text: "Art. no caben en la factura    " },
      { cod: "1K", text: "Paciente tiene factura P abiert" },
      { cod: "1L", text: "No se encontro informe APACHE  " },
      { cod: "1M", text: "Lote no corresponde con articul" },
      { cod: "1N", text: "Lote farmaceutico ya existe    " },
      { cod: "1O", text: "No se puede cerrar habitac P   " },
      { cod: "1P", text: "No uso el lector de barras     " },
      { cod: "1Q", text: "Falta asignar # fact a hiclinic" },
      { cod: "1R", text: "Reingreso mayor a 15 dias      " },
      { cod: "1S", text: "Exedio maximo nro de entradas  " },
      { cod: "1T", text: "No se encontro contrato        " },
      { cod: "1U", text: "Se actualizaron llamadas tel.  " },
      { cod: "1V", text: "formato desconocido            " },
      { cod: "1W", text: "factura es de resumen capitacio" },
      { cod: "1X", text: "No tiene asignado cupo credito " },
      { cod: "1Y", text: "Datos factura no coinciden      " },
      { cod: "1Z", text: "Documento no se ha vencido      " },
      { cod: "2A", text: "Consulta externa restringida    " },
      { cod: "2B", text: "Ya existe ese paciente          " },
      { cod: "2C", text: "Error en Grupo Sanguineo        " },
      { cod: "2D", text: "Datos del documento cambiaron   " },
      { cod: "2E", text: "Falta fecha de ingreso/retiro   " },
      { cod: "2F", text: "Vehiculo no es ambulancia       " },
      { cod: "2G", text: "Se ha modificado el PATH        " },
      { cod: "2H", text: "No ha liquidado Seguro (F10)    " },
      { cod: "2I", text: "No aplica para particulares     " },
      { cod: "2J", text: "Solo aplica para urgencias      " },
      { cod: "2K", text: "e-mail es un dato importante    " },
      { cod: "2L", text: "No se encontraron sucursales    " },
      { cod: "2M", text: "contrato del paci no corresp.   " },
      { cod: "2N", text: "Paciente no tiene CARNET        " },
      { cod: "2O", text: "Falta % interes del periodo     " },
      { cod: "2P", text: "Falta configurar el periodo     " },
      { cod: "2Q", text: "Ese dia el medico no atiende    " },
      { cod: "2R", text: "Factura es de otro ano          " },
      { cod: "2S", text: "Tercero registra EMBARGOS       " },
      { cod: "2T", text: "Paciente suspendido             " },
      { cod: "2U", text: "Bloqueo solo FACTURACION        " },
      { cod: "2V", text: "Comprobante no esta marcado     " },
      { cod: "2W", text: "Comprobante NO se pudo grabar   " },
      { cod: "2X", text: "Debe seleccionar folio nuevo    " },
      { cod: "2Y", text: "Doc. Bloqueado para Impresion   " },
      { cod: "2Z", text: "Recuerde llenar formul notifici." },
      { cod: "3A", text: "No existe historia clinica      " },
      { cod: "3B", text: "Hay Antecedentes alergicos      " },
      { cod: "3C", text: "MENSAJE SOI                     " },
      { cod: "3D", text: "ESPECIALIDAD NO CONCUERDA CUP   " },
      { cod: "3E", text: "PER. ATIENDE NO CONCUERDA CUP   " },
      { cod: "3F", text: "Factura no es para tipo paci.   " },
      { cod: "3G", text: "Fact A, solo cierran en mes Ing." },
      { cod: "3H", text: "No genera cargos                " },
      { cod: "3I", text: "Use opcion 72 para epicrisis    " },
      { cod: "3J", text: "CTA para cobrar multa inasistenc" },
      { cod: "3K", text: "Falta NIT entidad prestadora ser" },
      { cod: "3L", text: "Solo aplica para facturas capita" },
      { cod: "3M", text: "No pudo actualizar inventarios  " },
      { cod: "3N", text: "Hay diferencia en cantidades    " },
      { cod: "3O", text: "Paciente tiene fiebre           " },
      { cod: "3P", text: "Paciente con frec. resp rapida  " },
      { cod: "3Q", text: "Excede % Descuento              " },
      { cod: "3R", text: "Solo factura paciente adul> y ob" },
      { cod: "3S", text: "Solo factura paciente adul>     " },
      { cod: "3T", text: "No puede ser el mismo operador  " },
      { cod: "3U", text: "Tiene saldo pendiente por pagar " },
      { cod: "3V", text: "No configuro copia de seguridad " },
      { cod: "3W", text: "No hay contrato de mantenimiento" },
      { cod: "3X", text: "El votante ya fue visitado      " },
      { cod: "3Y", text: "La cita esta fuera de rango resp" },
      { cod: "3Z", text: "El votante ya fue agendado      " },
      { cod: "4A", text: "Excede el tiempo Max Permitido  " },
      { cod: "4B", text: "Solo aplica para p y p          " },
      { cod: "4C", text: "No ha capturado Foto            " },
      { cod: "4D", text: "Prepare el paciente para la foto" },
      { cod: "4E", text: "No aplica para especialistas    " },
      { cod: "4F", text: "Solo aplica para especialistas  " },
      { cod: "4G", text: "Vencim certificado Dpen Economic" },
      { cod: "4H", text: "Actualizar Colegio Paciente 9714" },
      { cod: "4I", text: "Error Factura con Retencion     " },
      { cod: "4J", text: "Actualizar Etinas Paciente 97765" },
      { cod: "4K", text: "Esta usando finalidad 10 en pyp " },
      { cod: "4L", text: "Numero de Radicado no existe    " },
      { cod: "4M", text: "Nro de Radicado ya tiene respues" },
      { cod: "4N", text: "Nro de Radic no se puede modific" },
      { cod: "4O", text: "CAMA DISPONIBLE POR LA OPC. 6-1 " },
      { cod: "4P", text: "No Existe Precio de Venta !     " },
      { cod: "4Q", text: "pct. esta acostado - use opc 9-3" },
      { cod: "4R", text: "Inconsistencia en edad gestacion" },
      { cod: "4S", text: "Inconsistencia Nro gestaciones  " },
      { cod: "4T", text: "CUPS ya fue facturado ese dia   " },
      { cod: "4U", text: "BLOQUEO FACTURACION Y NOMINA    " },
      { cod: "4V", text: "BLOQUEO FACTURACION E INVENT    " },
      { cod: "4W", text: "BLOQUEO FACTUR, INVENT, NOMINA  " },
      { cod: "4X", text: "Actualizar Comudidad Paci  971H " },
      { cod: "4Y", text: "Actualizar Resguardo Paci  971I " },
      { cod: "4Z", text: "Actualizar Resguardo Paci  971I " },
      { cod: "5A", text: "Solo administrador prosoft      " },
      { cod: "5B", text: "Paciente tutela                 " },
      { cod: "5C", text: "Solo aplica para maestra capitac" },
      { cod: "5D", text: "Historia no es de salud ocupacio" },
      { cod: "5E", text: "Documento ya fue Impreso !!     " },
      { cod: "5F", text: "Documento tiene  movimiento!    " },
      { cod: "5G", text: "Factura de Contado !            " },
      { cod: "5H", text: "cita no puede ser menor a 5 dias" },
      { cod: "5I", text: "factura tiene devolucion!       " },
      { cod: "5J", text: "Paciente alto Costo             " },
      { cod: "5K", text: "stop minimo medicamentos        " },
      { cod: "5L", text: "Atencion codigo no C.I.S        " },
      { cod: "5M", text: "Acceso Denegado Sesion activa   " },
      { cod: "5N", text: "Falta configurar Prefijo Factura" },
      { cod: "5O", text: "Proceso suspendido              " },
      { cod: "5P", text: "Solo se admite S, N o I         " },
      { cod: "5Q", text: "Paciente especial               " },
      { cod: "5R", text: "Debe actualizar C.D.P.          " },
      { cod: "5S", text: "La factura es de otro convenio  " },
      { cod: "5T", text: "Resolucion DIAN Vencida         " },
      { cod: "5U", text: "Resolucion DIAN por vencer !    " },
      { cod: "5V", text: "Paciente Multiconsultante       " },
      { cod: "6A", text: "Falta actualizar sobretasa      " },
      { cod: "6B", text: "Falta valor UVT del a�o         " },
      { cod: "6C", text: "Debe ser una cta provisiones    " },
      { cod: "6D", text: "Diferencia en tarifa de IVA     " },
      { cod: "6E", text: "Paciente esta embarazada        " },
      { cod: "6F", text: "Se requiere diligenciar CLAP    " },
      { cod: "6G", text: "CLAP esta CERRADO!              " },
      { cod: "6H", text: "Falta precio compra!            " },
      { cod: "6I", text: "Tercero asociado a otro NIT     " },
      { cod: "6J", text: "Tercero solo retiene si hay base" },
      { cod: "6K", text: "No aplica para persona juridica " },
      { cod: "6L", text: "No se encontro orden salida med." },
      { cod: "6M", text: "Codigo mal clasificado          " },
      { cod: "6N", text: "Comprob. ya tiene boleta salida " },
      { cod: "6O", text: "Documento ya fue aprobado       " },
      { cod: "6P", text: "Depend. de operador no autorizad" },
      { cod: "6Q", text: "Debe abrir una nueva historia   " },
      { cod: "6R", text: "Solo se procesan facturas cerrad" },
      { cod: "6T", text: "Error en la fecha de presentac. " },
      { cod: "6U", text: "Mensaje citas embarazadas       " },
      { cod: "6V", text: "NO SE EFECTUO NINGUN CAMBIO     " },
      { cod: "6W", text: "CUPS BLOQUEADO PARA ESE NIT     " },
      { cod: "6X", text: "No es necesario imprimir documen" },
      { cod: "6Y", text: "Intenta disminuir precio venta! " },
      { cod: "7A", text: "Paciente cronico                " },
      { cod: "7B", text: "Limite de citas cumplida        " },
      { cod: "7C", text: "Limite de Dias de Citas         " },
      { cod: "7D", text: "Fecha u Hora Menor al ingreso   " },
      { cod: "7E", text: "Causa Externa incompatible DX   " },
      { cod: "7F", text: "Impresion unica                 " },
      { cod: "7G", text: "Cita se encuentra cancelada     " },
      { cod: "7H", text: "Medicamento No permitido x clasi" },
      { cod: "7I", text: "Pacte ya registra 1ra vez consul" },
      { cod: "7J", text: "Pacte ya registra 1ra vez consul" },
      { cod: "7K", text: "Medicamento Homologo            " },
      { cod: "7O", text: "Paciente de factura             " },
      { cod: "7P", text: "Paciente tiene movimiento       " },
      { cod: "7Q", text: "Vencimiento Resolucion Dian     " },
      { cod: "7R", text: "Cups Bloquedo por jefe facturac " },
      { cod: "7S", text: "Cita mal facturada              " },
      { cod: "7T", text: "Rips Bloqueado                  " },
      { cod: "7W", text: "Reingreso a Triage < 24 h       " },
      { cod: "7U", text: "Clase de servicio Bloqueada FACT" },
      { cod: "7V", text: "Glosa duplicada Excel           " },
      { cod: "7W", text: "Posible reingreso Traige        " },
      { cod: "7X", text: "Cups Desactualizado nueva Resl  " },
      { cod: "7Z", text: "Factura No permite art con IVA  " },
      { cod: "8A", text: "Falta Conf.Actividad Economica  " },
      { cod: "8B", text: "Proceso copia iniciada..        " },
      { cod: "8C", text: "Estudio Ant.No comparativo      " },
      { cod: "8D", text: "Fecha de Fact Mayor a boleta sal" },
      { cod: "8E", text: "La finalidad no igual a la cita " },
      { cod: "8F", text: "El cod medicamento no igual pend" },
      { cod: "8G", text: "supera la cantidad de pendientes" },
      { cod: "8H", text: "Pendiente ya tiene despacho     " },
      { cod: "8I", text: "Paciente con posible abuxo      " },
      { cod: "8J", text: "Cups nivel no igual a Nivel Fact" },
      { cod: "8K", text: "Fact actualmente no tiene Radica" },
      { cod: "8L", text: "Minimo 10 Caracteres            " },
      { cod: "8M", text: "Factura no es igual a la HC     " },
      { cod: "8N", text: "Cups ya fue Autori mismo mes    " },
      { cod: "8O", text: "Valor de la Poliza super 75 %   " },
      { cod: "8P", text: "Valor de la Poliza super 80 %   " },
      { cod: "8Q", text: "Valor de la Poliza super 85 %   " },
      { cod: "8R", text: "Valor de la Poliza super 90 %   " },
      { cod: "8S", text: "Valor de la Poliza super 95 %   " },
      { cod: "8T", text: "Candidato adulto Mayor Quinqueni" },
      { cod: "8Y", text: "Valor errado en el total        " },
      { cod: "8U", text: "Nro de autorizacion en otra fact" },
      { cod: "8V", text: "Candidato adolescencia          " },
      { cod: "8W", text: "Candidato juventud              " },
      { cod: "8X", text: "CUPS ya fue facturado 6 meses   " },
      { cod: "8Y", text: "la suma del producto ERROR      " },
      { cod: "8Z", text: "la compra no puede superar 9999 " },
      { cod: "R6", text: "Ya esta registrado entregado    " },
      { cod: "R7", text: "Articulo no esta en tarifa medic" },
      { cod: "R8", text: "No definido comportamiento factu" },
      { cod: "R9", text: "Bloqueado por cufe factu electro" },
      { cod: "R0", text: "Forma de copago errado no acept " },
      { cod: "S0", text: "Lote esta vencido " },
      { cod: "K2", text: " Precio de compra bajo  !       " },
      { cod: "0A", text: "INSTALANDO JAVA                 " },
      { cod: "0C", text: "ERROR CON CREA-HIS.EXE          " },
      { cod: "0D", text: "YA EXISTE UN PARTO PARA ESTE FOLIO" },
      { cod: "0E", text: "EXISTE UN PARTO EN MENOS DE 6 MESES" },
      { cod: "0F", text: "INSTALANDO POWER COBOL          " },
      { cod: "0G", text: "EL EMPLEADO NO CUMPLE 48 HORAS  " },
      { cod: "0H", text: "EL EMPLEADO NO CUMPLE 192 HORAS " },
      { cod: "A0", text: "No tiene problema en desarrollo " },
      { cod: "A1", text: "Enfermedad muy grave            " },
      { cod: "A2", text: "Neumonia grave                  " },
      { cod: "A3", text: "Neumonia                        " },
      { cod: "A4", text: "Tos o resfriado                 " },
      { cod: "A5", text: "Sibilancia                      " },
      { cod: "A6", text: "DIARREA, deshidratacion grave   " },
      { cod: "A7", text: "DIARREA  deshidratacion leve    " },
      { cod: "A8", text: "DIARREA  RIESGO DESHIDRATACION  " },
      { cod: "A9", text: "Diarrea persistente grave       " },
      { cod: "AA", text: "Diarrea persistente             " },
      { cod: "AB", text: "Disenteria                      " },
      { cod: "AC", text: "Enfermedad febril muy grave     " },
      { cod: "AD", text: "Enfermedad febril intermedio    " },
      { cod: "AE", text: "Enfermedad febril               " },
      { cod: "AF", text: "Sospecha de malaria complicada  " },
      { cod: "AG", text: "Sospecha malaria no complicada  " },
      { cod: "AH", text: "Dengue grave                    " },
      { cod: "AI", text: "Dengue con signos de alarma     " },
      { cod: "AJ", text: "Sospecha de sarampion           " },
      { cod: "AK", text: "Mastoiditis                     " },
      { cod: "AL", text: "Otitis media aguda              " },
      { cod: "AM", text: "Otitis media CRONICA            " },
      { cod: "AN", text: "No tiene otitis media           " },
      { cod: "AO", text: "Faringoamigdalitis estreptococica" },
      { cod: "AP", text: "Faringoamigdalitis viral         " },
      { cod: "AQ", text: "No tiene faringoamigdalitis      " },
      { cod: "AR", text: "maltrato fisico y/o abuso sexual" },
      { cod: "AS", text: "Sospecha de maltrato             " },
      { cod: "AT", text: "Falla en la crianza              " },
      { cod: "AU", text: "No hay sospecha de maltrato      " },
      { cod: "AV", text: "Desnutricion severa              " },
      { cod: "AW", text: "Desnutricion                     " },
      { cod: "AX", text: "No tiene DESNUTRICION            " },
      { cod: "AY", text: "Riesgo de problema en desarrollo" },
      { cod: "AZ", text: "Desarrollo normal con fact riesg" },
      { cod: "B0", text: "Falta Estudio Principal         " },
      { cod: "B1", text: "No aplica para esa unid. servic." },
      { cod: "B2", text: "Doc. aplica solo para devolucion" },
      { cod: "B3", text: "ES OBLIGATORIO DILIGENCIAR AIEPI" },
      { cod: "B4", text: "Doc. no aplica para devoluciones" },
      { cod: "B5", text: "Dev.del mes superan tope Aux.Tra" },
      { cod: "B6", text: "Actu Dependencia laboral Opc.7C1" },
      { cod: "B7", text: "Operador no es igual a correspon" },
      { cod: "B8", text: "Vencio certificado de estudio   " },
      { cod: "B9", text: "Error Configuracion de Concepto " },
      { cod: "BA", text: "Obligatorio Actualizar Regimen  " },
      { cod: "BB", text: "Paciente con sobrepeso          " },
      { cod: "BC", text: "Paciente OBESO                  " },
      { cod: "BD", text: "Paciente delgadez moderada      " },
      { cod: "BE", text: "Paciente delgadez severa        " },
      { cod: "BF", text: "Perimetro cefalico -2 inferior  " },
      { cod: "BG", text: "Perimetro cefalico +2 mayor     " },
      { cod: "BH", text: "Probable retraso desarrollo     " },
      { cod: "BI", text: "PESO MUY BAJO                   " },
      { cod: "BJ", text: "PESO BAJO O EN RIESGO           " },
      { cod: "BK", text: "FRECUENCIA CARDIACA ANORMAL     " },
      { cod: "BL", text: "FRECUENCIA RESPIRATORIA ANORMAL " },
      { cod: "BM", text: "TEMPERATURA ANORMAL             " },
      { cod: "BN", text: "CRUP GRAVE                      " },
      { cod: "BO", text: "BRONQUIOLITIS GRAVE             " },
      { cod: "BP", text: "SIBILANCIA GRAVE                " },
      { cod: "BQ", text: "CRUP LEVE                       " },
      { cod: "BR", text: "BRONQUIOLITIS LEVE              " },
      { cod: "BS", text: "DIARREA SIN DESHIDRATACION      " },
      { cod: "BT", text: "DIARREA PERSISTENTE GRAVE       " },
      { cod: "BU", text: "DIARREA PERSISTENTE LEVE        " },
      { cod: "BV", text: "Otitis media RECURRENTE         " },
      { cod: "BW", text: "RIESGO DESNUTRICION             " },
      { cod: "BX", text: "ANEMIA SEVERA                   " },
      { cod: "BY", text: "ANEMIA LEVE                     " },
      { cod: "BZ", text: "NO TIENE ANEMIA                 " },
      { cod: "C1", text: "SIDA ESTADIO 1                  " },
      { cod: "C2", text: "SIDA ESTADIO 2                  " },
      { cod: "C3", text: "SIDA ESTADIO 3                  " },
      { cod: "C4", text: "SIDA ESTADIO 4                  " },
      { cod: "C5", text: "POSIBLE CANCER                  " },
      { cod: "C6", text: "ALGUN RIESGO DE CANCER          " },
      { cod: "C7", text: "POCA PROBABILIDAD DE CANCER     " },
      { cod: "CA", text: "PROBABLE DE DENGUE              " },
      { cod: "CB", text: "MALTRATO FISICO GRAVE           " },
      { cod: "CC", text: "MALTRATO FISICO                 " },
      { cod: "CD", text: "ABUSO SEXUAL                    " },
      { cod: "CE", text: "SOSPECHA DE ABUSO SEXUAL        " },
      { cod: "CF", text: "NEGLIGENCIA O ABANDONO          " },
      { cod: "CG", text: "NO HAY SOSPECHA MALTRATO        " },
      { cod: "CH", text: "PROBABLE RETRASO DEL DESARROLLO " },
      { cod: "CI", text: "RIESGO DE PROBLEMA EN DESARROLLO" },
      { cod: "CJ", text: "DESARROLLO NORMAL CON RIESGO    " },
      { cod: "CK", text: "DESARROLLO NORMAL               " },
      { cod: "CL", text: "ESTADO EPILEPTICO               " },
      { cod: "CM", text: "PROBLEMA NEUROLOGICO GRAVE      " },
      { cod: "CN", text: "EPILEPSIA CON CRISIS GENERALIZAD" },
      { cod: "CO", text: "EPILEPSIA CON CRISIS FOCAL      " },
      { cod: "CP", text: "EPILEPSIA CON CRISIS DE AUSENCIA" },
      { cod: "CQ", text: "NO TIENE EPILEPSIA              " },
      { cod: "CR", text: "SOSPECHA TUBERCULOSIS GRAVE     " },
      { cod: "CS", text: "TUBERCULOSIS CONFIRMADA         " },
      { cod: "CT", text: "TUBERCULOSIS CLINICA            " },
      { cod: "CU", text: "TUBERCULOSIS LATENTE            " },
      { cod: "CV", text: "CONTACTO CON TUBERCULOSIS       " },
      { cod: "CW", text: "INFECCION VIH SINTOMATICA CONFIR" },
      { cod: "CX", text: "INFECCION VIH CONFIRMADA        " },
      { cod: "CY", text: "SOSPECHA INFECCION VIH SINTOMATI" },
      { cod: "CZ", text: "EXPUESTO VIH                    " },
      { cod: "D0", text: "SURCOS EN MAS DE LA MITAD ANTERI" },
      { cod: "D1", text: "TEXTURA PIEL -FINA GELATINOSA   " },
      { cod: "D2", text: "TEXTURA PIEL -FINA LISA         " },
      { cod: "D3", text: "TEXTURA PIEL -MAS GRUESA ESCAMAS" },
      { cod: "D4", text: "TEXTURA PIEL -MAS GRUESA GRIETAS" },
      { cod: "D5", text: "TEXTURA PIEL -GRIETAS PROFUNDAS " },
      { cod: "D6", text: "TEXTURA PIEL -SIN PLIEGUES      " },
      { cod: "E0", text: "VIH SINTOMATICA IMPROBABLE      " },
      { cod: "E1", text: "VIH DESCARTADO                  " },
      { cod: "E2", text: "CETOSIS O CETOACIDOSIS DIABETICA" },
      { cod: "E3", text: "DIABETES MELLITUS               " },
      { cod: "E4", text: "POSIBLE DIABLETES MELLITUS      " },
      { cod: "E5", text: "INTOLERANCIA A LA GLUCOSA       " },
      { cod: "E6", text: "NO TIENE DIABETES MELLITUS      " },
      { cod: "E7", text: "CELULITIS FACIAL                " },
      { cod: "E8", text: "ENFERMEDAD BUCAL GRAVE          " },
      { cod: "E9", text: "TRAUMA BUCO DENTAL              " },
      { cod: "EA", text: "ESTOMATITIS                     " },
      { cod: "EB", text: "ENFERMEDAD DENTAL Y GINGIVAL    " },
      { cod: "EC", text: "ALTO RIESGO DE ENFERMEDAD BUCAL " },
      { cod: "ED", text: "BAJO RIESGO DE ENFERMEDAD BUCAL " },
      { cod: "EE", text: "PERIMETRO ABDOMINAL ALTO RIESGO " },
      { cod: "EF", text: "APENDIC.DEBE REALIZARSE EN 6 HOR" },
      { cod: "EG", text: "NO HAY ULTRASONOGRAFIA          " },
      { cod: "EH", text: "EMBARAZO DE ALTO RIESGO         " },
      { cod: "EI", text: "CANTIDAD DE MEDICANETO EN CERO  " },
      { cod: "EJ", text: "FALTAN DATOS DE CLASIFICACION   " },
      { cod: "EK", text: "FALTAN DATOS DE MADRE           " },
      { cod: "EL", text: "PACIENTE MUERTO SOLO ADMI O GEBC" },
      { cod: "EM", text: "INFECCION LOCAL                 " },
      { cod: "EN", text: "DIARREA CON SANGRE              " },
      { cod: "EO", text: "PROBLEMA SEVERO ALIMENTACION    " },
      { cod: "EP", text: "PROBLEMA LEVE ALIMENTACION      " },
      { cod: "EQ", text: "ERROR EN SOLICITUD DE PATOLOGIA " },
      { cod: "G0", text: "DIAGN. P Y P COMIENZAN POR Z    " },
      { cod: "G1", text: "DIAGN.MORBIL. NO PUEDE EMPEZAR Z" },
      { cod: "G2", text: "LA INCAPACIDAD NO SE PUEDE COMBI" },
      { cod: "G3", text: "ENFERMEDAD HUERFANA             " },
      { cod: "G4", text: "AISLAR POR BACTERIA RESISTENTE  " },
      { cod: "H1", text: "PESO NORMAL                     " },
      { cod: "H2", text: "DELGADEZ                        " },
      { cod: "H3", text: "TALLA MENOR RESPECTO A LA ULTIMA" },
      { cod: "H4", text: "DILIGENCIAR CONSENTIMIENTO INFOR" },
      { cod: "RA", text: "COD NO ESTA EN MAESTRO ARTICULOS" },
      { cod: "U7", text: "TANNER MASCULINO                " },
      { cod: "U8", text: "TANNER FEMENINO                 " },
      { cod: "U9", text: "TAMAÑO SENOS                    " },
      { cod: "UA", text: "TAMAÑO TESTICULOS               " },
      { cod: "UM", text: "Sesion no valida!" },
      { cod: "thi", text: "de error no identificado " },
      { cod: "DESHAB", text: "Opcion Deshabilitada Temporalmente" },
      { cod: "BLOQUEADO", text: "PROGRAMA BLOQUEADO" },
      { cod: "USER", text: `Datos ingresados invalidos` },
      { cod: "CON", text: "Correcto, iniciando sesión" },
      { cod: "N1", text: `${descripcion}` },
      { cod: "I1", text: `Impresión  generada ${descripcion}` },
      { cod: "SERV", text: "Error de conexión con el servidor" },
      { cod: "ELIM", text: "Datos eliminados correctamente" },
      { cod: "FAV", text: "No se puede agregar mas de 12 favoritos" },
      { cod: "000", text: "Error consultando datos" },
      { cod: "NFAV", text: "No tienes favoritos agregados" },
      { cod: "NOSE", text: "Error desconocido, arreglelo ya!" },
      { cod: "NG", text: `No fue posible guardar cambios. Res: ${descripcion}. Contacte con PROSOFT.` },
      { cod: "?", text: `${descripcion}` },
    ];
    const mensaje = mensajes.find((e) => e.cod == codigo)?.text;
    return mensaje ? mensaje : "No se encontro CON851";
  };
  