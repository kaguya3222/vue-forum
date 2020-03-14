import { mount, createLocalVue } from "@vue/test-utils";
import UserProfileCardEditor from "../../../src/components/UserProfileCardEditor";
import mockedSourceData from "../mocks/mockedSourceData";
import usersGetters from "@/store/modules/users/getters";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("UserProfileCardEditor", () => {
  const store = new Vuex.Store({
    state: { ...mockedSourceData },
    getters: { ...usersGetters }
  });
  const $router = {
    push: jest.fn()
  };
  const user = Object.values(mockedSourceData.users)[0];
  const wrapper = mount(UserProfileCardEditor, {
    propsData: {
      user
    },
    mocks: {
      $router
    },
    localVue,
    store
  });
  wrapper.vm.$store.dispatch = jest.fn();
  test("Correctly shows form for editing user data", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Calls 'save' method when 'Edit' button is clicked", () => {
    const saveMethodSpy = jest.spyOn(wrapper.vm, "save");
    const editButton = wrapper.find(".btn-blue");
    editButton.trigger("click");
    expect(saveMethodSpy).toHaveBeenCalled();
  });
  test("Calls 'cancel' method when 'Cancel' button is clicked", () => {
    const cancelMethodSpy = jest.spyOn(wrapper.vm, "cancel");
    const cancelButton = wrapper.find(".btn-ghost");
    cancelButton.trigger("click");
    expect(cancelMethodSpy).toHaveBeenCalled();
  });
  describe("'save' method", () => {
    beforeEach(() => {
      const editButton = wrapper.find(".btn-blue");
      editButton.trigger("click");
    });
    test("dispatches 'updateUser' action", () => {
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
        "updateUser",
        expect.any(Object)
      );
    });
    test("Moves user to 'Profile' route", () => {
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "Profile" });
    });
  });
  describe("'cancel' method", () => {
    test("Moves user to 'Profile' route", () => {
      const cancelButton = wrapper.find(".btn-ghost");
      cancelButton.trigger("click");
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "Profile" });
    });
  });
});
