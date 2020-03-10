import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import CategoryListItem from "../../../src/components/CategoryListItem";
import ForumList from "../../../src/components/ForumList";
import mockedSourceData from "../mocks/mockedSourceData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CategoryListItem", () => {
  const store = new Vuex.Store({
    state: { ...mockedSourceData },
    getters: {}
  });
  const wrapper = shallowMount(CategoryListItem, {
    propsData: {
      category: Object.values(mockedSourceData.categories)[0]
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
    const forum = Object.values(mockedSourceData.forums)[0];
    const hasForum = wrapper.vm.categoryForums.some(
      categoryForum => categoryForum[".key"] === forum[".key"]
    );
    expect(hasForum).toBe(true);
  });
});
