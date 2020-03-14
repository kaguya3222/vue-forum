import { countObjectProperties } from "../../../helpers";

export default {
  authUser: state => state.users[state.authId],
  users: state => state.users,
  countUserPosts: state => id => countObjectProperties(state.users[id].posts),
  countUserThreads: state => id =>
    countObjectProperties(state.users[id].threads)
};
