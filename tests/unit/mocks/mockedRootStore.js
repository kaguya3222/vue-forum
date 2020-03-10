import mockedSourceData from "./mockedSourceData";

export default {
  state: {
    forumCategories: { categories: { ...mockedSourceData.categories } },
    forumForums: { forums: { ...mockedSourceData.forums } },
    forumModerators: { moderators: { ...mockedSourceData.moderators } },
    forumPosts: { posts: { ...mockedSourceData.posts } },
    forumStats: { stats: { ...mockedSourceData.stats } },
    forumThreads: { threads: { ...mockedSourceData.threads } },
    forumUsers: {
      users: { ...mockedSourceData.users },
      authId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2"
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
};
