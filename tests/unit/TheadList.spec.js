import { shallowMount } from "@vue/test-utils";
import ThreadList from "../../src/components/ThreadList";
import ThreadListItem from "../../src/components/ThreadListItem";
import mockedSourceData from "./mocks/mockedSourceData";

describe("ThreadList", () => {
  test("Accepts ThreadListItem as a component", () => {
    const wrapper = shallowMount(ThreadList, {
      propsData: {
        threads: Object.values(mockedSourceData.threads)
      },
      stubs: {
        "thread-list-item": true
      }
    });
    const threadListItem = wrapper.find(ThreadListItem);
    expect(threadListItem.name()).toBe("ThreadListItem.vue");
  });
});
