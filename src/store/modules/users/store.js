import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import sourceData from "@/data.json";

export default {
  state: {
    users: sourceData.users,
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
