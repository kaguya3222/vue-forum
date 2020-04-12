import { createLocalVue, shallowMount } from "@vue/test-utils";
import ThreadListItem from "../../../src/components/ThreadListItem";
import Vuex from "vuex";
import usersGetters from "@/store/modules/users/getters";
import threadsGetters from "@/store/modules/threads/getters";
import mockedRootStore from "../mocks/mockedRootStore";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("ThreadListItem", () => {
  const store = new Vuex.Store({
    modules: {
      users: {
        namespaced: true,
        state: rootState.users,
        getters: { ...usersGetters }
      },
      threads: {
        namespaced: true,
        state: { ...rootState.threads },
        getters: { ...threadsGetters }
      }
    }
  });
  const threads = mockedRootStore.state.threads.items;
  const wrapper = shallowMount(ThreadListItem, {
    propsData: {
      thread: Object.values(threads)[0]
    },
    stubs: {
      "app-date": true,
      "router-link": true
    },
    localVue,
    store
  });
  test("Shows thread data in threads list", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
