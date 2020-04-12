import rootActions from "@/store/actions";
import mockedRootStore from "../mocks/mockedRootStore";
import { mockFirebase } from "../mocks/firebase";

const rootStore = { ...mockedRootStore };
rootStore.dispatch = jest.fn();
rootStore.commit = jest.fn();

mockFirebase();

describe("fetchItems", () => {
  beforeEach(() => {
    rootActions.fetchItems(
      { dispatch: rootStore.dispatch },
      { ids: ["firstId", "secondId"], resource: "firebase resource ref" }
    );
  });
  test("Dispatches fetchItem action", () => {
    expect(rootStore.dispatch).toHaveBeenCalledWith("fetchItem", {
      id: expect.any(String),
      resource: "firebase resource ref"
    });
  });
});

describe("fetchItem", () => {
  beforeEach(() => {
    rootActions.fetchItem(
      { state: rootStore.state, commit: rootStore.commit },
      { id: "resource item id", resource: "posts" }
    );
  });
  test("Commits setItem mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith("setItem", {
      resource: "posts",
      id: expect.any(String),
      item: expect.any(Object)
    });
  });
});
