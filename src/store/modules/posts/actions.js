import firebase from "firebase";

export default {
  fetchPosts(context, { ids }) {
    return context.dispatch(
      "fetchItems",
      { resource: "posts", ids },
      { root: true }
    );
  },
  fetchPost({ dispatch }, { id }) {
    return dispatch("fetchItem", { resource: "posts", id }, { root: true });
  },
  createPost({ commit, state, rootState }, { post }) {
    const postId = firebase
      .database()
      .ref("posts")
      .push().key;
    post.userId = rootState.users.authId;
    post.publishedAt = Math.floor(Date.now() / 1000);

    const updates = {};
    updates[`posts/${postId}`] = post;
    updates[`threads/${post.threadId}/posts/${postId}`] = postId;
    updates[`users/${post.userId}/posts/${postId}`] = postId;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit(
          "setItem",
          { resource: "posts", item: post, id: postId },
          { root: true }
        );
        commit("appendPostToThread", {
          parentId: post.threadId,
          childId: postId,
          rootState
        });
        commit("appendPostToUser", {
          parentId: post.userId,
          childId: postId,
          rootState
        });
        return Promise.resolve(state.items[postId]);
      });
  },
  async updatePost({ commit, rootState }, { postId, text }) {
    const post = rootState.posts.items[postId];
    const edited = {
      at: Math.floor(Date.now() / 1000),
      by: rootState.users.authId
    };
    const updates = { text, edited };
    await firebase
      .database()
      .ref("posts")
      .child(postId)
      .update(updates);

    commit("setPost", {
      postId,
      post: {
        ...post,
        text,
        edited
      }
    });
    return post;
  }
};
