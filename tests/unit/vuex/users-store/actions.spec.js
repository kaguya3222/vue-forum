import actions from "../../../../src/store/modules/users/actions";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

rootStore.commit = jest.fn();

describe("updateUser", () => {
  const users = mockedRootStore.state.users.items;
  let user;
  beforeEach(() => {
    user = Object.values(users)[0];
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
