import capitalize from "./capitalize.js";

test("capitalizes the first character of a string", () => {
  expect(capitalize("test")).toBe("Test");
});
