export default {
  createPost({ commit, rootState }, { post }) {
    const postId = "greatPost" + Math.random();
    post[".key"] = postId;
    post.userId = rootState.forumUsers.authId;
    post.publishedAt = Math.floor(Date.now() / 1000);
    commit("setPost", { post, postId });
    commit("appendPostToThread", {
      postId,
      threadId: post.threadId,
      rootState
    });
    commit("appendPostToUser", { postId, userId: post.userId, rootState });
    return Promise.resolve(post);
  },
  updatePost({ commit, rootState }, { postId, text }) {
    const post = rootState.forumPosts.posts[postId];
    commit("setPost", {
      postId,
      post: {
        ...post,
        text,
        edited: {
          at: Math.floor(Date.now() / 1000),
          by: rootState.forumUsers.authId
        }
      }
    });
    return post;
  }
};
