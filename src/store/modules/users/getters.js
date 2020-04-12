import { countObjectProperties } from "../../../helpers";

export default {
  authUser: state => state.items[state.authId],
  userPosts: (state, getters, rootState) => id => {
    const user = state.items[id];
    return user.posts
      ? Object.values(rootState.posts.items).filter(post => post.userId === id)
      : [];
  },
  items: state => state.items,
  countUserPosts: state => id => countObjectProperties(state.items[id].posts),
  countUserThreads: state => id =>
    countObjectProperties(state.items[id].threads)
};
