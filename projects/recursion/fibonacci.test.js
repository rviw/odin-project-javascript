import { fibs, fibsRec } from "./fibonacci.js";

describe("fibs (iterative)", () => {
  test("returns empty array for 0", () => {
    expect(fibs(0)).toEqual([]);
  });

  test("returns first fibonacci numbers", () => {
    expect(fibs(1)).toEqual([0]);
    expect(fibs(3)).toEqual([0, 1, 1]);
    expect(fibs(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });
});

describe("fibsRec (recursive)", () => {
  test("returns empty array for 0", () => {
    expect(fibsRec(0)).toEqual([]);
  });

  test("returns first fibonacci numbers", () => {
    expect(fibsRec(1)).toEqual([0]);
    expect(fibsRec(3)).toEqual([0, 1, 1]);
    expect(fibsRec(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });
});
