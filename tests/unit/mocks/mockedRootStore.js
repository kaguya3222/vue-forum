import mockedSourceData from "./mockedSourceData";

export default {
  state: {
    categories: { items: { ...mockedSourceData.categories } },
    forums: { items: { ...mockedSourceData.forums } },
    moderators: { items: { ...mockedSourceData.moderators } },
    posts: { items: { ...mockedSourceData.posts } },
    stats: { items: { ...mockedSourceData.stats } },
    threads: { items: { ...mockedSourceData.threads } },
    users: {
      items: { ...mockedSourceData.users },
      authId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2"
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
};
