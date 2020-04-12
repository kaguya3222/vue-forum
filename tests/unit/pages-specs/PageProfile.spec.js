import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageProfile from "../../../src/pages/PageProfile";
import PostList from "../../../src/components/PostList";
import UserProfileCard from "../../../src/components/UserProfileCard";
import UserProfileCardEditor from "../../../src/components/UserProfileCardEditor";
import usersStore from "@/store/modules/users/store";
import postsStore from "@/store/modules/posts/store";
import mockedRootStore from "../mocks/mockedRootStore";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageProfile", () => {
  const postActions = {
    fetchPosts: jest.fn()
  };
  const store = new Vuex.Store({
    modules: {
      posts: {
        namespaced: true,
        state: rootState.posts,
        getters: postsStore.getters,
        actions: postActions
      },
      users: {
        namespaced: true,
        state: rootState.users,
        getters: usersStore.getters
      }
    }
  });
  store.dispatch = jest.fn();
  const wrapper = shallowMount(PageProfile, {
    localVue,
    store
  });
  test("Dispatches fetchPosts action when user data is loaded", () => {
    expect(store.dispatch).toHaveBeenCalledWith("posts/fetchPosts", {
      ids: expect.any(Array)
    });
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
    expect(wrapper.vm.user).toEqual(
      usersStore.getters.authUser(rootState.users)
    );
  });
  test("Creates userPosts array of certain users", () => {
    const posts = store.state.posts.items;
    const post = posts["-Kvd3TvfJogbWreitADe"];
    const hasPost = wrapper.vm.userPosts.some(
      userPost => userPost[".key"] === post[".key"]
    );
    expect(hasPost).toBe(true);
  });
});
