import { createHashSet } from "./HashSet.js";

describe("HashSet initialization", () => {
  it("creates an empty set", () => {
    const set = createHashSet();

    expect(set.size()).toBe(0);
    expect(set.values()).toEqual([]);
  });
});

describe("HashSet.add", () => {
  it("adds a key to the set", () => {
    const set = createHashSet();

    set.add("a");

    expect(set.size()).toBe(1);
    expect(set.values()).toEqual(["a"]);
  });

  it("does not add duplicate keys", () => {
    const set = createHashSet();

    set.add("a");
    set.add("a");

    expect(set.size()).toBe(1);
    expect(set.values()).toEqual(["a"]);
  });

  it("adds multiple different keys", () => {
    const set = createHashSet();

    set.add("a");
    set.add("b");

    expect(set.size()).toBe(2);
    expect(set.values().sort()).toEqual(["a", "b"].sort());
  });
});
