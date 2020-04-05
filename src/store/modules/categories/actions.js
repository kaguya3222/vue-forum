import firebase from "firebase";

export default {
  fetchAllCategories({ state, commit }) {
    return new Promise(resolve => {
      firebase
        .database()
        .ref("categories")
        .once("value", snapshot => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId];
            commit(
              "setItem",
              {
                resource: "categories",
                id: categoryId,
                item: category
              },
              { root: true }
            );
          });
          resolve(Object.values(state.items));
        });
    });
  },
  fetchCategories(context, { ids }) {
    return context.dispatch(
      "fetchItems",
      {
        resource: "categories",
        ids
      },
      { root: true }
    );
  },
  fetchCategory({ dispatch }, { id }) {
    return dispatch(
      "fetchItem",
      { resource: "categories", id },
      { root: true }
    );
  }
};
