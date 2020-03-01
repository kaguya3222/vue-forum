import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data.json";
import forumPosts from "./modules/posts/store";
import forumUsers from "./modules/users/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    forumPosts,
    forumUsers
  }
});
