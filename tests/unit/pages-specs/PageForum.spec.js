import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageForum from "../../../src/pages/PageForum";
import ThreadList from "../../../src/components/ThreadList";
import mockedSourceData from "../mocks/mockedSourceData";
import Vuex from "vuex";
import sourceStore from "../../../src/store";
import threadsGetters from "@/store/modules/threads/getters";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageForum", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {
      ...threadsGetters
    }
  });
  const wrapper = shallowMount(PageForum, {
    propsData: {
      id: Object.values(mockedSourceData.forums)[1][".key"]
    },
    stubs: ["router-link"],
    localVue,
    store
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
    const thread = Object.values(mockedSourceData.threads)[1];
    const hasTread = wrapper.vm.forumThreads.some(
      forumThread => forumThread[".key"] === thread[".key"]
    );
    expect(hasTread).toBe(true);
  });
});
