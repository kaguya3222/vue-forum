import threadsActions from "@/store/modules/threads/actions";
import mockedRootStore from "../../mocks/mockedRootStore";
import { mockFirebase } from "../../mocks/firebase";

mockFirebase();

const rootStore = { ...mockedRootStore };

rootStore.dispatch = jest.fn().mockResolvedValue({});
rootStore.commit = jest.fn();

describe("createThread", () => {
  const text = "Hello guys!";
  const title = "Thread title";
  const forumId = "-KpOx5Y4AqRr3sB4Ybwj";

  beforeEach(() => {
    threadsActions.createThread(
      { ...rootStore, rootState: rootStore.state },
      { text, title, forumId }
    );
  });
  test("Commits setItem mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith(
      "setItem",
      {
        resource: "threads",
        id: expect.any(String),
        item: expect.any(Object)
      },
      { root: true }
    );
  });
  test("Commits appendThreadToForum mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("appendThreadToForum", {
      parentId: expect.any(String),
      childId: expect.any(String),
      rootState: rootStore.state
    });
  });
  test("Commits appendThreadToUser mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("appendThreadToUser", {
      parentId: expect.any(String),
      childId: expect.any(String),
      rootState: rootStore.state
    });
  });
  test("Dispatches createPost action", () => {
    expect(rootStore.dispatch).toHaveBeenCalledWith(
      "posts/createPost",
      {
        post: expect.any(Object)
      },
      { root: true }
    );
  });
});

describe("updateThread", () => {
  const title = "Thread title";
  const text = "Hello guys!";
  const threadId = "-KsjWehQ--apjDBwSBCY";
  beforeEach(() => {
    threadsActions.updateThread(
      {
        ...rootStore,
        rootState: rootStore.state
      },
      { title, text, threadId }
    );
  });
  test("Commits setThread", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("setThread", {
      thread: expect.any(Object),
      threadId
    });
  });
  test("commits setPost", () => {
    expect(rootStore.commit).toHaveBeenCalledWith(
      "posts/setPost",
      {
        postId: expect.any(String),
        post: expect.any(Object)
      },
      { root: true }
    );
  });
});
