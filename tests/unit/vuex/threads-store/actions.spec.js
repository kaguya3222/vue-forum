import threadsActions from "@/store/modules/threads/actions";
import mockedRootStore from "../../mocks/mockedRootStore";

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
  test("Commits setThread mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("setThread", {
      threadId: expect.any(String),
      thread: expect.any(Object)
    });
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
    expect(rootStore.dispatch).toHaveBeenCalledWith("createPost", {
      post: {
        text,
        threadId: expect.any(String)
      }
    });
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
  test("Dispatches updatePost", () => {
    expect(rootStore.dispatch).toHaveBeenCalledWith("updatePost", {
      postId: expect.any(String),
      text: expect.any(String)
    });
  });
});
