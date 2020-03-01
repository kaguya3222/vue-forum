import mutations from "./mutations";
import sourceData from "@/data.json";
import actions from "./actions";

export default {
  state: {
    posts: sourceData.posts
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
};
