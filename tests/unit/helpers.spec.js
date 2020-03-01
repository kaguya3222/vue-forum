import { countObjectProperties } from "../../src/helpers";

describe("countObjectProperties", () => {
  test("Counts properties of given object", () => {
    const testObject = {
      a: 1,
      b: 2,
      c: 3
    };
    const objectPropertiesLength = countObjectProperties(testObject);
    expect(objectPropertiesLength).toBe(3);
  });
});
