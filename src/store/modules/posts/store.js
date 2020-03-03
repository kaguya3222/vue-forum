import mutations from "./mutations";
import sourceData from "@/data.json";
import actions from "./actions";
import getters from "./getters";

export default {
  state: {
    posts: sourceData.posts
  },
  getters: {
    ...getters
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
};
