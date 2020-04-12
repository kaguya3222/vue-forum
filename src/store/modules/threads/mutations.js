import Vue from "vue";
import { makeAppendChildToParentMutation } from "../../vuex-helpers";

export default {
  setThread(state, { thread, threadId }) {
    Vue.set(state.items, threadId, thread);
  },
  appendThreadToForum: makeAppendChildToParentMutation({
    parents: "forums",
    child: "threads"
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parents: "users",
    child: "threads"
  }),
  appendContributorToThread: makeAppendChildToParentMutation({
    parent: "threads",
    child: "contributors"
  })
};
