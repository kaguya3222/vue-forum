import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageThreadEdit from "../../../src/pages/PageThreadEdit";
import ThreadEditor from "../../../src/components/ThreadEditor";
import Vuex from "vuex";
import threadsStore from "@/store/modules/threads/store";
import postsStore from "@/store/modules/posts/store";
import mockedRootStore from "../mocks/mockedRootStore";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageThreadEdit", () => {
  const theadActions = {
    fetchThread: jest
      .fn()
      .mockResolvedValue({ firstPostId: "thread's firstPostId" })
  };
  const postActions = {
    fetchPost: jest.fn()
  };
  const store = new Vuex.Store({
    modules: {
      threads: {
        namespaced: true,
        state: rootState.threads,
        getters: threadsStore.getters,
        actions: theadActions
      },
      posts: {
        namespaced: true,
        state: rootState.posts,
        getters: postsStore.getters,
        actions: postActions
      }
    }
  });
  const $router = {
    push: jest.fn()
  };
  const wrapper = shallowMount(PageThreadEdit, {
    propsData: {
      threadId: "-KsjWehQ--apjDBwSBCY"
    },
    mocks: {
      $router
    },
    localVue,
    store
  });
  store.dispatch = jest.fn();
  test("Calls fetchThread action when created", () => {
    expect(theadActions.fetchThread).toHaveBeenCalled();
  });
  test("Correctly shows thread edition page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts ThreadEditor as a child component", () => {
    expect(wrapper.contains(ThreadEditor)).toBe(true);
  });
  describe("save method", () => {
    wrapper.vm.$on("save", wrapper.vm.save);
    beforeEach(() => {
      wrapper.vm.$emit("save", { text: "", title: "" });
    });
    test("Dispatches 'updateThread' when 'save' event is emitted", () => {
      expect(store.dispatch).toHaveBeenCalledWith("threads/updateThread", {
        threadId: wrapper.vm.threadId,
        title: expect.any(String),
        text: expect.any(String)
      });
    });
    test("Redirects user to 'ThreadShow' route after form is submitted", () => {
      expect($router.push).toHaveBeenCalledWith({
        name: "ThreadShow",
        params: expect.any(Object)
      });
    });
  });
  describe("cancel", function() {
    wrapper.vm.$on("cancel", wrapper.vm.cancel);
    test("Redirects user to thread page when 'cancel' event is emitted", () => {
      wrapper.vm.$emit("cancel");
      expect($router.push).toHaveBeenCalledWith({
        name: "ThreadShow",
        params: {
          threadId: wrapper.vm.threadId
        }
      });
    });
  });
});
