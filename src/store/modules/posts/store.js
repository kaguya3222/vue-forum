import mutations from "./mutations";
import sourceData from "@/data.json";
import actions from "./actions";

export default {
  state: {
    ...sourceData
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
};
