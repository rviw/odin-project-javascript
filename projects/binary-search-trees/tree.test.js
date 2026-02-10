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
