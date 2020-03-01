import actions from "../../../../src/store/modules/posts/actions";
import sourceStore from "@/store/";

sourceStore.commit = jest.fn();

describe("createPost", () => {
  const postId = "greatPost" + Math.random();
  const post = {
    text: "Hello guys",
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: "-KsjWehQ--apjDBwSBCY",
    userId: "jUjmgCurRRdzayqbRMO7aTG9X1G2",
    ".key": postId
  };
  beforeEach(() => {
    actions.createPost(sourceStore, { post });
  });
  test("Commits setPost mutation", () => {
    expect(sourceStore.commit).toHaveBeenCalledWith("setPost", {
      post,
      postId
    });
  });
  test("Commits appendPostToThread", () => {
    const threadId = "-KsjWehQ--apjDBwSBCY";
    expect(sourceStore.commit).toHaveBeenCalledWith("appendPostToThread", {
      postId,
      threadId
    });
  });
  test("Commits appendPostToUser", () => {
    expect(sourceStore.commit).toHaveBeenCalledWith(
      "appendPostToUser",
      expect.objectContaining({
        postId,
        userId: expect.any(String)
      })
    );
  });
});
