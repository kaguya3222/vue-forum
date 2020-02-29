import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import PostEditor from "../../../src/components/PostEditor";
import mockedSourceData from "../mocks/mockedSourceData";
import sourceStore from "../../../src/store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostEditor", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {}
  });
  const wrapper = mount(PostEditor, {
    propsData: {
      threadId: mockedSourceData.threads[0][".key"]
    },
    localVue,
    store
  });

  const addPostSpy = jest.spyOn(wrapper.vm, "addPost");
  let postInput;
  wrapper.vm.$store.dispatch = jest.fn();

  beforeEach(() => {
    postInput = wrapper.find("textarea");
    postInput.element.value = "Hello guys!";
    postInput.trigger("input");
  });

  test("'newPostText' data property matches with user input", () => {
    expect(wrapper.vm.newPostText).toBe("Hello guys!");
  });

  test("'addPost' method is called when post is submitted", () => {
    const postForm = wrapper.find("form");
    postForm.trigger("submit");
    expect(addPostSpy).toHaveBeenCalled();
  });

  test("Dispatches 'createPost' action when post is submitted", () => {
    const postForm = wrapper.find("form");
    postForm.trigger("submit");
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("createPost", {
      text: "Hello guys!",
      publishedAt: Math.floor(Date.now() / 1000),
      threadId: wrapper.vm.threadId,
      userId: "jUjmgCurRRdzayqbRMO7aTG9X1G2"
    });
  });
});
