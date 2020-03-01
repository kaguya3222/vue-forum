import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageProfile from "../../../src/pages/PageProfile";
import PostList from "../../../src/components/PostList";
import sourceStore from "../../../src/store/index";
import getters from "../../../src/store/getters";
import mockedSourceData from "../mocks/mockedSourceData";
import { countObjectProperties } from "../../../src/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageProfile", () => {
  const store = new Vuex.Store({
    state: sourceStore.state,
    getters: {
      ...getters
    }
  });
  const wrapper = shallowMount(PageProfile, {
    localVue,
    store
  });
  store.state.authId = "VXjpr2WHa8Ux4Bnggym8QFLdv5C3";

  test("Shows user information", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts PostList as a child component", () => {
    expect(wrapper.contains(PostList)).toBe(true);
  });
  test("Accepts vuex authUser getter", () => {
    expect(wrapper.vm.user).toEqual(getters.authUser(sourceStore.state));
  });
  test("Creates userPosts array of certain user", () => {
    const post = mockedSourceData.posts["-KsjnAAjzfpznUVh4DSa"];
    const hasPost = wrapper.vm.userPosts.some(
      userPost => userPost[".key"] === post[".key"]
    );
    expect(hasPost).toBe(true);
  });
  test("Correctly shows user posts number", () => {
    expect(wrapper.vm.userPostsCount).toBe(wrapper.vm.userPosts.length);
  });
  test("Correctly shows user threads number", () => {
    const userThreadsNumber = countObjectProperties(wrapper.vm.user.threads);
    expect(wrapper.vm.userThreadsCount).toBe(userThreadsNumber);
  });
});
