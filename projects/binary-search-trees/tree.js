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

    insert(value) {
      if (this.root === null) {
        this.root = createNode(value);
        return;
      }

      let current = this.root;

      while (true) {
        if (value === current.data) {
          return;
        }

        if (value < current.data) {
          if (current.left === null) {
            current.left = createNode(value);
            return;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = createNode(value);
            return;
          }
          current = current.right;
        }
      }
    },

    deleteItem(value) {
      const findMinNode = (node) => {
        let current = node;
        while (current && current.left) current = current.left;
        return current;
      };

      const deleteRec = (node, target) => {
        if (node === null) return null;

        if (target < node.data) {
          node.left = deleteRec(node.left, target);
          return node;
        }

        if (target > node.data) {
          node.right = deleteRec(node.right, target);
          return node;
        }

        if (node.left === null && node.right === null) return null;

        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const successor = findMinNode(node.right);
        node.data = successor.data;
        node.right = deleteRec(node.right, successor.data);
        return node;
      };

      this.root = deleteRec(this.root, value);
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
