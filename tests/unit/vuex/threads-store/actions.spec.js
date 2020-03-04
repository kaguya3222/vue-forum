import threadsActions from "@/store/modules/threads/actions";
import rootStore from "@/store/";

rootStore.commit = jest.fn();
rootStore.dispatch = jest.fn();

describe("createThread", () => {
  const text = "Hello guys!";
  const title = "Thread title";
  const forumId = "-KpOx5Y4AqRr3sB4Ybwj";
  beforeEach(async () => {
    await threadsActions.createThread(
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
      forumId,
      threadId: expect.any(String),
      rootState: rootStore.state
    });
  });
  test("Commits appendThreadToUser mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("appendThreadToUser", {
      userId: expect.any(String),
      threadId: expect.any(String),
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
