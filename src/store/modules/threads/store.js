import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import sourceData from "@/data.json";

export default {
  state: {
    threads: sourceData.threads
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
