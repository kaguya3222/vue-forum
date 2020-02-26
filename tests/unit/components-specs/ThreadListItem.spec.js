import { shallowMount } from "@vue/test-utils";
import ThreadListItem from "../../../src/components/ThreadListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("ThreadListItem", () => {
  test("Shows thread data", () => {
    const wrapper = shallowMount(ThreadListItem, {
      propsData: {
        thread: mockedSourceData.threads[0]
      },
      stubs: {
        "app-date": true,
        "router-link": true
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
