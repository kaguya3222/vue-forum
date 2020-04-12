import { shallowMount } from "@vue/test-utils";
import CategoryList from "../../../src/components/CategoryList";
import CategoryListItem from "../../../src/components/CategoryListItem";
import mockedRootStore from "../mocks/mockedRootStore";

describe("CategoryList", () => {
  test("Accepts CategoryListItem as a child component", () => {
    const wrapper = shallowMount(CategoryList, {
      propsData: {
        categories: Object.values(mockedRootStore.state.categories.items)
      }
    });
    expect(wrapper.contains(CategoryListItem)).toBe(true);
  });
});
