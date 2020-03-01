export default {
  authUser(state) {
    return state.users[state.authId];
  }
};
