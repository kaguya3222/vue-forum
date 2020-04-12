import firebase from "firebase";

export default {
  fetchItems({ dispatch }, { ids, resource }) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids);
    return Promise.all(ids.map(id => dispatch("fetchItem", { id, resource })));
  },
  fetchItem({ state, commit }, { id, resource }) {
    return new Promise(resolve => {
      firebase
        .database()
        .ref(resource)
        .child(id)
        .once("value", () => {})
        .then(snapshot => {
          commit("setItem", {
            resource,
            id: snapshot.key,
            item: snapshot.val()
          });
          resolve(state[resource].items[id]);
        });
    });
  }
};
