import { shallowMount } from "@vue/test-utils";
import PostList from "../../../src/components/PostList";
import PostListItem from "../../../src/components/PostListItem";
import mockedRootStore from "../mocks/mockedRootStore";

describe("PostList", () => {
  test("Accepts PostListItem as a component", () => {
    const posts = mockedRootStore.state.posts.items;
    const wrapper = shallowMount(PostList, {
      propsData: {
        posts: Object.values(posts)
      },
      stubs: {
        "app-date": true
      }
    });
    expect(wrapper.contains(PostListItem)).toBe(true);
  });
});
