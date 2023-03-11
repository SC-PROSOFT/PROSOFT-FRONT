<template>
    <div class="my-0 py-0">
      <v-autocomplete
        :item-value="field.item_value"
        :background-color="color_input"
        :item-text="field.item_text"
        @keydown.enter="pressEnter"
        :disabled="field.disabled"
        :messages="field.message"
        @keydown.esc="pressEsc"
        @keydown.40="rowPress"
        @keydown.38="rowPress"
        @change="pressClick"
        :items="items"
        :label="field.label"
        @input="onValue"
        @blur="sinFoco"
        @focus="count"
        :id="field.id"
        :value="value"
        ref="combo"
        outlined
        dense
      ></v-autocomplete>
    </div>
  </template>
  <script>
  export default {
    name: "Autocomplete",
    props: {
      value: [Number, String],
      items: [Array],
      field: {
        id: String,
        label: String,
        item_text: String,
        disabled: Boolean,
        item_value: String,
        campo_abierto: Boolean,
        required: {
          type: Boolean,
          default: () => false,
        },
      },
    },
    data() {
      return {
        cont: 0,
        flag_foco: false,
        elemento_foco: "",
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
      count() {
        if (this.value == "") this.$emit("input", 1);
        this.focusCaja();
        this.cont = 0;
      },
      rowPress() {
        this.cont = 1;
      },
      focusCaja() {
        this.flag_foco = false;
      },
      sinFoco() {
        this.flag_foco = true;
      },
      onValue(e) {
        this.$emit("input", e);
      },
      async pressEsc() {
        if (!this.field.campo_abierto) this.field.disabled = true;
        this.$emit("next-action", "esc");
        this.$refs.combo.blur();
        this.cont = 0;
      },
      async pressEnter() {
        this.cont++;
        if (this.value && this.cont >= 3) {
          if (!this.field.campo_abierto) this.field.disabled = true;
          this.$emit("next-action", "enter");
          this.$refs.combo.blur();
          this.cont = 0;
        }
      },
      pressClick() {
        if (!this.field.campo_abierto) this.field.disabled = true;
        this.$emit("next-action", "enter");
        this.$refs.combo.blur();
        this.cont = 0;
      },
    },
  };
  </script>
  