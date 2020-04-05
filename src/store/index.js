import Vue from "vue";
import Vuex from "vuex";
import posts from "./modules/posts/store";
import users from "./modules/users/store";
import threads from "./modules/threads/store";
import forums from "./modules/forums/store";
import categories from "./modules/categories/store";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations,
  actions,
  modules: {
    posts,
    users,
    threads,
    forums,
    categories
  }
});
