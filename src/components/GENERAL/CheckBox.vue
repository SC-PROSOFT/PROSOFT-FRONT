<template>
  <v-container
    class="my-0 py-0 px-0 mx-0"
    @keydown.enter="keyEnter"
    @keydown.esc="keyEsc"
    @keyup="onChange()"
    fluid
  >
    <v-checkbox
      v-model="reg_"
      :id="field.id"
      :label="field.label"
      :disabled="field.disabled"
      style="padding: 0px; margin: 0px"
    ></v-checkbox>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    reg: [Number, String, Boolean],
    field: {
      id: String,
      label: String,
      disabled: Boolean,
      checkbox: Boolean,
    },
  },
  data() {
    return {
      reg_: null,
    };
  },
  watch: {
    field: {
      deep: true,
      handler(field) {
        if (field.disabled === false) {
          this.setCaja(this.field);
          this.$nextTick(() => {
            document.getElementById(field.id).focus();
          });
        }
      },
    },
    "$props.reg"(val) {
      this.reg_ = val;
    },
  },
  mounted() {
    this.reg_ = this.reg;
  },

  methods: {
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },
    ...mapMutations({ setCaja: "formularios/setCaja" }),
    keyEnter() {
      this.$emit("next-action", { key: "enter", field: this.field.id });
    },
    keyEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
    },
  },
  updated() {
    document.getElementById(this.field.id).focus();
  },
};
</script>

<style></style>
