import mutations from "../../../../src/store/modules/users/mutations";
import mockedRootStore from "../../mocks/mockedRootStore";

describe("setUser", () => {
  test("Updates user data", () => {
    const users = Object.values(mockedRootStore.state.users.items);
    const mutableUserInfo = users[0];
    const newUserInfo = users[1];
    mutations.setUser(mockedRootStore.state.users, {
      user: { ...newUserInfo },
      userId: mutableUserInfo[".key"]
    });
    const changedUsers = Object.values(mockedRootStore.state.users.items);
    expect(changedUsers[0]).toEqual(newUserInfo);
  });
});
