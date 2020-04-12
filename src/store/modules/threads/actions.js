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
  createThread({ commit, rootState, dispatch }, { text, title, forumId }) {
    return new Promise(resolve => {
      const threadId = firebase
        .database()
        .ref("threads")
        .push().key;
      const userId = rootState.users.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        title,
        forumId,
        publishedAt,
        userId,
        posts: {}
      };
      const post = {
        text,
        publishedAt,
        threadId,
        userId
      };

      const updates = {};

      updates[`threads/${threadId}`] = thread;
      updates[`forums/${forumId}/threads/${threadId}`] = threadId;
      updates[`users/${userId}/threads/${threadId}`] = threadId;

      dispatch(
        "posts/createPost",
        {
          post
        },
        { root: true }
      ).then(post => {
        const postId = post[".key"];
        thread.posts[postId] = postId;
        thread.firstPostId = postId;
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
            resolve(rootState.threads.items[threadId]);
          });
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
