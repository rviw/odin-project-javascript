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
