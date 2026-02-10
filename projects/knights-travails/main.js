import { knightMoves } from "./knightMoves.js";

const run = (start, end) => {
  const path = knightMoves(start, end);
  const moves = path.length - 1;

  console.log(`You made it in ${moves} moves! Here's your path:`);
  path.forEach(([x, y]) => {
    console.log(`[${x},${y}]`);
  });
  console.log("");
};

run([3, 3], [4, 3]);
