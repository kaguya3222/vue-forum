import { mount } from "@vue/test-utils";
import ThreadEditor from "../../../src/components/ThreadEditor";

describe("ThreadEditor", () => {
  const wrapper = mount(ThreadEditor);
  wrapper.vm.$emit = jest.fn();
  test("Shows thread edition form", () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe("save method", () => {
    beforeEach(() => {
      const threadEditionForm = wrapper.find("form");
      threadEditionForm.trigger("submit");
    });
    const saveMethodSpy = jest.spyOn(wrapper.vm, "save");
    test("Is called when form is submit", () => {
      expect(saveMethodSpy).toHaveBeenCalled();
    });
    test("Emits 'save' event", () => {
      expect(wrapper.vm.$emit).toHaveBeenCalledWith("save", {
        text: wrapper.vm.form.text,
        title: wrapper.vm.form.title
      });
    });
  });
  describe("cancel method", () => {
    beforeEach(() => {
      const cancelButton = wrapper.find(".btn-ghost");
      cancelButton.trigger("click");
    });
    const cancelMethodSpy = jest.spyOn(wrapper.vm, "cancel");
    test("Is called when cancel button is clicked", () => {
      expect(cancelMethodSpy).toHaveBeenCalled();
    });
    test("Emits 'cancel' event", () => {
      expect(wrapper.vm.$emit).toHaveBeenCalledWith("cancel");
    });
  });
});
