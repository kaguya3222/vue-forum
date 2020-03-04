import { mount } from "@vue/test-utils";
import UserProfileCard from "../../../src/components/UserProfileCard";
import mockedSourceData from "../mocks/mockedSourceData";
import { countObjectProperties } from "../../../src/helpers";

describe("UserProfileCard", () => {
  const user = Object.values(mockedSourceData.users)[0];
  const wrapper = mount(UserProfileCard, {
    propsData: {
      user,
      userPostsCount: countObjectProperties(user.posts),
      userThreadsCount: countObjectProperties(user.threads)
    },
    stubs: ["router-link"]
  });
  test("Correctly shows user profile card data", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
