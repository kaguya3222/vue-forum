import { createLocalVue, shallowMount } from "@vue/test-utils";
import ThreadListItem from "../../../src/components/ThreadListItem";
import mockedSourceData from "../mocks/mockedSourceData";
import Vuex from "vuex";
import userGetters from "@/store/modules/users/getters";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ThreadListItem", () => {
  const store = new Vuex.Store({
    state: { ...mockedSourceData },
    getters: {
      ...userGetters
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
