import { makeAppendChildToParentMutation } from "../../../src/store/vuex-helpers";

describe("makeAppendChildToParentMutation", () => {
  test("appends child to parent object in root state module", () => {
    const parents = {
      items: {
        parentId: {}
      }
    };
    const rootState = {
      parents
    };
    const appendChildToParentMutation = makeAppendChildToParentMutation({
      parents: "parents",
      child: {}
    });

    appendChildToParentMutation(
      {},
      { child: "childId", parentId: "parentId", rootState }
    );
    const parentLength = Object.values(parents.items.parentId).length;
    expect(parentLength > 0).toBe(true);
  });
});
