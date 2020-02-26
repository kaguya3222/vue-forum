import { shallowMount } from "@vue/test-utils";
import PageCategory from "../../../src/pages/PageCategory";
import CategoryListItem from "../../../src/components/CategoryListItem";
import mockedSourceData from "../mocks/mockedSourceData";

describe("PageCategory", () => {
  const wrapper = shallowMount(PageCategory, {
    propsData: {
      id: mockedSourceData.categories[0][".key"]
    }
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
