import Vue from "vue";

const makeAppendChildToParentMutation = ({ parents, child }) => (
  state,
  { childId, parentId, rootState }
) => {
  const resource = rootState[parents].items[parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export { makeAppendChildToParentMutation };
