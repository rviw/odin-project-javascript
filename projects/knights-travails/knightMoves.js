const BOARD_SIZE = 8;

const isOnBoard = ([x, y]) =>
  Number.isInteger(x) &&
  Number.isInteger(y) &&
  x >= 0 &&
  x < BOARD_SIZE &&
  y >= 0 &&
  y < BOARD_SIZE;

const keyOf = ([x, y]) => `${x},${y}`;
const parseKey = (key) => key.split(",").map(Number);

const getKnightNeighbors = ([x, y]) => {
  const deltas = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const moves = deltas.map(([dx, dy]) => [x + dx, y + dy]);
  return moves.filter(isOnBoard);
};

const buildPath = (parent, endKey) => {
  const path = [];

  let cur = endKey;

  while (cur !== null) {
    path.push(parseKey(cur));
    cur = parent.get(cur) ?? null;
  }

  path.reverse();
  return path;
};

export function knightMoves(start, end) {
  if (!isOnBoard(start) || !isOnBoard(end)) {
    throw new Error("Positions must be on the board: x, y in 0..7");
  }

  const startKey = keyOf(start);
  const endKey = keyOf(end);

  if (startKey === endKey) return [start];

  const queue = [start];
  let head = 0;

  const visited = new Set([startKey]);
  const parent = new Map();
  parent.set(startKey, null);

  while (head < queue.length) {
    const cur = queue[head++];
    const curKey = keyOf(cur);

    for (const next of getKnightNeighbors(cur)) {
      const nextKey = keyOf(next);
      if (visited.has(nextKey)) continue;

      visited.add(nextKey);
      parent.set(nextKey, curKey);

      if (nextKey === endKey) {
        return buildPath(parent, endKey);
      }

      queue.push(next);
    }
  }

  return null; // a knight on a standard 8x8 chess board can move from any square to any other square
}
