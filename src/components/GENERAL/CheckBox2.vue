<template>
    <v-container class="my-0 py-0 px-0 mx-0" @keydown.enter="keyEnter" @keydown.esc="keyEsc" fluid @blur="sinFoco">
      <v-checkbox
        style="padding: 0px; margin: 0px"
        :disabled="field.disabled"
        :label="field.label"
        @change="onValue"
        :id="field.id"
        :value="value"
        ref="input"
      ></v-checkbox>
    </v-container>
  </template>
  
  <script>
  import { mapMutations } from "vuex";
  
  export default {
    props: {
      value: [Number, String, Boolean],
      field: {
        id: String,
        label: String,
        disabled: Boolean,
        checkbox: Boolean,
        campo_abierto: Boolean,
        required: {
          type: Boolean,
          default: () => false,
        },
      },
    },
    data() {
      return {
        flag_foco: "",
        color_input: "",
      };
    },
    watch: {
      flag_foco() {
        if (!this.field.campo_abierto) {
          if (this.flag_foco && !this.field.disabled) this.color_input = "input_foco";
          else this.color_input = "input_blur";
        }
      },
    },
    methods: {
      ...mapMutations({ CON851: "CON851" }),
      onValue(e) {
        this.$emit("input", e);
      },
      async keyEnter(e) {
        if (!this.field.campo_abierto) this.field.disabled = true;
        document.getElementById(this.field.id).blur();
        this.$emit("next-action", "enter");
      },
  
      async keyEsc() {
        if (!this.field.campo_abierto) this.field.disabled = true;
        document.getElementById(this.field.id).blur();
        this.$emit("next-action", "esc");
      },
      focusCaja() {
        this.flag_foco = false;
      },
      sinFoco() {
        this.flag_foco = true;
      },
    },
    updated() {
      document.getElementById(this.field.id).focus();
    },
  };
  </script>
  