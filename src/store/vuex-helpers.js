import Vue from "vue";

const makeAppendChildToParentMutation = ({ parents, child }) => (
  state,
  { childId, parentId, rootState }
) => {
  if (!rootState[parents].items[parentId])
    rootState[parents].items[parentId] = {};
  const resource = rootState[parents].items[parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export { makeAppendChildToParentMutation };
