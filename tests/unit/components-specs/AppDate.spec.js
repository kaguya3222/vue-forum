import { mount } from "@vue/test-utils";
import AppDate from "../../../src/components/AppDate";

describe("AppDate", () => {
  test("Shows date in right format", () => {
    const wrapper = mount(AppDate, {
      propsData: {
        unixDate: 1586624478
      }
    });
    const dateTitle = wrapper.find("span").element.innerHTML;
    expect(dateTitle.trim() !== "Invalid date").toBe(true);
  });
});
