import { shallowMount } from "@vue/test-utils";
import PostListItem from "../../../src/components/PostListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("PostListItem", () => {
  test("Shows post data", () => {
    const wrapper = shallowMount(PostListItem, {
      propsData: {
        post: mockedSourceData.posts["-KsjWehQ--apjDBwSBCZ"]
      },
      stubs: {
        "app-date": true
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
