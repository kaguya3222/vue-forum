import Vue from "vue";

const makeAppendChildToParentMutation = ({
  parents,
  child,
  parentsModuleName
}) => (state, { childId, parentId, rootState }) => {
  const resource = rootState[parentsModuleName][parents][parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export { makeAppendChildToParentMutation };
