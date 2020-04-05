import firebase from "firebase";

export default {
  fetchThreads(context, { ids }) {
    return context.dispatch(
      "fetchItems",
      {
        resource: "threads",
        ids
      },
      { root: true }
    );
  },
  fetchThread({ dispatch }, { id }) {
    return dispatch("fetchItem", { resource: "threads", id }, { root: true });
  },
  createThread({ commit, rootState }, { text, title, forumId }) {
    return new Promise(resolve => {
      const threadId = firebase
        .database()
        .ref("threads")
        .push().key;
      const postId = firebase
        .database()
        .ref("posts")
        .push().key;
      const userId = rootState.users.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        title,
        forumId,
        publishedAt,
        userId,
        firstPostId: postId,
        posts: {}
      };
      thread.posts[postId] = postId;
      const post = {
        text,
        publishedAt,
        threadId,
        userId
      };

      const updates = {};

      updates[`threads/${threadId}`] = thread;
      updates[`forums/${forumId}/threads/${threadId}`] = threadId;
      updates[`threads/${post.threadId}/contributors/${post.userId}`] =
        post.userId;
      updates[`users/${userId}/threads/${threadId}`] = threadId;

      updates[`posts/${postId}`] = post;
      updates[`users/${userId}/posts/${postId}`] = postId;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit(
            "setItem",
            { resource: "threads", id: threadId, item: thread },
            { root: true }
          );
          commit("appendThreadToForum", {
            parentId: forumId,
            childId: threadId,
            rootState
          });
          commit("appendThreadToUser", {
            parentId: userId,
            childId: threadId,
            rootState
          });

          commit(
            "setItem",
            { resource: "posts", item: post, id: postId },
            { root: true }
          );
          commit(
            "posts/appendPostToThread",
            {
              parentId: post.threadId,
              childId: postId,
              rootState
            },
            { root: true }
          );
          commit("appendContributorToThread", {
            parentId: post.threadId,
            childId: postId,
            rootState
          });
          commit(
            "posts/appendPostToUser",
            { parentId: post.userId, childId: postId, rootState },
            { root: true }
          );
          resolve(rootState.threads.items[threadId]);
        });
    });
  },
  async updateThread({ commit, rootState }, { title, text, threadId }) {
    const thread = rootState.threads.items[threadId];
    const post = rootState.posts.items[thread.firstPostId];
    const newThread = { ...thread, title };

    const edited = {
      at: Math.floor(Date.now() / 1000),
      by: rootState.users.authId
    };

    const updates = {};
    updates[`posts/${thread.firstPostId}/text`] = text;
    updates[`posts/${thread.firstPostId}/edited`] = edited;
    updates[`threads/${threadId}/title`] = title;

    await firebase
      .database()
      .ref()
      .update(updates);

    commit("setThread", { thread: newThread, threadId });
    commit(
      "posts/setPost",
      {
        postId: thread.firstPostId,
        post: { ...post, text, edited }
      },
      { root: true }
    );
    return newThread[".key"];
  }
};
