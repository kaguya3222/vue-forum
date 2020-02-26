import { shallowMount } from "@vue/test-utils";
import CategoryList from "../../../src/components/CategoryList";
import CategoryListItem from "../../../src/components/CategoryListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("CategoryList", () => {
  test("Accepts CategoryListItem as a child component", () => {
    const wrapper = shallowMount(CategoryList, {
      propsData: {
        categories: mockedSourceData.categories
      }
    });
    const categoryListItem = wrapper.find(CategoryListItem);
    expect(categoryListItem.name()).toBe("CategoryListItem.vue");
  });
});
