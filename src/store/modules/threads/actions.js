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
  },
  async updateThread({ state, commit, rootState }, { title, text, threadId }) {
    const thread = state.threads[threadId];
    const post = rootState.forumPosts.posts[thread.firstPostId];
    const newThread = { ...thread, title };
    const newPost = { ...post, text };
    commit("setThread", { thread: newThread, threadId });
    commit("setPost", { post: newPost, postId: newPost[".key"] });
    return newThread[".key"];
  }
};
