export default {
  async createThread(
    { commit, rootState, dispatch },
    { text, title, forumId }
  ) {
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
  }
};
