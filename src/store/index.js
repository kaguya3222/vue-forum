import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: sourceData,
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    }
  },
  actions: {
    createPost(store, post) {
      const postId = "greatPost" + Math.random();
      post[".key"] = postId;
      store.commit("setPost", { post, postId });
      store.commit("appendPostToThread", { postId, threadId: post.threadId });
      store.commit("appendPostToUser", { postId, userId: post.userId });
    }
  },
  modules: {}
});
