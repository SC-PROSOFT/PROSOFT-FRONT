<template>
  <v-textarea
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    @focus="setCaja(field), focusCaja()"
    :maxlength="field.max_length"
    @keydown="onKeyDown($event)"
    @keyup="onKeyUp($event)"
    @keydown.enter="onEnterKeyDownEvent($event)"
    :counter="field.max_length"
    :disabled="field.disabled"
    @keydown.esc="pressEsc"
    v-model="reg[field.id]"
    :label="field.label"
    :rows="field.rows"
    :type="field.tipo"
    @blur="sinFoco()"
    :id="field.id"
    ref="textarea"
    outlined
    dense
  ></v-textarea>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    reg: Object,
    field: {
      max_length: String,
      disabled: Boolean,
      label: String,
      rows: String,
      tipo: {
        type: String,
        default: () => "string",
      },
      required: {
        type: Boolean,
        default: () => false,
      },
    },
  },
  data() {
    return {
      estado: false,
      flag_foco: false,
      ctrlPressed: false,
    };
  },
  watch: {
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.textarea.focus();
        });
      }
    },
    flag_foco() {
      let elementos = document.getElementById(this.field.id);
      if (this.flag_foco && !this.field.disabled) {
        elementos.style.background = "#FFD700";
        elementos.style.borderRadius = "0.2rem";
      } else {
        elementos.style.background = "";
      }
    },
  },
  methods: {
    ...mapMutations({
      setCaja: "formularios/setCaja",
      setDialogType: "formularios/setDialogType",
    }),
    focusCaja() {
      this.flag_foco = false;
    },
    sinFoco() {
      this.flag_foco = true;
    },
    // async pressEnter() {
    // this.$emit("next-action", { key: "enter", field: this.field.id });
    // },
    async pressEsc() {
      this.$emit("next-action", { key: "esc", field: this.field.id });
    },

    onKeyDown(event) {
      if (event.keyCode === 17) {
        this.ctrlPressed = true;
      }
    },
    onKeyUp(event) {
      if (event.keyCode === 17) {
        this.ctrlPressed = false;
      }
    },
    onEnterKeyDownEvent(event) {
      if (event.keyCode === 13 && this.ctrlPressed) {
        this.$emit("next-action", { key: "enter", field: this.field.id });
        this.ctrlPressed = false;
      }
    },
  },
};
</script>
