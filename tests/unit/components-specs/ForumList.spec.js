import { shallowMount } from "@vue/test-utils";
import ForumList from "../../../src/components/ForumList";
import ForumListItem from "../../../src/components/ForumListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("ForumList", () => {
  test("Accepts ForumListItem as a child component", () => {
    const wrapper = shallowMount(ForumList, {
      propsData: {
        forums: mockedSourceData.forums
      }
    });
    expect(wrapper.contains(ForumListItem)).toBe(true);
  });
});
