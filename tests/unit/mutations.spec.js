import rootMutations from "@/store/mutations";
import mockedRootStore from "./mocks/mockedRootStore";

describe("setItem", () => {
  test("Sets new item in resource", () => {
    const posts = mockedRootStore.state.posts;
    const postsLengthBeforeSet = Object.values(posts.items).length;
    rootMutations.setItem(mockedRootStore.state, {
      item: {},
      id: "item id",
      resource: "posts"
    });
    const postsLengthAfterSet = Object.values(posts.items).length;
    expect(postsLengthAfterSet > postsLengthBeforeSet).toBe(true);
  });
});
