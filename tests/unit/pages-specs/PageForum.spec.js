import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageForum from "../../../src/pages/PageForum";
import ThreadList from "../../../src/components/ThreadList";
import Vuex from "vuex";
import mockedRootStore from "../mocks/mockedRootStore";
import forumsStore from "@/store/modules/forums/store";
import threadsStore from "@/store/modules/threads/store";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageForum", () => {
  const forumActions = {
    fetchForum: jest.fn().mockResolvedValue({})
  };
  const threadActions = {
    fetchThreads: jest.fn().mockResolvedValue([{}])
  };
  const userActions = {
    fetchUser: jest.fn()
  };
  const store = new Vuex.Store({
    modules: {
      forums: {
        namespaced: true,
        state: rootState.forums,
        getters: forumsStore.getters,
        actions: forumActions
      },
      threads: {
        namespaced: true,
        state: rootState.threads,
        getters: threadsStore.getters,
        actions: threadActions
      },
      users: {
        namespaced: true,
        state: rootState.users,
        actions: userActions
      }
    }
  });
  const forums = store.state.forums.items;
  const wrapper = shallowMount(PageForum, {
    propsData: {
      id: Object.values(forums)[1][".key"]
    },
    stubs: ["router-link"],
    localVue,
    store
  });
  test("Calls fetchForum action when created", () => {
    expect(forumActions.fetchForum).toHaveBeenCalled();
  });
  test("Calls fetchThreads action when created", () => {
    expect(threadActions.fetchThreads).toHaveBeenCalled();
  });
  test("Calls fetchUser action when created", () => {
    expect(userActions.fetchUser).toHaveBeenCalled();
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
    const threads = store.state.threads.items;
    const thread = Object.values(threads)[1];
    const hasTread = wrapper.vm.forumThreads.some(
      forumThread => forumThread[".key"] === thread[".key"]
    );
    expect(hasTread).toBe(true);
  });
});
