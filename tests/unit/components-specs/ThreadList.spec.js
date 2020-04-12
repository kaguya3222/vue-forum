import { shallowMount } from "@vue/test-utils";
import ThreadList from "../../../src/components/ThreadList";
import ThreadListItem from "../../../src/components/ThreadListItem";
import mockedRootStore from "../mocks/mockedRootStore";

describe("ThreadList", () => {
  test("Accepts ThreadListItem as a component", () => {
    const threads = mockedRootStore.state.threads.items;
    const wrapper = shallowMount(ThreadList, {
      propsData: {
        threads: Object.values(threads)
      }
    });
    expect(wrapper.contains(ThreadListItem)).toBe(true);
  });
});
