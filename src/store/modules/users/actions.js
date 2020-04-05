export default {
  fetchUsers(context, { ids }) {
    return context.dispatch(
      "fetchItems",
      {
        resource: "users",
        ids
      },
      { root: true }
    );
  },
  fetchUser({ dispatch }, { id }) {
    return dispatch("fetchItem", { resource: "users", id }, { root: true });
  },
  updateUser({ commit }, user) {
    commit("setUser", { userId: user[".key"], user });
  }
};
