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

describe("HashSet.has", () => {
  it("returns false when key is not present", () => {
    const set = createHashSet();

    expect(set.has("x")).toBe(false);
  });

  it("returns true when key is present", () => {
    const set = createHashSet();

    set.add("x");

    expect(set.has("x")).toBe(true);
    expect(set.has("y")).toBe(false);
  });
});

describe("HashSet.remove", () => {
  it("returns false when key does not exist", () => {
    const set = createHashSet();

    expect(set.remove("x")).toBe(false);
    expect(set.size()).toBe(0);
  });

  it("removes an existing key and returns true", () => {
    const set = createHashSet();

    set.add("x");
    set.add("y");

    expect(set.remove("x")).toBe(true);
    expect(set.has("x")).toBe(false);
    expect(set.has("y")).toBe(true);
    expect(set.size()).toBe(1);
  });

  it("can remove the only key in the set", () => {
    const set = createHashSet();

    set.add("x");

    expect(set.remove("x")).toBe(true);
    expect(set.size()).toBe(0);
    expect(set.values()).toEqual([]);
  });
});
