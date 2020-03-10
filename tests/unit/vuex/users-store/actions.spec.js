import actions from "../../../../src/store/modules/users/actions";
import mockedSourceData from "../../mocks/mockedSourceData";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

rootStore.commit = jest.fn();

describe("updateUser", () => {
  let user;
  beforeEach(() => {
    user = Object.values(mockedSourceData.users)[0];
    actions.updateUser(rootStore, user);
  });
  test("commits setUser mutation", () => {
    expect(rootStore.commit).toHaveBeenCalledWith(
      "setUser",
      expect.objectContaining({
        userId: expect.any(String),
        user
      })
    );
  });
});
