export default {
  authUser(state) {
    return state.users[state.authId];
  },
  users(state) {
    return state.users;
  }
};
