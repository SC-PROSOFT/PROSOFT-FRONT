import instance from "@/mixins/globalConse";
import moment from "moment";
class formato {
  constructor(params) {
    this.datos = params;
  }
  _init() {
    console.log("datosImpresion", { ...this.datos });
    this.datos.empresa = JSON.parse(sessionStorage.datos_empresa);

    let default_img_base64 =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

    switch (this.datos.atiende_prof) {
      case "1":
        this.datos.cargo_prof = "MEDICO ESPECIALISTA";
        break;
      case "2":
        this.datos.cargo_prof = "MEDICO GENERAL";
        break;
      case "3":
        this.datos.cargo_prof = "ENFERMERA";
        break;
      case "4":
        this.datos.cargo_prof = "AUXILIAR ENFERMERIA";
        break;
      case "5":
        this.datos.cargo_prof = "TERAPIAS Y OTROS";
        break;
      case "6":
        this.datos.cargo_prof = "ENFERMERA JEFE PYP";
        break;
      case "7":
        this.datos.cargo_prof = "PSICOLOGIA";
        break;
      case "8":
        this.datos.cargo_prof = "NUTRICIONISTA";
        break;
      case "9":
        this.datos.cargo_prof = "SIN DETERMINAR";
        break;
      case "A":
        this.datos.cargo_prof = "ODONTOLOGO";
        break;
      case "H":
        this.datos.cargo_prof = "HIGIENISTA ORAL";
        break;
      case "I":
        this.datos.cargo_prof = "INSTRUMENTACION";
        break;
      case "O":
        this.datos.cargo_prof = "OPTOMETRA";
        break;
      default:
        this.datos.cargo_prof = "";
        break;
    }

    return {
      pageSize: "LETTER",
      pageMargins: [35, 88, 35, 30],
      images: {
        logo: sessionStorage.logo || default_img_base64,
        firma_consen: this.datos.img_firma_consen || default_img_base64,
        firma_profesional: this.datos.firma_prof || sessionStorage.firma_prof || default_img_base64,
      },
      header: () => {
        return {
          margin: [35, 20, 35, 0],
          stack: [
            {
              fontSize: 10,
              alignment: "center",
              table: {
                widths: ["15.5%", "36%", "18.5%", "15%", "15%"],
                body: [
                  [
                    {
                      image: "logo",
                      width: 75,
                      height: 50,
                      rowSpan: 2,
                    },
                    {
                      text:
                        this.datos.reg_coninf.datos_encab.descrip.length > 60
                          ? this.datos.reg_coninf.datos_encab.descrip.toUpperCase().slice(25)
                          : this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
                      bold: true,
                    },
                    {
                      text: [{ text: "Versión \n", bold: true }, { text: this.datos.reg_coninf.datos_encab.version }],
                    },
                    {
                      text: [{ text: "Código \n", bold: true }, { text: this.datos.reg_coninf.datos_encab.codigo }],
                    },
                    {
                      text: [
                        { text: "Aprobado el \n", bold: true },
                        {
                          text: instance.data().fecha_edit(this.datos.reg_coninf.datos_encab.fecha_aprob),
                        },
                      ],
                    },
                  ],
                  [
                    {},
                    {
                      marginTop: this.datos.empresa.NOMUSU.length < 28 ? 5 : 0,
                      text: this.datos.empresa.NOMUSU,
                      bold: true,
                    },
                    {
                      text: [
                        { text: "Fecha actualización \n", bold: true },
                        {
                          text: instance.data().fecha_edit(this.datos.reg_coninf.datos_encab.fecha_act),
                        },
                      ],
                    },
                    {
                      text: [
                        { text: "Revisado por \n", bold: true },
                        { text: this.datos.reg_coninf.datos_encab.reviso },
                      ],
                    },
                    {
                      text: [
                        { text: "Aprobado por \n", bold: true },
                        { text: this.datos.reg_coninf.datos_encab.aprobo },
                      ],
                    },
                  ],
                ],
              },
            },
          ],
        };
      },
      content: this.content(),
      footer: function (currentPage, pageCount) {
        return {
          margin: [35, 0, 35, 0],
          text: `Pag. ${currentPage} / ${pageCount}`,
          fontSize: 8,
          alignment: "right",
          color: "grey",
        };
      },
      styles: {
        left7Bold: {
          fontSize: 7,
          bold: true,
          alignment: "left",
        },
        left7: {
          fontSize: 7,
          alignment: "left",
        },
        ceter8Bold: {
          fontSize: 8,
          bold: true,
          alignment: "center",
        },
        center8: {
          fontSize: 8,
          alignment: "center",
        },
        left8Bold: {
          fontSize: 8,
          bold: true,
          alignment: "left",
        },
        left8: {
          fontSize: 8,
          alignment: "left",
        },
        left9Bold: {
          fontSize: 9,
          bold: true,
          alignment: "left",
        },
        left9: {
          fontSize: 9,
          alignment: "left",
        },
        center9Bold: {
          fontSize: 9,
          bold: true,
          alignment: "center",
        },
        left10: {
          fontSize: 10,
          alignment: "left",
        },
        left10Bold: {
          bold: true,
          fontSize: 10,
          alignment: "left",
        },
        center10: {
          fontSize: 10,
          alignment: "center",
        },
        center10Bold: {
          bold: true,
          fontSize: 10,
          alignment: "center",
        },
        left11Bold: {
          bold: true,
          fontSize: 11,
          alignment: "left",
        },
        center11Bold: {
          bold: true,
          fontSize: 11,
          alignment: "center",
        },
        left11: {
          fontSize: 11,
          alignment: "left",
        },
        center12Bold: {
          bold: true,
          fontSize: 12,
          alignment: "center",
        },
        left12Bold: {
          bold: true,
          fontSize: 12,
          alignment: "left",
        },
      },
    };
  }

