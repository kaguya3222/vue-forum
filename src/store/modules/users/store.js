import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state: {
    items: {},
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3"
  },
  getters: {
    ...getters
  },
  actions: {
    ...actions
  },
  mutations: {
    ...mutations
  }
};
