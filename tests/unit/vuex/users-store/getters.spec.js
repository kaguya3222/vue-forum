import getters from "../../../../src/store/modules/users/getters";
import mockedRootStore from "../../mocks/mockedRootStore";

describe("authUser", () => {
  test("returns user object with given authorization id", () => {
    const user = {
      avatar: "https://avatars3.githubusercontent.com/u/2327556?v=4&s=460",
      email: "chrisvfritz@gmail.com",
      lastVisitAt: 1504772078,
      name: "Chris Fritz",
      registeredAt: 1504632260,
      username: "chrisvfritz",
      usernameLower: "chrisvfritz",
      ".key": "38St7Q8Zi2N1SPa5ahzssq9kbyp1"
    };
    mockedRootStore.state.forumUsers.authId = user[".key"];
    mockedRootStore.state.forumUsers.users[
      "38St7Q8Zi2N1SPa5ahzssq9kbyp1"
    ] = user;
    const authUser = getters.authUser(mockedRootStore.state.forumUsers);
    expect(authUser).toEqual(user);
  });
});
