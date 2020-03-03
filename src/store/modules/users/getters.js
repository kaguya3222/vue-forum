export default {
  authUser(state) {
    return state.authId ? state.users[state.authId] : {};
  },
  users(state) {
    return state.users;
  }
};
