import { shallowMount } from "@vue/test-utils";
import CategoryListItem from "../../../src/components/CategoryListItem";
import ForumList from "../../../src/components/ForumList";
import mockedSourceData from "../mocks/mockedSourceData";

describe("CategoryListItem", () => {
  const wrapper = shallowMount(CategoryListItem, {
    propsData: {
      category: mockedSourceData.categories[0]
    },
    stubs: {
      "router-link": true
    }
  });
  test("Renders category name as a link", () => {
    const routerLinkStub = wrapper.find("router-link-stub");
    expect(routerLinkStub).toMatchSnapshot();
  });
  test("Accepts ForumList as a child component", () => {
    const forumList = wrapper.find(ForumList);
    expect(forumList.name()).toBe("ForumList.vue");
  });
  test("Creates forums array of certain category", () => {
    const forum = mockedSourceData.forums[0];
    const hasForum = wrapper.vm.categoryForums.some(
      categoryForum => categoryForum[".key"] === forum[".key"]
    );
    expect(hasForum).toBe(true);
  });
});
