import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data.json";
import posts from "./modules/posts/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3"
  },
  getters: {
    authUser(state) {
      return state.users[state.authId];
    }
  },
  modules: {
    forumPosts: posts
  }
});
