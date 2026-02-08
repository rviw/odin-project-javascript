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

describe("LinkedList.prepend", () => {
  test("adds a node to the start of an empty list", () => {
    const list = new LinkedList();

    list.prepend(1);

    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode).toBe(null);
  });

  test("adds a node to the start of a non-empty list", () => {
    const list = new LinkedList();

    list.append(2);
    list.append(3);
    list.prepend(1);

    expect(list.headNode.value).toBe(1);
    expect(list.headNode.nextNode.value).toBe(2);
    expect(list.headNode.nextNode.nextNode.value).toBe(3);
  });
});

describe("LinkedList.size", () => {
  test("returns 0 for an empty list", () => {
    const list = new LinkedList();
    expect(list.size()).toBe(0);
  });

  test("returns correct size after append and prepend", () => {
    const list = new LinkedList();

    list.append(2);
    list.append(3);
    list.prepend(1);

    expect(list.size()).toBe(3);
  });
});

describe("LinkedList.head", () => {
  test("returns undefined for an empty list", () => {
    const list = new LinkedList();
    expect(list.head()).toBeUndefined();
  });

  test("returns the value of the first node", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    expect(list.head()).toBe(1);
  });
});

describe("LinkedList.tail", () => {
  test("returns undefined for an empty list", () => {
    const list = new LinkedList();
    expect(list.tail()).toBeUndefined();
  });

  test("returns the value of the last node", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    expect(list.tail()).toBe(2);
  });
});
