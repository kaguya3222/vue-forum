import mutations from "../../../../src/store/modules/posts/mutations";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

describe("setPost", () => {
  test("adds post to posts object", () => {
    const posts = rootStore.state.posts.items;
    const postsLengthBeforeSet = Object.values(posts).length;
    mutations.setPost(rootStore.state.posts, {
      post: {
        text: "Hello guys",
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: "-KsjWehQ--apjDBwSBCY",
        userId: "jUjmgCurRRdzayqbRMO7aTG9X1G2"
      },
      postId: "greatPost" + Math.random()
    });
    const postsLengthAfterSet = Object.values(posts).length;
    expect(postsLengthBeforeSet < postsLengthAfterSet).toBe(true);
  });
});
