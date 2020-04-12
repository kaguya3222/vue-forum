import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageThreadCreate from "../../../src/pages/PageThreadCreate";
import ThreadEditor from "../../../src/components/ThreadEditor";
import Vuex from "vuex";
import mockedRootStore from "../mocks/mockedRootStore";
import forumsStore from "@/store/modules/forums/store";

const rootState = mockedRootStore.state;

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageThreadCreate", function() {
  const forumActions = {
    fetchForum: jest.fn().mockResolvedValue({ threads: [] })
  };
  const threadActions = {
    createThread: jest.fn().mockResolvedValue({ ".key": "threadId" })
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
        actions: threadActions
      }
    }
  });
  const $router = {
    push: jest.fn()
  };
  const wrapper = shallowMount(PageThreadCreate, {
    propsData: {
      forumId: "-KpOx5Y4AqRr3sB4Ybwj"
    },
    mocks: {
      $router
    },
    localVue,
    store
  });
  test("Correctly shows thread creation form", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts ThreadEditor as a child component", () => {
    expect(wrapper.contains(ThreadEditor)).toBe(true);
  });
  describe("save", () => {
    wrapper.vm.$on("save", wrapper.vm.save);
    beforeEach(() => {
      wrapper.vm.$emit("save", { text: "", title: "" });
    });
    test("Dispatches 'createThread' when 'save' event is emitted", () => {
      expect(threadActions.createThread).toHaveBeenCalled();
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
    test("Redirects user to forum page when 'cancel' event is emitted", () => {
      wrapper.vm.$emit("cancel");
      expect($router.push).toHaveBeenCalledWith({
        name: "Forum",
        params: {
          id: wrapper.vm.forumId
        }
      });
    });
  });
});
