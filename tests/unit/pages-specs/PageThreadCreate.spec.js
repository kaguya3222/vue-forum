import { createLocalVue, mount } from "@vue/test-utils";
import PageThreadCreate from "../../../src/pages/PageThreadCreate";
import rootStore from "@/store/";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageThreadCreate", function() {
  const store = new Vuex.Store({
    state: rootStore.state
  });
  store.dispatch = jest.fn();
  const $router = {
    push: jest.fn()
  };
  const wrapper = mount(PageThreadCreate, {
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
  describe("save", () => {
    const threadTitleInput = wrapper.find("#thread_title");
    const threadContentInput = wrapper.find("#thread_content");
    const threadCreationForm = wrapper.find("form");
    beforeEach(() => {
      threadTitleInput.element.value = "Thread title";
      threadTitleInput.trigger("input");
      threadContentInput.element.value = "Thread content";
      threadContentInput.trigger("input");
      threadCreationForm.trigger("submit");
    });
    test("Dispatches 'createThread' action after form is submitted", () => {
      expect(store.dispatch).toHaveBeenCalledWith("createThread", {
        forumId: wrapper.vm.forum[".key"],
        title: wrapper.vm.title,
        text: wrapper.vm.text
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
    const cancelButton = wrapper.find(".btn-ghost");
    test("Redirects user to forum page when 'cancel' button is clicked", () => {
      cancelButton.trigger("click");
      expect($router.push).toHaveBeenCalledWith({
        name: "Forum",
        params: {
          id: wrapper.vm.forumId
        }
      });
    });
  });
});
