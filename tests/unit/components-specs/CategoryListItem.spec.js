import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import CategoryListItem from "../../../src/components/CategoryListItem";
import ForumList from "../../../src/components/ForumList";
import mockedRootStore from "../mocks/mockedRootStore";
import forumsGetters from "@/store/modules/forums/getters";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("CategoryListItem", () => {
  const store = new Vuex.Store({
    modules: {
      forums: {
        namespaced: true,
        state: rootState.forums,
        getters: forumsGetters
      }
    }
  });
  const categories = mockedRootStore.state.categories.items;
  const wrapper = shallowMount(CategoryListItem, {
    propsData: {
      category: Object.values(categories)[0]
    },
    stubs: {
      "router-link": true
    },
    localVue,
    store
  });
  test("Renders category name as a link", () => {
    const routerLinkStub = wrapper.find("router-link-stub");
    expect(routerLinkStub).toMatchSnapshot();
  });
  test("Accepts ForumList as a child component", () => {
    expect(wrapper.contains(ForumList)).toBe(true);
  });
  test("Creates forums array of certain category", () => {
    const forums = mockedRootStore.state.forums.items;
    const forum = Object.values(forums)[0];
    const hasForum = wrapper.vm.categoryForums.some(
      categoryForum => categoryForum[".key"] === forum[".key"]
    );
    expect(hasForum).toBe(true);
  });
});
