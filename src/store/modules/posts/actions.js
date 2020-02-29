export default {
  createPost(store, { post }) {
    const postId = post[".key"];
    store.commit("setPost", { post, postId });
    store.commit("appendPostToThread", { postId, threadId: post.threadId });
    store.commit("appendPostToUser", { postId, userId: post.userId });
  }
};
