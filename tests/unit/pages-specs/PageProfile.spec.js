import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageProfile from "../../../src/pages/PageProfile";
import PostList from "../../../src/components/PostList";
import UserProfileCard from "../../../src/components/UserProfileCard";
import UserProfileCardEditor from "../../../src/components/UserProfileCardEditor";
import usersGetters from "../../../src/store/modules/users/getters";
import postsGetters from "@/store/modules/posts/getters";
import mockedSourceData from "../mocks/mockedSourceData";
import { countObjectProperties } from "../../../src/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PageProfile", () => {
  const store = new Vuex.Store({
    state: { ...mockedSourceData, authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3" },
    getters: {
      ...usersGetters,
      ...postsGetters
    }
  });
  const wrapper = shallowMount(PageProfile, {
    localVue,
    store
  });

  test("Shows user information", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts PostList as a child component", () => {
    expect(wrapper.contains(PostList)).toBe(true);
  });
  test("Accepts UserProfileCard as a child component", () => {
    expect(wrapper.contains(UserProfileCard)).toBe(true);
  });
  test("Accepts UserProfileCardEditor as a child component when 'edit' property is true", () => {
    wrapper.setProps({ edit: true });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(UserProfileCardEditor)).toBe(true);
    });
  });
  test("Accepts vuex authUser getter", () => {
    expect(wrapper.vm.user).toEqual(usersGetters.authUser(store.state));
  });
  test("Creates userPosts array of certain users", () => {
    const post = mockedSourceData.posts["-KsjnAAjzfpznUVh4DSa"];
    const hasPost = wrapper.vm.userPosts.some(
      userPost => userPost[".key"] === post[".key"]
    );
    expect(hasPost).toBe(true);
  });
  test("Correctly shows users posts number", () => {
    expect(wrapper.vm.userPostsCount).toBe(wrapper.vm.userPosts.length);
  });
  test("Correctly shows users threads number", () => {
    const userThreadsNumber = countObjectProperties(wrapper.vm.user.threads);
    expect(wrapper.vm.userThreadsCount).toBe(userThreadsNumber);
  });
});
