import { LinkedList } from "./LinkedList.js";

describe("LinkedList for hashmap collisions", () => {
  test("starts empty", () => {
    const list = new LinkedList();

    expect(list.find("a")).toBeNull();
    expect(list.entries()).toEqual([]);
  });

  test("appends new key/value entries", () => {
    const list = new LinkedList();

    list.append("a", 1);
    list.append("b", 2);

    expect(list.find("a")).toEqual({ key: "a", value: 1 });
    expect(list.find("b")).toEqual({ key: "b", value: 2 });
    expect(list.entries()).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });

  test("updates value when key already exists", () => {
    const list = new LinkedList();

    list.append("a", 1);
    list.append("a", 999);

    expect(list.find("a")).toEqual({ key: "a", value: 999 });
    expect(list.entries()).toEqual([["a", 999]]);
  });

  test("removes entry by key", () => {
    const list = new LinkedList();

    list.append("a", 1);
    list.append("b", 2);

    expect(list.remove("b")).toBe(true);
    expect(list.find("b")).toBeNull();
    expect(list.entries()).toEqual([["a", 1]]);
  });

  test("remove returns false when key not found", () => {
    const list = new LinkedList();

    list.append("a", 1);

    expect(list.remove("b")).toBe(false);
    expect(list.entries()).toEqual([["a", 1]]);
  });
});
