import { createNode } from "./node.js";

const sortUnique = (array) => {
  return Array.from(new Set(array)).sort((a, b) => a - b);
};

const buildTree = (sortedUniqueArray) => {
  if (sortedUniqueArray.length === 0) return null;

  const mid = Math.floor(sortedUniqueArray.length / 2);
  const root = createNode(sortedUniqueArray[mid]);

  root.left = buildTree(sortedUniqueArray.slice(0, mid));
  root.right = buildTree(sortedUniqueArray.slice(mid + 1));

  return root;
};

export const createTree = (array = []) => {
  const values = sortUnique(array);

  const tree = {
    root: buildTree(values),

    includes(value) {
      let current = this.root;

      while (current) {
        if (value === current.data) return true;
        current = value < current.data ? current.left : current.right;
      }

      return false;
    },
  };

  return tree;
};

// const prettyPrint = (node, prefix = "", isLeft = true) => {
//   if (node === null || node === undefined) {
//     return;
//   }

//   prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//   prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
// };

// const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(tree.root);
