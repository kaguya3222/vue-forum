import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageThreadCreate from "../../../src/pages/PageThreadCreate";
import ThreadEditor from "../../../src/components/ThreadEditor";
import Vuex from "vuex";
import mockedSourceData from "../mocks/mockedSourceData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageThreadCreate", function() {
  const store = new Vuex.Store({
    state: { ...mockedSourceData }
  });
  store.dispatch = jest.fn();
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
      expect(store.dispatch).toHaveBeenCalledWith("createThread", {
        forumId: wrapper.vm.forum[".key"],
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
