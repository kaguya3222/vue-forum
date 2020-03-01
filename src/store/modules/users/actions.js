export default {
  updateUser({ commit }, user) {
    commit("setUser", { userId: user[".key"], user });
  }
};
