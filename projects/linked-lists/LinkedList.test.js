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

describe("LinkedList.at", () => {
  test("returns undefined for an empty list", () => {
    const list = new LinkedList();
    expect(list.at(0)).toBeUndefined();
  });

  test("returns undefined for out-of-bounds index", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    expect(list.at(-1)).toBeUndefined();
    expect(list.at(2)).toBeUndefined();
  });

  test("returns the value at the given index", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");

    expect(list.at(0)).toBe("A");
    expect(list.at(1)).toBe("B");
  });
});

describe("LinkedList.pop", () => {
  test("returns undefined for an empty list", () => {
    const list = new LinkedList();
    expect(list.pop(0)).toBeUndefined();
  });

  test("removes the head node and returns its value", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    const popped = list.pop();

    expect(popped).toBe(1);
    expect(list.head()).toBe(2);
    expect(list.size()).toBe(1);
  });

  test("works when the list has only one node", () => {
    const list = new LinkedList();

    list.append(100);

    const popped = list.pop();

    expect(popped).toBe(100);
    expect(list.head()).toBeUndefined();
    expect(list.size()).toBe(0);
  });
});

describe("LinkedList.contains", () => {
  test("returns false for an empty list", () => {
    const list = new LinkedList();
    expect(list.contains("x")).toBe(false);
  });

  test("returns true when the value exists in the list", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");

    expect(list.contains("A")).toBe(true);
    expect(list.contains("B")).toBe(true);
  });

  test("returns false when the value does not exists in the list", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");

    expect(list.contains("C")).toBe(false);
  });
});

describe("LinkedList.findIndex", () => {
  test("returns -1 for an empty list", () => {
    const list = new LinkedList();
    expect(list.findIndex("x")).toBe(-1);
  });

  test("returns the index of the first matching value", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");

    expect(list.findIndex("A")).toBe(0);
    expect(list.findIndex("B")).toBe(1);
  });

  test("returns -1 when the value is not found", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");

    expect(list.findIndex("C")).toBe(-1);
  });

  test("returns the first index when duplicates exist", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");
    list.append("A");

    expect(list.findIndex("A")).toBe(0);
  });
});

describe("LinkedList.toString", () => {
  test("returns empty string for an empty list", () => {
    const list = new LinkedList();
    expect(list.toString()).toBe("");
  });

  test("returns correct format for a non-empty list", () => {
    const list = new LinkedList();

    list.append("A");
    list.append("B");
    list.append("C");

    expect(list.toString()).toBe("( A ) -> ( B ) -> ( C ) -> null");
  });
});

describe("LinkedList.insertAt", () => {
  test("throws RangeError for out-of-bounds index", () => {
    const list = new LinkedList();
    expect(() => list.insertAt(-1, 1)).toThrow(RangeError);
    expect(() => list.insertAt(1, 1)).toThrow(RangeError);
  });

  test("inserts values at the given index", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);
    list.append(3);

    list.insertAt(1, 10, 11);

    expect(list.toString()).toBe(
      "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
    );
  });

  test("inserts at the head when index is 0", () => {
    const list = new LinkedList();

    list.append(2);
    list.append(3);

    list.insertAt(0, 0, 1);

    expect(list.toString()).toBe("( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null");
  });

  test("inserts at the tail when index equals size", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    list.insertAt(2, 3, 4);

    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
  });
});

describe("LinkedList.removeAt", () => {
  test("throws RangeError for out-of-bounds index", () => {
    const list = new LinkedList();
    expect(() => list.removeAt(0)).toThrow(RangeError);

    list.append(1);
    expect(() => list.removeAt(-1)).toThrow(RangeError);
    expect(() => list.removeAt(1)).toThrow(RangeError);
  });

  test("removes the node at the given index", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);
    list.append(3);

    list.removeAt(1);

    expect(list.toString()).toBe("( 1 ) -> ( 3 ) -> null");
  });

  test("removes the head when index is 0", () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    list.removeAt(0);

    expect(list.toString()).toBe("( 2 ) -> null");
  });
});
