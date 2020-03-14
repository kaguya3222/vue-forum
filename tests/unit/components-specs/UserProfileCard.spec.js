import { createLocalVue, mount } from "@vue/test-utils";
import UserProfileCard from "../../../src/components/UserProfileCard";
import mockedSourceData from "../mocks/mockedSourceData";
import usersGetters from "@/store/modules/users/getters";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("UserProfileCard", () => {
  const user = Object.values(mockedSourceData.users)[0];
  const store = new Vuex.Store({
    state: { ...mockedSourceData },
    getters: { ...usersGetters }
  });
  const wrapper = mount(UserProfileCard, {
    propsData: {
      user
    },
    stubs: ["router-link"],
    localVue,
    store
  });
  test("Correctly shows user profile card data", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
