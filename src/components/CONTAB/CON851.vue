<template>
  <v-dialog v-model="alerta.estado" max-width="500" persistent>
    <v-alert border="left" colored-border :color="color" class="my-0 py-0">
      <v-card-text>
        <v-row style="padding-bottom: 10px; padding-top: 10px">
          <v-col cols="4" lg="3" md="3" sm="3">
            <lottie-animation
              :animationData="tipo_alerta"
              class="mx-auto botone"
              style="height: 100px"
              v-if="alerta.estado"
              :autoPlay="true"
              ref="anim_login"
              id="anim_login"
              :loop="true"
              :speed="2"
              content
            />
          </v-col>
          <v-col cols="8" lg="9" md="9" sm="9" class="ml-0 pl-0">
            <v-row justify="center" align="center">
              <v-col cols="12" lg="12" md="12" sm="12" class="ml-0 pl-0">
                <h1 :class="` ${color}--text text-center`">
                  {{ titulo }}
                </h1>
                <h3 class="text-center mt-3">
                  {{ cuerpo }}
                </h3>
              </v-col>
              <v-col
                cols="12"
                lg="12"
                md="12"
                sm="12"
                v-if="!btn_cancelar"
                class="mx-auto py-0 my-0"
              >
                <v-card-actions class="mx-0">
                  <v-btn
                    ref="btn3"
                    @click="cancelarAlerta"
                    class="botone mx-auto"
                    :color="color"
                    outlined
                    >cerrar
                    <v-icon :color="color" dark translate="true" class="ml-2"
                      >mdi-close-circle</v-icon
                    >
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col
                cols="6"
                lg="6"
                md="6"
                sm="6"
                class="py-2 my-0"
                v-if="btn_cancelar"
              >
                <v-btn
                  ref="btn1"
                  outlined
                  color="success"
                  width="110"
                  class="botone ml-md-13 ml-sm-10"
                  @click="confirmar"
                >
                  Aceptar
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="6"
                lg="6"
                md="6"
                sm="6"
                class="py-2 my-0"
                v-if="btn_cancelar"
              >
                <v-btn
                  color="error"
                  outlined
                  width="110"
                  @click="cancelar"
                  class="botone"
                  ref="btn2"
                >
                  cancelar
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-alert>
  </v-dialog>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
