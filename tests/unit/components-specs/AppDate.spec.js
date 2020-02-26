import { mount } from "@vue/test-utils";
import AppDate from "../../../src/components/AppDate";

describe("AppDate", () => {
  test("Shows date in right format", () => {
    const wrapper = mount(AppDate, {
      propsData: {
        unixDate: 1582302580890
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
