import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import PageCategory from "../../../src/pages/PageCategory";
import CategoryListItem from "../../../src/components/CategoryListItem";
import mockedSourceData from "../mocks/mockedSourceData";
import sourceStore from "../../../src/store/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageCategory", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {}
  });
  const wrapper = shallowMount(PageCategory, {
    propsData: {
      id: Object.values(mockedSourceData.categories)[0][".key"]
    },
    localVue,
    store
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
