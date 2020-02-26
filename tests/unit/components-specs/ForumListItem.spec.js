import { mount } from "@vue/test-utils";
import ForumListItem from "../../../src/components/ForumListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("ForumListItem", () => {
  const wrapper = mount(ForumListItem, {
    propsData: {
      forum: mockedSourceData.forums[0]
    },
    stubs: {
      "router-link": true
    }
  });
  test("Shows forum data", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Counts threads number", () => {
    const threads = Object.values(mockedSourceData.forums[0].threads);
    expect(wrapper.vm.threadsCount).toBe(threads.length);
  });
});
