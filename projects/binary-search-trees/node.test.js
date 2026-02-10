import { createNode } from "./node.js";

describe("createNode", () => {
  test("creates a node with data, left, right", () => {
    const node = createNode(10);

    expect(node).toEqual({
      data: 10,
      left: null,
      right: null,
    });
  });

  test("allow overriding left/right", () => {
    const left = createNode(5);
    const right = createNode(15);

    const node = createNode(10, left, right);

    expect(node.left.data).toBe(5);
    expect(node.right.data).toBe(15);
  });
});
