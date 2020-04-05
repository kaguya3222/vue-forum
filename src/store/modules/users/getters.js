import { countObjectProperties } from "../../../helpers";

export default {
  authUser: state => state.items[state.authId],
  items: state => state.items,
  countUserPosts: state => id => countObjectProperties(state.items[id].posts),
  countUserThreads: state => id =>
    countObjectProperties(state.items[id].threads)
};
