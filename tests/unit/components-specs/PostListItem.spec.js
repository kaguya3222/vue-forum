import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PostListItem from "../../../src/components/PostListItem";
import mockedSourceData from "../mocks/mockedSourceData";
import sourceStore from "../../../src/store/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostListItem", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {}
  });
  test("Shows post data in posts list", () => {
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
    expect(wrapper).toMatchSnapshot();
  });
});
