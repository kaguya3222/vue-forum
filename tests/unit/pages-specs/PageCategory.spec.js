import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import PageCategory from "../../../src/pages/PageCategory";
import CategoryListItem from "../../../src/components/CategoryListItem";
import mockedRootStore from "../mocks/mockedRootStore";
import categoriesStore from "@/store/modules/categories/store";
import forumsStore from "@/store/modules/forums/store";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageCategory", () => {
  const categoryActions = {
    fetchCategory: jest.fn().mockResolvedValue([])
  };
  const forumActions = { fetchForums: jest.fn() };
  const store = new Vuex.Store({
    modules: {
      categories: {
        namespaced: true,
        state: rootState.categories,
        getters: categoriesStore.getters,
        actions: categoryActions
      },
      forums: {
        namespaced: true,
        state: rootState.forums,
        getters: forumsStore.getters,
        actions: forumActions
      }
    }
  });
  const categories = store.state.categories.items;
  const wrapper = shallowMount(PageCategory, {
    propsData: {
      id: Object.values(categories)[0][".key"]
    },
    localVue,
    store
  });
  test("Calls fetchCategory action when created", () => {
    expect(categoryActions.fetchCategory).toHaveBeenCalled();
  });
  test("Calls fetchForums action when created", () => {
    expect(forumActions.fetchForums).toHaveBeenCalled();
  });
  test("Shows category data on category page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts CategoryListItem as a child component", () => {
    expect(wrapper.contains(CategoryListItem)).toBe(true);
  });
  test("Takes category object from source data with given id", () => {
    expect(wrapper.vm.category[".key"]).toBe(wrapper.vm.id);
  });
});
