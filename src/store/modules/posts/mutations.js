import Vue from "vue";

export default {
  setPost(state, { post, postId }) {
    Vue.set(state.posts, postId, post);
  },
  appendPostToThread(state, { postId, threadId, rootState }) {
    const thread = rootState.threads[threadId];
    Vue.set(thread.posts, postId, postId);
  },
  appendPostToUser(state, { postId, userId, rootState }) {
    const user = rootState.forumUsers.users[userId];
    Vue.set(user.posts, postId, postId);
  }
};
