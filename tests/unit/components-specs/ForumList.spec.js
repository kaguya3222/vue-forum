import { shallowMount } from "@vue/test-utils";
import ForumList from "../../../src/components/ForumList";
import ForumListItem from "../../../src/components/ForumListItem";
import mockedRootStore from "../mocks/mockedRootStore";

describe("ForumList", () => {
  test("Accepts ForumListItem as a child component", () => {
    const forums = mockedRootStore.state.forums.items;
    const wrapper = shallowMount(ForumList, {
      propsData: {
        forums: Object.values(forums)
      }
    });
    expect(wrapper.contains(ForumListItem)).toBe(true);
  });
});
