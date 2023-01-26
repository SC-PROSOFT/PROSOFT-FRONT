<template>
  <v-text-field
    :hide-details="field.details == false ? true : false"
    :disabled="field.disabled == false ? false : true"
    :shaped="field.shaped == false ? true : false"
    :class="`font-weight-light ${field.class}`"
    :messages="field.message"
    :value="reg[field.id]"
    :style="field.css_vars"
    :label="field.label"
    height="35"
    outlined
    filled
    dense
  ></v-text-field>
</template>

<script>
export default {
  props: {
    reg: Object,
    field: {
      id: String,
      label: String,
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    cssVars() {
      return {
        "--label-color": this.field.label_color || "white",
      };
    },
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
