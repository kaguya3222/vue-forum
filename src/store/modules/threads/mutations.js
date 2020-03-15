import Vue from "vue";
import { makeAppendChildToParentMutation } from "../../vuex-helpers";

export default {
  setThread(state, { thread, threadId }) {
    Vue.set(state.threads, threadId, thread);
  },
  appendThreadToForum: makeAppendChildToParentMutation({
    parents: "forums",
    child: "threads",
    parentsModuleName: "forumForums"
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parents: "users",
    child: "threads",
    parentsModuleName: "forumUsers"
  })
};
