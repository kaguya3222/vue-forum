import Vue from "vue";

export default {
  setThread(state, { thread, threadId, rootState }) {
    Vue.set(rootState.forumThreads.threads, threadId, thread);
  },
  appendThreadToForum(state, { forumId, threadId, rootState }) {
    const forum = rootState.forums[forumId];
    if (!forum.threads) {
      Vue.set(forum, "threads", {});
    }
    Vue.set(forum.threads, threadId, threadId);
  },
  appendThreadToUser(state, { userId, threadId, rootState }) {
    const user = rootState.forumUsers.users[userId];
    if (!user.threads) {
      Vue.set(user, "threads", {});
    }
    Vue.set(user.threads, threadId, threadId);
  }
};
