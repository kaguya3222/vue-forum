import { mount } from "@vue/test-utils";
import ForumListItem from "../../../src/components/ForumListItem";
import mockedRootStore from "../mocks/mockedRootStore";

describe("ForumListItem", () => {
  const forums = mockedRootStore.state.forums.items;
  const wrapper = mount(ForumListItem, {
    propsData: {
      forum: Object.values(forums)[0]
    },
    stubs: {
      "router-link": true
    }
  });
  test("Shows forum data in forums list", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Counts threads number", () => {
    const threads = Object.values(wrapper.vm.forum.threads);
    expect(wrapper.vm.threadsCount).toBe(threads.length);
  });
});
