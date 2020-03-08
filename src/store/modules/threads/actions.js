export default {
  createThread({ commit, rootState, dispatch }, { text, title, forumId }) {
    const threadId = "greatThread" + Math.random();
    const userId = rootState.forumUsers.authId;
    const publishedAt = Math.floor(Date.now() / 1000);
    const thread = {
      ".key": threadId,
      title,
      forumId,
      publishedAt,
      userId
    };
    commit("setThread", { threadId, thread });
    commit("appendThreadToForum", { forumId, threadId, rootState });
    commit("appendThreadToUser", { userId, threadId, rootState });
    dispatch("createPost", {
      post: {
        text,
        threadId
      }
    }).then(post => {
      commit("setThread", {
        threadId,
        thread: { ...thread, firstPostId: post[".key"] }
      });
    });
    return threadId;
  },
  async updateThread(
    { commit, rootState, dispatch },
    { title, text, threadId }
  ) {
    const thread = rootState.forumThreads.threads[threadId];
    const newThread = { ...thread, title };
    commit("setThread", { thread: newThread, threadId });
    await dispatch("updatePost", { postId: thread.firstPostId, text });
    return newThread[".key"];
  }
};
