import { createLocalVue, shallowMount } from "@vue/test-utils";
import ThreadListItem from "../../../src/components/ThreadListItem";
import mockedSourceData from "../mocks/mockedSourceData";
import Vuex from "vuex";
import usersGetters from "@/store/modules/users/getters";
import threadGetters from "@/store/modules/threads/getters";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ThreadListItem", () => {
  const store = new Vuex.Store({
    state: { ...mockedSourceData },
    getters: {
      ...usersGetters,
      ...threadGetters
    }
  });
  const wrapper = shallowMount(ThreadListItem, {
    propsData: {
      thread: Object.values(mockedSourceData.threads)[0]
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
