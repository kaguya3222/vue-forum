import Vue from "vue";

const makeAppendChildToParentMutation = ({
  parents,
  child,
  parentModuleName
}) => (state, { childId, parentId, rootState }) => {
  const resource = rootState[parentModuleName][parents][parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export { makeAppendChildToParentMutation };
