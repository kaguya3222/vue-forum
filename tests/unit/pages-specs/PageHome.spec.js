import { shallowMount } from "@vue/test-utils";
import PageHome from "../../../src/pages/PageHome";
import CategoryList from "../../../src/components/CategoryList";

describe("PageHome", () => {
  const wrapper = shallowMount(PageHome);
  test("Accepts CategoryList as a child component", () => {
    const categoryList = wrapper.find(CategoryList);
    expect(categoryList.name()).toBe("CategoryList.vue");
  });

  test("Accepts categories object from source data and converts it to Array", () => {
    expect(wrapper.vm.categories).toEqual(expect.any(Array));
  });
});
