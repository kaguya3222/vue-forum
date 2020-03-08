import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PostListItem from "../../../src/components/PostListItem";
import mockedSourceData from "../mocks/mockedSourceData";
import sourceStore from "../../../src/store/index";
import userGetters from "@/store/modules/users/getters";
import PostEditor from "../../../src/components/PostEditor";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostListItem", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {
      ...userGetters
    }
  });
  const wrapper = shallowMount(PostListItem, {
    propsData: {
      post: mockedSourceData.posts["-KsjWehQ--apjDBwSBCZ"]
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
