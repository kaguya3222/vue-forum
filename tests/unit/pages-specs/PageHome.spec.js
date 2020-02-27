import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageHome from "../../../src/pages/PageHome";
import CategoryList from "../../../src/components/CategoryList";
import sourceStore from "../../../src/store/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageHome", () => {
  const store = new Vuex.Store(sourceStore);
  const wrapper = shallowMount(PageHome, {
    localVue,
    store
  });
  test("Accepts CategoryList as a child component", () => {
    const categoryList = wrapper.find(CategoryList);
    expect(categoryList.name()).toBe("CategoryList.vue");
  });

  test("Accepts categories object from source data and converts it to Array", () => {
    expect(wrapper.vm.categories).toEqual(expect.any(Array));
  });
});
