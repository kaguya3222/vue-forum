import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageHome from "../../../src/pages/PageHome";
import CategoryList from "../../../src/components/CategoryList";
import mockedRootStore from "../mocks/mockedRootStore";
import categoriesStore from "@/store/modules/categories/store";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageHome", () => {
  const categoryActions = {
    fetchAllCategories: jest.fn().mockResolvedValue([{ forums: [] }])
  };
  const forumActions = {
    fetchForums: jest.fn()
  };
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
        actions: forumActions
      }
    }
  });
  const wrapper = shallowMount(PageHome, {
    localVue,
    store
  });
  test("Calls fetchAllCategories action before create", () => {
    expect(categoryActions.fetchAllCategories).toHaveBeenCalled();
  });
  test("Calls fetchForums actions before create", () => {
    expect(forumActions.fetchForums).toHaveBeenCalled();
  });
  test("Accepts CategoryList as a child component", () => {
    const categoryList = wrapper.find(CategoryList);
    expect(categoryList.name()).toBe("CategoryList.vue");
  });
});
