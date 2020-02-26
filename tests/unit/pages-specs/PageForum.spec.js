import { shallowMount } from "@vue/test-utils";
import PageForum from "../../../src/pages/PageForum";
import ThreadList from "../../../src/components/ThreadList";
import mockedSourceData from "../mocks/mockedSourceData";

describe("PageForum", () => {
  const wrapper = shallowMount(PageForum, {
    propsData: {
      id: mockedSourceData.forums[1][".key"]
    }
  });
  test("Shows forum data on forum page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts ThreadList as a child component", () => {
    expect(wrapper.contains(ThreadList)).toBe(true);
  });
  test("Takes forum object from source data with given id", () => {
    expect(wrapper.vm.forum[".key"]).toBe(wrapper.vm.id);
  });
  test("Creates threads array of certain forum", () => {
    const thread = mockedSourceData.threads[1];
    const hasTread = wrapper.vm.forumThreads.some(
      forumThread => forumThread[".key"] === thread[".key"]
    );
    expect(hasTread).toBe(true);
  });
});
