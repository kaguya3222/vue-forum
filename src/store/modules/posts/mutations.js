import Vue from "vue";
import { makeAppendChildToParentMutation } from "../../helpers";

export default {
  setPost(state, { post, postId }) {
    Vue.set(state.posts, postId, post);
  },
  appendPostToThread: makeAppendChildToParentMutation({
    parents: "threads",
    child: "posts",
    parentModuleName: "forumThreads"
  }),
  appendPostToUser: makeAppendChildToParentMutation({
    parents: "users",
    child: "posts",
    parentModuleName: "forumUsers"
  })
};
