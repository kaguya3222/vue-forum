import Vue from "vue";

export default {
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
};
