import { makeAppendChildToParentMutation } from "../../../src/store/vuex-helpers";

describe("makeAppendChildToParentMutation", () => {
  test("appends child to parent object in root state module", () => {
    const parents = {
      parentId: {}
    };
    const rootState = {
      parentsModule: {
        parents
      }
    };
    const appendChildToParentMutation = makeAppendChildToParentMutation({
      parents: "parents",
      child: {},
      parentsModuleName: "parentsModule"
    });

    appendChildToParentMutation(
      {},
      { child: "childId", parentId: "parentId", rootState }
    );
    const parentLength = Object.values(parents.parentId).length;
    expect(parentLength > 0).toBe(true);
  });
});