import info from "../../assets/image/info.json";
import error from "../../assets/image/error.json";
import warning from "../../assets/image/warning.json";
import success from "../../assets/image/success.json";
export default {
  components: { LottieAnimation },
  props: {
    alerta: Object,
  },
  data() {
    return {
      icono: "",
      color: "",
      iconos: {
        warning: ["mdi-alert-circle", "¡Precaución!", warning],
        error: ["mdi-close-octagon-outline", "¡Error!", error],
        success: ["mdi-check-circle-outline", "¡Hecho!", success],
        info: ["mdi-information-outline", "¡Atención!", info],
      },
      titulo: "",
      cuerpo: "",
      tipo_alerta: "",
      btn_cancelar: false,
    };
  },
  methods: {
    msjError() {
      for (const key of Object.keys(this.iconos)) {
        if (this.alerta.tipo == key) {
          this.color = key;
          this.icono = this.iconos[key][0];
          this.titulo = this.iconos[key][1];
          this.tipo_alerta = this.iconos[key][2];
          break;
        }
      }
      switch (this.alerta.code) {
        case "00":
          this.cuerpo = `Ya existe la llave digitada ${this.alerta.descrip}`;
          break;
        case "01":
          this.cuerpo = `No existe el codigo ${this.alerta.descrip}!`;
          break;
        case "02":
          this.cuerpo = "¡Este dato es obligatorio!";
          break;
        case "03":
          this.cuerpo = "¡Este dato es invalido!";
          break;
        case "04":
          this.cuerpo = " Falta % Ret. en plan cuentas   ";
          break;
        case "05":
          this.cuerpo = " Dato repetido !                ";
          break;
        case "06":
          this.cuerpo = " Documento es de otro NIT       ";
          break;
        case "07":
          this.cuerpo = " No hay saldo disponible        ";
          break;
        case "08":
          this.cuerpo = " No existe movimiento!          ";
          break;
        case "09":
          this.cuerpo = " No hay saldo en el P.A.C.      ";
          break;
        case "10":
          this.cuerpo = " No se pudo crear el archivo    ";
          break;
        case "11":
          this.cuerpo = " Supera cupo asignado credito   ";
          break;
        case "12":
          this.cuerpo = " Cliente lista negra (moroso)   ";
          break;
        case "13":
          this.cuerpo = " Codigo desactivado             ";
          break;
        case "14":
          this.cuerpo = " Transaccion restringida        ";
          break;
        case "15":
          this.cuerpo = " Acceso restringido !!          ";
          break;
        case "16":
          this.cuerpo = " Comprobante ya tiene recibo    ";
          break;
        case "17":
          this.cuerpo = " Es el inicio del archivo !     ";
          break;
        case "18":
          this.cuerpo = " No hay mas registros !         ";
          break;
        case "19":
          this.cuerpo = " Empleado retirado!             ";
          break;
        case "20":
          this.cuerpo = " Error! Concepto SALUD doble    ";
          break;
        case "21":
          this.cuerpo = " Error! Concepto PENSION doble  ";
          break;
        case "22":
          this.cuerpo = " Diferente cargo en una nomina  ";
          break;
        case "23":
          this.cuerpo = " Dif. centro costos en nomina   ";
          break;
        case "24":
          this.cuerpo = " Error en el cargo empleado     ";
          break;
        case "25":
          this.cuerpo = " Error mas de 30 dias al mes    ";
          break;
        case "26":
          this.cuerpo = " Clave de acceso invalida       ";
          break;
        case "27":
          this.cuerpo = " NO existe codigo operador      ";
          break;
        case "28":
          this.cuerpo = " NO se encontro ARCHUSU         ";
          break;
        case "29":
          this.cuerpo = " NO se encontro REGCONT         ";
          break;
        case "30":
          this.cuerpo = " Error! Documento NO aprobado   ";
          break;
        case "31":
          this.cuerpo = " Atencion! cliente en MORA      ";
          break;
        case "32":
          this.cuerpo = " Esta en un periodo no valido   ";
          break;
        case "33":
          this.cuerpo = " Precio venta inferior a costo  ";
          break;
        case "34":
          this.cuerpo = " Valor venta inferior a minimo  ";
          break;
        case "35":
          this.cuerpo = " Error! Pedido YA despachado    ";
          break;
        case "36":
          this.cuerpo = " No se permite descto fac mora  ";
          break;
        case "37":
          this.cuerpo = " Fecha fuera de rango           ";
          break;
        case "38":
          this.cuerpo = " Se actualizo aporte pension    ";
          break;
        case "39":
          this.cuerpo = " Proceso termino satisfactoria  ";
          break;
        case "40":
          this.cuerpo = " Error en el consecutivo        ";
          break;
        case "41":
          this.cuerpo = " Peso inferior al minimo        ";
          break;
        case "42":
          this.cuerpo = " Destare mayor al bruto         ";
          break;
        case "43":
          this.cuerpo = " Destare menor al bruto         ";
          break;
        case "44":
          this.cuerpo = " Debe repasar el renglon antes  ";
          break;
        case "45":
          this.cuerpo = " No practico retencion en la fte";
          break;
        case "46":
          this.cuerpo = " signo puede estar equivocado   ";
          break;
        case "47":
          this.cuerpo = " No se puede cambiar comprob.   ";
          break;
        case "48":
          this.cuerpo = " Sucursal no permitida          ";
          break;
        case "49":
          this.cuerpo = " Opcion no aplica en esta empresa  ";
          break;
        case "50":
          this.cuerpo = " Plazo mayor a dias financiac.  ";
          break;
        case "51":
          this.cuerpo = " Comprobante descuadrado !      ";
          break;
        case "52":
          this.cuerpo = " Atencion, comprob. tiene mov.  ";
          break;
        case "53":
          this.cuerpo = " Chequera es de otra cuenta     ";
          break;
        case "54":
          this.cuerpo = " Chequera NO existe             ";
          break;
        case "55":
          this.cuerpo = " Cheque NO habilitado           ";
          break;
        case "56":
          this.cuerpo = " Cheque ya esta girado          ";
          break;
        case "57":
          this.cuerpo = " Dato debe ser numerico !       ";
          break;
        case "58":
          this.cuerpo = " Dato debe ser alfanumerico!    ";
          break;
        case "59":
          this.cuerpo = " Precio de compra subio !       ";
          break;
        case "60":
          this.cuerpo = " Para omitir reserva use 99999  ";
          break;
        case "61":
          this.cuerpo = " Codigo no aplica con C.costo   ";
          break;
        case "62":
          this.cuerpo = " Depreciar contra cta 5 OR 7    ";
          break;
        case "63":
          this.cuerpo = " Comprobante NO tiene recibo    ";
          break;
        case "64":
          this.cuerpo = " Serv. pub. no hay tarifas a�o  ";
          break;
        case "65":
          this.cuerpo = " El tercero es exento de retenc.";
          break;
        case "66":
          this.cuerpo = " La empresa no es ag. retenedor ";
          break;
        case "67":
          this.cuerpo = " Si no es % digite 9            ";
          break;
        case "68":
          this.cuerpo = " Falta llenar datos de usuario  ";
          break;
        case "69":
          this.cuerpo = " Directorio Trabajo Errado      ";
          break;
        case "70":
          this.cuerpo = " Documento cerrado              ";
          break;
        case "71":
          this.cuerpo = " No aplica para fact. P o T     ";
          break;
        case "72":
          this.cuerpo = " Factura bloqueada por RIPS     ";
          break;
        case "73":
          this.cuerpo = " SEXO incompatible              ";
          break;
        case "74":
          this.cuerpo = " Edad incompatible              ";
          break;
        case "75":
          this.cuerpo = " Recuerde valoracion pediatra   ";
          break;
        case "76":
          this.cuerpo = " No se puede valoracion pediatra";
          break;
        case "77":
          this.cuerpo = " No ha actualizado form. contrat";
          break;
        case "78":
          this.cuerpo = " TIPO NO valido con esta OPC.   ";
          break;
        case "79":
          this.cuerpo = " Medicamento NO POS             ";
          break;
        case "80":
          this.cuerpo = " Usuario NO tiene derecho servic";
          break;
        case "81":
          this.cuerpo = " Fact.abre solo por oper cerro  ";
          break;
        case "82":
          this.cuerpo = " Medico incompatible con clase  ";
          break;
        case "83":
          this.cuerpo = " Opcion solo para embarazadas   ";
          break;
        case "84":
          this.cuerpo = " La direccion es dato importante";
          break;
        case "85":
          this.cuerpo = " Arroz se liquida como grupo 2  ";
          break;
        case "86":
          this.cuerpo = " Bloqueado solo menu contab.    ";
          break;
        case "87":
          this.cuerpo = " Bloqueado solo inventarios     ";
          break;
        case "88":
          this.cuerpo = " Periodo de Nomina bloqueado    ";
          break;
        case "89":
          this.cuerpo = " Mes de trabajo NO bloqueado    ";
          break;
        case "90":
          this.cuerpo = " Mes de trabajo bloqueado tot   ";
          break;
        case "91":
          this.cuerpo = " Ubiquese en el mes adecuado    ";
          break;
        case "92":
          this.cuerpo = " Opcion restringida en CONSOL.  ";
          break;
        case "93":
          this.cuerpo = " Hay codigos en un subnivel     ";
          break;
        case "94":
          this.cuerpo = " No corresponde Fuente Financ.  ";
          break;
        case "95":
          this.cuerpo = " Se cambio el numero factura    ";
          break;
        case "96":
          this.cuerpo = " Falta elaborar la glosa        ";
          break;
        case "97":
          this.cuerpo = " Documento tiene endoso         ";
          break;
        case "98":
          this.cuerpo = " Tiquete ya fue liquidado       ";
          break;
        case "99":
          this.cuerpo = " No existe macro para ese artic ";
          break;
        case "9A":
          this.cuerpo = "Falta comp. consulta           ";
          break;
        case "9B":
          this.cuerpo = "El monto facturado supera 75%  ";
          break;
        case "9C":
          this.cuerpo = "Esta a punto de copar contrato ";
          break;
        case "9D":
          this.cuerpo = "Supera en monto del contrato   ";
          break;
        case "9E":
          this.cuerpo = "Supera el promedio historico   ";
          break;
        case "9F":
          this.cuerpo = "No se encontro cita medica     ";
          break;
        case "9G":
          this.cuerpo = "Hace 90 dias no cambia clave   ";
          break;
        case "9H":
          this.cuerpo = "la clave debe ser distinta     ";
          break;
        case "9I":
          this.cuerpo = "Error en digito de verificac.  ";
          break;
        case "9J":
          this.cuerpo = "Factura esta en otro RIPS      ";
          break;
        case "9K":
          this.cuerpo = "ARROZ GRADO 2                  ";
          break;
        case "9L":
          this.cuerpo = "ARROZ GRADO 3                  ";
          break;
        case "9M":
          this.cuerpo = "DOCUMENTO YA ESTA CAUSADO      ";
          break;
        case "9N":
          this.cuerpo = "Clave errada tercer aviso      ";
          break;
        case "9O":
          this.cuerpo = "Supera Nro max de registros    ";
          break;
        case "9P":
          this.cuerpo = "No se ha digitado el resultado ";
          break;
        case "9Q":
          this.cuerpo = "Fuera de horario               ";
          break;
        case "9R":
          this.cuerpo = "No existe cod cups             ";
          break;
        case "9S":
          this.cuerpo = "Paciente es de otra EPS        ";
          break;
        case "9T":
          this.cuerpo = "Tarifa no corresponde reserva  ";
          break;
        case "9U":
          this.cuerpo = "Falta codigo entid administrad.";
          break;
        case "9V":
          this.cuerpo = "No se puede modificar historia ";
          break;
        case "9W":
          this.cuerpo = "Falta config. nomina dispersa  ";
          break;
        case "9X":
          this.cuerpo = "Error en personal que atiende  ";
          break;
        case "9Y":
          this.cuerpo = "Historia debe estar abierta    ";
          break;
        case "9Z":
          this.cuerpo = "No alcanza el tiempo cita      ";
          break;
        case "1A":
          this.cuerpo = "Debe recalcular saldos 963     ";
          break;
        case "1B":
          this.cuerpo = "Falta cerrar la factura        ";
          break;
        case "1C":
          this.cuerpo = "Falta cerrar historia clinica  ";
          break;
        case "1D":
          this.cuerpo = "Presione cualquier tecla       ";
          break;
        case "1E":
          this.cuerpo = "Directorio mas de 10 caracteres";
          break;
        case "1F":
          this.cuerpo = "Cama no disponible             ";
          break;
        case "1G":
          this.cuerpo = "Cita ya tiene factura          ";
          break;
        case "1H":
          this.cuerpo = "Ya se genero prefactura op949  ";
          break;
        case "1I":
          this.cuerpo = "Recuerde datos recien nacido   ";
          break;
        case "1J":
          this.cuerpo = "Art. no caben en la factura    ";
          break;
        case "1K":
          this.cuerpo = "Paciente tiene factura P abiert";
          break;
        case "1L":
          this.cuerpo = "No se encontro informe APACHE  ";
          break;
        case "1M":
          this.cuerpo = "Lote no corresponde con articul";
          break;
        case "1N":
          this.cuerpo = "Lote farmaceutico ya existe    ";
          break;
        case "1O":
          this.cuerpo = "No se puede cerrar habitac P   ";
          break;
        case "1P":
          this.cuerpo = "No uso el lector de barras     ";
          break;
        case "1Q":
          this.cuerpo = "Falta asignar # fact a hiclinic";
          break;
        case "1R":
          this.cuerpo = "Reingreso mayor a 15 dias      ";
          break;
        case "1S":
          this.cuerpo = "Exedio maximo nro de entradas  ";
          break;
        case "1T":
          this.cuerpo = "No se encontro contrato        ";
          break;
        case "1U":
          this.cuerpo = "Se actualizaron llamadas tel.  ";
          break;
        case "1V":
          this.cuerpo = "formato desconocido            ";
          break;
        case "1W":
          this.cuerpo = "factura es de resumen capitacio";
          break;
        case "1X":
          this.cuerpo = "No tiene asignado cupo credito ";
          break;
        case "1Y":
          this.cuerpo = "Datos factura no coinciden      ";
          break;
        case "1Z":
          this.cuerpo = "Documento no se ha vencido      ";
          break;
        case "2A":
          this.cuerpo = "Consulta externa restringida    ";
          break;
        case "2B":
          this.cuerpo = "Ya existe ese paciente          ";
          break;
        case "2C":
          this.cuerpo = "Error en Grupo Sanguineo        ";
          break;
        case "2D":
          this.cuerpo = "Datos del documento cambiaron   ";
          break;
        case "2E":
          this.cuerpo = "Falta fecha de ingreso/retiro   ";
          break;
        case "2F":
          this.cuerpo = "Vehiculo no es ambulancia       ";
          break;
        case "2G":
          this.cuerpo = "Se ha modificado el PATH        ";
          break;
        case "2H":
          this.cuerpo = "No ha liquidado Seguro (F10)    ";
          break;
        case "2I":
          this.cuerpo = "No aplica para particulares     ";
          break;
        case "2J":
          this.cuerpo = "Solo aplica para urgencias      ";
          break;
        case "2K":
          this.cuerpo = "e-mail es un dato importante    ";
          break;
        case "2L":
          this.cuerpo = "No se encontraron sucursales    ";
          break;
        case "2M":
          this.cuerpo = "contrato del paci no corresp.   ";
          break;
        case "2N":
          this.cuerpo = "Paciente no tiene CARNET        ";
          break;
        case "2O":
          this.cuerpo = "Falta % interes del periodo     ";
          break;
        case "2P":
          this.cuerpo = "Falta configurar el periodo     ";
          break;
        case "2Q":
          this.cuerpo = "Ese dia el medico no atiende    ";
          break;
        case "2R":
          this.cuerpo = "Factura es de otro ano          ";
          break;
        case "2S":
          this.cuerpo = "Tercero registra EMBARGOS       ";
          break;
        case "2T":
          this.cuerpo = "Paciente suspendido             ";
          break;
        case "2U":
          this.cuerpo = "Bloqueo solo FACTURACION        ";
          break;
        case "2V":
          this.cuerpo = "Comprobante no esta marcado     ";
          break;
        case "2W":
          this.cuerpo = "Comprobante NO se pudo grabar   ";
          break;
        case "2X":
          this.cuerpo = "Debe seleccionar folio nuevo    ";
          break;
        case "2Y":
          this.cuerpo = "Doc. Bloqueado para Impresion   ";
          break;
        case "2Z":
          this.cuerpo = "Recuerde llenar formul notifici.";
          break;
        case "3A":
          this.cuerpo = "No existe historia clinica      ";
          break;
        case "3B":
          this.cuerpo = "Hay Antecedentes alergicos      ";
          break;
        case "3C":
          this.cuerpo = "MENSAJE SOI                     ";
          break;
        case "3D":
          this.cuerpo = "ESPECIALIDAD NO CONCUERDA CUP   ";
          break;
        case "3E":
          this.cuerpo = "PER. ATIENDE NO CONCUERDA CUP   ";
          break;
        case "3F":
          this.cuerpo = "Factura no es para tipo paci.   ";
          break;
        case "3G":
          this.cuerpo = "Fact A, solo cierran en mes Ing.";
          break;
        case "3H":
          this.cuerpo = "No genera cargos                ";
          break;
        case "3I":
          this.cuerpo = "Use opcion 72 para epicrisis    ";
          break;
        case "3J":
          this.cuerpo = "CTA para cobrar multa inasistenc";
          break;
        case "3K":
          this.cuerpo = "Falta NIT entidad prestadora ser";
          break;
        case "3L":
          this.cuerpo = "Solo aplica para facturas capita";
          break;
        case "3M":
          this.cuerpo = "No pudo actualizar inventarios  ";
          break;
        case "3N":
          this.cuerpo = "Hay diferencia en cantidades    ";
          break;
        case "3O":
          this.cuerpo = "Paciente tiene fiebre           ";
          break;
        case "3P":
          this.cuerpo = "Paciente con frec. resp rapida  ";
          break;
        case "3Q":
          this.cuerpo = "Excede % Descuento              ";
          break;
        case "3R":
          this.cuerpo = "Solo factura paciente adul> y ob";
          break;
        case "3S":
          this.cuerpo = "Solo factura paciente adul>     ";
          break;
        case "3T":
          this.cuerpo = "No puede ser el mismo operador  ";
          break;
        case "3U":
          this.cuerpo = "Tiene saldo pendiente por pagar ";
          break;
        case "3V":
          this.cuerpo = "No configuro copia de seguridad ";
          break;
        case "3W":
          this.cuerpo = "No hay contrato de mantenimiento";
          break;
        case "3X":
          this.cuerpo = "El votante ya fue visitado      ";
          break;
        case "3Y":
          this.cuerpo = "La cita esta fuera de rango resp";
          break;
        case "3Z":
          this.cuerpo = "El votante ya fue agendado      ";
          break;
        case "4A":
          this.cuerpo = "Excede el tiempo Max Permitido  ";
          break;
        case "4B":
          this.cuerpo = "Solo aplica para p y p          ";
          break;
        case "4C":
          this.cuerpo = "No ha capturado Foto            ";
          break;
        case "4D":
          this.cuerpo = "Prepare el paciente para la foto";
          break;
        case "4E":
          this.cuerpo = "No aplica para especialistas    ";
          break;
        case "4F":
          this.cuerpo = "Solo aplica para especialistas  ";
          break;
        case "4G":
          this.cuerpo = "Vencim certificado Dpen Economic";
          break;
        case "4H":
          this.cuerpo = "Actualizar Colegio Paciente 9714";
          break;
        case "4I":
          this.cuerpo = "Error Factura con Retencion     ";
          break;
        case "4J":
          this.cuerpo = "Actualizar Etinas Paciente 97765";
          break;
        case "4K":
          this.cuerpo = "Esta usando finalidad 10 en pyp ";
          break;
        case "4L":
          this.cuerpo = "Numero de Radicado no existe    ";
          break;
        case "4M":
          this.cuerpo = "Nro de Radicado ya tiene respues";
          break;
        case "4N":
          this.cuerpo = "Nro de Radic no se puede modific";
          break;
        case "4O":
          this.cuerpo = "CAMA DISPONIBLE POR LA OPC. 6-1 ";
          break;
        case "4P":
          this.cuerpo = "No Existe Precio de Venta !     ";
          break;
        case "4Q":
          this.cuerpo = "pct. esta acostado - use opc 9-3";
          break;
        case "4R":
          this.cuerpo = "Inconsistencia en edad gestacion";
          break;
        case "4S":
          this.cuerpo = "Inconsistencia Nro gestaciones  ";
          break;
        case "4T":
          this.cuerpo = "CUPS ya fue facturado ese dia   ";
          break;
        case "4U":
          this.cuerpo = "BLOQUEO FACTURACION Y NOMINA    ";
          break;
        case "4V":
          this.cuerpo = "BLOQUEO FACTURACION E INVENT    ";
          break;
        case "4W":
          this.cuerpo = "BLOQUEO FACTUR, INVENT, NOMINA  ";
          break;
        case "4X":
          this.cuerpo = "Actualizar Comudidad Paci  971H ";
          break;
        case "4Y":
          this.cuerpo = "Actualizar Resguardo Paci  971I ";
          break;
        /*case "4Z": this.cuerpo = "";
            break;*/
        case "5A":
          this.cuerpo = "Solo administrador prosoft      ";
          break;
        case "5B":
          this.cuerpo = "Paciente tutela                 ";
          break;
        case "5C":
          this.cuerpo = "Solo aplica para maestra capitac";
          break;
        case "5D":
          this.cuerpo = "Historia no es de salud ocupacio";
          break;
        case "5E":
          this.cuerpo = "Documento ya fue Impreso !!     ";
          break;
        case "5F":
          this.cuerpo = "Documento tiene  movimiento!    ";
          break;
        case "5G":
          this.cuerpo = "Factura de Contado !            ";
          break;
        case "5H":
          this.cuerpo = "cita no puede ser menor a 5 dias";
          break;
        case "5I":
          this.cuerpo = "factura tiene devolucion!       ";
          break;
        case "5J":
          this.cuerpo = "Paciente alto Costo             ";
          break;
        case "5K":
          this.cuerpo = "stop minimo medicamentos        ";
          break;
        case "5L":
          this.cuerpo = "Atencion codigo no C.I.S        ";
          break;
        case "5M":
          this.cuerpo = "Acceso Denegado Sesion activa   ";
          break;
        case "5N":
          this.cuerpo = "Falta configurar Prefijo Factura";
          break;
        case "5O":
          this.cuerpo = "Proceso suspendido              ";
          break;
        case "5P":
          this.cuerpo = "Solo se admite S, N o I         ";
          break;
        case "5Q":
          this.cuerpo = "Paciente especial               ";
          break;
        case "5R":
          this.cuerpo = "Debe actualizar C.D.P.          ";
          break;
        case "5S":
          this.cuerpo = "La factura es de otro convenio  ";
          break;
        case "5T":
          this.cuerpo = "Resolucion DIAN Vencida         ";
          break;
        case "5U":
          this.cuerpo = "Resolucion DIAN por vencer !    ";
          break;
        case "5V":
          this.cuerpo = "Paciente Multiconsultante       ";
          break;
        /*FALTAN UNAS*/
        case "6A":
          this.cuerpo = "Falta actualizar sobretasa      ";
          break;
        case "6B":
          this.cuerpo = "Falta valor UVT del a�o         ";
          break;
        case "6C":
          this.cuerpo = "Debe ser una cta provisiones    ";
          break;
        case "6D":
          this.cuerpo = "Diferencia en tarifa de IVA     ";
          break;
        case "6E":
          this.cuerpo = "Paciente esta embarazada        ";
          break;
        case "6F":
          this.cuerpo = "Se requiere diligenciar CLAP    ";
          break;
        case "6G":
          this.cuerpo = "CLAP esta CERRADO!              ";
          break;
        case "6H":
          this.cuerpo = "Falta precio compra!            ";
          break;
        case "6I":
          this.cuerpo = "Tercero asociado a otro NIT     ";
          break;
        case "6J":
          this.cuerpo = "Tercero solo retiene si hay base";
          break;
        case "6K":
          this.cuerpo = "No aplica para persona juridica ";
          break;
        case "6L":
          this.cuerpo = "No se encontro orden salida med.";
          break;
        case "6M":
          this.cuerpo = "Codigo mal clasificado          ";
          break;
        case "6N":
          this.cuerpo = "Comprob. ya tiene boleta salida ";
          break;
        case "6O":
          this.cuerpo = "Documento ya fue aprobado       ";
          break;
        case "6P":
          this.cuerpo = "Depend. de operador no autorizad";
          break;
        case "6Q":
          this.cuerpo = "Debe abrir una nueva historia   ";
          break;
        case "6R":
          this.cuerpo = "Solo se procesan facturas cerrad";
          break;
        case "6T":
          this.cuerpo = "Error en la fecha de presentac. ";
          break;
        case "6U":
          this.cuerpo = "Mensaje citas embarazadas       ";
          break;
        case "6V":
          this.cuerpo = "NO SE EFECTUO NINGUN CAMBIO     ";
          break;
        case "6W":
          this.cuerpo = "CUPS BLOQUEADO PARA ESE NIT     ";
          break;
        case "6X":
          this.cuerpo = "No es necesario imprimir documen";
          break;
        case "6Y":
          this.cuerpo = "Intenta disminuir precio venta! ";
          break;
        case "7A":
          this.cuerpo = "Paciente cronico                ";
          break;
        case "7B":
          this.cuerpo = "Limite de citas cumplida        ";
          break;
        case "7C":
          this.cuerpo = "Limite de Dias de Citas         ";
          break;
        case "7D":
          this.cuerpo = "Fecha u Hora Menor al ingreso   ";
          break;
        case "7E":
          this.cuerpo = "Causa Externa incompatible DX   ";
          break;
        case "7F":
          this.cuerpo = "Impresion unica                 ";
          break;
        case "7G":
          this.cuerpo = "Cita se encuentra cancelada     ";
          break;
        case "7H":
          this.cuerpo = "Medicamento No permitido x clasi";
          break;
        case "7I":
          this.cuerpo = "Pacte ya registra 1ra vez consul";
          break;
        case "7J":
          this.cuerpo = "Pacte ya registra 1ra vez consul";
          break;
        case "7K":
          this.cuerpo = "Medicamento Homologo            ";
          break;
        case "7O":
          this.cuerpo = "Paciente de factura             ";
          break;
        case "7P":
          this.cuerpo = "Paciente tiene movimiento       ";
          break;
        case "7Q":
          this.cuerpo = "Vencimiento Resolucion Dian     ";
          break;
        case "7R":
          this.cuerpo = "Cups Bloquedo por jefe facturac ";
          break;
        case "7S":
          this.cuerpo = "Cita mal facturada              ";
          break;
        case "7T":
          this.cuerpo = "Rips Bloqueado                  ";
          break;
        case "7W":
          this.cuerpo = "Reingreso a Triage < 24 h       ";
          break;
        case "7U":
          this.cuerpo = "Clase de servicio Bloqueada FACT";
          break;
        case "7V":
          this.cuerpo = "Glosa duplicada Excel           ";
          break;
        case "7W":
          this.cuerpo = "Posible reingreso Traige        ";
          break;
        case "7X":
          this.cuerpo = "Cups Desactualizado nueva Resl  ";
          break;
        case "7Z":
          this.cuerpo = "Factura No permite art con IVA  ";
          break;
        case "8A":
          this.cuerpo = "Falta Conf.Actividad Economica  ";
          break;
        case "8B":
          this.cuerpo = "Proceso copia iniciada..        ";
          break;
        case "8C":
          this.cuerpo = "Estudio Ant.No comparativo      ";
          break;
        case "8D":
          this.cuerpo = "Fecha de Fact Mayor a boleta sal";
          break;
        case "8E":
          this.cuerpo = "La finalidad no igual a la cita ";
          break;
        case "8F":
          this.cuerpo = "El cod medicamento no igual pend";
          break;
        case "8G":
          this.cuerpo = "supera la cantidad de pendientes";
          break;
        case "8H":
          this.cuerpo = "Pendiente ya tiene despacho     ";
          break;
        case "8I":
          this.cuerpo = "Paciente con posible abuxo      ";
          break;
        case "8J":
          this.cuerpo = "Cups nivel no igual a Nivel Fact";
          break;
        case "8K":
          this.cuerpo = "Fact actualmente no tiene Radica";
          break;
        case "8L":
          this.cuerpo = "Minimo 10 Caracteres            ";
          break;
        case "8M":
          this.cuerpo = "Factura no es igual a la HC     ";
          break;
        case "8N":
          this.cuerpo = "Cups ya fue Autori mismo mes    ";
          break;
        case "8O":
          this.cuerpo = "Valor de la Poliza super 75 %   ";
          break;
        case "8P":
          this.cuerpo = "Valor de la Poliza super 80 %   ";
          break;
        case "8Q":
          this.cuerpo = "Valor de la Poliza super 85 %   ";
          break;
        case "8R":
          this.cuerpo = "Valor de la Poliza super 90 %   ";
          break;
        case "8S":
          this.cuerpo = "Valor de la Poliza super 95 %   ";
          break;
        case "8T":
          this.cuerpo = "Candidato adulto Mayor Quinqueni";
          break;
        case "8Y":
          this.cuerpo = "Valor errado en el total        ";
          break;
        case "8U":
          this.cuerpo = "Nro de autorizacion en otra fact";
          break;
        case "8V":
          this.cuerpo = "Candidato adolescencia          ";
          break;
        case "8W":
          this.cuerpo = "Candidato juventud              ";
          break;
        case "8X":
          this.cuerpo = "CUPS ya fue facturado 6 meses   ";
          break;
        case "8Y":
          this.cuerpo = "la suma del producto ERROR      ";
          break;
        case "8Z":
          this.cuerpo = "la compra no puede superar 9999 ";
          break;
        case "R6":
          this.cuerpo = "Ya esta registrado entregado    ";
          break;
        case "R7":
          this.cuerpo = "Articulo no esta en tarifa medic";
          break;
        case "R8":
          this.cuerpo = "No definido comportamiento factu";
          break;
        case "R9":
          this.cuerpo = "Bloqueado por cufe factu electro";
          break;
        case "R0":
          this.cuerpo = "Forma de copago errado no acept ";
          break;
        case "S0":
          this.cuerpo = "Lote esta vencido ";
          break;
        case "K2":
          this.cuerpo = " Precio de compra bajo  !       ";
          break;
        case "0A":
          this.cuerpo = "INSTALANDO JAVA                 ";
          break;
        case "0C":
          this.cuerpo = "ERROR CON CREA-HIS.EXE          ";
          break;
        case "0D":
          this.cuerpo = "YA EXISTE UN PARTO PARA ESTE FOLIO";
          break;
        case "0E":
          this.cuerpo = "EXISTE UN PARTO EN MENOS DE 6 MESES";
          break;
        case "0F":
          this.cuerpo = "INSTALANDO POWER COBOL          ";
          break;
        case "0G":
          this.cuerpo = "EL EMPLEADO NO CUMPLE 48 HORAS  ";
          break;
        case "0H":
          this.cuerpo = "EL EMPLEADO NO CUMPLE 192 HORAS ";
          break;
        case "A0":
          this.cuerpo = "No tiene problema en desarrollo ";
          break;
        case "A1":
          this.cuerpo = "Enfermedad muy grave            ";
          break;
        case "A2":
          this.cuerpo = "Neumonia grave                  ";
          break;
        case "A3":
          this.cuerpo = "Neumonia                        ";
          break;
        case "A4":
          this.cuerpo = "Tos o resfriado                 ";
          break;
        case "A5":
          this.cuerpo = "Sibilancia                      ";
          break;
        case "A6":
          this.cuerpo = "DIARREA, deshidratacion grave   ";
          break;
        case "A7":
          this.cuerpo = "DIARREA  deshidratacion leve    ";
          break;
        case "A8":
          this.cuerpo = "DIARREA  RIESGO DESHIDRATACION  ";
          break;
        case "A9":
          this.cuerpo = "Diarrea persistente grave       ";
          break;
        case "AA":
          this.cuerpo = "Diarrea persistente             ";
          break;
        case "AB":
          this.cuerpo = "Disenteria                      ";
          break;
        case "AC":
          this.cuerpo = "Enfermedad febril muy grave     ";
          break;
        case "AD":
          this.cuerpo = "Enfermedad febril intermedio    ";
          break;
        case "AE":
          this.cuerpo = "Enfermedad febril               ";
          break;
        case "AF":
          this.cuerpo = "Sospecha de malaria complicada  ";
          break;
        case "AG":
          this.cuerpo = "Sospecha malaria no complicada  ";
          break;
        case "AH":
          this.cuerpo = "Dengue grave                    ";
          break;
        case "AI":
          this.cuerpo = "Dengue con signos de alarma     ";
          break;
        case "AJ":
          this.cuerpo = "Sospecha de sarampion           ";
          break;
        case "AK":
          this.cuerpo = "Mastoiditis                     ";
          break;
        case "AL":
          this.cuerpo = "Otitis media aguda              ";
          break;
        case "AM":
          this.cuerpo = "Otitis media CRONICA            ";
          break;
        case "AN":
          this.cuerpo = "No tiene otitis media           ";
          break;
        case "AO":
          this.cuerpo = "Faringoamigdalitis estreptococica";
          break;
        case "AP":
          this.cuerpo = "Faringoamigdalitis viral         ";
          break;
        case "AQ":
          this.cuerpo = "No tiene faringoamigdalitis      ";
          break;
        case "AR":
          this.cuerpo = "maltrato fisico y/o abuso sexual";
          break;
        case "AS":
          this.cuerpo = "Sospecha de maltrato             ";
          break;
        case "AT":
          this.cuerpo = "Falla en la crianza              ";
          break;
        case "AU":
          this.cuerpo = "No hay sospecha de maltrato      ";
          break;
        case "AV":
          this.cuerpo = "Desnutricion severa              ";
          break;
        case "AW":
          this.cuerpo = "Desnutricion                     ";
          break;
        case "AX":
          this.cuerpo = "No tiene DESNUTRICION            ";
          break;
        case "AY":
          this.cuerpo = "Riesgo de problema en desarrollo";
          break;
        case "AZ":
          this.cuerpo = "Desarrollo normal con fact riesg";
          break;
        case "B0":
          this.cuerpo = "Falta Estudio Principal         ";
          break;
        case "B1":
          this.cuerpo = "No aplica para esa unid. servic.";
          break;
        case "B2":
          this.cuerpo = "Doc. aplica solo para devolucion";
          break;
        case "B3":
          this.cuerpo = "ES OBLIGATORIO DILIGENCIAR AIEPI";
          break;
        case "B4":
          this.cuerpo = "Doc. no aplica para devoluciones";
          break;
        case "B5":
          this.cuerpo = "Dev.del mes superan tope Aux.Tra";
          break;
        case "B6":
          this.cuerpo = "Actu Dependencia laboral Opc.7C1";
          break;
        case "B7":
          this.cuerpo = "Operador no es igual a correspon";
          break;
        case "B8":
          this.cuerpo = "Vencio certificado de estudio   ";
          break;
        case "B9":
          this.cuerpo = "Error Configuracion de Concepto ";
          break;
        case "BA":
          this.cuerpo = "Obligatorio Actualizar Regimen  ";
          break;
        case "BB":
          this.cuerpo = "Paciente con sobrepeso          ";
          break;
        case "BC":
          this.cuerpo = "Paciente OBESO                  ";
          break;
        case "BD":
          this.cuerpo = "Paciente delgadez moderada      ";
          break;
        case "BE":
          this.cuerpo = "Paciente delgadez severa        ";
          break;
        case "BF":
          this.cuerpo = "Perimetro cefalico -2 inferior  ";
          break;
        case "BG":
          this.cuerpo = "Perimetro cefalico +2 mayor     ";
          break;
        case "BH":
          this.cuerpo = "Probable retraso desarrollo     ";
          break;
        case "BI":
          this.cuerpo = "PESO MUY BAJO                   ";
          break;
        case "BJ":
          this.cuerpo = "PESO BAJO O EN RIESGO           ";
          break;
        case "BK":
          this.cuerpo = "FRECUENCIA CARDIACA ANORMAL     ";
          break;
        case "BL":
          this.cuerpo = "FRECUENCIA RESPIRATORIA ANORMAL ";
          break;
        case "BM":
          this.cuerpo = "TEMPERATURA ANORMAL             ";
          break;
        case "BN":
          this.cuerpo = "CRUP GRAVE                      ";
          break;
        case "BO":
          this.cuerpo = "BRONQUIOLITIS GRAVE             ";
          break;
        case "BP":
          this.cuerpo = "SIBILANCIA GRAVE                ";
          break;
        case "BQ":
          this.cuerpo = "CRUP LEVE                       ";
          break;
        case "BR":
          this.cuerpo = "BRONQUIOLITIS LEVE              ";
          break;
        case "BS":
          this.cuerpo = "DIARREA SIN DESHIDRATACION      ";
          break;
        case "BT":
          this.cuerpo = "DIARREA PERSISTENTE GRAVE       ";
          break;
        case "BU":
          this.cuerpo = "DIARREA PERSISTENTE LEVE        ";
          break;
        case "BV":
          this.cuerpo = "Otitis media RECURRENTE         ";
          break;
        case "BW":
          this.cuerpo = "RIESGO DESNUTRICION             ";
          break;
        case "BX":
          this.cuerpo = "ANEMIA SEVERA                   ";
          break;
        case "BY":
          this.cuerpo = "ANEMIA LEVE                     ";
          break;
        case "BZ":
          this.cuerpo = "NO TIENE ANEMIA                 ";
          break;
        case "C1":
          this.cuerpo = "SIDA ESTADIO 1                  ";
          break;
        case "C2":
          this.cuerpo = "SIDA ESTADIO 2                  ";
          break;
        case "C3":
          this.cuerpo = "SIDA ESTADIO 3                  ";
          break;
        case "C4":
          this.cuerpo = "SIDA ESTADIO 4                  ";
          break;
        case "C5":
          this.cuerpo = "POSIBLE CANCER                  ";
          break;
        case "C6":
          this.cuerpo = "ALGUN RIESGO DE CANCER          ";
          break;
        case "C7":
          this.cuerpo = "POCA PROBABILIDAD DE CANCER     ";
          break;
        case "CA":
          this.cuerpo = "PROBABLE DE DENGUE              ";
          break;
        case "CB":
          this.cuerpo = "MALTRATO FISICO GRAVE           ";
          break;
        case "CC":
          this.cuerpo = "MALTRATO FISICO                 ";
          break;
        case "CD":
          this.cuerpo = "ABUSO SEXUAL                    ";
          break;
        case "CE":
          this.cuerpo = "SOSPECHA DE ABUSO SEXUAL        ";
          break;
        case "CF":
          this.cuerpo = "NEGLIGENCIA O ABANDONO          ";
          break;
        case "CG":
          this.cuerpo = "NO HAY SOSPECHA MALTRATO        ";
          break;
        case "CH":
          this.cuerpo = "PROBABLE RETRASO DEL DESARROLLO ";
          break;
        case "CI":
          this.cuerpo = "RIESGO DE PROBLEMA EN DESARROLLO";
          break;
        case "CJ":
          this.cuerpo = "DESARROLLO NORMAL CON RIESGO    ";
          break;
        case "CK":
          this.cuerpo = "DESARROLLO NORMAL               ";
          break;
        case "CL":
          this.cuerpo = "ESTADO EPILEPTICO               ";
          break;
        case "CM":
          this.cuerpo = "PROBLEMA NEUROLOGICO GRAVE      ";
          break;
        case "CN":
          this.cuerpo = "EPILEPSIA CON CRISIS GENERALIZAD";
          break;
        case "CO":
          this.cuerpo = "EPILEPSIA CON CRISIS FOCAL      ";
          break;
        case "CP":
          this.cuerpo = "EPILEPSIA CON CRISIS DE AUSENCIA";
          break;
        case "CQ":
          this.cuerpo = "NO TIENE EPILEPSIA              ";
          break;
        case "CR":
          this.cuerpo = "SOSPECHA TUBERCULOSIS GRAVE     ";
          break;
        case "CS":
          this.cuerpo = "TUBERCULOSIS CONFIRMADA         ";
          break;
        case "CT":
          this.cuerpo = "TUBERCULOSIS CLINICA            ";
          break;
        case "CU":
          this.cuerpo = "TUBERCULOSIS LATENTE            ";
          break;
        case "CV":
          this.cuerpo = "CONTACTO CON TUBERCULOSIS       ";
          break;
        case "CW":
          this.cuerpo = "INFECCION VIH SINTOMATICA CONFIR";
          break;
        case "CX":
          this.cuerpo = "INFECCION VIH CONFIRMADA        ";
          break;
        case "CY":
          this.cuerpo = "SOSPECHA INFECCION VIH SINTOMATI";
          break;
        case "CZ":
          this.cuerpo = "EXPUESTO VIH                    ";
          break;
        case "D0":
          this.cuerpo = "SURCOS EN MAS DE LA MITAD ANTERI";
          break;
        case "D1":
          this.cuerpo = "TEXTURA PIEL -FINA GELATINOSA   ";
          break;
        case "D2":
          this.cuerpo = "TEXTURA PIEL -FINA LISA         ";
          break;
        case "D3":
          this.cuerpo = "TEXTURA PIEL -MAS GRUESA ESCAMAS";
          break;
        case "D4":
          this.cuerpo = "TEXTURA PIEL -MAS GRUESA GRIETAS";
          break;
        case "D5":
          this.cuerpo = "TEXTURA PIEL -GRIETAS PROFUNDAS ";
          break;
        case "D6":
          this.cuerpo = "TEXTURA PIEL -SIN PLIEGUES      ";
          break;
        case "E0":
          this.cuerpo = "VIH SINTOMATICA IMPROBABLE      ";
          break;
        case "E1":
          this.cuerpo = "VIH DESCARTADO                  ";
          break;
        case "E2":
          this.cuerpo = "CETOSIS O CETOACIDOSIS DIABETICA";
          break;
        case "E3":
          this.cuerpo = "DIABETES MELLITUS               ";
          break;
        case "E4":
          this.cuerpo = "POSIBLE DIABLETES MELLITUS      ";
          break;
        case "E5":
          this.cuerpo = "INTOLERANCIA A LA GLUCOSA       ";
          break;
        case "E6":
          this.cuerpo = "NO TIENE DIABETES MELLITUS      ";
          break;
        case "E7":
          this.cuerpo = "CELULITIS FACIAL                ";
          break;
        case "E8":
          this.cuerpo = "ENFERMEDAD BUCAL GRAVE          ";
          break;
        case "E9":
          this.cuerpo = "TRAUMA BUCO DENTAL              ";
          break;
        case "EA":
          this.cuerpo = "ESTOMATITIS                     ";
          break;
        case "EB":
          this.cuerpo = "ENFERMEDAD DENTAL Y GINGIVAL    ";
          break;
        case "EC":
          this.cuerpo = "ALTO RIESGO DE ENFERMEDAD BUCAL ";
          break;
        case "ED":
          this.cuerpo = "BAJO RIESGO DE ENFERMEDAD BUCAL ";
          break;
        case "EE":
          this.cuerpo = "PERIMETRO ABDOMINAL ALTO RIESGO ";
          break;
        case "EF":
          this.cuerpo = "APENDIC.DEBE REALIZARSE EN 6 HOR";
          break;
        case "EG":
          this.cuerpo = "NO HAY ULTRASONOGRAFIA          ";
          break;
        case "EH":
          this.cuerpo = "EMBARAZO DE ALTO RIESGO         ";
          break;
        case "EI":
          this.cuerpo = "CANTIDAD DE MEDICANETO EN CERO  ";
          break;
        case "EJ":
          this.cuerpo = "FALTAN DATOS DE CLASIFICACION   ";
          break;
        case "EK":
          this.cuerpo = "FALTAN DATOS DE MADRE           ";
          break;
        case "EL":
          this.cuerpo = "PACIENTE MUERTO SOLO ADMI O GEBC";
          break;
        case "EM":
          this.cuerpo = "INFECCION LOCAL                 ";
          break;
        case "EN":
          this.cuerpo = "DIARREA CON SANGRE              ";
          break;
        case "EO":
          this.cuerpo = "PROBLEMA SEVERO ALIMENTACION    ";
          break;
        case "EP":
          this.cuerpo = "PROBLEMA LEVE ALIMENTACION      ";
          break;
        case "EQ":
          this.cuerpo = "ERROR EN SOLICITUD DE PATOLOGIA ";
          break;
        case "G0":
          this.cuerpo = "DIAGN. P Y P COMIENZAN POR Z    ";
          break;
        case "G1":
          this.cuerpo = "DIAGN.MORBIL. NO PUEDE EMPEZAR Z";
          break;
        case "G2":
          this.cuerpo = "LA INCAPACIDAD NO SE PUEDE COMBI";
          break;
        case "G3":
          this.cuerpo = "ENFERMEDAD HUERFANA             ";
          break;
        case "G4":
          this.cuerpo = "AISLAR POR BACTERIA RESISTENTE  ";
          break;
        case "H1":
          this.cuerpo = "PESO NORMAL                     ";
          break;
        case "H2":
          this.cuerpo = "DELGADEZ                        ";
          break;
        case "H3":
          this.cuerpo = "TALLA MENOR RESPECTO A LA ULTIMA";
          break;
        case "H4":
          this.cuerpo = "DILIGENCIAR CONSENTIMIENTO INFOR";
          break;
        case "RA":
          this.cuerpo = "COD NO ESTA EN MAESTRO ARTICULOS";
          break;
        case "U7":
          this.cuerpo = "TANNER MASCULINO                ";
          break;
        case "U8":
          this.cuerpo = "TANNER FEMENINO                 ";
          break;
        case "U9":
          this.cuerpo = "TAMAÑO SENOS                    ";
          break;
        case "UA":
          this.cuerpo = "TAMAÑO TESTICULOS               ";
          break;
        case "UM":
          this.cuerpo = "Sesion no valida!";
          break;
        case "  ":
          this.cuerpo = "Codigo de error no identificado ";
          break;
        case "DESHAB":
          this.cuerpo = "Opcion Deshabilitada Temporalmente";
          break;
        case "BLOQUEADO":
          this.cuerpo = "PROGRAMA BLOQUEADO";
          break;
        case "USER":
          this.cuerpo = `Datos ingresados invalidos`;
          break;
        case "CON":
          this.cuerpo = "Correcto, iniciando sesión";
          break;
        case "N1":
          this.cuerpo = `${this.alerta.descrip}`;
          break;
        case "I1":
          this.cuerpo = `Impresión  generada ${this.alerta.descrip}`;
          break;
        case "SERV":
          this.cuerpo = "Error de conexión con el servidor";
          break;
        case "ELIM":
          this.cuerpo = "Datos eliminados correctamente";
          break;
        case "FAV":
          this.cuerpo = "No se puede agregar mas de 12 favoritos";
          break;
        case "000":
          this.cuerpo = "Error consultando datos";
          break;
        case "NFAV":
          this.cuerpo = "No tienes favoritos agregados";
          break;
        case "NOSE":
          this.cuerpo = "Error desconocido, arreglelo ya!";
          break;
        case "NG":
          this.cuerpo = `No fue posible guardar cambios. Res: ${this.alerta.descrip}. Contacte con PROSOFT.`;
          break;
        case "personalizada":
          this.cuerpo = `${this.alerta.descrip}`;
          break;
        default:
          this.cuerpo = this.alerta.descrip;
          break;
      }

      return this.cuerpo;
    },

    confirmar() {
      this.$emit("confirmar");
    },
    cancelar() {
      this.$emit("cancelar");
    },
    cancelarAlerta() {
      console.log(this.alerta);
      if (this.alerta.func1) {
        this.alerta.estado = false;
        this.alerta.func1();
      } else this.$emit("cancelarAlerta");
    },
    salir() {
      if (event.keyCode === 27) {
        if (this.btn_cancelar) {
          this.$emit("cancelar");
        } else {
          this.$emit("salirEsc");
        }
      }
    },
    checkKey(event) {
      switch (event.which) {
        case 39: //derecha
          this.$refs.btn2.$el.focus();
          break;
        case 83: //tecla s para que no se Crucen eventos al momento del focusear el dialogo
          this.$refs.btn2.$el.focus();
          break;
        case 37: //izquierda
          this.$refs.btn1.$el.focus();
          break;
        case 38: //izquierda
          this.$refs.btn1.$el.focus();
          break;
        default:
          //teclas por defaul
          break;
      }
    },
  },
  watch: {
    confirmarActiva() {
      if (this.confirmarActiva) return;
      requestAnimationFrame(() => {
        if (this.btn_cancelar == false) {
          this.$refs.btn3.$el.focus();
        } else {
          this.$refs.btn1.$el.focus();
        }
      });
    },
  },
  created() {
    this.msjError(this.alerta.code);
    setTimeout(() => {
      this.$refs.btn3.$el.focus();
    }, 100);

    document.addEventListener("keydown", this.salir);
    document.addEventListener("keydown", this.checkKey);
  },
  destroyed() {
    // recordar v-if en el fconcomponente para evitar inconvenientes con otros eventos externos
    document.removeEventListener("keydown", this.salir);
    document.removeEventListener("keydown", this.checkKey);
  },
};
</script>
