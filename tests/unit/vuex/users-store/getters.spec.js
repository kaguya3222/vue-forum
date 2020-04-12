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
    mockedRootStore.state.users.authId = user[".key"];
    mockedRootStore.state.users.items["38St7Q8Zi2N1SPa5ahzssq9kbyp1"] = user;
    const authUser = getters.authUser(mockedRootStore.state.users);
    expect(authUser).toEqual(user);
  });
});

describe("userPosts", () => {
  test("returns user posts array", () => {
    const usersModuleState = mockedRootStore.state.users;
    const users = usersModuleState.items;
    const rootState = mockedRootStore.state;
    const userPosts = getters.userPosts(usersModuleState, {}, rootState);
    const userId = "7uVPJS9GHoftN58Z2MXCYDqmNAh2";

    expect(userPosts(userId).length).toBe(
      Object.values(users[userId].posts).length
    );
  });
});

describe("'count' getters", () => {
  const userId = "7uVPJS9GHoftN58Z2MXCYDqmNAh2";
  const user = mockedRootStore.state.users.items[userId];

  describe("countUserPosts", () => {
    test("counts user posts", () => {
      const countUserPosts = getters.countUserPosts(
        mockedRootStore.state.users
      );
      expect(countUserPosts("7uVPJS9GHoftN58Z2MXCYDqmNAh2")).toBe(
        Object.values(user.posts).length
      );
    });
  });

  describe("countUserThreads", () => {
    test("counts user threads", () => {
      const countUserThreads = getters.countUserThreads(
        mockedRootStore.state.users
      );
      expect(countUserThreads("7uVPJS9GHoftN58Z2MXCYDqmNAh2")).toBe(
        Object.values(user.threads).length
      );
    });
  });
});
