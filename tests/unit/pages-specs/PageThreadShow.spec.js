import { shallowMount } from "@vue/test-utils";
import PageThreadShow from "../../../src/pages/PageThreadShow";
import PostList from "../../../src/components/PostList";
import PostEditor from "../../../src/components/PostEditor";
import mockedSourceData from "../mocks/mockedSourceData";

describe("PageThreadShow", () => {
  const wrapper = shallowMount(PageThreadShow, {
    propsData: {
      threadId: mockedSourceData.threads[0][".key"]
    },
    stubs: {
      "app-date": true
    }
  });
  test("Shows thread data on thread page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts PostList as a child component", () => {
    expect(wrapper.contains(PostList)).toBe(true);
  });
  test("Accepts PostEditor as a child component", () => {
    expect(wrapper.contains(PostEditor)).toBe(true);
  });
  test("Creates posts array of certain thread", () => {
    const post = Object.values(mockedSourceData.posts)[0];
    const hasPost = wrapper.vm.threadPosts.some(
      threadPost => threadPost[".key"] === post[".key"]
    );
    expect(hasPost).toBe(true);
  });
});