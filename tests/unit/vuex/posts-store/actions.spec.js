import actions from "../../../../src/store/modules/posts/actions";
import sourceStore from "@/store/";

sourceStore.commit = jest.fn();

describe("createPost", () => {
  const post = {
    text: "Hello guys",
    threadId: "-KsjWehQ--apjDBwSBCY"
  };
  beforeEach(() => {
    actions.createPost(
      {
        commit: sourceStore.commit,
        rootState: sourceStore.state
      },
      { post }
    );
  });
  test("Commits setPost mutation", () => {
    expect(sourceStore.commit).toHaveBeenCalledWith("setPost", {
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
    const threadId = "-KsjWehQ--apjDBwSBCY";
    expect(sourceStore.commit).toHaveBeenCalledWith("appendPostToThread", {
      postId: expect.any(String),
      threadId,
      rootState: sourceStore.state
    });
  });
  test("Commits appendPostToUser", () => {
    expect(sourceStore.commit).toHaveBeenCalledWith(
      "appendPostToUser",
      expect.objectContaining({
        postId: expect.any(String),
        userId: expect.any(String),
        rootState: sourceStore.state
      })
    );
  });
});
