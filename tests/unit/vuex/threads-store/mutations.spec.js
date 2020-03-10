import threadsMutations from "@/store/modules/threads/mutations";
import threadsStore from "@/store/modules/threads/store";
import mockedSourceData from "../../mocks/mockedSourceData";
import { countObjectProperties } from "../../../../src/helpers";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

const thread = Object.values(threadsStore.state.threads)[0];

describe("setThread", function() {
  test("Adds thread to threads object", () => {
    const threadsLengthBeforeSet = countObjectProperties(
      threadsStore.state.threads
    );
    threadsMutations.setThread(threadsStore.state, {
      thread,
      threadId: "greatThread" + Date.now()
    });
    const threadsLengthAfterSet = countObjectProperties(
      threadsStore.state.threads
    );
    expect(threadsLengthAfterSet > threadsLengthBeforeSet).toBe(true);
  });
});

describe("appendThreadToForum", () => {
  test("Adds thread to certain forum", () => {
    rootStore.state.forums = { ...mockedSourceData.forums };
    const forum = Object.values(rootStore.state.forums)[0];
    const forumId = "-KpOx5Y4AqRr3sB4Ybwj";
    const forumThreads = forum.threads;
    const forumThreadsLengthBeforeAppend = countObjectProperties(forumThreads);
    threadsMutations.appendThreadToForum(threadsStore.state, {
      forumId,
      threadId: thread[".key"],
      rootState: rootStore.state
    });
    const forumThreadsLengthAfterAppend = countObjectProperties(forumThreads);
    expect(forumThreadsLengthAfterAppend > forumThreadsLengthBeforeAppend).toBe(
      true
    );
  });
});

describe("appendThreadToUser", function() {
  test("Adds thread to certain user", () => {
    rootStore.state.forumUsers.users = { ...mockedSourceData.users };
    const user = Object.values(rootStore.state.forumUsers.users)[0];
    const userId = user[".key"];
    const userThreadsLengthBeforeAppend = countObjectProperties(user.threads);
    threadsMutations.appendThreadToUser(threadsStore.state, {
      userId,
      threadId: thread[".key"],
      rootState: rootStore.state
    });
    const userThreadsLengthAfterAppend = countObjectProperties(user.threads);
    expect(userThreadsLengthAfterAppend > userThreadsLengthBeforeAppend).toBe(
      true
    );
  });
});
