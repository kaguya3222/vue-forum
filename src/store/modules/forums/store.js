import actions from "./actions";

export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {
    items: state => state.items
  },
  actions
};
