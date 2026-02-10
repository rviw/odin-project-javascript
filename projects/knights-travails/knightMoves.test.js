import { knightMoves } from "./knightMoves.js";

const isKnightMove = ([x1, y1], [x2, y2]) => {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
};

const isValidKnightPath = (path) => {
  for (let i = 0; i < path.length - 1; i++) {
    if (!isKnightMove(path[i], path[i + 1])) return false;
  }
  return true;
};

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

  test("[0, 0] -> [3, 3] takes 2 moves", () => {
    const path = knightMoves([0, 0], [3, 3]);

    expect(path[0]).toEqual([0, 0]);
    expect(path.at(-1)).toEqual([3, 3]);
    expect(path.length - 1).toBe(2);
    expect(isValidKnightPath(path)).toBe(true);
  });

  test("[3, 3] -> [0, 0] takes 2 moves", () => {
    const path = knightMoves([3, 3], [0, 0]);

    expect(path[0]).toEqual([3, 3]);
    expect(path.at(-1)).toEqual([0, 0]);
    expect(path.length - 1).toBe(2);
    expect(isValidKnightPath(path)).toBe(true);
  });

  test("[0, 0] -> [7, 7] takes 6 moves", () => {
    const path = knightMoves([0, 0], [7, 7]);

    expect(path[0]).toEqual([0, 0]);
    expect(path.at(-1)).toEqual([7, 7]);
    expect(path.length - 1).toBe(6);
    expect(isValidKnightPath(path)).toBe(true);
  });
});
