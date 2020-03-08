import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import PostEditor from "../../../src/components/PostEditor";
import mockedSourceData from "../mocks/mockedSourceData";
import rootStore from "@/store/";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostEditor", () => {
  const store = new Vuex.Store({
    state: rootStore.state
  });
  const wrapper = mount(PostEditor, {
    localVue,
    store
  });

  let postInput;
  wrapper.vm.$store.dispatch = jest.fn();

  beforeEach(() => {
    postInput = wrapper.find("textarea");
    postInput.element.value = "Hello guys!";
    postInput.trigger("input");
  });

  test("'newPostText' data property matches with users input", () => {
    expect(wrapper.vm.newPostText).toBe("Hello guys!");
  });

  describe("form submit methods", () => {
    const createPostSpy = jest.spyOn(wrapper.vm, "createPost");
    describe("'createPost' method", () => {
      beforeEach(() => {
        wrapper.setProps({
          threadId: Object.values(mockedSourceData.threads)[0][".key"]
        });
        const postForm = wrapper.find("form");
        postForm.trigger("submit");
      });
      test("Is called when post is created", () => {
        expect(createPostSpy).toHaveBeenCalled();
      });
      test("Dispatches 'createPost' action", () => {
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("createPost", {
          post: expect.objectContaining({
            text: "Hello guys!",
            threadId: wrapper.vm.threadId
          })
        });
      });
    });

    describe("'updatePost' method", () => {
      const updatePostSpy = jest.spyOn(wrapper.vm, "updatePost");
      beforeEach(() => {
        const post = Object.values(mockedSourceData.posts)[0];
        wrapper.setProps({ post: { ...post } });
        const postForm = wrapper.find("form");
        postForm.trigger("submit");
      });
      test("Is called when post is updated", () => {
        expect(updatePostSpy).toHaveBeenCalled();
      });

      test("Dispatches 'updatePost' action", () => {
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("updatePost", {
          postId: wrapper.vm.post[".key"],
          text: wrapper.vm.newPostText
        });
      });
    });
  });
});
