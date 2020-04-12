import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PostListItem from "../../../src/components/PostListItem";
import usersGetters from "@/store/modules/users/getters";
import PostEditor from "../../../src/components/PostEditor";
import mockedRootStore from "../mocks/mockedRootStore";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PostListItem", () => {
  const store = new Vuex.Store({
    modules: {
      users: {
        namespaced: true,
        state: rootState.users,
        getters: usersGetters
      }
    }
  });
  const posts = mockedRootStore.state.posts.items;
  const wrapper = shallowMount(PostListItem, {
    propsData: {
      post: posts["-KsjWehQ--apjDBwSBCZ"]
    },
    stubs: {
      "app-date": true
    },
    localVue,
    store
  });
  test("Shows post data in posts list", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts PostEditor as a child component if 'editing' data property is true", () => {
    wrapper.setData({ editing: true });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(PostEditor)).toBe(true);
    });
  });
});
