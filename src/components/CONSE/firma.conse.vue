<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="cerrar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Firma consentimiento informado</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="get_firma"> Grabar </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-spacer class="pb-5"></v-spacer>
      <VueSignaturePad
        id="signature"
        width="100%"
        height="500px"
        ref="signaturePad"
        :options="{
          ...opcionesFirma,
          onBegin: () => {
            $refs.signaturePad.resizeCanvas();
          },
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="() => $refs.signaturePad.clearSignature()"
        >BORRAR</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      datos: this.params,
      datos_usunet: {},
      opcionesFirma: {
        dotSize: (1 + 2.5) / 2,
        minWidth: 2.5,
        maxWidth: 5,
        throttle: 16,
        minDistance: 5,
        backgroundColor: "rgba(0,0,0,0)",
        penColor: "black",
        velocityFilterWeight: 0.7,
      },
    };
  },
  methods: {
    cerrar() {
      this.$refs.signaturePad.clearSignature();
      this.$emit("close");
    },
    get_firma() {
      const { isEmpty, data } =
        this.$refs.signaturePad.saveSignature("image/png");

      if (!isEmpty) {
        this.$emit("get_img", data);
        this.$emit("close");
      } else {
        console.log("no ha firmado!");
        this.$emit("msj", "No ha firmado!", "red");
      }
    },
  },
};
</script>
