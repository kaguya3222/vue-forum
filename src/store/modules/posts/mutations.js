import Vue from "vue";

export default {
  setPost(state, { post, postId }) {
    Vue.set(state.posts, postId, post);
  },
  appendPostToThread(state, { postId, threadId, rootState }) {
    const thread = rootState.forumThreads.threads[threadId];
    if (!thread.posts) {
      Vue.set(thread, "posts", {});
    }
    Vue.set(thread.posts, postId, postId);
  },
  appendPostToUser(state, { postId, userId, rootState }) {
    const user = rootState.forumUsers.users[userId];
    if (!user.posts) {
      Vue.set(user, "posts", {});
    }
    Vue.set(user.posts, postId, postId);
  }
};
