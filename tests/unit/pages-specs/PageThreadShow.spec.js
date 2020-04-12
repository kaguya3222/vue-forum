import { createLocalVue, shallowMount } from "@vue/test-utils";
import PageThreadShow from "../../../src/pages/PageThreadShow";
import PostList from "../../../src/components/PostList";
import PostEditor from "../../../src/components/PostEditor";
import Vuex from "vuex";
import mockedRootStore from "../mocks/mockedRootStore";
import threadsStore from "@/store/modules/threads/store";
import postsStore from "@/store/modules/posts/store";
import usersStore from "@/store/modules/users/store";

const localVue = createLocalVue();
localVue.use(Vuex);

const rootState = mockedRootStore.state;

describe("PageThreadShow", () => {
  const threadActions = {
    fetchThread: jest
      .fn()
      .mockResolvedValue({ userId: "thread creator id", posts: [] })
  };
  const postActions = {
    fetchPosts: jest.fn().mockResolvedValue([{ userId: "post creator id" }])
  };
  const userActions = {
    fetchUser: jest.fn()
  };
  const store = new Vuex.Store({
    modules: {
      threads: {
        namespaced: true,
        state: rootState.threads,
        getters: threadsStore.getters,
        actions: threadActions
      },
      posts: {
        namespaced: true,
        state: rootState.posts,
        getters: postsStore.getters,
        actions: postActions
      },
      users: {
        namespaced: true,
        state: rootState.users,
        getters: usersStore.getters,
        actions: userActions
      }
    }
  });
  const threads = store.state.threads.items;
  const wrapper = shallowMount(PageThreadShow, {
    propsData: {
      threadId: Object.values(threads)[0][".key"]
    },
    stubs: ["app-date", "router-link"],
    localVue,
    store
  });
  test("Calls fetchThread when created", () => {
    expect(threadActions.fetchThread).toHaveBeenCalled();
  });
  test("Calls fetchUser when created", () => {
    expect(userActions.fetchUser).toHaveBeenCalled();
  });
  test("Calls fetchPosts when created", () => {
    expect(postActions.fetchPosts).toHaveBeenCalled();
  });
  test("Shows thread data on thread page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Accepts PostList as a child component", () => {
    expect(wrapper.contains(PostList)).toBe(true);
  });
  test("Accepts PostEditor as a child component", () => {
    expect(wrapper.contains(PostEditor)).toBe(true);
  });
  test("Creates posts array of certain thread", () => {
    const posts = store.state.posts.items;
    const post = Object.values(posts)[0];
    const hasPost = wrapper.vm.threadPosts.some(
      threadPost => threadPost[".key"] === post[".key"]
    );
    expect(hasPost).toBe(true);
  });
});
