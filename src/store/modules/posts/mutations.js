import Vue from "vue";
import { makeAppendChildToParentMutation } from "../../vuex-helpers";

export default {
  setPost(state, { post, postId }) {
    Vue.set(state.items, postId, post);
  },
  appendPostToThread: makeAppendChildToParentMutation({
    parents: "threads",
    child: "posts"
  }),
  appendPostToUser: makeAppendChildToParentMutation({
    parents: "users",
    child: "posts"
  })
};
