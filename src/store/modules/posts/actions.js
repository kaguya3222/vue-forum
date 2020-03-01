export default {
  createPost({ commit, rootState }, { post }) {
    const postId = post[".key"];
    commit("setPost", { post, postId });
    commit("appendPostToThread", {
      postId,
      threadId: post.threadId,
      rootState
    });
    commit("appendPostToUser", { postId, userId: post.userId, rootState });
  }
};
