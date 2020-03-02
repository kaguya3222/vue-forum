import mutations from "../../../../src/store/modules/users/mutations";
import usersStore from "@/store/modules/users/store";

describe("setUser", () => {
  test("Updates user data", () => {
    const users = Object.values(usersStore.state.users);
    const mutableUserInfo = users[0];
    const newUserInfo = users[1];
    mutations.setUser(usersStore.state, {
      user: { ...newUserInfo },
      userId: mutableUserInfo[".key"]
    });
    const changedUsers = Object.values(usersStore.state.users);
    expect(changedUsers[0]).toEqual(newUserInfo);
  });
});
