import { createTree } from "./tree.js";

describe("createTree", () => {
  test("initializes root as null when array is empty", () => {
    const tree = createTree([]);
    expect(tree.root).toBeNull();
  });

  test("removes duplicates and builds a balanced BST", () => {
    const tree = createTree([1, 2, 2, 3, 3, 3]);

    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
  });

  test("builds correct structure for small arrays", () => {
    const tree = createTree([3, 1, 2]);

    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
  });
});

describe("includes", () => {
  test("returns true when value exists", () => {
    const tree = createTree([1, 2, 3]);

    expect(tree.includes(1)).toBe(true);
    expect(tree.includes(2)).toBe(true);
    expect(tree.includes(3)).toBe(true);
  });

  test("returns false when value does not exist", () => {
    const tree = createTree([1, 2, 3]);

    expect(tree.includes(100)).toBe(false);
  });

  test("returns false for empty tree", () => {
    const tree = createTree([]);

    expect(tree.includes(1)).toBe(false);
  });
});

describe("insert", () => {
  test("inserts value into correct position", () => {
    const tree = createTree([1, 3, 5, 7, 9]);

    tree.insert(4);

    expect(tree.root.left.right.data).toBe(4);
  });

  test("does nothing if value already exists", () => {
    const tree = createTree([1, 2, 3]);

    tree.insert(2);

    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
  });

  test("insert into empty tree as root", () => {
    const tree = createTree([]);

    tree.insert(10);

    expect(tree.root.data).toBe(10);
    expect(tree.root.left).toBeNull();
    expect(tree.root.right).toBeNull();
  });
});

describe("deleteItem", () => {
  test("does nothing if value does not exist", () => {
    const tree = createTree([1, 2, 3]);

    tree.deleteItem(10);

    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
  });

  test("deletes a leaf node", () => {
    const tree = createTree([1, 2, 3]);

    tree.deleteItem(1);

    expect(tree.includes(1)).toBe(false);
    expect(tree.root.left).toBeNull();
    expect(tree.root.data).toBe(2);
    expect(tree.root.right.data).toBe(3);
  });

  test("deletes a node with one child", () => {
    const tree = createTree([1, 2, 3, 4]);

    tree.deleteItem(2);

    expect(tree.includes(2)).toBe(false);
    expect(tree.root.left.data).toBe(1);
  });

  test("deletes a node with two children (uses inorder successor)", () => {
    const tree = createTree([1, 2, 3, 4, 5, 6, 7]);

    tree.deleteItem(4);

    expect(tree.includes(4)).toBe(false);
    expect(tree.root.data).toBe(5);
  });

  test("can delete the root until tree becomes empty", () => {
    const tree = createTree([10]);

    tree.deleteItem(10);

    expect(tree.includes(10)).toBe(false);
    expect(tree.root).toBeNull();
  });
});

describe("levelOrderForEach", () => {
  test("traverses tree in level-order (BFS)", () => {
    const tree = createTree([1, 2, 3, 4, 5, 6, 7]);

    const result = [];
    tree.levelOrderForEach((value) => result.push(value));

    expect(result).toEqual([4, 2, 6, 1, 3, 5, 7]);
  });

  test("throws error if callback is not provided", () => {
    const tree = createTree([1, 2, 3]);
    expect(() => tree.levelOrderForEach()).toThrow(Error);
  });

  test("doest nothing on empty tree (but still requires callback)", () => {
    const tree = createTree([]);

    const result = [];
    tree.levelOrderForEach((value) => result.push(value));

    expect(result).toEqual([]);
  });
});

describe("depth-first traversals", () => {
  let tree;

  beforeEach(() => {
    tree = createTree([1, 2, 3, 4, 5, 6, 7]);
    // balanced BST structure
    //           4
    //       2       6
    //     1   3   5   7
  });

  test("inOrderForEach traverses in-order", () => {
    const result = [];
    tree.inOrderForEach((value) => result.push(value));

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("preOrderForEach traverses pre-order", () => {
    const result = [];
    tree.preOrderForEach((value) => result.push(value));

    expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
  });

  test("postOrderForEach traverses post-order", () => {
    const result = [];
    tree.postOrderForEach((value) => result.push(value));

    expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
  });

  test("throws error if callback is missing", () => {
    const tree = createTree([1, 2, 3]);
    expect(() => tree.inOrderForEach()).toThrow(Error);
    expect(() => tree.preOrderForEach()).toThrow(Error);
    expect(() => tree.postOrderForEach()).toThrow(Error);
  });

  test("doest nothing on empty tree (but still requires callback)", () => {
    const tree = createTree([]);

    const result = [];
    tree.inOrderForEach((value) => result.push(value));

    expect(result).toEqual([]);
  });
});

describe("height", () => {
  let tree;

  beforeEach(() => {
    tree = createTree([1, 2, 3, 4, 5, 6, 7]);
    // balanced BST structure
    //           4
    //       2       6
    //     1   3   5   7
  });

  test("returns height of a node", () => {
    expect(tree.height(1)).toBe(0);
    expect(tree.height(3)).toBe(0);

    expect(tree.height(2)).toBe(1);
    expect(tree.height(6)).toBe(1);

    expect(tree.height(4)).toBe(2);
  });

  test("returns undefined if value is not found", () => {
    expect(tree.height(100)).toBeUndefined();
  });
});

describe("depth", () => {
  let tree;

  beforeEach(() => {
    tree = createTree([1, 2, 3, 4, 5, 6, 7]);
    // balanced BST structure
    //           4
    //       2       6
    //     1   3   5   7
  });

  test("returns depth of a node", () => {
    expect(tree.depth(4)).toBe(0);

    expect(tree.depth(2)).toBe(1);
    expect(tree.depth(6)).toBe(1);

    expect(tree.depth(3)).toBe(2);
    expect(tree.depth(7)).toBe(2);
  });

  test("returns undefined if value is not found", () => {
    expect(tree.depth(100)).toBeUndefined();
  });
});

describe("isBalanced", () => {
  test("returns true for a balanced tree", () => {
    const tree = createTree([1, 2, 3, 4, 5, 6, 7]);
    expect(tree.isBalanced()).toBe(true);
  });

  test("returns false for an unbalanced tree", () => {
    const tree = createTree([1, 2, 3, 4, 5, 6, 7]);

    tree.insert(100);
    tree.insert(101);
    tree.insert(102);
    tree.insert(103);

    expect(tree.isBalanced()).toBe(false);
  });

  test("returns true for emptry tree", () => {
    const tree = createTree([]);
    expect(tree.isBalanced()).toBe(true);
  });
});

describe("rebalance", () => {
  test("rebalances an unbalanced tree", () => {
    const tree = createTree([1, 2, 3, 4, 5, 6, 7]);

    tree.insert(100);
    tree.insert(101);
    tree.insert(102);
    tree.insert(103);

    expect(tree.isBalanced()).toBe(false);

    tree.rebalance();

    expect(tree.isBalanced()).toBe(true);

    const values = [];
    tree.inOrderForEach((value) => values.push(value));
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 100, 101, 102, 103]);
  });

  test("rebalance keeps empty tree as empty", () => {
    const tree = createTree([]);
    tree.rebalance();
    expect(tree.root).toBeNull();
    expect(tree.isBalanced()).toBe(true);
  });
});
