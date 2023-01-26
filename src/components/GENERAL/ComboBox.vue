<template>
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
    :items="field.items"
    :label="field.label"
    @keyup="onChange()"
    @blur="sinFoco()"
    @focus="count()"
    :id="field.id"
    v-model="reg_"
    ref="combo"
    outlined
    dense
  ></v-autocomplete>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "Combobox",
  props: {
    reg: [Number, String],
    field: {
      id: String,
      items: Array,
      label: String,
      value: String,
      disabled: Boolean,
      item_value: String,
      item_text: String,
    },
  },
  data() {
    return {
      cont: 0,
      flag_foco: false,
      elemento_foco: "",
      color_input: "",
      reg_: "",
    };
  },
  watch: {
    "$props.reg"(val) {
      this.reg_ = val;
    },
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.combo.focus();
        });
      }
    },
    flag_foco() {
      if (this.flag_foco && !this.field.disabled)
        this.color_input = "input_foco";
      else this.color_input = "input_blur";
    },
  },
  mounted() {
    this.reg_ = this.reg;
  },
  methods: {
    ...mapMutations({ setCaja: "formularios/setCaja" }),
    count() {
      if (this.reg_ == "") this.reg_ = 1;
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
    onChange() {
      this.$emit("onChange", { key: this.field.id, value: this.reg_ });
    },

    async pressEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
      this.$refs.combo.blur();
      this.cont = 0;
    },
    async pressEnter() {
      this.cont++;
      if (this.reg_ && this.cont >= 3) {
        this.$emit("next-action", { key: "enter", field: this.field.id });
        this.$refs.combo.blur();
        this.cont = 0;
      }
    },
    pressClick() {
      this.$emit("next-action", { key: "enter", field: this.field.id });
      this.$refs.combo.blur();
      this.cont = 0;
    },
  },
};
</script>
