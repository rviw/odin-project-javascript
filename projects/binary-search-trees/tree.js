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

    levelOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required");
      }

      if (this.root === null) return;

      // Iteration

      const queue = [this.root];

      for (let i = 0; i < queue.length; i += 1) {
        const node = queue[i];
        callback(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      // Recursion

      //   const traverseByLevels = (nodes) => {
      //     if (nodes.length === 0) return;

      //     const nextLevel = [];

      //     for (const node of nodes) {
      //       callback(node.data);
      //       if (node.left) nextLevel.push(node.left);
      //       if (node.right) nextLevel.push(node.right);
      //     }

      //     traverseByLevels(nextLevel);
      //   };

      //   traverseByLevels([this.root]);
    },

    inOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required");
      }

      const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);
        callback(node.data);
        traverse(node.right);
      };

      traverse(this.root);
    },

    preOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required");
      }

      const traverse = (node) => {
        if (node === null) return;
        callback(node.data);
        traverse(node.left);
        traverse(node.right);
      };

      traverse(this.root);
    },

    postOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required");
      }

      const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);
        traverse(node.right);
        callback(node.data);
      };

      traverse(this.root);
    },

    height(value) {
      const findNode = (node, target) => {
        if (node === null) return null;
        if (target === node.data) return node;
        return target < node.data
          ? findNode(node.left, target)
          : findNode(node.right, target);
      };

      const node = findNode(this.root, value);
      if (!node) return undefined;

      const getHeight = (n) => {
        if (n === null) return -1;
        return 1 + Math.max(getHeight(n.left), getHeight(n.right));
      };

      return getHeight(node);
    },

    depth(value) {
      let current = this.root;
      let depth = 0;

      while (current) {
        if (value === current.data) return depth;
        current = value < current.data ? current.left : current.right;
        depth++;
      }

      return undefined;
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
