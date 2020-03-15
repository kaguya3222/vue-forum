import actions from "../../../../src/store/modules/posts/actions";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

rootStore.commit = jest.fn();

describe("createPost", () => {
  const post = {
    text: "Hello guys",
    threadId: "-KsjWehQ--apjDBwSBCY"
  };
  beforeEach(() => {
    actions.createPost(
      {
        commit: rootStore.commit,
        rootState: rootStore.state
      },
      { post }
    );
  });
  test("Commits setPost mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("setPost", {
      post: expect.objectContaining({
        ".key": expect.any(String),
        publishedAt: expect.any(Number),
        text: post.text,
        threadId: post.threadId,
        userId: expect.any(String)
      }),
      postId: expect.any(String)
    });
  });
  test("Commits appendPostToThread", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("appendPostToThread", {
      parentId: expect.any(String),
      childId: expect.any(String),
      rootState: rootStore.state
    });
  });
  test("Commits appendPostToUser", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("appendPostToUser", {
      parentId: expect.any(String),
      childId: expect.any(String),
      rootState: rootStore.state
    });
  });
});
