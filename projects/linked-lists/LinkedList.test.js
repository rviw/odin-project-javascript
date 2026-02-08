import { LinkedList } from "./LinkedList.js";

describe("LinkedList.append", () => {
  test("adds a node to an empty list", () => {
    const list = new LinkedList();

    list.append(1);

    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode).toBe(null);
  });

  test("adds a node to the end of a non-empty list", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode.value).toBe(2);
    expect(list.headNode.nextNode.nextNode.value).toBe(3);
    expect(list.headNode.nextNode.nextNode.nextNode).toBe(null);
  });
});
