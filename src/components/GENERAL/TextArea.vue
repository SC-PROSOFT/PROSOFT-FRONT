<template>
  <v-textarea
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    @keydown.enter="onEnterKeyDownEvent($event)"
    @focus="setCaja(field), focusCaja()"
    :background-color="color_input"
    :maxlength="field.max_length"
    @keydown="onKeyDown($event)"
    @keyup="onKeyUp($event)"
    :counter="field.max_length"
    :disabled="field.disabled"
    @keydown.esc="pressEsc"
    :label="field.label"
    :rows="field.rows"
    :type="field.tipo"
    @blur="sinFoco()"
    v-model="reg_"
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
    reg: [Number, String],
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
      reg_: null,
      estado: false,
      color_input: "",
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
    "$props.reg"(val) {
      this.reg_ = val;
    },
    flag_foco() {
      if (this.flag_foco && !this.field.disabled) {
        this.color_input = "input_foco";
      } else this.color_input = "input_blur";
    },
  },
  mounted() {
    this.reg_ = this.reg;
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
