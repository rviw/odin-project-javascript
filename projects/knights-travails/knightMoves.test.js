import { knightMoves } from "./knightMoves.js";

describe("knightMoves", () => {
  test("start === end returns a path with a single position", () => {
    expect(knightMoves([0, 0], [0, 0])).toEqual([[0, 0]]);
  });

  test("one legal knight move returns a 2-step path", () => {
    expect(knightMoves([0, 0], [1, 2])).toEqual([
      [0, 0],
      [1, 2],
    ]);
  });
});
