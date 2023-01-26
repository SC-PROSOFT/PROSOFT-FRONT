<template>
  <v-container fluid>
    <form-titulo :titulo="titulo" />
    <v-card elevation="20" class="px-4 py-4 mx-auto">
      <v-row align="center">
        <v-col class="font-weight-light text-center">
          <h4 :class="`${novedad.color}--text`">
            <v-icon :color="novedad.color">{{ novedad.icono }}</v-icon>
            {{ novedad.novedad }}
          </h4>
        </v-col>
      </v-row>
      <v-row justify="start" align="center" class="input-row">
        <v-col>
          <v-col cols="12" sm="8" md="8" xs="8" class="input-col">
            <v-col>
              <FILEINPUT
                @next-action="nextStep(form_file, $event, datoFile)"
                :field="form_file.file"
                :reg="reg_file"
              ></FILEINPUT>
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <CON851
      @cancelarAlerta="cancelarAlerta()"
      @cancelar="cancelarAlerta()"
      @confirmar="confirmar()"
      @salirEsc="cancelar()"
      v-if="alerta.estado"
      :alerta="alerta"
    />
  </v-container>
</template>
<script>
import {
  getObjRegFile_,
  getObjRegFile,
} from "../../fuentes/correspondencia/regFile";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { nextAction } from "../../mixins/nextAction";
import { global, currentUser } from "../../mixins/global";
import moment from "moment";

export default {
  name: "COR110",
  mixins: [nextAction, global],
  data() {
    return {
      titulo: "1.B SUBIR",
      novedad_activa: false,
      novedad: {},

      form_file: getObjRegFile_(),
      reg_file: getObjRegFile(),
    };
  },
  computed: {
    ...mapGetters({}),
  },

  methods: {
    ...mapMutations({
      setDialogType: "formularios/setDialogType",
    }),
    ...mapActions({
      _postImagen: "image/_postImagen",
    }),

    async validarFile() {
      this.CON851("PNZ", "info", `¿Deseas guardar el archivo?`, "p");
      const { file } = this.reg_file;
      const nit = this.USUARIO_GLOBAL.nit;

      const RES = await this._postImagen({
        nit,
        file,
      });

      if (RES.N1) {
        this.CON851("N1", "seccess", `Imgen guardada con exito`);
      }
      if (RES.msg) {
        "N1", "error", `No se pudo guardar la imagen`;
      } else {
      }
    },

    datoFile(val) {
      switch (val) {
        case "esc":
          return this.CON851("MENU", "info", null, "P");
        case "enter":
          return this.validarFile();
      }
    },
    async confirmar() {
      this.cerrar_CON851();
      let dialogType = this.get("dialogType");

      switch (dialogType) {
        case "salir":
          this.$router.push("/Menu-Principal");
          break;
        case "input":
          this.validarFile();
          break;

        default:
          break;
      }
    },
    cancelar() {
      this.onField();
      this.cerrar_CON851();
    },
    cancelarAlerta() {
      this.cerrar_CON851();
      this.get("dialogType") == "done" ? this.abrirNovedad() : this.onField();
    },
    abrirDialogo() {
      this.offField();
      this.CON851("MENU", "warning", "", "P");
    },
  },
};
</script>
