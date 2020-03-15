import Vue from "vue";
import { makeAppendChildToParentMutation } from "../../helpers";

export default {
  setThread(state, { thread, threadId }) {
    Vue.set(state.threads, threadId, thread);
  },
  appendThreadToForum: makeAppendChildToParentMutation({
    parents: "forums",
    child: "threads",
    parentModuleName: "forumForums"
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parents: "users",
    child: "threads",
    parentModuleName: "forumUsers"
  })
};
