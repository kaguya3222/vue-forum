import actions from "../../../../src/store/modules/posts/actions";
import mockedRootStore from "../../mocks/mockedRootStore";
import { mockFirebase } from "../../mocks/firebase";

const rootStore = { ...mockedRootStore };
rootStore.commit = jest.fn();

mockFirebase();

describe("createPost", () => {
  const post = {
    text: "Hello guys",
    threadId: "-KsjWehQ--apjDBwSBCY"
  };
  beforeEach(() => {
    actions.createPost(
      {
        commit: rootStore.commit,
        state: rootStore.state.posts,
        rootState: rootStore.state
      },
      { post }
    );
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

describe("updatePost", () => {
  let postId = "postId";
  let text = "post text";

  beforeEach(() => {
    actions.updatePost(
      {
        commit: rootStore.commit,
        rootState: rootStore.state
      },
      { postId, text }
    );
  });
  test("commits setPost mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("setPost", {
      postId,
      post: expect.any(Object)
    });
  });
});