  content() {
    switch (this.datos.reg_coninf.cod) {
      case "HIC001":
        return [
          {
            stack: [
              {
                style: "left9",
                stack: [
                  {
                    style: "center11Bold",
                    text: "CONSENTIMIENTO INFORMADO PARA LA PRUEBA DE VIH (Prueba de Inmunodeficiencia Humana)",
                  },
                  {
                    marginTop: 10,
                    alignment: "justify",
                    text: "El presente documento tiene como objetivo que usted, luego de haber recibido información, manifieste de manera libre y voluntaria, a través de su firma, la autorización o rechazo a la realización del examen de detección del VIH, según se establece en la normatividad Decreto 1543 de 1997 del Ministerio de la Protección Social por el cual reglamenta los mecanismos de prevención, diagnóstico, manejo y reporte epidemiológico de la infección por VIH.",
                  },
                  {
                    marginTop: 10,
                    alignment: "justify",
                    text: [
                      { text: "Yo " },
                      { text: this.datos.reg_paci.descrip.trim() + " ", bold: true },
                      {
                        text: `${this.datos.reg_paci.tipo_id} - ${instance.data().mask_id(this.datos.reg_paci.cod)}`,
                        bold: true,
                      },
                      {
                        text: ". Acepto y autorizo al laboratorio clínico del ",
                      },
                      {
                        text: this.datos.empresa.NOMUSU,
                        bold: true,
                      },
                      {
                        text: ", para que me realice el exámen de detección de VIH. ",
                      },
                    ],
                  },
                  {
                    marginTop: 5,
                    style: "left11Bold",
                    text: "MOTIVO DE LA PRUEBA",
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.sosp_cli == "S"),
                                width: "10%",
                              },
                              { text: "Sospecha Clinica" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.trans_alt == "S"),
                                width: "10%",
                              },
                              { text: "Transfusión Antes 1990" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.pep_kit == "S"),
                                width: "10%",
                              },
                              { text: "PEP KIT" },
                            ],
                          },
                        ],
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.contact_sex == "S"),
                                width: "10%",
                              },
                              { text: "Contacto Sexual de Riesgo" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.uso_frec_agu == "S"),
                                width: "10%",
                              },
                              { text: "Uso Frecuente de Agujas" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.pep_control_mes == "S"),
                                width: "10%",
                              },
                              { text: "PEP Control Mes" },
                            ],
                          },
                        ],
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.contact_vih == "S"),
                                width: "10%",
                              },
                              { text: "Contacto VIH" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.resul_tam == "S"),
                                width: "10%",
                              },
                              { text: "Resultado Prueba de Tamizaje Positivo" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.pep_control_3_mes == "S"),
                                width: "10%",
                              },
                              { text: "PEP Control 3 Meses" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    marginTop: 10,
                    style: "left11Bold",
                    text: "DEMANDA INDUCIDA",
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.prog_prom == "S"),
                                width: "7%",
                              },
                              {
                                text: "Programa Promoción y Mantenimiento de la Salud",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.cons_ext == "S"),
                                width: "7%",
                              },
                              { text: "Consulta Externa" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.cons_esp == "S"),
                                width: "7%",
                              },
                              { text: "Consulta Especializada" },
                            ],
                          },
                        ],
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.med_legal == "S"),
                                width: "7%",
                              },
                              { text: "Medico Legal" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.cons_urg == "S"),
                                width: "7%",
                              },
                              { text: "Consulta Urgencias" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: "Cuál? " + this.datos.reg_coninf.datos.cual_cons_esp,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    alignment: "justify",
                    marginTop: 10,
                    stack: [
                      { text: "INTRODUCCIÓN", bold: true },
                      {
                        marginTop: 3,
                        text: "Este procedimiento se realiza con el fin de brindar consejería sobre la realización de la prueba para detectar el virus de la inmunodeficiencia humana (VIH) y dar así cumplimiento a la normatividad",
                      },
                      {
                        text: "¿QUE ES EL SINDROME DE INMUNODEFICIENCIA ADQUIRIDA (SIDA)?",
                        bold: true,
                        marginTop: 7,
                      },
                      {
                        marginTop: 3,
                        text: "Es una enfermedad producida por un virus conocido como el VIH, el cual infecta y destruye las células encargadas de la defensa del organismo, originando una falla progresiva y grave de este sistema, quedando el cuerpo expuesto a las infecciones. No tiene cura, pero si tratamiento que puede mejorar la calidad de vida del paciente si se detecta a tiempo.",
                      },
                      {
                        text: "¿COMO SE ADQUIERE LA ENFERMEDAD?",
                        bold: true,
                        marginTop: 7,
                      },
                      {
                        marginTop: 3,
                        text: "La enfermedad se adquiere principalmente por contacto sexual con personas infectadas con el VIH. Por exposición a la sangre y fluidos corporales, al compartir agujas para el suministro de ciertas drogas como la heroína (drogadictos). Además durante el embarazo las madres infectadas con el VIH pueden transmitir la enfermedad a su hijo a través de la placenta.",
                      },
                      {
                        text: "¿COMO SE HACE EL DIAGNOSTICO DE LA INFECCION?",
                        bold: true,
                        marginTop: 7,
                      },
                      {
                        marginTop: 3,
                        text: "El diagnóstico se realiza examinando una muestra de sangre para detectar la presencia del Virus de Inmunodeficiencia Humana (VIH). Existen varias pruebas de laboratorio. El primer paso es examinar la sangre utilizando una prueba rápida; si esta resulta “POSITIVA”, se repite nuevamente y se debe realizar una prueba confirmatoria (Western Blot); si esta última se confirma como “POSITIVA” significa que la persona está infectada con el VIH y que la puede transmitir (si no se toma las medidas de protección adecuadas) el virus a otras personas. Si el resultado es NEGATIVO, significa que no hay evidencia de laboratorio, hasta ese momento, de que la persona esté infectada con el VIH.",
                      },
                      { text: "CONSENTIMIENTO:", bold: true, marginTop: 7 },
                      {
                        marginTop: 3,
                        text: "Declaro haber comprendido este documento y haber recibido Consejería ASESORÍA PRE TEST y entiendo que la toma de la muestra es voluntaria Acepto la responsabilidad de retirar personalmente el resultado; en caso de no retirarlo en la fecha acordada, acepto que se me contacte confidencialmente, según los procedimientos que me han informado (llamado telefónico, visita domiciliaria, carta certificada, correo electrónico).",
                      },
                    ],
                  },
                  {
                    marginTop: 5,
                    text: "CALIDAD EN LA QUE SE OTORGA ESTE CONSENTIMIENTO",
                    style: "center10Bold",
                  },
                  {
                    marginTop: 3,
                    columns: [
                      { text: "Como Paciente", width: "14%" },
                      { text: "SI", width: "3%" },
                      {
                        stack: this.cuadro_canvas(this.datos.reg_coninf.paci_acept == "S"),
                        width: "4%",
                      },
                      { text: "NO", width: "3%" },
                      {
                        stack: this.cuadro_canvas(this.datos.reg_coninf.paci_acept == "N"),
                        width: "4%",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    columns: [
                      {
                        text: "Como responsable del paciente: (Padre o Madre si es menor; representante legal, familiar o representante u otras personas que figuren como tales en la historia clínica.)",
                        width: "84%",
                      },
                      { text: "SI", width: "3%" },
                      {
                        stack: this.cuadro_canvas(this.datos.reg_coninf.acomp_acept == "S"),
                        width: "4%",
                      },
                      { text: "NO", width: "3%" },
                      {
                        stack: this.cuadro_canvas(this.datos.reg_coninf.acomp_acept == "N"),
                        width: "4%",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "Fecha de Notificación:  " },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.fecha, "YYYYMMDD").format("YYYY/MM/DD")} | ${moment(
                          this.datos.reg_coninf.llave.hora,
                          "HHmm"
                        ).format("HH:mm")}`,
                      },
                    ],
                  },
                  {
                    marginTop: 1,
                    stack: [
                      {
                        unbreakable: true,
                        marginTop: 5,
                        table: {
                          heights: [10, 70],
                          widths: ["33%", "33%", "34%"],
                          body: [this.firmas(true)],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];
      case "HIC002":
        return [
          {
            stack: [
              {
                style: "left9",
                stack: [
                  {
                    style: "center11Bold",
                    text: "FORMATO SALIDA VOLUNTARIA DE URGENCIAS",
                  },
                  {
                    fontSize: 10,
                    alignment: "right",
                    marginTop: 5,
                    text: [
                      { text: "Fecha: ", bold: true },
                      { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
                      { text: " Hora: ", bold: true },
                      { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
                    ],
                  },
                  {
                    marginTop: 5,
                    marginBottom: 5,
                    alignment: "justify",
                    stack: [
                      this.datos.reg_coninf.paci_acept == "S"
                        ? [
                            {
                              text: [
                                { text: "Yo " },
                                {
                                  text: this.datos.reg_paci.descrip.trim() + " ",
                                  bold: true,
                                },
                                {
                                  text: this.datos.reg_paci.sexo == "F" ? "identificada" : "identificado",
                                },
                                { text: " con documento No. " },
                                {
                                  text: instance.data().mask_id(this.datos.reg_paci.cod),
                                  bold: true,
                                },
                                {
                                  text: ", mayor de edad y/o responsable del paciente: ",
                                },
                                {
                                  text: "______________________ identificado con __ de ________________ ",
                                },
                                {
                                  text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro: \n ",
                                },
                              ],
                            },
                          ]
                        : [
                            {
                              text: [
                                { text: "Yo " },
                                {
                                  text: this.datos.reg_acomp.descrip.trim() + " ",
                                  bold: true,
                                },
                                {
                                  text: this.datos.reg_acomp.sexo == "F" ? "identificada" : "identificado",
                                },
                                { text: "con documento No. " },
                                {
                                  text: instance.data().mask_id(this.datos.reg_acomp.cod),
                                  bold: true,
                                },
                                {
                                  text: ", mayor de edad y/o responsable del paciente: ",
                                },
                                {
                                  text: this.datos.reg_paci.descrip.trim() + " ",
                                  bold: true,
                                },
                                {
                                  text: this.datos.reg_paci.sexo == "F" ? "identificada" : "identificado",
                                },
                                { text: "con documento No. " },
                                {
                                  text: instance.data().mask_id(this.datos.reg_paci.cod),
                                  bold: true,
                                },
                                { text: " de " },
                                {
                                  text: this.datos.reg_paci.descrip_ciudad.trim() + ", ",
                                  bold: true,
                                },
                                {
                                  text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro: \n ",
                                },
                              ],
                            },
                          ],
                      {
                        text: "Que por mi propia voluntad y pleno conocimiento de riesgos complicaciones explicadas por el personal médico, he decidido solicitar el retiro voluntario, eximiendo de toda responsabilidad a esta institución y al personal que en ella labora, por las consecuencias que puedan sobrevenir por mi determinación ",
                      },
                    ],
                  },
                  {
                    marginTop: 10,
                    text: [
                      { text: "Fecha de ingreso a urgencias: ".toUpperCase(), bold: true },
                      {
                        text: moment(this.datos.reg_hc.fecha, "YYYYMMDD").format("YYYY/MM/DD"),
                      },
                      { text: " Hora: ".toUpperCase(), bold: true },
                      {
                        text: moment(this.datos.reg_hc.hora, "YYYYMMDD").format("YYYY/MM/DD"),
                      },
                    ],
                  },
                  {
                    margin: [0, 5, 0, 5],
                    stack: this.diagnosticos(),
                  },
                  {
                    marginTop: 5,
                    stack: [
                      { text: "MOTIVO DEL RETIRO", bold: true },
                      this.box_text_area(this.datos.reg_coninf.datos.motivo_retiro.enterPut()),
                    ],
                  },
                  {
                    marginTop: 5,
                    stack: [
                      { text: "OBSERVACIONES", bold: true },
                      this.box_text_area(this.datos.reg_coninf.datos.observaciones.enterPut()),
                    ],
                  },
                  {
                    marginTop: 20,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC003":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            stack:
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor __________________________________________ identificado con ______________, declaro que:",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_acomp.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con " },
                        {
                          text: `${this.datos.reg_paci.tipo_id} ${this.datos.reg_paci.cod}`,
                          bold: true,
                        },
                        { text: "declaro que: " },
                      ],
                    },
                  ],
          },
          {
            style: "left10",
            marginTop: 2,
            alignment: "justify",
            text: [
              {
                text: "Otorgo mi consentimiento para que sea practicado el procedimiento: ",
              },
              {
                text: "(marque con una x el/los procedimiento(s) que le van a  realizar mencionados en el cuadro 1) ",
                bold: true,
              },
              {
                text: "del cual se me brinda información y se me han explicado tanto la necesidad de hacerlo como los riesgos del mismo",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 6,
            alignment: "justify",
            stack: [
              {
                columns: [
                  {
                    text: "El procedimiento anteriormente descrito requiere anestesia local ",
                    width: "80%",
                  },
                  { text: "SI", width: "3%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.anestesia_local == "S"),
                    width: "5%",
                  },
                  { text: "NO", width: "3.5%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.anestesia_local != "S"),
                    width: "5%",
                  },
                ],
              },
              {
                marginTop: 5,
                columns: [
                  {
                    text: "Autorizo la aplicación de anestesia local, en el momento que se requiera ",
                    width: "80%",
                  },
                  { text: "SI", width: "3%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.aplicacion_anest == "S"),
                    width: "5%",
                  },
                  { text: "NO", width: "3.5%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.aplicacion_anest != "S"),
                    width: "5%",
                  },
                ],
              },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            table: {
              widths: ["35%", "5%", "60%"],
              body: [
                [
                  { text: "PROCEDIMIENTO", style: "center9Bold" },
                  { text: "" },
                  { text: "RIESGOS", style: "center9Bold" },
                ],
                [
                  {
                    text: "Canalización o inyectologia",
                    bold: true,
                    marginTop: 4,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.canal_inyec == "S"),
                    width: "5%",
                    margin: [6, 6, 0, 0],
                  },
                  {
                    text: "Dolor, infiltración por extravasación en la piel, hematomas, flebitis, Infección.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Curaciones", bold: true, marginTop: 6 },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.curaciones == "S"),
                    width: "5%",
                    margin: [6, 6, 0, 0],
                  },
                  {
                    text: "Dolor, Hemorragia, Pérdida de tejido, Infección,  Apertura de herida, Hipersensibilidad del área, cicatrices.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Suturas", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.suturas == "S"),
                    width: "5%",
                    margin: [6, 0, 0, 0],
                  },
                  {
                    text: "Dolor, inflamación, infección.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Inserción  y retiro de sondas vesical, orogástrica, nasogástrica",
                    bold: true,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.sondas_vesi_oro_naso == "S"),
                    width: "5%",
                    margin: [6, 6, 0, 0],
                  },
                  {
                    text: "Desgarro y/o ruptura de órgano implicado, hemorragia, edema o inflamación, dolor.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Administración de medicamentos", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.admin_medica == "S"),
                    width: "5%",
                    margin: [6, 0, 0, 0],
                  },
                  { text: "Reacciones adversas", alignment: "justify" },
                ],
                [
                  { text: "Intubación orotraqueal", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.intubacion_oro == "S"),
                    width: "5%",
                    margin: [6, 0, 0, 0],
                  },
                  {
                    text: "Hemorragia, aerofagia, broncoaspiración, muerte",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Extracción de cuerpo extraño", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.extraccion_cuerpo == "S"),
                    width: "5%",
                    margin: [6, 6, 0, 0],
                  },
                  {
                    text: "Lesiones del tejido en el lugar de ubicación del cuerpo extraño, sangrado.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Lavado otico", bold: true, marginTop: 10 },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.lavado_otico == "S"),
                    width: "5%",
                    margin: [6, 12, 0, 0],
                  },
                  {
                    text: "Retención de líquido e humedad en el canal auditivo ocasiones estimulación de crecimiento bacteriano, perforación membrana timpánica, tinitus m vértigo.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Toma de muestras de laboratorio (química sanguínea, frotis vaginal, muestra de esputo, muestra uroanalisis y coprológico)",
                    bold: true,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.toma_muestras == "S"),
                    width: "5%",
                    margin: [6, 18, 0, 0],
                  },
                  {
                    text: "Dolor, ardor, hematomas, infección.",
                    alignment: "justify",
                    marginTop: 10,
                  },
                ],
              ],
            },
          },
          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        text: "Certifico que se me ha explicado el procedimiento y entiendo sus posibles riesgos y complicaciones También me han explicado los cuidados que debo tener posteriormente al egreso",
                        fontSize: 9,
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de ser informado de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi negación/ revocación para su realización, haciéndome responsable de las consecuencias que se puedan derivar de ésta decisión.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "HIC004":
        return [
          {
            style: "center12Bold",
            text: "CONSENTIMIENTO INFORMADO ESTUDIO DE CASO CLINICO",
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            fontSize: 10,
            alignment: "justify",
            marginTop: 5,
            stack:
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        {
                          text: "Por medio de la presente, declaro que el doctor ",
                        },
                        {
                          text: this.datos.reg_prof.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con Cédula de Ciudadanía No " },
                        {
                          text: instance.data().mask_id(this.datos.reg_prof.cod),
                          bold: true,
                        },
                        {
                          text: ", ha informado a ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con " },
                        { text: this.datos.reg_paci.tipo_id, bold: true },
                        { text: " expedida en " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad,
                          bold: true,
                        },
                        {
                          text: "; sobre su intención de divulgar y hacer público el caso clínico correspondiente a: ",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        {
                          text: "Por medio de la presente, declaro que el doctor ",
                        },
                        {
                          text: this.datos.reg_prof.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con Cédula de Ciudadanía No " },
                        {
                          text: instance.data().mask_id(this.datos.reg_prof.cod),
                          bold: true,
                        },
                        {
                          text: ", ha informado a ",
                        },
                        {
                          text: this.datos.reg_acomp.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con " },
                        { text: this.datos.reg_acomp.tipo_id, bold: true },
                        { text: " expedida en " },
                        {
                          text: this.datos.reg_acomp.descrip_ciudad,
                          bold: true,
                        },
                        {
                          text: "; sobre su intención de divulgar y hacer público el caso clínico correspondiente a: ",
                        },
                      ],
                    },
                  ],
          },
          {
            style: "left10",
            marginTop: 4,
            text: [
              { text: "Nombre: ", bold: true },
              { text: this.datos.reg_paci.descrip },
              { text: "\nIdentificación: ", bold: true },
              {
                text: `${this.datos.reg_paci.tipo_id} ${instance.data().mask_id(this.datos.reg_paci.cod)}`,
              },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            text: "Con propósitos puramente académicos y científicos, haciendo uso de la información que de forma verídica le he referido, exámenes de laboratorio y demás estudios que él ha considerado pertinentes. Del mismo modo solicita mi permiso para tomar fotografías clínicas que serán utilizadas de manera profesional. Manifiesto que he sido informado que esta información podrá ayudar a personas que padezcan la misma condición médica, que la identidad no será revelada y que siempre se velará por que la privacidad y anonimato se mantengan en todo momento, así mismo no recibiré una contribución económica por el uso de dicha información.",
          },
          {
            style: "left10",
            marginTop: 10,
            alignment: "justify",
            text: [
              { text: "Basado en lo anterior, autorizo al Doctor " },
              { text: this.datos.reg_prof.descrip, bold: true },
              {
                text: " la reproducción de la información antes mencionada y el uso de las fotografías que ha tomado bajo mi autorización.",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(true)],
            },
          },
          {
            marginTop: 5,
            fontSize: 7,
            alignment: "center",
            text: "Este documento responde a lo dispuesto en La Ley 23 de 1981, Decreto 3380 de 1981 y Sentencia T 401 de 1994",
          },
        ];
      case "HIC005":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            marginTop: 5,
            style: "center12Bold",
            text: "DISENTIMIENTO INFORMADO DE REMISIÓN Y TRASLADOS PRIORIZADOS",
          },
          {
            style: "left10",
            marginTop: 10,
            alignment: "justify",
            stack: [
              {
                text:
                  this.datos.reg_coninf.paci_acept == "S"
                    ? [
                        { text: "Yo, " },
                        { text: this.datos.reg_paci.descrip, bold: true },
                        { text: ", mayor de edad identificado con el documento N°: " },
                        { text: instance.data().mask_id(this.datos.reg_paci.cod), bold: true },
                        { text: " de " },
                        { text: this.datos.reg_paci.descrip_ciudad.trim(), bold: true },
                        {
                          text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente o como responsable del menor: ________________________",
                        },
                      ]
                    : [
                        { text: "Yo, " },
                        { text: this.datos.reg_acomp.descrip.trim(), bold: true },
                        { text: ",  mayor de edad identificado con el documento N°: " },
                        { text: instance.data().mask_id(this.datos.reg_acomp.cod), bold: true },
                        { text: " de " },
                        { text: this.datos.reg_acomp.descrip_ciudad.trim(), bold: true },
                        {
                          text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente o como responsable del menor: ",
                        },
                        { text: this.datos.reg_paci.descrip, bold: true },
                      ],
              },
              { text: " declaro que: " },
              { text: "RECHAZO SER REMITIDO A", bold: true },
              {
                margin: [0, -3, 0, 5],
                stack: [this.box_text_area(this.datos.reg_coninf.datos.remitido_a.trim())],
              },
              {
                text: [
                  { text: "El doctor(a) / o responsable: " },
                  { text: this.datos.reg_prof.descrip, bold: true },
                  {
                    text: " me ha explicado claramente la necesidad de ser trasladado a centro de mayor complejidad a razón de mis condiciones clínicas. Igualmente me han explicado de los riesgos y consecuencias al rechazar esta remisión, declaro la decisión de permanecer en esta institución por: ",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                stack: [
                  { text: "MOTIVO RECHAZO", bold: true },
                  this.box_text_area(this.datos.reg_coninf.datos.motivo_rechazo),
                ],
              },
              {
                style: "left10",
                marginTop: 20,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [this.firmas(true)],
                },
              },
            ],
          },
        ];
      case "HIC006":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            style: "center10",
            fontSize: 7,
            text: [
              {
                text: "El Ministerio de Salud de Colombia, desde el año 2012, incluyo en el Plan Ampliado de Inmunización – PAI, la vacuna contra el Virus del Papiloma Humano – VPH.",
              },
              {
                text: "\nLa cual se  ofrece en forma gratuita a las niñas  entre 9 a 17 años de edad en los establecimientos de salud del territorio nacional.",
              },
            ],
          },
          {
            style: "left12Bold",
            fontSize: 10,
            marginTop: 8,
            text: [{ text: "BENEFICIOS:", bold: true }],
          },
          {
            style: "left10",
            fontSize: 10,
            alignment: "justify",
            text: [
              {
                text: "* Esta vacuna previene la infección por el Virus del Papiloma Humano (VPH) responsable del cáncer de cuello uterino, verrugas genitales y otros tipos de cáncer frecuentes en regiones genitales.",
              },
              {
                text: "\n* Para gozar de la protección de la vacuna, es necesario que la niña reciba las 2 dosis de vacuna: La 1ra dosis al primer contacto con la niña y la 2da dosis 6 meses después de la primera dosis.",
              },
            ],
          },
          {
            style: "left12Bold",
            fontSize: 10,
            text: [{ text: "LA VACUNA ES:", bold: true }],
          },
          {
            style: "left10",
            marginTop: 1,
            fontSize: 10,
            alignment: "justify",
            text: [{ text: "* Muy segura y previene el cáncer de cuello del útero, no cura el cáncer." }],
          },
          {
            style: "left10",
            alignment: "justify",
            marginTop: 10,

            text: [
              { text: "IMPORTANTE:", bold: true },
              {
                text: "Toda niña vacunada, igualmente a futuro, debe realizarse control ginecológico regular y la realización periódica del Papanicolaou.",
              },
            ],
          },
          {
            style: "12Bold",
            marginTop: 7,
            alignment: "left",
            fontSize: 10,
            text: [{ text: "Posibles reacciones después de la vacunación:", bold: true }],
          },
          {
            style: "left10",
            alignment: "justify",
            text: [
              {
                text: "* La reacción más frecuente es en el sitio de inyección puede ser: dolor, enrojecimiento e hinchazón en el lugar de  vacunación. Desaparece (sin tratamiento médico) dentro de las 48 horas.",
              },
              {
                text: "\n* Otras reacciones poco frecuentes son: dolor de cabeza, fatiga, fiebre, náuseas, que desaparecen en las siguientes 48 horas. Si persisten, buscar atención en los establecimientos de salud.",
              },
            ],
          },
          {
            style: "bold12",
            marginTop: 7,
            alignment: "left",
            fontSize: 10,
            text: [{ text: "Reacciones menos frecuentes no asociadas a la vacuna pero reportadas:", bold: true }],
          },
          {
            style: "left10",
            alignment: "justify",
            text: [
              {
                text: "* Desmayo: Esta reacción puede producirse por temor o miedo y no por la vacuna propiamente. Para evitar esta reacción se recomienda administrar la vacuna a la niña sentada y permanecer así en observación 15 minutos después de la administración de la vacuna.",
              },
              {
                text: "\n* Reacciones alérgicas como ronchas o picazón que pasan rápidamente. Si persisten, buscar atención en el establecimiento de salud.",
              },
            ],
          },
          {
            style: "left12Bold",
            marginTop: 7,
            alignment: "justify",
            fontSize: 10,
            text: [{ text: "DECLARACIÓN:  ", bold: true }],
          },
          {
            style: "left10",
            alignment: "justify",
            fontSize: 10,
            text: [
              { text: "Yo, " },
              { text: this.datos.reg_acomp.descrip, bold: true },
              { text: " identificado con DNI N°: " },
              { text: this.format_doc(this.datos.reg_acomp.cod), bold: true },
              { text: ", familiar, tutor o representante legal de la niña: " },
              { text: this.datos.reg_paci.descrip, bold: true },
              {
                text: ", dejo constancia de haber sido informado sobre los beneficios, seguridad y posibles reacciones a la administración de la vacuna contra el Virus del Papiloma Humano. ",
              },
              {
                text: "\n\nPor lo tanto autorizo ",
              },
              { text: "AUTORIZO ", bold: true },
              { text: "al Personal de la IPS Multisalud  Salud a vacunar a mi menor hija por voluntad propia " },
              {
                text: "y me comprometo a completar las 2 dosis que son necesarias para su protección contra el cáncer de cuello uterino.",
              },
            ],
          },
          {
            marginTop: 25,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(this.datos.reg_coninf.disentimiento == "N")],
            },
          },
        ];
      case "HIC007":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            stack: [
              {
                text: [
                  "Yo, ",
                  { text: this.datos.reg_paci.descrip, bold: true },
                  " identificado(a) con ",
                  { text: this.datos.reg_paci.tipo_id, bold: true },
                  " No. ",
                  { text: instance.data().mask_id(this.datos.reg_paci.cod) },
                  ", residente en ",
                  { text: this.datos.reg_paci.descrip_ciudad, bold: true },
                  ". Declaro voluntariamente mi aceptación para recibir el tratamiento para tuberculosis: ",
                ],
              },
              {
                margin: [0, 0, 0, 5],
                stack: [this.box_text_area(this.datos.reg_coninf.datos.tipo_tuberculosis)],
              },
              {
                marginTop: 5,
                text: [
                  "Y haber sido informado(a) por el Médico ",
                  {
                    text: this.datos.reg_prof.descrip,
                    bold: true,
                  },
                  " de las posibilidades de curación o fracaso de este tratamiento.",
                ],
              },
              {
                marginTop: 5,
                text: "Declaro también, haber sido informado acerca de esta enfermedad, sus complicaciones, signos y síntomas, de las reacciones adversas que pudieran presentarse con el esquema de tratamiento que a continuación se señala: (Marcar con X y diligenciar donde corresponde). ",
              },
              {
                style: "left10",
                columns: [
                  {
                    stack: [
                      {
                        marginTop: 10,
                        columns: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.rifampicina == "S"), width: "10%" },
                          { text: "Rifampicina", margin: [10, 0, 0, 0] },
                        ],
                      },
                      {
                        marginTop: 10,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.reg_coninf.datos.estreptomicina == "S"),
                            width: "10%",
                          },
                          { text: "Estreptomicina", margin: [10, 0, 0, 0] },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        marginTop: 10,
                        columns: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.isoniacida == "S"), width: "10%" },
                          { text: "Isoniacida", margin: [10, 0, 0, 0] },
                        ],
                      },
                      {
                        marginTop: 10,
                        columns: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.rifabutina == "S"), width: "10%" },
                          { text: "Rifabutina", margin: [10, 0, 0, 0] },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        marginTop: 10,
                        columns: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.pirazinamida == "S"), width: "10%" },
                          { text: "Piraminazida", margin: [10, 0, 0, 0] },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        marginTop: 10,
                        columns: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.etambutol == "S"), width: "10%" },
                          { text: "Etambutol", margin: [10, 0, 0, 0] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                marginTop: 10,
                text: [{ text: "Otros: ", bold: true }, this.datos.reg_coninf.datos.otros.trim()],
              },
              {
                marginTop: 10,
                text: [
                  {
                    text: "Manifiesto mi conformidad para recibirlo en forma regular (sin inasistencias ni abandono), totalmente supervisado por el personal designado para tal fin, con estricto cumplimiento de las normas de la estrategia nacional del programa Control de Tuberculosis. También me comprometo a facilitar el examen de mis contactos. En señal de conformidad, firmo el presente consentimiento informado. ",
                  },
                ],
              },
              {
                marginTop: 10,
                style: "center10",
                text: "En caso de menores de edad, el padre o tutor será quien firme el consentimiento informado. Este documento se anexará a la Historia Clínica del paciente. ",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(true)],
            },
          },
        ];
      case "HIC008":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            text: [
              {
                text: [
                  "Yo, ",
                  { text: this.datos.reg_paci.descrip, bold: true },
                  ", identificado(a) con documento N°: ",
                  { text: instance.data().mask_id(this.datos.reg_paci.cod), bold: true },
                  ", de ",
                  { text: this.datos.reg_paci.descrip_ciudad, bold: true },
                  ". Manifiesto bajo la gravedad del Juramento que recibí los servicios que consta en la Factura número:   ",
                  { text: this.datos.reg_hc.cierre.fact, bold: true },
                ],
              },
            ],
          },
          {
            style: "left10",
            marginTop: 10,
            columns: [
              {
                stack: [
                  {
                    marginTop: 3,
                    columns: [
                      { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.consulta_ext == "S"), width: "10%" },
                      { text: "Consulta Externa", margin: [10, 0, 0, 0] },
                    ],
                  },
                ],
              },
              {
                stack: [
                  {
                    marginTop: 3,
                    columns: [
                      { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.hospitaliza == "S"), width: "10%" },
                      { text: "Hospitalización", margin: [10, 0, 0, 0] },
                    ],
                  },
                ],
              },
              {
                stack: [
                  {
                    marginTop: 3,
                    columns: [
                      { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.urgencias == "S"), width: "10%" },
                      { text: "Urgencias", margin: [10, 0, 0, 0] },
                    ],
                  },
                ],
              },
              {
                stack: [
                  {
                    marginTop: 3,
                    columns: [
                      { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.ayudas_diag == "S"), width: "10%" },
                      { text: "Ayudas diagnósticas", margin: [10, 0, 0, 0] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            stack: [
              {
                text: [
                  "En ",
                  { text: this.datos.empresa.NOMUSU, bold: true },
                  ". Lo anterior en cumplimiento a la Resolución 3047 de 2008, numeral 8, literal A del anexo técnico 5.",
                ],
              },
              {
                text: [
                  "Dato en ",
                  { text: this.datos.empresa.DIRUSU },
                  ", a los ",
                  { text: moment(this.datos.reg_coninf.llave.fecha, "YYYYMMDD").format("DD"), bold: true },
                  " días, del mes de ",
                  {
                    text: moment(this.datos.reg_coninf.llave.fecha, "YYYYMMDD").format("MMMM").toUpperCase(),
                    bold: true,
                  },
                  ", del año ",
                  { text: moment(this.datos.reg_coninf.llave.fecha, "YYYYMMDD").format("YYYY"), bold: true },
                ],
              },
            ],
          },
          {
            style: "left10",
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(true)],
            },
          },
        ];
      case "HIC009":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            style: "left10",
            alignment: "justify",
            marginTop: 10,
            text: [
              {
                text:
                  this.datos.reg_coninf.paci_acept == "S"
                    ? [
                        "Yo, ",
                        { text: this.datos.reg_paci.descrip, bold: true },
                        ", mayor de edad identificado con el documento N°: ",
                        { text: instance.data().mask_id(this.datos.reg_paci.cod), bold: true },
                        " de ",
                        { text: this.datos.reg_paci.descrip_ciudad, bold: true },
                        " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor ________________________________, declaro que: ",
                      ]
                    : [
                        "Yo, ",
                        { text: this.datos.reg_acomp.descrip, bold: true },
                        ", mayor de edad identificado con el documento N°: ",
                        { text: instance.data().mask_id(this.datos.reg_acomp.cod), bold: true },
                        " de ",
                        { text: this.datos.reg_acomp.descrip_ciudad, bold: true },
                        " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor ",
                        { text: this.datos.reg_paci.descrip, bold: true },
                        ", declaro que: ",
                      ],
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            ol: [
              {
                marginTop: 5,
                text: [
                  "Otorgo mi consentimiento para el ingreso al servicio de HOSPITALIZACIÓN de acuerdo a los diagnósticos y plan de tratamiento, por orden del médico: ",
                  { text: this.datos.reg_hc.descrip_med, bold: true },
                ],
              },
              {
                text: "Acepto los servicios adicionales que requiera dentro de la estancia hospitalaria como canalización, estudios de laboratorios, radiográficos, así como la administración de medicamentos.",
                marginTop: 5,
              },
              {
                text: "Certifico que me han explicado las NORMAS DE LA INSTITUCIÓN PARA PACIENTES HOSPITALIZADOS, los horarios de visita y las restricciones.",
                marginTop: 5,
              },
              {
                text: "Acepto el ingreso al servicio de hospitalización y entiendo que hay riesgos como las caídas, por lo cual se deben mantener arriba las barandas de las camas.",
                marginTop: 5,
              },
              {
                text: "Tengo derecho a determinar a quién se puede proporcionar información sobre mi estado de salud, incluido la ampliación de esta información, y las personas a quienes no se les puede proporcionar esta, soy consciente de que, en caso de empeoramiento de mi estado de salud, se les informará a las personas designadas y fue informado sobre la posibilidad de determinación en la toma de decisión en mi lugar si no puedo pronunciar el consentimiento.",
                marginTop: 5,
              },
              {
                marginTop: 5,
                stack: [
                  "Prohíbo la prestación de información sobre mi estado de salud a cualquiera de las siguientes personas: ",
                  { text: this.datos.reg_coninf.datos.rechazo_pers, bold: true },
                ],
              },
              {
                text: "Fui informado, que está prohibido grabar videos, audios o hacer grabaciones audiovisuales durante el tiempo de estancia hospitalaria hacia el personal médico y asistencial.",
                marginTop: 5,
              },
              { text: "Fui informado sobre la prohibición de fumar en el área de hospitalización." },
            ],
          },
          {
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(this.datos.reg_coninf.disentimiento != "S")],
            },
          },

          {
            unbreakable: true,
            style: "left10",
            marginTop: 0,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    fontSize: 9,
                    alignment: "justify",
                    stack: [
                      {
                        text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                        style: "center9Bold",
                      },
                      {
                        text: [
                          { text: "Yo, " },
                          {
                            text:
                              this.datos.reg_coninf.disentimiento == "S"
                                ? this.datos.reg_coninf.paci_acept == "S"
                                  ? this.datos.reg_paci.descrip
                                  : this.datos.reg_acomp.descrip
                                : "_______________________________",
                            bold: true,
                          },
                          {
                            text: " después de ser informado de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi negación/ revocación para su realización, haciéndome responsable de las consecuencias que se puedan derivar de ésta decisión.",
                          },
                        ],
                        marginTop: 5,
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                this.firmas(this.datos.reg_coninf.disentimiento == "S"),
              ],
            },
          },
        ];
      case "HIC010":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            alignment: "justify",
            marginTop: 10,
            stack: [
              {
                text: [
                  "Yo, ",
                  { text: this.datos.reg_paci.descrip, bold: true },
                  ", mayor de edad identificado con el documento N°: ",
                  { text: instance.data().mask_id(this.datos.reg_paci.cod), bold: true },
                  " de ",
                  { text: this.datos.reg_paci.descrip_ciudad, bold: true },
                  " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, declaro que: ",
                ],
              },
              {
                marginTop: 5,
                text: [
                  "Otorgo mi consentimiento para que sea practicado el procedimiento de ",
                  { text: "TOMA DE CITOLOGIA VAGINAL COMO TAMIZAJE ", bold: true },
                  "del cual se me brindo información y se me han explicado tanto la necesidad de hacerlo como los riesgos",
                ],
              },
              {
                text: "El procedimiento anteriormente descrito no requiere anestesia, Favorece el diagnóstico oportuno de cáncer de cuello uterino, ya que detecta a tiempo cambios celulares",
                marginTop: 5,
              },
              {
                text: "Se realiza con la ayuda de un espéculo, un cepillo pequeño con el que se toma la muestra en la parte interna y una espátula con la que se hace lo mismo pero en la parte externa; estas muestras de células se extienden sobre una lámina de vidrio para luego ser analizadas en el laboratorio.",
                marginTop: 5,
              },
              {
                text: "La toma de la citología no representa riesgo para la salud de la paciente NO es un examen doloroso pero puede considerarse un poco incómodo si la mujer está tensa en el momento de tomar la muestra.",
                marginTop: 5,
              },
              {
                alignment: "center",
                marginTop: 10,
                stack: [
                  "Certifico que se me ha explicado el procedimiento y entiendo sus posibles riesgos",
                  {
                    text: "HE LEIDO Y ACEPTO REALIZARME EL PROCEDIMIENTO",
                    bold: true,
                  },
                ],
              },
            ],
          },
          {
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(this.datos.reg_coninf.disentimiento != "S")],
            },
          },

          {
            unbreakable: true,
            style: "left10",
            marginTop: 0,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    fontSize: 9,
                    alignment: "justify",
                    stack: [
                      {
                        text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                        style: "center9Bold",
                      },
                      {
                        text: [
                          { text: "Yo, " },
                          {
                            text:
                              this.datos.reg_coninf.disentimiento == "S"
                                ? this.datos.reg_coninf.paci_acept == "S"
                                  ? this.datos.reg_paci.descrip
                                  : this.datos.reg_acomp.descrip
                                : "_______________________________",
                            bold: true,
                          },
                          {
                            text: " después de ser informado de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi negación/ revocación para su realización, haciéndome responsable de las consecuencias que se puedan derivar de ésta decisión.",
                          },
                        ],
                        marginTop: 5,
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                this.firmas(this.datos.reg_coninf.disentimiento == "S"),
              ],
            },
          },
        ];
      case "HIC011":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 10,
            text: [
              { text: "Yo, " },
              { text: this.datos.reg_acomp.descrip, bold: true },
              { text: ", Mayor de edad identificado con el documento N°: " },
              { text: this.format_doc(this.datos.reg_acomp.cod), bold: true },
              { text: " de " },
              { text: this.datos.reg_acomp.descrip_ciudad, bold: true },

              {
                text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente y como representante con el parentesco: ",
              },
              { text: this.datos.reg_coninf.descrip_paren_acomp.trim(), bold: true },
              { text: " del paciente: " },
              { text: this.datos.reg_paci.descrip, bold: true },
              { text: " con documento N°: " },
              { text: this.datos.reg_paci.cod, bold: true },
              { text: " declaro que: " },
            ],
          },
          {
            style: "left10",
            marginTop: 10,
            text: [
              { text: "He sido informado que la condicion del paciente y solicito al personal medico del " },
              { text: "Hospital de san Martín", bold: true },
              {
                text: " para que suspenda las acciones de reanimacion (conjunto de medidas terapeuticas que se aplican para recuperar o mantener las constantes vitales del organismo) de mi familiar.\n\n",
              },
              { text: "en el caso y nivel de atencion del " },
              { text: this.NOMUSU, bold: true },
              {
                text: " las que corresponden a reanimacion cardiocerebro-pulmonar, las cuales estan destinadas a asegurar la oxigenacion de los organos vitales cuando la persona ha dejado de respirar o el corazon ha cesado de palpitar",
              },
              {
                text: "Por lo anterior manifiesto que conozco que todas las decisiones medicas se asientan en dos factores, el primero de ellos es tecnico, se refiere al concepto medico deacuerdo a la lexartis y el segundo es la aceptacion del paciente o familiar, en este caso actuando como representante del paciente debido a la gravedad de su estado de salud.",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            text: [],
          },
          {
            marginTop: 20,
            table: {
              heights: [10, 70],
              widths: ["33%", "33%", "34%"],
              body: [this.firmas(this.datos.reg_coninf.disentimiento != "S")],
            },
          },
        ];
      case "HIC012":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            marginTop: 10,
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip,
          },
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: " con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        {
                          text: ", mayor de edad y/o responsable del paciente: ",
                        },
                        {
                          text: "______________________ identificado con __ de ________________",
                        },
                        {
                          text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro que: \n ",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim() + " ",
                          bold: true,
                        },
                        {
                          text: this.datos.reg_acomp.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: " con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        {
                          text: ", mayor de edad y/o responsable del paciente: ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim() + " ",
                          bold: true,
                        },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: "con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: ", actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro que: \n ",
                        },
                      ],
                    },
                  ],
              {
                fontSize: 10,
                alignment: "center",
                stack: [
                  {
                    text: "otorgo mi consentimiento para que sea practicado el procedimiento de".toUpperCase(),
                    bold: true,
                  },
                  {
                    marginTop: 3,
                    alignment: "center",
                    columns: [
                      {
                        fontSize: 10,
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.tipo_proced == "I"),
                                width: "10%",
                                margin: [370, 0, 0, 0],
                              },
                              {
                                text: "INSERCIÓN",
                                bold: true,
                                margin: [170, 0, 0, 0],
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.reg_coninf.datos.tipo_proced == "R"),
                                width: "10%",
                                // margin: [240, 0, 0, 0],
                              },
                              {
                                text: "RETIRO",
                                bold: true,
                                margin: [-215, 0, 0, 0],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: "implante subdérmico".toUpperCase(),
                    bold: true,
                    marginTop: 6,
                  },
                  {
                    text: "del cual se me brindo información y se me ha informado tanto la necesidad de hacerlo como los riesgos".toUpperCase(),
                    bold: true,
                    marginTop: 6,
                  },
                ],
              },
            ],
          },
          {
            alignment: "justify",
            marginTop: 10,
            fontSize: 10,
            stack: [
              { text: "DECLARO QUE", bold: true, style: "center10Bold" },
              {
                ol: [
                  {
                    marginTop: 7,
                    text: "Me han explicado en un lenguaje claro y comprensible la naturaleza y propósito del procedimiento, también me han informado de las ventajas, complicaciones, molestias y riesgos que pueden producirse, tales como dolor, equimosis, edema, infeccione en el sitio de la incisión, entre otras.",
                  },
                  {
                    marginTop: 7,
                    text: "Se me ha dado la oportunidad de hacer preguntas y mis preguntas han sido contestadas satisfactoriamente.",
                  },
                  {
                    marginTop: 7,
                    text: "Se me ha informado plenamente que retirado el implante y al no iniciar inmediatamente otro método de planificación familiar tengo la oportunidad de quedar embarazada.",
                  },
                  {
                    marginTop: 7,
                    text: "Se me ha informado de todos los signos de alarma por los cuales debo consultar una vez se me haya realizado el procedimiento tales como: dolor, moderado a severo, fiebre, sangrado y salida de secreción por el sitio de incisión, escalofríos, entre otras.",
                  },
                  {
                    marginTop: 7,
                    text: "Tengo la opción de decidir en contra del procedimiento.",
                  },
                ],
              },
              {
                marginTop: 7,
                text: [
                  {
                    text: "Certifico que he leído y comprendido perfectamente lo anterior y que todos los espacios en blanco han sido completados antes de mi firma y por tanto ",
                  },
                  { text: "ACEPTO REALIZAR EL PROCEDIMIENTO", bold: true },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC013":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: " con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        {
                          text: ", mayor de edad y/o responsable del paciente: ",
                        },
                        {
                          text: "______________________ identificado con __ de ________________",
                        },
                        {
                          text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro que: \n ",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim() + " ",
                          bold: true,
                        },
                        {
                          text: this.datos.reg_acomp.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: " con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        {
                          text: ", mayor de edad y/o responsable del paciente: ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim() + " ",
                          bold: true,
                        },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? " identificada" : " identificado",
                        },
                        { text: "con documento No. " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: ", actuando en nombre propio en pleno uso de mis facultades, libre y consciente declaro que: \n ",
                        },
                      ],
                    },
                  ],
            ],
          },
          {
            alignment: "justify",
            marginTop: 5,
            fontSize: 10,
            stack: [
              {
                text: [
                  { text: "1. ", bold: true },
                  {
                    text: " Me han explicado en un lenguaje claro y comprensible la naturaleza y propósito del procedimiento, también me han informado de las ventajas, complicaciones, molestias y riesgos que pueden producirse, tales como dolor, infección, reactivación de enfermedad pélvica, desgarro cervical, entre otras.",
                  },
                ],
              },
              {
                marginTop: 7,
                text: [
                  { text: "2. ", bold: true },
                  {
                    text: "Se ha verificado que actualmente no me encuentro embarazada.",
                  },
                ],
              },
              {
                marginTop: 7,
                text: [
                  { text: "3. ", bold: true },
                  {
                    text: "Se me ha dado la oportunidad de hacer preguntas y mis preguntas han sido contestadas satisfactoriamente.",
                  },
                ],
              },
              {
                marginTop: 10,
                text: "He leído (o se me ha leído) el documento sobre el consentimiento informado que contiene información sobre todos los métodos existentes de planificación familiar. Ventajas, desventajas, contraindicaciones, signos de alarma, consecuencias del uso de cada uno, molestias posteriores, y además comprendo las complicaciones de este procedimiento. Por lo tanto, la paciente realiza la elección de este método, comprometiéndose a acudir a sus controles periódicos.",
              },
              {
                marginTop: 10,
                text: "He recibido consejería previa a la decisión de elección de este método en forma voluntaria, y sin presiones, he expresado todas mis dudas y que me hayan sido resueltas todas las preguntas, por lo tanto, firmo la presente autorización escrita.",
              },
              {
                marginTop: 10,
                columns: [
                  {
                    width: 70,
                    text: [
                      { text: "Edad: ", bold: true },
                      {
                        text: (parseInt(this.datos.reg_hc.vlr_edad) || 0) + " " + this.datos.reg_hc.unid_edad,
                      },
                    ],
                  },
                  {
                    width: 150,
                    text: [{ text: "Teléfono:", bold: true }, { text: this.datos.reg_paci.telefono }],
                  },
                  {
                    text: [{ text: "Dirección:", bold: true }, { text: this.datos.reg_paci.direccion }],
                  },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC014":
        return [
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 3,
            alignment: "justify",
            stack:
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor __________________________________________ identificado con ______________, declaro que:",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_acomp.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con " },
                        {
                          text: `${this.datos.reg_paci.tipo_id} ${this.datos.reg_paci.cod}`,
                          bold: true,
                        },
                        { text: "declaro que: " },
                      ],
                    },
                  ],
          },
          {
            style: "left10",
            marginTop: 2,
            alignment: "justify",
            text: [
              {
                text: "Otorgo mi consentimiento para que sea practicado el procedimiento: ",
              },
              {
                text: "(marque con una x el/los procedimiento(s) que le van a  realizar mencionados en el cuadro 1) ",
                bold: true,
              },
              {
                text: "del cual se me brinda información y se me han explicado tanto la necesidad de hacerlo como los riesgos del mismo",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            table: {
              widths: ["35%", "5%", "60%"],
              body: [
                [
                  { text: "PROCEDIMIENTO", style: "center9Bold" },
                  { text: "" },
                  { text: "RIESGOS", style: "center9Bold" },
                ],
                [
                  {
                    text: "Hospitalización (área general o aislamiento respiratorio)",
                    bold: true,
                    // marginTop: 4,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.hospit == "S"),
                    width: "5%",
                    margin: [6, 7, 0, 0],
                  },
                  {
                    text: "Infecciones nosocomiales, caídas, deterioro clínico, muerte.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Canalización, inyectología, administración de medicamentos y toma de muestras.",
                    bold: true,
                    // marginTop: 4,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.cana_inye_adm_med == "S"),
                    width: "5%",
                    margin: [6, 8, 0, 0],
                  },
                  {
                    text: "Dolor, infiltración, infección, cicatrices, flebitis, reacciones adversas, anafilaxia, muerte.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Sutura de heridas bajo anestesia local", bold: true, marginTop: 4 },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.sutura_anes_loc == "S"),
                    width: "5%",
                    margin: [6, 3, 0, 0],
                  },
                  {
                    text: "Infección, dolor, requerimiento de reintervención, sangrado, resultados estéticos desfavorables, alergias.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Inserción y retiro de sondas (vesical, orogástrica, nasogástrica)",
                    bold: true,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.i_r_sondas == "S"),
                    width: "5%",
                    margin: [6, 5, 0, 0],
                  },
                  {
                    text: "Desgarro y/o ruptura de las estructuras, hemorragia, infección, edema, dolor.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Lavado ótico/ocular/curación de heridas", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.lav_otic_ocular == "S"),
                    width: "5%",
                    margin: [6, 5, 0, 0],
                  },
                  { text: "Lesión de estructuras, dolor, infecciones.", alignment: "justify" },
                ],
                [
                  { text: "Sedación", bold: true, marginTop: 5 },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.sedacion == "S"),
                    width: "5%",
                    margin: [6, 5, 0, 0],
                  },
                  {
                    text: "Insuficiencia respiratoria, lesiones cerebrales, arritmias cardiacas, parada cardiaca, muerte.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Inmovilización física", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.inmov_fisica == "S"),
                    width: "5%",
                    margin: [6, 3, 0, 0],
                  },
                  {
                    text: "Lesión de estructuras, ansiedad, agitación psicomotora.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Traslado en ambulancia a otra institución", bold: true },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.trasl_ambul == "S"),
                    width: "5%",
                    margin: [6, 5, 0, 0],
                  },
                  {
                    text: "Lesiones, traumatismos, muerte.",
                    alignment: "justify",
                  },
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 10,
            alignment: "justify",
            stack: [
              {
                columns: [
                  {
                    text: "Maniobras de reanimación avanzada (compresiones torácicas, desfibrilación, intubación orotraqueal y ventilación mecánica):",
                    width: "80%",
                    margin: [0, 0, 5, 0],
                  },
                  { text: "", width: "5%" },
                  { text: "SI", width: "3%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.maniobra_reani == "S"),
                    width: "5%",
                  },
                  { text: "NO", width: "3.5%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.maniobra_reani != "S"),
                    width: "5%",
                  },
                ],
              },
            ],
          },
          {
            alignment: "justify",
            style: "left10",
            marginTop: 10,
            text: "Certifico que se me ha explicado el procedimiento y entiendo los posibles riesgos y complicaciones, también he sido explicado de los cuidados que debo tener posterior al egreso, Así mismo he sido explicado de los riesgos y posibles complicaciones de no aceptar la realización de los procedimientos indicados por el profesional, por lo cual tomo la decisión con la suficiente información, de manera libre y consiente, bajo mi responsabilidad.",
          },
          {
            style: "left11Bold",
            marginTop: 10,
            stack: [
              {
                columns: [
                  { text: "", width: "35%" },
                  {
                    text: "Autorizo",
                    width: "10%",
                  },
                  {
                    marginTop: 1.5,
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "N"),
                    width: "5%",
                  },
                  { text: "No autorizo", width: "14%" },
                  {
                    marginTop: 1.5,
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "S"),
                    width: "5%",
                  },
                ],
              },
            ],
          },
          {
            marginTop: 10,
            stack: [
              {
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [this.firmas(true)],
                },
              },
            ],
          },
        ];
      case "HIC015":
        return [
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            stack:
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_paci.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: " actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor __________________________________________ identificado con ______________, declaro que:",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim(),
                          bold: true,
                        },
                        {
                          text: " mayor de edad identificado con documento N° ",
                        },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        { text: " de " },
                        {
                          text: this.datos.reg_acomp.descrip_ciudad.trim(),
                          bold: true,
                        },
                        {
                          text: "actuando en nombre propio en pleno uso de mis facultades, libre y consciente, o como responsable del menor ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim(),
                          bold: true,
                        },
                        { text: " identificado con " },
                        {
                          text: `${this.datos.reg_paci.tipo_id} ${this.datos.reg_paci.cod}`,
                          bold: true,
                        },
                        { text: "declaro que: " },
                      ],
                    },
                  ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            text: [
              {
                text: "Otorgo mi consentimiento para que sea practicado el procedimiento: ",
              },
              {
                text: "(marque con una x el/los procedimiento(s) que le van a  realizar mencionados en el cuadro 1) ",
                bold: true,
              },
              {
                text: "del cual se me brinda información y se me han explicado tanto la necesidad de hacerlo como los riesgos del mismo",
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            table: {
              widths: ["35%", "5%", "60%"],
              body: [
                [
                  { text: "PROCEDIMIENTO", style: "center9Bold" },
                  { text: "" },
                  { text: "RIESGOS", style: "center9Bold" },
                ],
                [
                  {
                    text: "Cardioversión (Por medio de descarga eléctrica o medicamentos) ",
                    bold: true,
                    // marginTop: 4,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.cardioversion == "S"),
                    width: "5%",
                    margin: [6, 7, 0, 0],
                  },
                  {
                    text: "Arritmias, quemaduras, lesiones de estructuras, parada cardiaca, muerte.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Reducción de luxaciones o fracturas.",
                    bold: true,
                    // marginTop: 4,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.redu_luxa_fract == "S"),
                    width: "5%",
                    margin: [6, 8, 0, 0],
                  },
                  {
                    text: "Lesión de estructuras, fracturas Oseas, dolor, requerimiento de reintervención.",
                    alignment: "justify",
                  },
                ],
                [
                  { text: "Toracostomia cerrada", bold: true, marginTop: 4 },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.toracostomia == "S"),
                    width: "5%",
                    margin: [6, 3, 0, 0],
                  },
                  {
                    text: "Lesión de estructuras, neumotórax, hemotórax, insuficiencia respiratoria, parada cardiaca, muerte.",
                    alignment: "justify",
                  },
                ],
                [
                  {
                    text: "Atención del parto",
                    bold: true,
                  },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.aten_parto == "S"),
                    width: "5%",
                    margin: [6, 5, 0, 0],
                  },
                  {
                    text: "Hemorragia, lesiones de estructuras, infecciones, muerte materna o fetal.",
                    alignment: "justify",
                  },
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 10,
            alignment: "justify",
            stack: [
              {
                columns: [
                  {
                    text: "Maniobras de reanimación avanzada (compresiones torácicas, desfibrilación, intubación orotraqueal y ventilación mecánica):",
                    width: "80%",
                    margin: [0, 0, 5, 0],
                  },
                  { text: "", width: "5%" },
                  { text: "SI", width: "3%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.maniobra_reani == "S"),
                    width: "5%",
                  },
                  { text: "NO", width: "3.5%" },
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.datos.maniobra_reani != "S"),
                    width: "5%",
                  },
                ],
              },
            ],
          },
          {
            alignment: "justify",
            style: "left10",
            marginTop: 10,
            text: "Certifico que se me ha explicado el procedimiento y entiendo los posibles riesgos y complicaciones, también he sido explicado de los cuidados que debo tener posterior al egreso, Así mismo he sido explicado de los riesgos y posibles complicaciones de no aceptar la realización de los procedimientos indicados por el profesional, por lo cual tomo la decisión con la suficiente información, de manera libre y consiente, bajo mi responsabilidad.",
          },
          {
            style: "left11Bold",
            marginTop: 15,
            stack: [
              {
                columns: [
                  { text: "", width: "35%" },
                  {
                    text: "Autorizo",
                    width: "10%",
                  },
                  {
                    marginTop: 1.5,
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "N"),
                    width: "5%",
                  },
                  { text: "No autorizo", width: "14%" },
                  {
                    marginTop: 1.5,
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "S"),
                    width: "5%",
                  },
                ],
              },
            ],
          },
          {
            marginTop: 15,
            stack: [
              {
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [this.firmas(true)],
                },
              },
            ],
          },
        ];
      case "HIC016":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              [
                {
                  text: [
                    {
                      text: "DESCRIPCION DEL PROCEDIMIENTO \n\n ",
                      bold: true,
                      alignment: "center",
                    },
                    {
                      text: "Este procedimiento consiste en la aplicación de medicamentos (Que pueden producir ardor en el momento de aplicación) los cuales dilatan y paralizan la pupila del paciente, causando visión borrosa y molestia a la luz, su efecto es transitorio de horas, aunque en algunos casos su efecto puede durar varios días después de su aplicación. Por estas razones es requisito acudir acompañado de una persona responsable que colabore con su movilización después del procedimiento. El objetivo de procedimiento es conocer de forma más exacta el defecto visual que debe ser corregido con anteojos o lentes de contacto, y poder evaluar las estructuras internas del ojo.:\n\n ",
                    },
                    {
                      text: "Los medicamentos utilizados para este procedimiento pueden ocasionar además de los ya mencionados, rubor y calor en el rostro, somnolencia y en algunas ocasiones dolor de cabeza momentáneo.\n\n ",
                    },
                    {
                      text: "Estos medicamentos NO deben ser aplicados en los pacientes que tengan las siguientes condiciones\n\n ",
                    },
                    {
                      text: "• Síndrome compulsivo: \n\n ",
                      bold: true,
                    },
                    {
                      text: "• Epilepsia\n\n ",
                    },
                    {
                      text: "• Enfermedades de corazón\n\n ",
                    },
                    {
                      text: "• Enfermedades de pulmón (Asma, Bronquitis, etc.) \n\n ",
                    },
                    {
                      text: "• Gripa aguda \n\n ",
                    },
                    {
                      text: "• Alternaciones neurológicas severas\n\n ",
                    },
                  ],
                },
              ],
            ],
          },
          {
            alignment: "justify",
            marginTop: 5,
            fontSize: 10,
            stack: [
              {
                text: [
                  {
                    text: "¿Qué son las gotas cicloplejias?\n\n",
                    bold: true,
                  },
                  {
                    text: "Hay dos tipos de gotas:\n\n",
                  },
                  {
                    text: "- Unas que fundamentalmente dilatan la pupila (midriasis) y que se usan para ver el fondo del ojo.\n\n",
                  },
                  {
                    text: "Otras que además de lo anterior relajan los músculos que enfocan el cristalino y que se usan para graduar la refracción de las personas\n\n",
                  },

                  {
                    text: "¿Para qué se utilizan?\n\n",
                    bold: true,
                  },
                  {
                    text: "✓ Para ver la necesidad y potencia de los lentes de gafas fundamentalmente en niños.\n\n",
                  },
                  {
                    text: "✓ Para ver el fondo del ojo.\n\n",
                  },
                  {
                    text: "Posología\n\n",
                    bold: true,
                  },
                  {
                    text: "¿Cuánto dura el efecto?\n\n",
                    bold: true,
                  },
                  {
                    text: "Efectos secundarios\n\n",
                    bold: true,
                  },
                  {
                    text: "Fotofobia (molestias con la luz). Desaparece gradualmente con la recuperación de la pupila. Aconsejamos evitar grandes exposiciones a la luz solar. La fotofobia mejora llevando gafas de sol o una gorra en la calle. Si es posible se debe evitar actividades al exterior durante los días que dure la cicloplejia para evitar las molestias..\n\n",
                  },
                  {
                    text: "Visión borrosa o dificultad en el enfoque especialmente de cerca. Desaparece gradualmente con la recuperación de la pupila. Se debe avisar al colegio sobre la dificultad de lectura durante las primeras 24 horas. Si son miopes pueden probar a quitarse las gafas para ver si puede así facilitarse la lectura durante este tiempo. Los adultos deben evitar conducir con la pupila dilatada.\n\n",
                  },
                  {
                    text: "Es frecuente que los niños se pongan rojos y somnolientos con las gotas sobre todo los más pequeños.\n\n",
                  },
                  {
                    text: "Es infrecuente que tengamos reales reacciones alérgicas (ojos inflamados y rojos). Ocasionalmente se puede presentar con atropina fiebre, sequedad de boca, enrojecimiento facial y taquicardia. Ante cualquier problema avise al especialista.\n\n",
                  },
                  {
                    text: "AUTORIZACIÓN (CONSENTIMIENTO)\n\n",
                    bold: true,
                    alignment: "center",
                  },

                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "S" &&
                      `Yo ${this.datos.reg_paci.descrip.trim()} ${
                        this.datos.reg_paci.sexo == "F" ? " identificada" : " identificado"
                      } con ${instance
                        .data()
                        .mask_id(
                          this.datos.reg_paci.cod
                        )} de ${this.datos.reg_paci.descrip_ciudad.trim()} y en nombre propio he entendido las condiciones y objetivos del procedimiento que se me va a practicar en ATENCION MEDICA DEL COLOMBIA SAS., los cuidados que debo tener antes y después de él. He sido advertido sobre los riesgos previsibles que pueden presentarse por la administración del medicamento. Estoy satisfecho (a) con la información recibida del profesional tratante quien lo ha hecho en un lenguaje claro y sencillo, y me ha dado la oportunidad de preguntar y resolver las dudas a satisfacción, además comprendo y acepto el alcance y los riesgos justificados de posible o imposible previsión que conlleva el procedimiento que aquí autorizo. En tales condiciones consiento que se me realice el procedimiento descrito.\n\n`,
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "S"
                        ? "Certifico con mi firma todo lo leído y entendido por mi integridad.\n\n"
                        : "",
                  },

                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? "DECLARACION DEL REPRESENTANTE LEGAL, FAMILIAR, TUTOR O ACUDIENTE DEL PACIENTE.\n\n"
                        : "",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? `Sé que el Paciente por sus condiciones de __________________ es considerado por ahora incapaz de tomar por sí mismo la decisión de aceptar o rechaza el procedimiento antes indicado, por lo cual, YO ${
                            this.datos.reg_acomp.descrip
                          } Identificado con documento de identidad Nº ${instance
                            .data()
                            .mask_id(
                              this.datos.reg_acomp.cod
                            )} en calidad de (colocar parentesco o tipo de representatividad legal) doy mi consentimiento para que el(los) Profesional(es) XXXXXX y el personal auxiliar que el precise, efectúen el procedimiento antes descrito, y los procedimientos complementarios que sean necesarios durante la realización de este, a juicio del (los) profesional(es) que lo lleve(n) a cabo.\n\n`
                        : "",
                  },
                  {
                    text: "DECLARACION DEL PROFESIONAL TRATANTE\n\n",
                    alignment: "center",
                    bold: true,
                  },
                  console.log("estos son los datos", this.datos),
                  {
                    text: `Profesional(es) responsable(s) ${this.datos.reg_prof.descrip.trim()} he informado al Paciente del propósito y
                    naturaleza del procedimiento descrito arriba, de sus alternativas, posibles riesgos y de los resultados que se esperan.
                    Considero que el (la) paciente, comprende completamente lo explicado.\n\n`,
                    bold: true,
                  },
                ],
              },
              {
                marginTop: 10,
                columns: [
                  {
                    width: 70,
                    text: [
                      { text: "Edad: ", bold: true },
                      {
                        text: (parseInt(this.datos.reg_hc.vlr_edad) || 0) + " " + this.datos.reg_hc.unid_edad,
                      },
                    ],
                  },
                  {
                    width: 150,
                    text: [{ text: "Teléfono:", bold: true }, { text: this.datos.reg_paci.telefono }],
                  },
                  {
                    text: [{ text: "Dirección:", bold: true }, { text: this.datos.reg_paci.direccion }],
                  },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC017":
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "center12Bold",
            marginTop: 10,
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        {
                          text: "FINALIDAD \n\n ",
                          bold: true,
                        },
                        {
                          text: "Conocer a fondo la situación de los tejidos del interior del ojo mediante la instilación de gotas para dilatar la pupila,generalmente tropicamida sola o una mezcla de tropicamida más fenilefrina.:\n\n ",
                        },
                        {
                          text: "Se considera un examen importante de realizar en cualquier patología retiniana, por ejemplo: retinopatía diabética, determinadas enfermedades maculares (miopía, degeneración macular asociada a la edad, edemas o encharcamientos maculares), malformaciones, procesos inflamatorios, tumores, etc..\n\n ",
                        },
                        {
                          text: "La técnica se realiza en consulta, y consiste habitualmente en la instilación previa de colirios con el fin de dilatar la pupila. Se espera que haga efecto el midriático (entre 10 y 30 minutos) y se procederá a revisar el fondo de ojo, primero con la lámpara de hendidura, en donde se revisa el polo posterior (con un lente de macula de 78 o 90 dioptrías) y luego con el oftalmoscopio indirecto, con el cual se revisa la media periferia (generalmente con un lente de 20 0 22 dioptrías). \n\n ",
                        },
                        {
                          text: "DESCRIPCIÓN DEL PROCEDIMIENTO: \n\n ",
                          bold: true,
                        },
                        {
                          text: "Como se explicó arriba, después de instilar el colirio midriático, se espera a que haga efecto y se procede a revisar el polo posterior y la periferia retiniana, obteniendo muchas veces, información adecuada y suficiente para hacer un diagnóstico retiniano. También ayuda a ver el cristalino y el segmento anterior en toda su dimensión con lo cual e diagnóstico de catarata es mucho más certero.\n\n ",
                        },
                        {
                          text: "Hay que tener en cuenta que, antes de aplicar los midriáticos, se debe medir la presión intraocular del o los ojos a dilatar. Esto para prevenir un aumento de la presión intraocular debido a la dilatación pupilar. Este fenómeno se da debido a que, al dilatarse la pupila, el iris se recoge como un acordeón y esto puede obstruir el ángulo camerular, que es el sitio por donde se drena el humor acuoso, con el consiguiente aumento de la presión dentro del ojo. La toma previa de la presión intraocular se realizará en adultos o niños que permitan dicha toma.\n\n ",
                        },
                        {
                          text: "Como molestia, el paciente queda viendo borroso de cerca durante 6 a 8 horas (algunas veces se puede prolongar dicho efecto dependiendo del paciente). Por esto, el paciente siempre debe venir acompañado, para poder ser ayudado en su deambulación normal. Además, si es posible, mientras dure el efecto de los colirios midriáticos, el paciente debería usar lentes oscuros ya que la luz lo molestará mucho debido a la dilatación de sus pupilas. \n\n ",
                        },
                      ],
                    },
                  ]
                : [],
            ],
          },
          {
            alignment: "justify",
            marginTop: 5,
            fontSize: 10,
            stack: [
              {
                text: [
                  {
                    text: "AUTORIZACIÓN (CONSENTIMIENTO)\n\n",
                    bold: true,
                  },
                  {
                    text: "He entendido las condiciones y objetivos del procedimiento que se me va a practicar en ATENCIÓN MÉDICA DE COLOMBIA SAS., los cuidados que debo tener antes y después de ella. Estoy satisfecho (a) con la información recibida del médico oftalmólogo tratante quien lo ha hecho en un lenguaje claro y sencillo, y me ha dado la oportunidad de preguntar y resolver las dudas a satisfacción, además comprendo y acepto el alcance y los riesgos justificados de posible o imposible previsión que conlleva el procedimiento oftalmológico que aquí autorizo. En tales condiciones consiento que se me realice dicho procedimiento. \n\n",
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? "DECLARACION DEL REPRESENTANTE LEGAL, FAMILIAR, TUTOR O ACUDIENTE DEL PACIENTE\n\n"
                        : "",
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? `Sé que el Paciente por sus condiciones de __________________ es considerado por ahora incapaz de tomar por sí mismo la decisión de aceptar o rechazar la anestesia antes indicada, por lo cual, YO ${this.datos.reg_acomp.cod} identificado con documento de identidad Nº  ${this.datos.reg_acomp.descrip} en calidad de (colocar parentesco o tipo de representatividad legal) _____________________ doy mi consentimiento para que el (los) Doctor (a) (es) ${this.datos.reg_prof.descrip} y el personal auxiliar que el precise, efectúen la anestesia antes descrita, y los procedimientos complementarios que sean necesarios durante la realización de esta, a juicio de los profesionales que lo lleven a cabo. En cualquier caso, deseo respeten las siguientes condiciones\n\n`
                        : "",
                    alignment: "justify",
                  },

                  {
                    text: "DECLARACION DEL MEDICO TRATANTE.\n\n",
                    bold: true,
                  },
                  {
                    text: `Medico(s) responsable(s):${this.datos.reg_prof.descrip} he informado al Paciente del propósito y naturaleza del procedimiento descrito arriba, de sus alternativas, posibles riesgos y de los resultados que se esperan. Considero que el (la) paciente, comprende completamente lo explicado.\n\n`,
                  },
                  {
                    text: "DENEGACIÓN O REVOCACIÓN\n\n",
                    bold: true,
                  },
                  {
                    text: "Después de ser informado/a de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi denegación/revocación (táchese lo que no proceda) para su realización, haciéndome responsable de las consecuencias que puedan derivarse de esta decisión. \n\n",
                  },
                  {
                    text: "Nota. En el caso de un menor de 18 años deben firmar ambos padres.\n\n",
                    bold: true,
                  },
                ],
              },
              {
                marginTop: 10,
                columns: [
                  {
                    width: 70,
                    text: [
                      { text: "Edad: ", bold: true },
                      {
                        text: (parseInt(this.datos.reg_hc.vlr_edad) || 0) + " " + this.datos.reg_hc.unid_edad,
                      },
                    ],
                  },
                  {
                    width: 150,
                    text: [{ text: "Teléfono:", bold: true }, { text: this.datos.reg_paci.telefono }],
                  },
                  {
                    text: [{ text: "Dirección:", bold: true }, { text: this.datos.reg_paci.direccion }],
                  },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC018":
        return [
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        {
                          text: "DESCRIPCIÓN DEL MEDICAMENTO \n\n ",
                          bold: true,
                        },
                        {
                          text: "La pilocarpina ® oftálmica se usa para tratar el glaucoma, es una clase de medicamentos llamados mióticos. Se utiliza dentro de la Cirugía Oftalmológica para la inducción de la Miosis o contracción pupilar, como preparación quirúrgica, dándole un buen todo al Iris previo al procedimiento de Iridotomía con Láser:\n\n ",
                        },
                        {
                          text: "Actúa en un subtipo de receptor muscarínico de la acetilcolina (M3), el cual se encuentra ubicado en el esfínter del iris,causando que el músculo se contraiga y provoque miosis. Ello causa que la red trabecular se abra y facilite la salida delhumor acuoso del ojo y se reduzca la presión intraocular.\n ",
                        },
                        {
                          text: "El uso de la pilocarpina reduce el tamaño de las pupilas, aliviando los síntomas de fotofobia en estos casos post-quirúrgicos\n\n ",
                        },
                        {
                          text: "PRECAUCIONES PRE OPERATORIAS: \n\n ",
                          bold: true,
                        },
                        {
                          text: "Embarazo, Lactancia\n ",
                        },
                        {
                          text: "Se debe informar al médico qué medicamentos con y sin prescripción está tomando, incluyendo vitaminas.\n ",
                        },
                        {
                          text: "Informar al médico si estoy sufriendo o he sufrido de asma, enfermedades intestinales, úlceras, hipertensión,enfermedades al corazón, glándula tiroides demasiado activa (hipertiroidismo), crisis convulsivas, enfermedad deParkinson o una obstrucción en las vías urinarias..\n\n ",
                        },
                      ],
                    },
                  ]
                : [],
            ],
          },
          {
            alignment: "justify",
            marginTop: 5,
            fontSize: 10,
            stack: [
              {
                text: [
                  {
                    text: "EFECTOS SECUNDARIOS,\n\n",
                    bold: true,
                  },
                  {
                    text: "Los efectos secundarios de este medicamento no son comunes, podrían llegar a presentarse. Por la acción del colirio se producirá miosis y espasmo ciliar. Es normal que se produzca una disminución de la agudeza visual, especialmente en condiciones de iluminación deficiente y en pacientes de edad avanzada, por lo que debe evitarse la conducción nocturna..\n\n",
                  },
                  {
                    text: "•hipersensibilidad local y dolor de cabeza temporal o supraorbital,\n\n",
                    alignment: "justify",
                  },
                  {
                    text: "•Visión empañada o tenue,\n\n",
                    alignment: "justify",
                  },
                  {
                    text: "Hay dos tipos de gotas:,\n\n",
                  },
                  {
                    text: "•Picazón, ardor o dolor en los ojos\n\n",
                  },
                  {
                    text: "•Prurito o enrojecimiento de los ojos\n\n",
                  },
                  {
                    text: "•Lagrimeo o hinchazón (inflamación) de los ojos\n\n",
                  },
                  {
                    text: "•Enrojecimiento de los párpados\n\n",
                  },
                  {
                    text: "•Cefalea (dolor de cabeza).\n\n",
                  },
                  {
                    text: "AUTORIZACIÓN (CONSENTIMIENTO)\n\n",
                    bold: true,
                  },
                  {
                    text: "He entendido las condiciones y objetivos del procedimiento que se me va a practicar en ATENCIÓN MÉDICA DE COLOMBIA SAS., los cuidados que debo tener antes y después de ella. Estoy satisfecho (a) con la información recibida del médico oftalmólogo tratante quien lo ha hecho en un lenguaje claro y sencillo, y me ha dado la oportunidad de preguntar y resolver las dudas a satisfacción, además comprendo y acepto el alcance y los riesgos justificados de posible o imposible previsión que conlleva el procedimiento oftalmológico que aquí autorizo. En tales condiciones, consiento que se me realice dicho procedimiento. \n\n\n",
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? "DECLARACION DEL REPRESENTANTE LEGAL, FAMILIAR, TUTOR O ACUDIENTE DEL PACIENTE:\n\n"
                        : "",
                    bold: true,
                  },
                  {
                    text:
                      this.datos.reg_coninf.paci_acept == "N"
                        ? `Sé que el Paciente por sus condiciones de __________________ es considerado por ahora incapaz de tomar por si mismo la decisión de aceptar o rechazar la anestesia antes indicada, por lo cual, YO ${this.datos.reg_acomp.descrip} identificado con documento de identidad Nº ${this.datos.reg_acomp.cod} en calidad de (colocar parentesco o tipo de representatividad legal)de ${this.datos.reg_paci.descrip} doy mi consentimiento para que el (los) Doctor (a) (es) ${this.datos.reg_prof.descrip} y el personal auxiliar que el precise, efectúen la anestesia antes descrita, y los procedimientos complementarios que sean necesarios durante la realización de esta, a juicio de los profesionales que lo lleven a cabo. En cualquier caso deseo respeten las siguientes condiciones: \n\n`
                        : "",
                  },
                  {
                    text: "DECLARACION DEL MEDICO TRATANTE.\n\n",
                    bold: true,
                  },
                  {
                    text: `Medico(s) responsable(s): ${this.datos.reg_prof.descrip} he informado al Paciente del propósito y naturaleza del procedimiento descrito arriba, de sus alternativas, posibles riesgos y de los resultados que se esperan. Considero que el (la) paciente, comprende completamente lo explicado.\n\n`,
                  },
                  {
                    text: "DENEGACION O REVOCACION\n\n",
                    bold: true,
                  },
                  {
                    text: "Después de ser informado/a de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi denegación/revocación (táchese lo que no proceda) para su realización, haciéndome responsable de las consecuencias que puedan derivarse de esta decisión.\n\n\n",
                  },
                  {
                    text: "Nota. En el caso de un menor de 18 años deben firmar ambos padres\n\n",
                  },
                ],
              },
              {
                marginTop: 10,
                columns: [
                  {
                    width: 70,
                    text: [
                      { text: "Edad: ", bold: true },
                      {
                        text: (parseInt(this.datos.reg_hc.vlr_edad) || 0) + " " + this.datos.reg_hc.unid_edad,
                      },
                    ],
                  },
                  {
                    width: 150,
                    text: [{ text: "Teléfono:", bold: true }, { text: this.datos.reg_paci.telefono }],
                  },
                  {
                    text: [{ text: "Dirección:", bold: true }, { text: this.datos.reg_paci.direccion }],
                  },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "HIC019":
        return [
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        {
                          text: "CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTOS QUIRURGICOS\n\n",
                          bold:true,
                        },
                        {
                          text:"En pleno uso de mis facultades mentales, libre y conscientemente declaro que doy mi consentimiento al Odontólogo(a) de la IPS, para formular y realizar el tratamiento requerido.\n\n",
                        },
                        {
                          text:"Autorizo al odontólogo(a) para proveer servicios adicionales que considere razonables y necesarios para la salud, incluyendo la administración de anestesia que sea necesaria, exámenes de laboratorio, y la preparación de servicios que incluyan estudios de patología, estudios de radiología.\n\n",
                        },
                        {
                          text:"Autorizo al odontólogo(a) para proveer servicios adicionales que considere razonables y necesarios para la salud, incluyendo la administración de anestesia que sea necesaria, administración de sangre y productos sanguíneos, hospitalización, profilaxis antibiótica, exámenes de laboratorio, y la preparación de servicios que incluyan estudios de patología, estudios de radiología.\n\n",
                        },
                        {
                          text:" Me han informado sobre los beneficios y posibles riesgos del procedimiento, y resultados desfavorables; como pueden ser fracturas coronal, fractura radicular, laceración de los tejidos blandos, necrosis ,celulitis, fractura de la tabla ósea, fractura de instrumental, comunicación oroantral, transportación de nervios, fractura de tuberosidad, fractura de restauraciones adyacentes, deglución de diente, luxación de diente adyacente, crisis hipertensiva,hematoma,alveolitis post exodoncia, hemorragia post exodoncia, alergia a los guantes u otros materiales usados en la práctica, trismus, fractura alveolar,parestesia,isquemia en la zona de la infiltración, parálisis del velo del paladar. Leí cuidadosamente y antes de firmarlo he tenido la oportunidad de aclarar las dudas del procedimiento, Igualmente estoy enterado (a) que las coronas, las prótesis total, las prótesis removible, los tratamientos de ortodoncia, los tratamientos periodontales y las radiografías panorámicas, no están cubiertos por el Plan Obligatorio de Salud.\n\n",
                        },
                        {
                          text:"Se entiende por procedimiento quirúrgico todo procedimiento en la consulta odontológica en el cual los tejidos orales entran en contacto con el medio ambiente oral, tales como: exodoncia simple, exodoncia método abierto de dientes temporales y/o permanentes, biopsias, frenillectomias, cirugía de tejidos blandos, remodelado óseo.\n\n",
                        },
                        {
                          text:"Certifico que el odontólogo(a) de la IPS, me ha explicado el procedimiento a realizar, las causas por las cuales es necesario, el pronóstico del diente a tratar y las posibles complicaciones más frecuentes que pueden surgir durante el mismo.\n\n",
                        },
                        {
                          text:"He tenido la oportunidad de hacer las preguntas que he considerado necesarias y todas han sido contestadas satisfactoriamente.\n\n",
                        },
                        {
                          text:"Me comprometo, por otra parte a asistir a los debidos controles que el odontólogo(a) de la IPS considere pertinentes después del procedimiento realizado. Igualmente estoy enterado (a) que las coronas, prótesis totales, prótesis removible, tratamientos de ortodoncia, tratamientos periodontales y radiografía panorámica, no están cubiertos por el plan obligatorio de salud.\n\n",
                        },
                        {
                          marginTop: 10,
                          stack: [
                            {
                              unbreakable: true,
                              marginTop: 5,
                              table: {
                                heights: [10, 70],
                                widths: ["33%", "33%", "34%"],
                                body: [this.firmas(true)],
                              },
                            },
                          ],
                        },
                      ],
                    }
                  ]
                  : []
              ],
          },
        ]
        case "HIC020":
        return [
          {
            style: "center12Bold",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 2,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        {
                          text: "CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTOS DE ENDODONCIA\n\n\n",
                          bold:true,
                        },
                        {
                          text:"En pleno uso de mis facultades mentales, libre y conscientemente declaro que doy mi consentimiento al Odontólogo(a) de la IPS, para formular y realizar el tratamiento requerido. Autorizo al odontólogo(a) para proveer servicios adicionales que considere razonables y necesarios para la salud, incluyendo la administración de anestesia que sea necesaria, exámenes de laboratorio, y la preparación de servicios que incluyan estudios de patología, estudios de radiología. Se entiende como endodoncia el procedimiento odontológico por medio del cual se retira la pulpa o nervio dental y los conductos radiculares (raíz del diente) son sellados con un material específico para la conservación del diente, posterior a una enfermedad pulpar irreversible.\n\n",
                        },
                        {
                          text:"Certifico que el odontólogo(a) de la IPS, me ha explicado el procedimiento a realizar, las causas por las cuales es necesario, el pronóstico del diente a tratar y las posibles complicaciones más frecuentes que pueden surgir durante el mismo, tales como :  laceración de tejidos blandos, fractura del diente, perforaciones apical, escalones, fracturas de instrumentos en el canal radicular, sobrepaso de material sellador en zona apical en el momento de la obturación, accidente por hipoclorito, contaminación de conductos, perdida de obturación temporal,broncoaspiracion de instrumental, alergia a los guantes u otros materiales usados en la práctica. Igualmente certifico que me han explicado la importancia de realizar el tratamiento rehabilitador posterior al tratamiento endodóntico, y asumo la responsabilidad de efectuarlo en un periodo no  mayor a 2 meses.\n\n",
                        },
                        {
                          text:"Leí cuidadosamente y antes de firmarlo he tenido la oportunidad de hacer las preguntas que he considerado necesarias y todas han sido contestadas satisfactoriamente; así como se me ha explicado que no es posible garantizar los resultados esperados con este procedimiento. De la misma manera manifiesto que se me ha informado sobre la posible necesidad de una cirugía Endodóntica, o técnica no convencionales, eventos no incluidos en el plan obligatorio de salud, en caso de no lograrse los resultados obtenidos con este tratamiento. Por otra parte autorizo a que el odontólogo(a) de la IPS aplique anestesia local en el momento en que el tratamiento lo requiera y que conozco las posibles complicaciones más frecuentes, que pueden surgir durante dicha aplicación tales como parestesia, hematoma, dolor, isquemia de la piel en el lugar de la infiltración, parálisis del velo el paladar, trismus y afectación muscular. Igualmente estoy enterado (a) que las coronas, las prótesis totales, las prótesis removible, los tratamientos de ortodoncia, los tratamientos periodontales y las  radiografías panorámicas, no están cubiertos por el Plan Obligatorio de Salud.\n\n",
                        },
                        {
                          marginTop: 10,
                          stack: [
                            {
                              unbreakable: true,
                              marginTop: 5,
                              table: {
                                heights: [10, 70],
                                widths: ["33%", "33%", "34%"],
                                body: [this.firmas(true)],
                              },
                            },
                          ],
                        },
                      ],
                    }
                  ]
                  : []
              ],
          },
        ]
      // ODONTOLOGIA
      case "ODO001":
        return [
          {
            fontSize: 12,
            marginTop: 5,
            alignment: "center",
            text: [
              {
                text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
                bold: true,
              },
              {
                text: "\nAutorización voluntaria para la atención en salud.",
                fontsize: 7,
              },
            ],
          },
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            text: "A. DATOS GENERALES",
            bold: true,
            fontSize: 10,
            marginTop: 6,
          },
          {
            fontSize: 10,
            stack: [
              {
                marginTop: 6,
                table: {
                  widths: ["15%", "35%", "15%", "35%"],
                  body: [
                    [
                      { text: "Servicio", bold: true },
                      { text: this.datos.reg_od.cierre.descrip_unserv.trim() },
                      { text: "Fecha", bold: true },
                      { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
                    ],
                    [
                      { text: "Nombre usuario", bold: true },
                      { text: this.datos.reg_paci.descrip.trim() },
                      { text: "No. documento", bold: true },
                      { text: instance.data().mask_id(this.datos.reg_paci.cod) },
                    ],
                    [
                      { text: "Teléfono", bold: true },
                      { text: this.datos.reg_paci.telefono },
                      { text: "Dirección", bold: true },
                      { text: this.datos.reg_paci.direccion.trim() },
                    ],
                    [
                      { text: "Tutor o Familiar", bold: true },
                      { text: this.datos.reg_acomp.descrip.trim() },
                      { text: "Profesional", bold: true },
                      { text: this.datos.reg_prof.descrip.trim() },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return i === 0 || i === node.table.body.length ? 0.5 : 0.1;
                  },
                  vLineWidth: function (i, node) {
                    return i === 0 || i === node.table.widths.length ? 0.5 : 0.1;
                  },
                  hLineColor: function (i, node) {
                    return i === 0 || i === node.table.body.length ? "black" : "gray";
                  },
                  vLineColor: function (i, node) {
                    return i === 0 || i === node.table.widths.length ? "black" : "gray";
                  },
                  fillColor: function (rowIndex, node, columnIndex) {
                    return columnIndex == 0 || columnIndex == 2 ? "#eeeeee" : null;
                  },
                },
              },
              {
                marginTop: 10,
                alignment: "left",
                columns: [{ text: "Nombre del procedimiento", bold: true }],
              },
              this.box_text_area(this.datos.reg_coninf.datos.procedimiento),
              {
                marginTop: 7,
                fontSize: 10,
                alignment: "justify",
                stack: [
                  {
                    text: [
                      { text: "B. DECLARACIONES DEL USUARIO\n", bold: true },
                      { text: "1. ", bold: true },
                      {
                        text: "En pleno uso de mis facultades mentales, autorizo al profesional mencionado y a los asistentes de su elección, para realizar en mi o en el(la) paciente el procedimiento.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "2. ", bold: true, marginTop: 4 },
                      {
                        text: "Además de los exámenes pertinentes, se me ha explicado la naturaleza y el propósito de la intervención o procedimiento especial por realizar, así como las complicaciones y riesgos que puedan producirse, en particular los siguientes:",
                      },
                      {
                        text: "reacciones adversas a medicamentos (incluyendo reacciones alérgicas), infecciones intrahospitalarias, sangrado, requerimiento de reintervención, caídas, deterioro clínico, requerimiento de reanimación básica y avanzada, requerimiento de traslado como urgencia vital a institución de mayor nivel de complejidad, muerte.",
                        bold: true,
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "3. ", bold: true, marginTop: 4 },
                      {
                        text: "Se me han expuesto todas las posibles alternativas al tratamiento propuesto y se me ha dado la oportunidad de formular preguntas y las mismas han sido resueltas satisfactoriamente.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "4. ", bold: true, marginTop: 4 },
                      { text: "Autorizo al " },
                      { text: this.datos.empresa.NOMUSU, bold: true },
                      {
                        text: "y a sus especialistas, médicos, odontólogos, enfermeras, para utilizar en el curso de la intervención o procedimiento y postoperatorio, los medicamentos, anestésicos o medios de contraste necesarios.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "5. ", bold: true, marginTop: 4 },
                      {
                        text: "Reconozco que hay riesgos para la vida y la salud asociados con estos procedimientos o intervenciones, medicamentos o sustancias. Tales riesgos me han sido explicados por el médico que realizará la intervención o procedimiento.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "6. ", bold: true, marginTop: 4 },
                      {
                        text: "Comprendo que en el curso de la intervención o procedimiento, pueden presentarse situaciones imprevistas que requieran procedimientos adicionales, los cuales autorizo si el médico o sus asistentes consideran necesarios.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "7. ", bold: true, marginTop: 4 },
                      { text: "Autorizo al " },
                      { text: this.datos.empresa.NOMUSU, bold: true },
                      {
                        text: "para tomar muestras de tejidos o fluidos orgánicos, con destino a exámenes de laboratorio clínico o histo-patológicos.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "8. ", bold: true, marginTop: 4 },
                      {
                        text: "Acepto que no se me ha garantizado el resultado de la intervención o procedimiento, porque entiendo que la actividad médica es de medio y no de resultado, tal como me lo han explicado, independientemente de que se haga uso de todos los elementos técnico-científicos disponibles por la institución, cumpliendo con los parámetros de calidad para su ejecución, tal como lo dispone la ley 23 de 1981, la Resolución 1995 de 1999 y demás normas pertinentes.",
                      },
                    ],
                  },
                  {
                    marginTop: 3,
                    text: [
                      { text: "9. ", bold: true, marginTop: 4 },
                      {
                        text: "Certifico que he leído y comprendido el contenido de este documento, que los espacios en blanco han sido llenados antes de mi firma y me encuentro en capacidad total de expresar mi libre decisión.",
                      },
                    ],
                  },
                ],
              },
              {
                marginTop: 5,
                fontSize: 10,
                alignment: "justify",
                text: [
                  {
                    text: "DECLARACION TUTOR LEGAL O FAMILIAR\n",
                    bold: true,
                    alignment: "center",
                    fontSize: 12,
                  },
                  {
                    text: "Sé que el paciente ha sido considerado por ahora incapaz de tomar por sí mismo la decisión de aceptar o rechazar el procedimiento descrito arriba. El médico me ha explicado de forma satisfactoria qué es, cómo se hace y para qué sirve este procedimiento o intervención. También se me han explicado sus riesgos y complicaciones. He comprendido todo lo anterior perfectamente y por ello doy mi consentimiento para que se realice el ingreso hospitalario",
                  },
                ],
                columns: [
                  {
                    fontSize: 10,
                    stack: [
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.reg_coninf.datos.menor_edad == "S"),
                            width: "10%",
                          },
                          { text: "Menor de edad", margin: [-40, 0, 0, 0] },
                          {
                            stack: this.cuadro_canvas(this.datos.reg_coninf.datos.disca_congnitiva == "S"),
                            width: "10%",
                            margin: [-60, 0, 0, 0],
                          },
                          {
                            text: "Discapacidad cognitiva",
                            margin: [-100, 0, 0, 0],
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.reg_coninf.datos.alter_neuro_ment == "S"),
                            width: "10%",
                            margin: [-80, 0, 0, 0],
                          },
                          {
                            text: "Estado neurológico o mental alterado",
                            margin: [-120, 0, 0, 0],
                          },
                        ],
                      },
                      {
                        marginTop: 6,
                        columns: [
                          {
                            text: "Otro: " + `${this.datos.reg_coninf.datos.otro_motivo}`,
                            bold: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                marginTop: 10,
                stack: [
                  {
                    unbreakable: true,
                    marginTop: 5,
                    table: {
                      heights: [10, 70],
                      widths: ["33%", "33%", "34%"],
                      body: [this.firmas(true)],
                    },
                  },
                ],
              },
            ],
          },
        ];
      case "ODO002":
        return [
          {
            fontSize: 10,
            stack: [
              {
                marginTop: 5,
                fontSize: 12,
                bold: true,
                alignment: "center",
                text: this.datos.reg_coninf.datos_encab.descrip.trim().toUpperCase(),
              },
              {
                fontSize: 10,
                alignment: "right",
                marginTop: 5,
                text: [
                  { text: "Fecha: ", bold: true },
                  { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
                  { text: " Hora: ", bold: true },
                  { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
                ],
              },
              {
                marginTop: 5,
                alignment: "justify",
                stack: [
                  {
                    text: "Estimados Padres y/o cuidadores: El Ministerio de Salud y Protección Social, junto con la red de Empresas Sociales del Estado y de las IPS vinculadas con EPS del régimen contributivo y subsidiado, adelantan la aplicación de barniz de flúor, como medida controlada de aplicación de este elemento para la prevención de las caries en la población entre 1 y 17 años, por ser esta condición la que de mayor forma afecta la salud bucal generando altos costos económicos y sociales.",
                  },
                  {
                    marginTop: 10,
                    text: "Un profesional de la odontología o una auxiliar de salud oral, debidamente capacitados y bajo la supervisión de profesional capacitado, aplicara una barrera protectora llamada barniz de fluoruro. La aplicación de este material es seguro y sencillo, para lo cual se hará uso de espejo, pinzas algodoneras, algodones, y gasas manejadas con las respectivas medidas de bioseguridad, los cuales no generan ningún tipo de lesión ni daños en los tejidos.",
                  },
                ],
              },
              {
                marginTop: 10,
                fontsize: 10,
                alignment: "justify",
                stack: [
                  { text: "Si debe tener presente que: " },
                  {
                    ul: [
                      "El barniz, puede producir un leve cambio temporal en el color de los dientes.",
                      "No podrá consumir alimentos al menos durante las siguientes cuatro (4) horas posteriores a la aplicación del barniz.",
                      "Con posterioridad a este tiempo, los alimentos a consumir no deben ser pegajosos ni abrasivos (chicles, dulces, entre otros).",
                      "Por esta vez, no podrá realizar cepillado dental sino hasta la mañana siguiente.",
                    ],
                  },
                ],
              },
              {
                marginTop: 10,
                fontSize: 10,
                alignment: "justify",
                text: [
                  { text: "Fecha próxima aplicación: ", bold: true },
                  {
                    text: this.datos.reg_coninf.datos.fecha_prox_aplic.trim()
                      ? moment(this.datos.reg_coninf.datos.fecha_prox_aplic, "YYYYMMDD").format("YYYY/MM/DD")
                      : "",
                  },
                ],
              },
              {
                marginTop: 10,
                fontSize: 10,
                alignment: "center",
                text: "Para recibir estos servicios sin-costo usted debe proveer la siguiente información, como consentimiento informado.".toUpperCase(),
                bold: true,
              },
              {
                marginTop: 10,
                columns: [
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "N"),
                    width: "10%",
                  },
                  {
                    text: "Si, quiero que mi hijo(a) recibe el barniz de floururo: ",
                    margin: [-40, 0, 0, 0],
                  },
                ],
              },
              {
                marginTop: 6,
                columns: [
                  {
                    stack: this.cuadro_canvas(this.datos.reg_coninf.disentimiento == "S"),
                    width: "10%",
                  },
                  {
                    text: "No, deseo que mi hijo (a) recibe este servicio de barniz de fluoruro.",
                    margin: [-40, 0, 0, 0],
                  },
                ],
              },
              {
                marginTop: 10,
                table: {
                  widths: ["16%", "44%", "17%", "23%"],
                  body: [
                    [{ text: "DATOS PACIENTE", bold: true, colSpan: 4 }, {}, {}, {}],
                    [
                      { text: "Nombre", bold: true },
                      { text: this.datos.reg_paci.descrip.trim() },
                      { text: "Documento", bold: true },
                      { text: instance.data().mask_id(this.datos.reg_paci.cod) },
                    ],
                    [
                      { text: "Fecha de Nacim.", bold: true },
                      { text: moment(this.datos.reg_paci.nacim, "YYYYMMDD").format("YYYY/MM/DD") },
                      { text: "Municip. de Nacim.", bold: true },
                      { text: this.datos.reg_paci.descrip_ciudad },
                    ],
                    [
                      { text: "Depart. de Nacim.", bold: true },
                      { text: this.datos.reg_paci.descrip_depart },
                      { text: "Sexo", bold: true },
                      { text: instance.data().descrip_sexo(this.datos.reg_paci.sexo) },
                    ],
                    [
                      { text: "Domicilio", bold: true },
                      { text: this.datos.reg_paci.direccion },
                      { text: "Grupo étnico", bold: true },
                      { text: this.datos.reg_paci.descrip_etnia },
                    ],
                    [
                      { text: "Ciudad domicilio", bold: true },
                      { text: this.datos.reg_paci.descrip_ciudad },
                      { text: "Zona", bold: true },
                      { text: this.datos.reg_paci.descrip_zona },
                    ],
                    [
                      { text: "Nombre EPS", bold: true },
                      { text: this.datos.reg_paci.descrip_eps },
                      { text: "Tipo de Afiliación", bold: true },
                      { text: this.datos.reg_paci.descrip_tipo },
                    ],
                    [
                      { text: "Acompañante", bold: true },
                      { text: this.datos.reg_acomp.descrip },
                      { text: "Documento", bold: true },
                      { text: instance.data().mask_id(this.datos.reg_acomp.cod) },
                    ],
                  ],
                },

                layout: {
                  hLineWidth: function (i, node) {
                    return i === 0 || i === node.table.body.length ? 0.5 : 0.1;
                  },
                  vLineWidth: function (i, node) {
                    return i === 0 || i === node.table.widths.length ? 0.5 : 0.1;
                  },
                  hLineColor: function (i, node) {
                    return i === 0 || i === node.table.body.length ? "black" : "gray";
                  },
                  vLineColor: function (i, node) {
                    return i === 0 || i === node.table.widths.length ? "black" : "gray";
                  },
                  fillColor: function (rowIndex, node, columnIndex) {
                    return columnIndex == 0 || columnIndex == 2 ? "#eeeeee" : null;
                  },
                },

                // layout: "noBorders",
              },
              {
                text: "¿Su hijo (a) alguna vez ha tenido algún problema de salud serio?",
                bold: true,
                marginTop: 6,
              },
              this.box_text_area(this.datos.reg_coninf.datos.problema_salud),
              {
                text: "¿Cuál fue la última vez que el niño(a)/adolescente, acudió a consulta o tratamiento odontológico?",
                bold: true,
                marginTop: 6,
              },
              this.box_text_area(this.datos.reg_coninf.datos.ult_cons_trata),
              {
                text: "¿Qué tipo de atención odontológica recibió?",
                bold: true,
                marginTop: 6,
              },
              this.box_text_area(this.datos.reg_coninf.datos.tipo_atencion),
              {
                text: "Este servicio no reemplaza un examen para una completa evaluación. Es nuestra recomendación asistir de forma regular a consulta odontológica para valoración, atención preventiva y tratamiento regular.",
                alignment: "center",
                marginTop: 10,
                fontSize: 10,
                bold: true,
              },
              {
                pageBreak: "before",
                marginTop: 10,
                fontSize: 10,
                alignment: "center",
                text: "ESPACIO PARA USO DE LOS PROFESIONALES SOLAMENTE",
                bold: true,
              },
              { text: "Observaciones", bold: true, marginTop: 6 },
              this.box_text_area(this.datos.reg_coninf.datos.observaciones),
              {
                marginTop: 6,
                columns: [
                  {
                    text: [
                      { text: "Dientes presentes: ", bold: true },
                      {
                        text: parseInt(this.datos.reg_coninf.datos.n_dientes_presen) || 0,
                      },
                    ],
                  },
                  {
                    text: [
                      { text: "Dientes aplicados: ", bold: true },
                      {
                        text: parseInt(this.datos.reg_coninf.datos.n_dientes_aplica) || 0,
                      },
                    ],
                  },
                  {
                    text: [
                      { text: "Fecha aplicación: ", bold: true },
                      {
                        stack:
                          this.datos.reg_coninf.disentimiento == "S"
                            ? [{ text: "" }]
                            : [
                                {
                                  text: moment(this.datos.reg_coninf.llave.fecha, "YYYYMMDD").format("YYYY/MM/DD"),
                                },
                              ],
                      },
                    ],
                  },
                ],
              },
              {
                text: [
                  {
                    text: "Nombre comercial del material aplicado: ",
                    bold: true,
                    marginTop: 6,
                  },
                  {
                    text: this.datos.reg_coninf.datos.nom_comer_barniz,
                  },
                ],
              },
            ],
          },
          {
            marginTop: 10,
            stack: [
              {
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [this.firmas(true)],
                },
              },
            ],
          },
        ];

      case "LAB001":
        console.log("datos", this.datos);
        return [
          {
            fontSize: 10,
            alignment: "right",
            marginTop: 5,
            text: [
              { text: "Fecha: ", bold: true },
              { text: instance.data().fecha_edit(this.datos.reg_coninf.llave.fecha) },
              { text: " Hora: ", bold: true },
              { text: this.hora_edit(this.datos.reg_coninf.llave.hora) },
            ],
          },
          {
            marginTop: 10,
            bold: true,
            fontSize: 16,
            alignment: "center",
            text: this.datos.reg_coninf.datos_encab.descrip.toUpperCase(),
          },
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left11Bold",
                marginTop: 5,
                alignment: "justify",
                text: "INSTRUCCIONES:",
              },
              {
                style: "left10",
                marginTop: 5,
                alignment: "justify",
                text: "Este es un documento de Consentimiento informado que ha sido preparado por el INSTITUTO DE ULTRA TECNOLOGÍA MEDICA S.A.S, dentro de las normas éticas exigidas al Profesional Médico en Colombia Por la ley 23 de 1981 (Arts. 13 al 18), Decreto Reglamentario 3380 de 1981 Art. 12; en el cual se hace constar que se ha informado adecuada y oportunamente la necesidad de la toma e interpretacion de IMÁGENES DIAGNOSTICAS y los riesgos que pueden derivarse de la misma, solicitando al paciente o a su(s) representante(s) el consentimiento anticipadamente.",
              },
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["15%", "20%", "20%", "45%"],
                  body: [
                    [
                      { text: "ESTUDIO", style: "center9Bold" },
                      { text: "DESCRIPCION", style: "center9Bold" },
                      { text: "RIESGOS", style: "center9Bold" },
                      { text: "BENEFICIOS", style: "center9Bold" },
                    ],
                    [
                      {
                        text: "Estudios realizados con equipos que emitan radiaciones ionizantes.",
                        alignment: "left",
                      },
                      {
                        text: "Un estudio radiografico es una imagen de las estrcuturas internas del cuerpo producidos por la exposición a una fuente controlada de los rayos X y que se registra en una pelicula fotografica o en un sistema digital como un CD o un disco duro y que despues puede verse en un ordenador.",
                        alignment: "left",
                      },
                      {
                        text: "Existen riesgos asociados con los rayos X, pero una radriografia simple utiliza una pequeña cantidad de radiacion equivalente a la que todos recibimos de la atmosfera durante un periodo de dos o tres dias.",
                        alignment: "left",
                      },
                      {
                        alignment: "justify",
                        text: [
                          {
                            text: "Posibilidad de procesamiento de las imagenes por el computador, lo que permite el ajuste de contraste, la digitalización por histograma e incluso la reducción de imágenes de forma que favorece la identificación de las lesiones en los huesos, incluyendo fracturas y anormalidades en las articulaciones tales como la artritís entre otras.",
                          },
                          {
                            text: "Permiten determinar la presencia de lesiones en diferentes órganos, como en los pulmones o el abdomen y es de especial utilidad en los casos de diagnóstico y tratamiento de emergencia.",
                          },
                          {
                            text: "Finalmente, existe un aspecto ecológico a considerar, ya que las radiografias digitales no requieren de un procesamiento quimico, por lo que no generarn ningún tipo de contaminacion para el medio ambiente.",
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left12Bold",
            marginTop: 5,
            alignment: "justify",
            text: "\n Mencione el (los) estudio(s) que se va(n) a realizar: ",
          },
          {
            fontSize: 10,
            alignment: "Left",
            marginTop: 5,
            text: this.datos.reg_coninf.datos.estudios,
          },
          {
            style: "left12Bold",
            marginTop: 5,
            alignment: "justify",
            text: "\n DECLARACIÓN DE VOLUNTADES",
          },
          {
            marginTop: 5,
            marginBottom: 5,
            alignment: "justify",
            stack: [
              this.datos.reg_coninf.paci_acept == "S"
                ? [
                    {
                      text: [
                        { text: "Yo, " },
                        {
                          text: this.datos.reg_paci.descrip.trim() + " ",
                          bold: true,
                        },
                        { text: " mayor de edad, " },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? "identificada" : "identificado",
                        },
                        { text: " con el número de Cédula " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        {
                          text: " en calidad de Paciente, he sido informado por el tecnólogo en imágenes diagnosticas del estudio al que voy a ser sometido, los beneficos y riesgos: ",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      text: [
                        { text: "Yo " },
                        {
                          text: this.datos.reg_acomp.descrip.trim() + " ",
                          bold: true,
                        },
                        { text: " mayor de edad, " },
                        {
                          text: this.datos.reg_acomp.sexo == "F" ? "identificada" : "identificado",
                        },
                        { text: " con el número de Cédula " },
                        {
                          text: instance.data().mask_id(this.datos.reg_acomp.cod),
                          bold: true,
                        },
                        {
                          text: " en calidad de Acompañante en representación del menor ",
                        },
                        {
                          text: this.datos.reg_paci.descrip.trim() + " ",
                          bold: true,
                        },
                        {
                          text: this.datos.reg_paci.sexo == "F" ? "identificada" : "identificado",
                        },
                        { text: " con " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.tipo_id),
                          bold: true,
                        },
                        { text: " número " },
                        {
                          text: instance.data().mask_id(this.datos.reg_paci.cod),
                          bold: true,
                        },
                        {
                          text: ", he sido informado por el tecnólogo en imágenes diagnosticas del estudio al que voy a ser sometido, los beneficos y riesgos: \n ",
                        },
                      ],
                    },
                  ],
            ],
          },

          {
            marginTop: 5,
            marginBottom: 5,
            alignment: "justify",
            stack: [
              console.log(this.datos.reg_coninf.disentimiento, "hola"),
              this.datos.reg_coninf.disentimiento == "N"
                ? [
                    {
                      alignment: "justify",
                      text: [
                        {
                          text: "Por lo tanto he decidido",
                          width: "35%",
                        },
                        {
                          text: "APROBAR",
                          bold: true,
                        },
                        {
                          text: " que puedo retirar este consentimiento cuando",
                        },
                        {
                          text: "asi lo desee, debiendo informar al equipo asistencial tratante, del cambio de esta decisión. Adicionalmente la entidad en mención y el quipo tratante, quedan autorizados para tomar las conductas o procedimientos asistenciales necesarios tendientes a resolver las posibles complicaciones derivadas del procedimiento, atención o intervención solicitada que mediante este documento autorizo.",
                        },
                        {
                          text: "\n",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      alignment: "justify",
                      text: [
                        {
                          text: "Por lo tanto he decidido",
                          width: "35%",
                        },
                        {
                          text: "DISENTIR",
                          bold: true,
                        },
                        {
                          text: " que puedo retirar este consentimiento cuando",
                        },
                        {
                          text: "asi lo desee, debiendo informar al equipo asistencial tratante, del cambio de esta decisión. Adicionalmente la entidad en mención y el quipo tratante, quedan autorizados para tomar las conductas o procedimientos asistenciales necesarios tendientes a resolver las posibles complicaciones derivadas del procedimiento, atención o intervención solicitada que mediante este documento autorizo.",
                        },
                        {
                          text: "\n",
                        },
                      ],
                    },
                  ],
            ],
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        text: "He comprendido con claridad todo lo escrito anteriormente, he tenido la oportunidad de hacer preguntas que han sido resueltas y acepto la realización del procedimiento, atención o intervención solicitada, declarando que la decisión que tomo es libre y voluntaria.",

                        fontSize: 9,
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de ser informado de la naturaleza y riesgos del procedimiento propuesto, manifiesto de forma libre y consciente mi negación/ revocación para su realización, haciéndome responsable de las consecuencias que se puedan derivar de ésta decisión.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];

      case "LAB002":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "La sedación es una práctica médica que se puede considerar como una estrategia para mejorar la calidad del cuidado proporcionado al paciente, llegando incluso a considerarse como un indicador de calidad; se emplea en procedimientos invasivos y no invasivos, de carácter diagnóstico o intervencionista. La sedación consiste en la administración de agentes sedantes o disociativos (medicamentos) para disminuir el dolor, la ansiedad y la incomodidad que pueden producir los procedimientos médicos. La sedación fuera del quirófano hace referencia a la administración de sedación en un entorno diferente a las salas de cirugía, una práctica que puede ser usual en procedimientos de radiología, intervenciones diagnósticas, procedimientos pediátricos o en pacientes psiquiátricos, entre otros.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "Con mucha frecuencia la necesidad de obtener imágenes de alta calidad sólo depende de la inmovilidad del paciente, como es en el caso de la resonancia magnética o la tomografía axial computarizada; estos procedimiento no implicann dolor, pero en situaciones donde el enfermo se encuentra ansioso, sufre de claustrofobia o no puede permanecer quieto, las técnicas de sedación o anestesia en ocasiones son indispensables para proporcionarle comodidad y seguridad al paciente.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "La administración de sedación es un proceso complejo y dinámico, que requiere un monitoreo continuo, pues el grado de sedación al que se somete el paciente puede cambiar rápidamente. Los medicamentos empleados para sedación se relacionan con eventos adversos, como la hipotensión, la bradicardia, depresión respiratoria, hipoxia, aspiración, laringoespasmo, que fácilmente pueden poner en riesgo la vida. La administración de sedación fuera de la sala de cirugía incrementa el riesgo de evento adverso, por esto, en UTM el personal involucrado en esta práctica tiene las competencias necesarias para garantizar la seguridad del procedimiento, la sedación se encuentra dirigida por el médico anestesiólogo, quien además acompaña al paciente durante el procedimiento y la recuperación.",
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Sedación, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de haber sido informado (a) sobre el procedimiento de Sedación, sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB003":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    stack: [
                      {
                        text: "El examen de rayos X ayuda a los médicos a diagnosticar y tratar las condiciones médicas. Lo expone a una pequeña dosis de radiación ionizante para producir imágenes del interior del cuerpo. Los rayos X son la forma más antigua y la que se usa con más frecuencia para producir imágenes médicas.",
                      },
                      { text: " " },
                      {
                        text: "Una radiografía es una imagen de las estructuras internas del cuerpo producidos por la exposición a una fuente controlada de los rayos X y que se registra en un sistema digital como un CD o disco duro que después puede verse en un computador.",
                      },
                    ],
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "Es un examen económico, accesible, rápido, brinda importante información anatómica (para estructuras óseas), por el tipo de aparato que emplea se pueden utilizar en personas de las más diversas contexturas físicas. Es por eso que son especialmente útiles en la detección de enfermedades del esqueleto, aunque también se utilizan para diagnosticar enfermedades de los tejidos blandos, como neumonía, cáncer de pulmón, edema pulmonar, abscesos, entre otros.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "Existen riesgos asociados con los rayos X, pero una radiografía simple utiliza una pequeña cantidad de radiación equivalente a la que todos recibimos de la atmósfera durante un período de dos o tres días. Las pacientes que estén o puedan estar embarazadas deben informarlo, ya que se debe procurar otro examen diagnóstico que reemplace los rayos X. Si es necesario realizar esta prueba se cubrirá el abdomen o la pelvis con un delantal de plomo ya que el feto es más sensible a la radiación.",
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Sedación, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de haber sido informado (a) sobre el procedimiento de Sedación, sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB004":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "La Mamografía es un estudio radiológico con la particularidad de ser una proyección específica para la evaluación de las mamas y con un equipo de rayos X diferente al utilizado para radiología convencional. Para la adquisición de este estudio es necesario que las mamas se coloquen en una superficie y se compriman para que sea más fácil la identificación de tumores o calcificaciones. Es importante ese día no utilizar desodorante o cremas en el área del pecho pues estos productos pueden ser detectados por los RX y causar un mal diagnóstico.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "La mamografía de exploración juega un papel central en la detección temprana del cáncer de mamas ya que puede mostrar los cambios en las mamas años antes de que el médico o el paciente los adviertan. La mamografía de diagnóstico se utiliza para evaluar a una paciente con resultados clínicos anormales, tales como nódulos en las mamas o descargas de los pezones, descubiertos por la mujer o su médico. La mamografía de diagnóstico también puede realizarse luego de un mamograma de exploración anormal, con el fin de evaluar el área conflictiva en el examen de exploración.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "La comprensión utilizada para tomaar el examen puede causar una pequeña molestia pero sólo durará unos segundos. Todo el examen lo realiza un tecnólogo en imágenes altamente capacitado para este fin. Las Mamogramas con resultado falso positivo requieren de mayor evaluación, como por ejemplo la realización de mamogramas adicionales o ultrasonido. Si aparece un resultado anormal, se deberá realizar un seguimiento o biopsia, de acuerdo a la valoración del medico tratante.",
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Mamografía, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Mamografía sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB005":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "Su médico tratante después de valorar su situación clínica, considera imprescindible la realización de unas imágenes diagnosticas con objeto de valorar más adecuadamente su estado actual. La toma de imágenes diagnosticas emitidas por equipos de radiación ionizante como las radiografías, tomografías, mamografías y densitometrías, la exponen a una dosis de radiación ionizante para producir imágenes del interior del cuerpo.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "Los exámenes radiológicos son accesibles y brindan importante información anatómica (para estructuras óseas) para orientar y/o confirmar diagnósticos y tratamientos. A partir de las radiografías se han ido desarrollando nuevas técnicas y aplicaciones como las mamografías, el examen dental, la densitometría o la tomografía computarizada (TC), técnicas cada vez más avanzadas. Los beneficios por procedimiento están descritos en cada uno de los procedimientos.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    stack: [
                      {
                        text: "Al realizarse la prueba, recibirá una dosis de radiación que conlleva un cierto riesgo. En general, las dosis de radiación recibidas en este tipo de pruebas no representan ningún peligro significativo para la salud del feto, siendo los riesgos asociados a la prueba mucho menores que el riesgo natural de que aparezca alguna alteración. Sin embargo, existe la posibilidad, aunque pequeña, de provocar mediante la radiación los siguientes daños: Aborto, malformaciones orgánicas y disminuciones del coeficiente intelectual o del crecimiento. Un incremento sobre la probabilidad natural de padecer cáncer en la infancia. Enfermedades genéticas hereditarias. Según los conocimientos actuales, y debido a que las dosis utilizadas en las pruebas radiológicas están muy por debajo del umbral peligroso, la probabilidad de que esto ocurra se considera prácticamente nula.",
                      },
                      { text: " " },
                      {
                        text: "No obstante, usted no va a recibir Rayos X directos en el abdomen y, por otro lado, le vamos a proteger de toda radiación que no esté dirigida a proporcionar una imagen diagnóstica, colocándole un delantal plomado expresamente concebido para evitar la llegada de radiaciones al abdomen.",
                      },
                    ],
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informada sobre el procedimiento de exámenes de radiología en mujeres gestantes, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de haber sido informada sobre el procedimiento de exámenes de radiología en mujeres gestantes sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB006":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "Procedimiento para examinar la vagina, el útero, las trompas de Falopio, los ovarios y la vejiga. Se introduce un instrumento en la vagina que produce ondas de sonido que rebotan en los órganos del interior de la pelvis. Estas ondas de sonido producen ecos que se envían a una computadora que crea una imagen llamada ecografía. También se llama ecografía endovaginal y ETV.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "La ecografía transvaginal actua como complemento al examen físico, permite la evaluación de útero, trompas, ovarios o masas pélvicas. Dada su disponibilidad, comodidad, costo e información que arroja, es de uso rutinario en la consulta ginecológica. Es el examen indicado para el diagnóstico y seguimiento de quistes en los ovarios, miomas uterinos, valoración del espesor endometrial y detección temprana de cancer de útero y ovarios. En caso de sangrado genital (hemorragia uterina anormal), permite determinar causas y orientar el manejo. Permite la evaluación de los órganos reproductivos en cuanto a su estructura y funcionamiento. Asimismo su uso es frecuente para seguir tratamientos y evaluar el embarazo en etapas tempranas.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    stack: [
                      { text: "No hay efectos dañinos conocidos de la ecografía trasvaginal en humanos." },
                      { text: " " },
                      {
                        text: "A diferencia de los rayos X tradicionales, no se presenta exposición a la radiación con este examen.",
                      },
                    ],
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informada sobre el procedimiento de exámenes de radiología en mujeres gestantes, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de haber sido informada sobre el procedimiento de exámenes de radiología en mujeres gestantes sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB007":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    stack: [
                      {
                        text: "El examen de densidad ósea, también llamada absorciometría de rayos X de energía dual, DEXA o DXA, utiliza una dosis muy pequeña de radiación ionizante para producir imágenes del interior del cuerpo, generalmente la parte inferior de la columna (lumbar) y las caderas, para medir la pérdida de hueso.",
                      },
                      { text: " " },
                      {
                        text: "Generalmente, se utiliza para diagnosticar osteoporosis, para evaluar el riesgo que tiene un individuo de desarrollar fracturas debidas a la osteoporosis. La DXA es simple, rápida, y no es invasiva. También es el método más comunmente utilizado y estándar para diagnosticar la osteoporosis.",
                      },
                    ],
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "La densitometría ósea de DXA es un procedimiento simple, rápido y no invasivo. No se requiere anestesia. El examen de densidad ósea DXA es, actualmente, el mejor método estandarizado disponible para diagnosticar la osteoporosis y también se lo considera un exacto estimador del riesgo de fractura. La DXA se utiliza para tomar decisiones con respecto a si se necesita un tratamiento, y puede ser utilizada para monitorear los efectos del tratamiento. Los equipos DXA se encuentran ampliamente disponibles haciendo que la densitometría ósea sea conveniente tanto para los pacientes y como para los médicos. Luego del examen no queda radiación en su cuerpo. Los rayos X por lo general no tienen efectos secundarios en el rango de diagnóstico típico para este examen.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "No se esperan complicaciones en el procedimiento. La cantidad de radiación utilizada es extremadamente pequeña, menos de un décimo de la dosis estándar de rayos X para tórax y menos que la exposición de un día a la radiación natural.",
                  },
                ],
              ],
            },
          },

          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Densitometría Ósea, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " después de haber sido informado (a) sobre el procedimiento de Densitometría Ósea sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB008":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "Una biopsia con aguja es un procedimiento que permite obtener una muestra de células del cuerpo para hacer análisis de laboratorio. Los procedimientos convencionales de biopsia por punción incluyen la aspiración con aguja fina y la biopsia con aguja gruesa. La biopsia con aguja se puede usar para tomar muestras de líquido o tejido de los músculos, huesos y otros órganos, como el hígado o los pulmones. Una biopsia con aguja guiada por ultrasonido utiliza ondas sonoras para ayudar a ubicar la aguja adentro del órgano del cuerpo a estudiar y así, extraer una muestra de tejido para su análisis bajo el microscopio. El procedimiento es menos invasivo que la biopsia quirúrgica, deja poco o nada de cicatriz, y no involucra la exposición a la radiación ionizante. Este procedimiento requiere de poco o nada de preparación.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "La biopsia se usa para encontrar las causas de un nódulo o anormalidad de un órgano o tejido. Cuando su médico encuentra un nódulo, podría ordenar estudios por imágenes para ayudar a determinar si el mismo es benigno (no cancerígeno) o maligno (cancerígeno). En caso de que el diagnóstico por imágenes no pueda definir claramente la anormalidad, podría ser necesario hacer una biopsia. La biopsia sonodirigida previene procedimientos quirúrgicos innecesarios y optimiza con seguridad y con excelente calidad, la muestra tomada para el diagnóstico definitivo.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "Los riesgos son: Sangrado en el sitio de la biopsia. Infección. Daño a las estructuras adyacentes al sitio de punción. Las complicaciones de la biopsia son poco comunes porque el procedimiento se realiza bajo guía directa por imágenes y con una aguja. En algunos casos, la muestra podría ser inadecuada y el procedimiento podría tener que repetirse para poder obtener resultados diagnósticos. Debe consultar con su médico si presenta: Fiebre, Dolor en el lugar de la biopsia que empeora y que no mejora con los medicamentos, Hinchazón o supuración en el lugar de la biopsia, Sangrado que no se detiene con la presión ni con un vendaje.",
                  },
                ],
              ],
            },
          },
          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Biopsia de ",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.examen_realizar1
                                      : this.datos.examen_realizar1
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Biopsia de ",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.examen_realizar1
                                      : this.datos.examen_realizar1
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB009":
        console.log("datos LAB009", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cie2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cie2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["80%", "10%", "10%"],
              body: [
                [
                  { text: "PROCEDIMIENTO QUE REQUIERE MEDIO DE CONTRASTE (GADOLINIO)", style: "center11Bold" },
                  {
                    columns: [
                      { text: "SI" },
                      {
                        stack: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.proces == "S"), alignment: "center" },
                        ],
                      },
                    ],
                  },
                  {
                    columns: [
                      { text: "NO" },
                      {
                        stack: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.proces == "N"), alignment: "center" },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "La resonancia magnética nuclear (RMN) es una prueba diagnóstica con la que se obtienen imágenes del interior del cuerpo. Se basa en el procesamiento de ondas de radio que pasan por el paciente, el cual es sometido a un potente campo magnético. A diferencia del TAC o de las radiografías simples, la RMN no usa radiaciones ionizantes (rayos X). Permite obtener imágenes muy detalladas del cuerpo en dos y tres dimensiones y desde cualquier perspectiva (transversal, sagital y coronal). Puede realizarse con medio de contraste o si medio de contraste.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "Puede aportar información sobre patologías que no se vean con otras técnicas de imagen como la ecografía o el TAC. También se utiliza cuando están contraindicadas otras pruebas de imágenes como por ejemplo en el caso de alergia al contraste iodado que se usa en el TAC. La RMN realizada después de inyectar un medio de contraste con gadolinio en una vena facilita al médico la valoración de inflamaciones, tumores y vasos sanguíneos.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "La RMN es una prueba muy segura. El campo magnético que se aplica no tiene ningún efecto perjudicial sobre el organismo. El campo magnético utilizado en la RMN puede provocar que un dispositivo implantado se desplace, se sobrecaliente o funcione de forma inadecuada. Estos dispositivos también pueden distorsionar las imágenes de la RMN. A veces se puede sentir algo frío con la introducción del contraste; afortunadamente las reacciones alérgicas al contraste usado para la RMN son muy raras. Puede resultar algo molesto el permanecer mucho tiempo quieto en la mesa y puede llegar a sentir algo de claustrofobia. Los medios de contraste con gadolinio pueden provocar dolor de cabeza, náuseas, dolor y sensación de frío en el lugar de la inyección, distorsión del gusto y mareos. Con estos contrastes, es mucho menos probable que se produzcan reacciones graves que con los medios de contraste yodados utilizados en TAC.",
                  },
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["20%", "2%", "22%", "2%", "22%", "2%", "28%", "2%"],
              body: [
                [
                  { text: "ENCUESTA DE SEGURIDAD (RESONANCIA MAGNÉTICA NUCLEAR)", style: "center11Bold", colSpan: "8" },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Por favor señale si cuenta con alguno de los dispositivos descritos a continuación:",
                    colSpan: "8",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  { text: "Marcapasos", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.marcapasos ? "X" : "" },
                  { text: "Neuroestimuladores", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.electrodos ? "X " : " " },
                  { text: "Prótesis dentales", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.audifonos ? "X " : " " },
                  { text: "Dispositivo Intrauterino", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.stents ? "X " : " " },
                ],
                [
                  { text: "Electrodos", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.neuroestimuladores ? "X " : " " },
                  { text: "Válvula de derivacion", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.valvula_derivacion ? "X " : " " },
                  { text: "Suturas metálicas", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.esquirlas_metalicas ? "X " : " " },
                  { text: "Barras de Harrington", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.protesis_auriculares ? "X " : " " },
                ],
                [
                  { text: "Audífonos", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.desfibrilador ? "X " : " " },
                  { text: "Esquirlas metálicas", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.protesis_dental ? "X " : " " },
                  { text: "Bomba de insulina", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.suturas_metalicas ? "X " : " " },
                  { text: "Clips o ganchos quirúrgicos", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.bomba_insulina ? "X " : " " },
                ],
                [
                  { text: "Stents", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.implantes_auditivos ? "X " : " " },
                  { text: "Prótesis auriculares", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.disp_intrauterino ? "X " : " " },
                  { text: "Implantes auditivos", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.barras_harrington ? "X " : " " },
                  { text: "Prótesis de Cadera o Rodilla", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.clips_quirurgicos ? "X " : " " },
                ],
                [
                  { text: "Desfibrilador implantable", style: "text-center", colSpan: "3" },
                  {},
                  {},
                  { text: this.datos.reg_coninf.datos.protesis_cadera ? "X " : " " },
                  { text: "Fracturas tratadas con clavos o alambres", style: "text-center", colSpan: "3" },
                  {},
                  {},
                  { text: this.datos.reg_coninf.datos.fractura_tratadas ? "X " : " " },
                ],
                [
                  {
                    text: "Si usted tiene alguno de estos dispositivos implantados, deberá informar a su médico tratante, quien determinará si es seguro realizar esta prueba de imagen.",
                    colSpan: "8",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Recuerde que el uso de la resonancia esta totalmente contraindicado si Ud. tiene: Desfibrilador interno (implantado), Implante coclear (del oído), Clips que se utilizan en los aneurismas cerebrales",
                    colSpan: "8",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Recuerde no usar ningún tipo de joyas incluyendo anillos, piercings, aretes, collares o relojes. Se le pedirá que se quite la ropa que tiene ganchos, botones, cierres u otros objetos metálicos para no interferir con el procedimiento.",
                    colSpan: "8",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Finalmente, no olvide informarnos si se encuentra en proceso de gestación o tiene posibilidades de estarlo, si sufre de claustrofobia o si pesa mas de 130 Kg",
                    colSpan: "8",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["40%", "5%", "5%", "10%", "20%", "20%"],
              body: [
                [
                  { text: "ENCUESTA DE SEGURIDAD (PROCEDIMIENTO CON CONTRASTE)", colSpan: "4", style: "text-center" },
                  {},
                  {},
                  {},
                  { text: "APLICA" },
                  { text: "NO APLICA" },
                ],
                [
                  {
                    text: "¿Le han practicado exámenes con inyección de contraste de Gadolinio? ¿Otras resonancias? Especifique",
                  },
                  { text: this.datos.reg_coninf.datos.P_1 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_1 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_1, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presentó alguna reacción adversa al medio de contraste (Gadolinio)? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_2 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_2 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_2, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades del corazón? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_3 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_3 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_3, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades de los riñones? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_4 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_4 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_4, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades del hígado? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_5 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_5 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_5, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de asma? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_6 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_6 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_6, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  {
                    text: "¿Presenta algún tipo de alergia? (a medicamentos, alimentos, otras sustancias) Especifique",
                  },
                  { text: this.datos.reg_coninf.datos.P_7 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_7 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_7, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de diabetes? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_8 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_8 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_8, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de otro tipo de enfermedad? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_9 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_9 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_9, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Consume medicamentos? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_10 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_10 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_10, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  {
                    text: "Recuerde que si su examen requiere la administración de medio de contraste endovenoso, el auxiliar de enfermería procederá a canalizarle una vena periférica (venoclisis) para administrar el medio de contraste. El procedimiento de venoclisis es seguro, sin embargo, Ud. puede presentar: ardor, malestar, sangrado escaso, hematoma y flebitis.",
                    colSpan: "6",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Resonancia Magnética Nuclear, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Resonancia Magnética Nuclear sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      case "LAB010":
        console.log("datos", this.datos);
        return [
          {
            marginTop: 5,
            alignment: "justify",
            fontSize: 10,
            stack: [
              {
                style: "left10",
                marginTop: 15,
                table: {
                  widths: ["9%", "8%", "9.5%", "9.5%", "8%", "8%", "25%", "14%", "9%"],
                  body: [
                    [
                      { text: "FECHA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "HORA", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SERVICIO", alignment: "center" },
                      { text: "SEDE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_coninf.llave.fecha.substr(6, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(4, 2), alignment: "center" },
                      { text: this.datos.reg_coninf.llave.fecha.substr(0, 4), alignment: "center" },
                      {
                        text: `${moment(this.datos.reg_coninf.llave.hora, "HHmm").format("HH:mm")}`,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      { text: this.datos.reg_coninf.datos.servicio, alignment: "center" },
                      { text: this.datos.empresa.NOMUSU, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "PRIMER APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "SEGUNDO APELLIDO", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "PRIMER NOMBRE", alignment: "center" },
                      { text: "SEGUNDO NOMBRE", colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: this.datos.reg_paci._1er_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._2do_apel, colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: this.datos.reg_paci._1er_nom, alignment: "center" },
                      { text: this.datos.reg_paci._2do_nom, colSpan: 2, alignment: "center" },
                      {},
                    ],
                    [
                      { text: "DOCUMENTO DE IDENTIFICACÓN", colSpan: 6, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: "NÚMERO DE IDENTIFICACIÓN", colSpan: 2, alignment: "center" },
                      {},
                      { text: "EDAD", alignment: "center" },
                    ],
                    [
                      {
                        stack: [
                          { text: "CC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CE", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "CE"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PA", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PA"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "PT", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "PT"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "RC", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "RC"), alignment: "center" },
                        ],
                      },
                      {
                        stack: [
                          { text: "TI", alignment: "center" },
                          { stack: this.cuadro_canvas(this.datos.reg_paci.tipo_id == "TI"), alignment: "center" },
                        ],
                      },
                      { text: this.datos.reg_paci.cod.trim(), colSpan: 2, alignment: "center" },
                      {},
                      { text: this.datos.edad, alignment: "center" },
                    ],
                    [{ text: "ENTIDAD RESPONSABLE PBS: ", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CUPS", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "EXAMEN A REALIZAR", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nº", style: "left11Bold", alignment: "center" },
                      { text: "CÓDIGO CIE-10", style: "left11Bold", colSpan: 3, alignment: "center" },
                      {},
                      {},
                      { text: "DIAGNÓSTICO MÉDICO", style: "left11Bold", colSpan: 5, alignment: "center" },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "1", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups1,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups1,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "2", alignment: "center" },
                      {
                        text: this.datos.reg_coninf.datos.codigo_cups2,
                        colSpan: 3,
                        alignment: "center",
                      },
                      {},
                      {},
                      {
                        text: this.datos.reg_coninf.datos.descrip_cups2,
                        colSpan: 5,
                        alignment: "center",
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["80%", "10%", "10%"],
              body: [
                [
                  { text: "PROCEDIMIENTO QUE REQUIERE MEDIO DE CONTRASTE (IODADO)", style: "center11Bold" },
                  {
                    columns: [
                      { text: "SI" },
                      {
                        stack: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.proces == "S"), alignment: "center" },
                        ],
                      },
                    ],
                  },
                  {
                    columns: [
                      { text: "NO" },
                      {
                        stack: [
                          { stack: this.cuadro_canvas(this.datos.reg_coninf.datos.proces == "N"), alignment: "center" },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "left10",
            marginTop: 5,
            alignment: "justify",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "NORMATIVIDAD VIGENTE", style: "center11Bold" }],
                [
                  {
                    text: "La Ley 23 de 1981 al referirse a las relaciones médico - paciente, en los artículos 14, 15 y 18, advierte la necesidad del consentimiento para realizar los diferentes tratamientos medico quirúrgicos que se requieran. Para la resolución 3100 de 2019 el Consentimiento informado es la aceptación libre, voluntaria y consciente de un paciente o usuario, manifestada en el pleno uso de sus facultades, para que tenga a lugar un acto asistencial. Para que el consentimiento se considere informado, el paciente o usuario deberá entender la naturaleza de la decisión a consentir tras recibir información que le haga consciente de los beneficios, riesgos, alternativas e implicaciones del acto asistencial",
                  },
                ],
                [{ text: "INFORMACIÓN DEL PROCEDIMIENTO", style: "center11Bold" }],
                [
                  {
                    text: "La Tomografía Axial Computarizada TAC es un examen no invasivo que utiliza un equipo de rayos X especial para tomar imágenes de las estructuras internas del cuerpo. Los rayos X utilizados en las exploraciones por TAC usualmente no tienen efectos secundarios y no dejan radiación en el cuerpo de un paciente. Es posible que tenga que tomar el material de contraste alrededor de una hora antes de que se realice la tomografía computarizada; se necesita este tiempo para que el líquido recubra el estómago y los intestinos. También se puede administrar el medio de contraste vía intravenosa.",
                  },
                ],
                [{ text: "BENEFICIOS", style: "center11Bold" }],
                [
                  {
                    text: "Puede aportar información sobre patologías que no se vean con otras técnicas de imagen como la ecografía o el TAC. También se utiliza cuando están contraindicadas otras pruebas de imágenes como por ejemplo en el caso de alergia al contraste iodado que se usa en el TAC. La RMN realizada después de inyectar un medio de contraste con gadolinio en una vena facilita al médico la valoración de inflamaciones, tumores y vasos sanguíneos.",
                  },
                ],
                [{ text: "RIESGOS", style: "center11Bold" }],
                [
                  {
                    text: "Los riesgos son los derivados de la utilización de radiación ionizante y del empleo de contrastes iodados. La dosis de una TC depende de las características físicas del paciente y de la extensión de la parte del cuerpo a estudiar, no se ha demostrado que las bajas dosis de radiación usadas causen daño a largo plazo. En relación al uso de medio de contraste yodado, las reacciones adversas que pueden aparecer son entre moderadas a graves, siendo estas últimas muy poco comunes. Las reacciones incluyen: náusea y vómito, dolor de cabeza, picazón, calores súbitos, irritación de la piel o urticaria, sibilancia , ritmos cardíacos anormales, presión sanguínea alta o baja, falta de aliento o dificultad para respirar, inflamación de la vía aérea, convulsiones y paro cardiorrespiratorio.",
                  },
                ],
                [{ text: "", style: "center11Bold" }],
                [{ text: "RECOMENDACIONES DE SEGURIDAD (TOMOGRAFÍA AXIAL COMPUTARIZADA)", style: "center11Bold" }],
                [
                  {
                    text: "Recuerde que el uso de la Tomografía Axial computarizada TAC esta contraindicada en mujeres gestantes y en personas que han presentado reacciones alérgicas a medios de contraste yodados. Recuerde informarnos si tiene posibilidades de estar en proceso de gestación.",
                  },
                ],
                [
                  {
                    text: "Algunas condiciones incrementan el riesgo de una reacción alérgica o adversa a los materiales de contraste yodados. Informe si Ud. tiene historial de asma, drepanocitosis, policitemia y mieloma, si usa medicamentos como metoprolol, carvedilol, propanolo",
                  },
                ],
                [
                  {
                    text: "Recuerde no usar ningún tipo de joyas incluyendo anillos, piercings, aretes, collares o relojes. Se le pedirá que se quite la ropa que tiene ganchos, botones, cierres u otros objetos metálicos para no interferir con el procedimiento.",
                  },
                ],
                [
                  {
                    text: "nfórmenos si sufre de claustrofobia o si pesa mas de 120 Kg.",
                  },
                ],
              ],
            },
          },
          // {
          //   style: "left10",
          //   marginTop: 15,
          //   alignment: "justify",
          //   table: {
          //     widths: ["20%", "2%", "22%", "2%", "22%", "2%", "28%", "2%"],
          //     body: [
          //       [
          //         { text: "ENCUESTA DE SEGURIDAD (RESONANCIA MAGNÉTICA NUCLEAR)", style: "center11Bold", colSpan: "8" },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //       [
          //         {
          //           text: "Por favor señale si cuenta con alguno de los dispositivos descritos a continuación:",
          //           colSpan: "8",
          //         },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //       [
          //         { text: "Marcapasos", style: "text-center" },
          //         { text: " " },
          //         { text: "Neuroestimuladores", style: "text-center" },
          //         { text: " " },
          //         { text: "Prótesis dentales", style: "text-center" },
          //         { text: " " },
          //         { text: "Dispositivo Intrauterino", style: "text-center" },
          //         { text: " " },
          //       ],
          //       [
          //         { text: "Electrodos", style: "text-center" },
          //         { text: " " },
          //         { text: "Válvula de derivacion", style: "text-center" },
          //         { text: " " },
          //         { text: "Suturas metálicas", style: "text-center" },
          //         { text: " " },
          //         { text: "Barras de Harrington", style: "text-center" },
          //         { text: " " },
          //       ],
          //       [
          //         { text: "Audífonos", style: "text-center" },
          //         { text: " " },
          //         { text: "Esquirlas metálicas", style: "text-center" },
          //         { text: " " },
          //         { text: "Bomba de insulina", style: "text-center" },
          //         { text: " " },
          //         { text: "Clips o ganchos quirúrgicos", style: "text-center" },
          //         { text: " " },
          //       ],
          //       [
          //         { text: "Stents", style: "text-center" },
          //         { text: " " },
          //         { text: "Prótesis auriculares", style: "text-center" },
          //         { text: " " },
          //         { text: "Implantes auditivos", style: "text-center" },
          //         { text: " " },
          //         { text: "Prótesis de Cadera o Rodilla", style: "text-center" },
          //         { text: " " },
          //       ],
          //       [
          //         { text: "Desfibrilador implantable", style: "text-center", colSpan: "3" },
          //         {},
          //         {},
          //         { text: " " },
          //         { text: "Fracturas tratadas con clavos o alambres", style: "text-center", colSpan: "3" },
          //         {},
          //         {},
          //         { text: " " },
          //       ],
          //       [
          //         {
          //           text: "Si usted tiene alguno de estos dispositivos implantados, deberá informar a su médico tratante, quien determinará si es seguro realizar esta prueba de imagen.",
          //           colSpan: "8",
          //         },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //       [
          //         {
          //           text: "Recuerde que el uso de la resonancia esta totalmente contraindicado si Ud. tiene: Desfibrilador interno (implantado), Implante coclear (del oído), Clips que se utilizan en los aneurismas cerebrales",
          //           colSpan: "8",
          //         },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //       [
          //         {
          //           text: "Recuerde no usar ningún tipo de joyas incluyendo anillos, piercings, aretes, collares o relojes. Se le pedirá que se quite la ropa que tiene ganchos, botones, cierres u otros objetos metálicos para no interferir con el procedimiento.",
          //           colSpan: "8",
          //         },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //       [
          //         {
          //           text: "Finalmente, no olvide informarnos si se encuentra en proceso de gestación o tiene posibilidades de estarlo, si sufre de claustrofobia o si pesa mas de 130 Kg",
          //           colSpan: "8",
          //         },
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //         {},
          //       ],
          //     ],
          //   },
          // },
          {
            style: "left10",
            marginTop: 15,
            alignment: "justify",
            table: {
              widths: ["40%", "5%", "5%", "10%", "20%", "20%"],
              body: [
                [
                  { text: "ENCUESTA DE SEGURIDAD (PROCEDIMIENTO CON CONTRASTE)", colSpan: "4", style: "text-center" },
                  {},
                  {},
                  {},
                  { text: "APLICA" },
                  { text: "NO APLICA" },
                ],
                [
                  {
                    text: "¿Le han practicado exámenes con inyección de contraste de Gadolinio? ¿Otras resonancias? Especifique",
                  },
                  { text: this.datos.reg_coninf.datos.P_1 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_1 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_1, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presentó alguna reacción adversa al medio de contraste (Gadolinio)? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_2 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_2 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_2, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades del corazón? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_3 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_3 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_3, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades de los riñones? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_4 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_4 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_4, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Presenta enfermedades del hígado? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_5 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_5 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_5, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de asma? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_6 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_6 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_6, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  {
                    text: "¿Presenta algún tipo de alergia? (a medicamentos, alimentos, otras sustancias) Especifique",
                  },
                  { text: this.datos.reg_coninf.datos.P_7 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_7 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_7, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de diabetes? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_8 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_8 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_8, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Padece de otro tipo de enfermedad? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_9 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_9 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_9, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  { text: "¿Consume medicamentos? Especifique" },
                  { text: this.datos.reg_coninf.datos.P_10 ? "SI" : "", alignment: "center" },
                  { text: !this.datos.reg_coninf.datos.P_10 ? "NO" : "", style: "text-center" },
                  { text: this.datos.reg_coninf.datos.P_10, colSpan: "3" },
                  {},
                  {},
                ],
                [
                  {
                    text: "Recuerde que si su examen requiere la administración de medio de contraste endovenoso, el auxiliar de enfermería procederá a canalizarle una vena periférica (venoclisis) para administrar el medio de contraste. El procedimiento de venoclisis es seguro, sin embargo, Ud. puede presentar: ardor, malestar, sangrado escaso, hematoma y flebitis.",
                    colSpan: "6",
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            stack: [
              {
                style: "left10",
                unbreakable: true,
                marginTop: 5,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        alignment: "justify",
                        fontSize: 9,
                        colSpan: 3,
                        stack: [
                          {
                            text: "DECLARACIÓN DEL CONSENTIMIENTO INFORMADO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "N"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Resonancia Magnética Nuclear, los riesgos y beneficios, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo la toma del procedimiento teniendo en cuenta que esta autorización puede ser revocable en cualquier momento.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "N"),
                  ],
                },
              },
              {
                unbreakable: true,
                style: "left10",
                marginTop: 0,
                table: {
                  heights: [10, 70],
                  widths: ["33%", "33%", "34%"],
                  body: [
                    [
                      {
                        border: [true, false, true, true],
                        fontSize: 9,
                        alignment: "justify",
                        stack: [
                          {
                            text: "DILIGENCIAR ESTE ESPACIO EN CASO DE REVOCACIÓN O DISENTIMIENTO",
                            style: "center9Bold",
                          },
                          {
                            text: [
                              { text: "Yo, " },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.descrip
                                      : this.datos.reg_acomp.descrip
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: " identificada(o) con el documento de identidad número.",
                              },
                              {
                                text:
                                  this.datos.reg_coninf.disentimiento == "S"
                                    ? this.datos.reg_coninf.paci_acept == "S"
                                      ? this.datos.reg_paci.cod
                                      : this.datos.reg_acomp.cod
                                    : "_______________________________",
                                bold: true,
                              },
                              {
                                text: "después de haber sido informado (a) sobre el procedimiento de Resonancia Magnética Nuclear sus riesgos y beneficios y adicionalmente, los riesgos de no realizármelo, declaro que la información ha sido clara, que se me han respondido las inquietudes y que autorizo de forma libre y consiente, revoco mi consentimiento para continuar con la toma del procedimiento en mención.",
                              },
                            ],
                            marginTop: 5,
                          },
                        ],
                        colSpan: 3,
                      },
                      {},
                      {},
                    ],
                    this.firmas(this.datos.reg_coninf.disentimiento == "S"),
                  ],
                },
              },
            ],
          },
        ];
      default:
        return [];
    }
  }

  cuadro_canvas(condicion) {
    return [
      { canvas: [{ type: "rect", x: 0, y: 0, h: 11, w: 12 }] },
      {
        canvas: condicion
          ? [
              { type: "line", x1: 0, x2: 12, y1: -11, y2: 0 },
              { type: "line", x1: 12, x2: 0, y1: -11, y2: 0 },
            ]
          : [],
      },
    ];
  }

  editFecha(fecha) {
    if (isNaN(fecha)) return fecha;
    else {
      fecha = fecha.toString() || "";
      return `${fecha.slice(0, 4)}-${fecha.slice(4, 6)}-${fecha.slice(6)}`;
    }
  }

  hora_edit(data) {
    if (isNaN(data)) return data;
    else {
      data = data.toString() || "";
      return `${data.slice(0, 2)}:${data.slice(2)}`;
    }
  }

  diagnosticos() {
    return [
      { text: "DIAGNOSTICOS DE INGRESOS", bold: true, marginBottom: 2 },
      {
        margin: [10, 5, 0, 0],
        ul: [
          {
            text: [
              { text: this.datos.reg_hc.rips.diagn[0].cod, bold: true },
              { text: " " + this.datos.reg_hc.rips.diagn[0].descrip.trim() },
            ],
          },
        ],
      },
    ];
  }

  format_doc(doc) {
    return !isNaN(doc) ? new Intl.NumberFormat("ja-JP").format(doc) : doc;
  }

  descrip_parent(cod) {
    let busq = instance
      .data()
      .arrayParentesco()
      .find((el) => el.COD == cod);

    return busq ? busq.DESCRIP : "";
  }

  box_text_area(texto) {
    return texto.length == 0
      ? { text: "" }
      : {
          marginTop: 6,
          fontSize: 10,
          table: {
            widths: "100%",
            body: [[{ text: texto.enterPut() }]],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 0.5 : 0.1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 0.5 : 0.1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length ? "#adb5bd" : "#adb5bd";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length ? "#adb5bd" : "#adb5bd";
            },
          },
        };
  }

  layouTables() {
    return {
      hLineWidth: function (i, node) {
        return i === 0 || i === node.table.body.length ? 0.5 : 0.1;
      },
      vLineWidth: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 0.5 : 0.1;
      },
      hLineColor: function (i, node) {
        return i === 0 || i === node.table.body.length ? "black" : "gray";
      },
      vLineColor: function (i, node) {
        return i === 0 || i === node.table.widths.length ? "black" : "gray";
      },
      fillColor: function (rowIndex, node, columnIndex) {
        return columnIndex == 0 ? "#eeeeee" : null;
      },
    };
  }

  firmas(condicion) {
    return [
      {
        style: "center8",
        stack: [
          { text: "FIRMA DEL PACIENTE", bold: true },
          {
            stack:
              this.datos.reg_coninf.paci_acept == "S" && condicion
                ? [
                    {
                      image: "firma_consen",
                      width: 150,
                      height: 60,
                      alignment: "center",
                      marginTop: -3,
                    },
                  ]
                : [
                    {
                      image: instance.data().default_img_base64,
                      width: 150,
                      height: 60,
                      alignment: "center",
                      marginTop: -3,
                    },
                  ],
          },
          {
            text: this.datos.reg_paci.descrip.trim(),
            bold: true,
            marginTop: -10,
          },
          {
            text: this.datos.reg_paci.tipo_id + ". " + instance.data().mask_id(this.datos.reg_paci.cod),
            bold: true,
          },
        ],
      },
      {
        style: "center8",
        stack: [
          { text: "TUTOR FAMILIAR O RESPONSABLE", bold: true },
          {
            stack:
              this.datos.reg_coninf.acomp_acept == "S" && condicion
                ? [
                    {
                      image: "firma_consen",
                      width: 150,
                      height: 60,
                      alignment: "center",
                      marginTop: -3,
                    },
                  ]
                : [
                    {
                      image: instance.data().default_img_base64,
                      width: 150,
                      height: 60,
                      alignment: "center",
                      marginTop: -3,
                    },
                  ],
          },
          {
            text: this.datos.reg_coninf.acomp_acept == "S" && condicion ? this.datos.reg_acomp.descrip.trim() : "",
            bold: true,
            marginTop: -10,
          },
          {
            text:
              this.datos.reg_coninf.acomp_acept == "S" && condicion
                ? this.datos.reg_acomp.tipo_id +
                  ". " +
                  instance.data().mask_id(this.datos.reg_acomp.cod) +
                  "        Parentesco: " +
                  this.datos.reg_coninf.descrip_paren_acomp.trim()
                : "",
            bold: true,
          },
        ],
      },
      {
        style: "center8",
        stack: [
          { text: "FIRMA PROFESIONAL", bold: true },
          {
            stack: condicion
              ? [
                  {
                    image: this.datos.firma_prof || this.datos.img_firma_medico,
                    width: 150,
                    height: 60,
                    alignment: "center",
                    marginTop: -3,
                  },
                  {
                    text: this.datos.reg_prof.descrip,
                    bold: true,
                    marginTop: -10,
                  },
                  {
                    text: "Doc. " + instance.data().mask_id(this.datos.reg_prof.cod),
                    bold: true,
                  },
                ]
              : [
                  {
                    text: "",
                    marginTop: 56,
                  },
                ],
          },
        ],
      },
    ];
  }
}

const imprimir = function (params) {
  String.prototype.enterPut = function () {
    return this.toString().replace(/(?:\&)/g, "\n"); //eslint-disable-line
  };

  var format = new formato(params);
  return format._init();
};

export default imprimir;
