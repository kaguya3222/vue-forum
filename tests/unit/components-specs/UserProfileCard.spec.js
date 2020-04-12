import { createLocalVue, mount } from "@vue/test-utils";
import UserProfileCard from "../../../src/components/UserProfileCard";
import mockedRootStore from "../mocks/mockedRootStore";
import usersGetters from "@/store/modules/users/getters";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("UserProfileCard", () => {
  const users = mockedRootStore.state.users.items;
  const user = Object.values(users)[0];
  const store = new Vuex.Store({
    modules: {
      users: {
        namespaced: true,
        state: rootState.users,
        getters: usersGetters
      }
    }
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
