export default {
  namespaced: true,
  state: {
    enCaja: Object,
    dialogType: String,
  },
  getters: {
    get: (state) => (thing) => state[thing],
  },
  mutations: {
    setCaja(state, caja) {
      state.enCaja = caja;
    },

    setDialogType(state, type) {
      state.dialogType = type;
    },
  },
};
