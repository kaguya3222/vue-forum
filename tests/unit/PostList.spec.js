import { shallowMount } from "@vue/test-utils";
import PostList from "../../src/components/PostList";
import PostListItem from "../../src/components/PostListItem";
import mockedSourceData from "./mocks/mockedSourceData";

describe("PostList", () => {
  test("Accepts PostListItem as a component", () => {
    const wrapper = shallowMount(PostList, {
      propsData: {
        posts: Object.values(mockedSourceData.posts)
      },
      stubs: {
        "post-list-item": true
      }
    });
    const postListItem = wrapper.find(PostListItem);
    expect(postListItem.name()).toBe("PostListItem.vue");
  });
});
