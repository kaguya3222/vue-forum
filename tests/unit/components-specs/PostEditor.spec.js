import { mount } from "@vue/test-utils";
import PostEditor from "../../../src/components/PostEditor";
import mockedSourceData from "../mocks/mockedSourceData";

describe("PostEditor", () => {
  test("Adds post to thread", () => {
    const wrapper = mount(PostEditor, {
      propsData: {
        threadId: mockedSourceData.threads[0][".key"]
      }
    });
    const postInput = wrapper.find("textarea");
    const postForm = wrapper.find("form");
    const addPostSpy = jest.spyOn(wrapper.vm, "addPost");
    const postsLengthBeforeSubmit = Object.values(wrapper.vm.thread.posts)
      .length;
    postInput.element.value = "Hello guys!";
    postInput.trigger("input");
    expect(wrapper.vm.newPostText).toBe("Hello guys!");
    postForm.trigger("submit");
    const postsLengthAfterSubmit = Object.values(wrapper.vm.thread.posts)
      .length;
    expect(addPostSpy).toHaveBeenCalled();
    expect(postsLengthAfterSubmit > postsLengthBeforeSubmit);
  });
});
