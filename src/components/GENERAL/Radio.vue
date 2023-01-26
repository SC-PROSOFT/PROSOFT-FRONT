<template>
  <v-radio-group @keydown.enter="pressEnter" :disabled="radio.disabled" v-model="radio.value" row>
    <v-radio v-for="(item, index) in radio.label" :key="index" :label="item" :id="item" :value="item"></v-radio>
  </v-radio-group>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    radio: {
      noRequired: {
        type: Boolean,
        default: () => true,
      },
    },
  },

  data: () => ({}),
  watch: {
    "radio.disabled"() {
      if (this.radio.disabled === false) {
        this.$nextTick(() => {
          document.getElementById(this.radio.label[0]).focus();
        });
      }
    },
  },
  methods: {
    ...mapMutations({ setDialogType: "formularios/setDialogType" }),
    pressEnter() {
      if (!this.radio.value) {
        if (!this.radio.noRequired) this.setDialogType("input"), this.$emit("alerta");
        else this.$emit("next-action", { key: "enter", field: this.radio.id });
      } else {
        this.$emit("next-action", { key: "enter", field: this.radio.id });
      }
    },
    pressEsc() {
      this.$emit("next-action", {
        key: "esc",
        field: this.field.id,
      });
    },
  },
};
</script>
