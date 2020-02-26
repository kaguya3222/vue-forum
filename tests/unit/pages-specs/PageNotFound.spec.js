import { mount } from "@vue/test-utils";
import PageNotFound from "../../../src/pages/PageNotFound";

describe("PageNotFound", () => {
  const wrapper = mount(PageNotFound, {
    stubs: {
      "router-link": true
    }
  });
  test("Shows not found error and instructions", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Shows 'Back to home' title as a link", () => {
    const backToHomeLink = wrapper.find("router-link-stub");
    expect(backToHomeLink.element.textContent).toBe("Back to Home Page");
  });
});
