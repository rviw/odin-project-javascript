import reverseString from "./reverseString.js";

test("reverses a string", () => {
  expect(reverseString("test")).toBe("tset");
});

test("handles empty string", () => {
  expect(reverseString("")).toBe("");
});
