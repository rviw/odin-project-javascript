import { createTree } from "./tree.js";
import { prettyPrint } from "./prettyPrint.js";

const randomArray = (count, maxExclusive = 100) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * maxExclusive));
  }

  return arr;
};

const collectToString = (traverseFn) => {
  const result = [];
  traverseFn((value) => result.push(value));
  return result.join(" ");
};

const run = () => {
  const arr = randomArray(10, 100);
  const tree = createTree(arr);

  console.log("Initial tree\n");
  prettyPrint(tree.root);
  console.log("Balanced?", tree.isBalanced());

  console.log(
    "\nLevel-order",
    collectToString((cb) => tree.levelOrderForEach(cb)),
  );
  console.log(
    "\nPre-order",
    collectToString((cb) => tree.preOrderForEach(cb)),
  );
  console.log(
    "\nPost-order",
    collectToString((cb) => tree.postOrderForEach(cb)),
  );
  console.log(
    "\nIn-order",
    collectToString((cb) => tree.inOrderForEach(cb)),
  );

  [101, 102, 103, 104, 105].forEach((value) => tree.insert(value));

  console.log("\nAfter inserting >100 (unbalanced)\n");
  prettyPrint(tree.root);
  console.log("Balanced?", tree.isBalanced());

  tree.rebalance();

  console.log("\nAfter rebalance\n");
  prettyPrint(tree.root);
  console.log("Balanced?", tree.isBalanced());

  console.log(
    "\nLevel-order",
    collectToString((cb) => tree.levelOrderForEach(cb)),
  );
  console.log(
    "\nPre-order",
    collectToString((cb) => tree.preOrderForEach(cb)),
  );
  console.log(
    "\nPost-order",
    collectToString((cb) => tree.postOrderForEach(cb)),
  );
  console.log(
    "\nIn-order",
    collectToString((cb) => tree.inOrderForEach(cb)),
  );
};

run();
