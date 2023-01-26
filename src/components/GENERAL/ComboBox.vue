<template>
  <v-autocomplete
    :item-value="field.item_value"
    @focus="count()"
    :item-text="field.item_text"
    @keydown.enter="pressEnter"
    :disabled="field.disabled"
    :messages="field.message"
    @keydown.esc="pressEsc"
    v-model="reg[field.id]"
    @keydown.40="rowPress"
    @keydown.38="rowPress"
    @change="pressClick"
    :items="field.items"
    :label="field.label"
    @blur="sinFoco()"
    :id="field.id"
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
    reg: Object,
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
    };
  },
  watch: {
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.combo.focus();
        });
      }
    },
    flag_foco() {
      this.elemento_foco = document.getElementById(this.field.id);
      if (this.flag_foco && !this.field.disabled) {
        this.elemento_foco.style.background = "#FFD700";
        this.elemento_foco.style.borderRadius = "0.2rem";
      } else {
        this.elemento_foco.style.background = "";
      }
    },
  },

  methods: {
    ...mapMutations({ setCaja: "formularios/setCaja" }),
    count() {
      if (this.reg[this.field.id] == "") this.reg[this.field.id] = 1;
      this.focusCaja();
      this.cont = 0;
    },
    rowPress() {
      this.cont = 1;
    },
    focusCaja() {
      this.elemento_foco = document.getElementById(this.field.id);
      this.elemento_foco.style.background = "";
      this.flag_foco = false;
    },
    sinFoco() {
      this.elemento_foco = document.getElementById(this.field.id);
      this.elemento_foco.style.background = "#FFD700";
      this.elemento_foco.style.borderRadius = "0.2rem";
      this.flag_foco = true;
    },

    async pressEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
      this.$refs.combo.blur();
      this.cont = 0;
    },
    async pressEnter() {
      this.cont++;
      if (this.reg[this.field.id] && this.cont >= 3) {
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
