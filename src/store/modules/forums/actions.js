export default {
  fetchForums(context, { ids }) {
    return context.dispatch(
      "fetchItems",
      { resource: "forums", ids },
      { root: true }
    );
  },
  fetchForum({ dispatch }, { id }) {
    return dispatch("fetchItem", { resource: "forums", id }, { root: true });
  }
};
