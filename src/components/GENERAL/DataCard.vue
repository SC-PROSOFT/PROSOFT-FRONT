<template>
  <v-text-field
    :hide-details="field.details == false ? true : false"
    :disabled="field.disabled == false ? false : true"
    :shaped="field.shaped == false ? true : false"
    :class="`font-weight-light ${field.class}`"
    :messages="field.message"
    :style="field.css_vars"
    :label="field.label"
    :value="reg_"
    @keyup="onChange()"
    height="35"
    outlined
    filled
    dense
  ></v-text-field>
</template>

<script>
export default {
  props: {
    reg: [Number, String],
    field: {
      id: String,
      label: String,
      type: Object,
    },
  },
  data() {
    return {
      reg_: null,
    };
  },
  computed: {
    cssVars() {
      return {
        "--label-color": this.field.label_color || "white",
      };
    },
  },
  methods: {
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },
  },
  watch: {
    "$props.reg"(val) {
      this.reg_ = val;
    },
  },
  mounted() {
    this.reg_ = this.reg;
  },
};
</script>
<style>
.custom-label-color input {
  color: var(--label-color) !important;
  font-weight: bold;
}
.text-black input {
  color: black !important;
}
</style>
