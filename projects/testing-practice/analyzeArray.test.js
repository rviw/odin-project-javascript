import analyzeArray from "./analyzeArray.js";

describe("analyzeArray", () => {
  test("returns average, min, max, and length of an array", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });
});
