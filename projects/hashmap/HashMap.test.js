import { HashMap } from "./HashMap.js";

describe("HashMap initialization", () => {
  test("initializes with default capacity and load factor", () => {
    const map = new HashMap();

    expect(map.loadFactor).toBe(0.75);
    expect(map.capacity).toBe(16);
  });

  test("starts with zero stored entries", () => {
    const map = new HashMap();
    expect(map.length()).toBe(0);
  });

  test("creates buckets array with initial capacity", () => {
    const map = new HashMap();
    expect(map.buckets).toHaveLength(16);
  });
});

describe("HashMap.hash", () => {
  test("throws TypeError when key is not a string", () => {
    const map = new HashMap();
    expect(() => map.hash(123)).toThrow(TypeError);
    expect(() => map.hash(null)).toThrow(TypeError);
    expect(() => map.hash({})).toThrow(TypeError);
  });

  test("returns a valid bucket index within capacity", () => {
    const map = new HashMap();

    const index = map.hash("key");

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(map.capacity);
  });

  test("produces the same index for the same key", () => {
    const map = new HashMap();
    expect(map.hash("sample")).toBe(map.hash("sample"));
  });

  test("handles very long keys without returning out-of-range index", () => {
    const map = new HashMap();

    const longKey = "a".repeat(100_000);
    const index = map.hash(longKey);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(map.capacity);
  });
});

describe("HashMap bucket index bounds guard", () => {
  test("throws error when accessing out-of-bounds bucket index", () => {
    const map = new HashMap();

    expect(() => map._assertIndexInBounds(-1)).toThrow(
      "Trying to access index out of bounds",
    );
    expect(() => map._assertIndexInBounds(map.capacity)).toThrow(
      "Trying to access index out of bounds",
    );
  });

  test("does not throw for valid bucket index", () => {
    const map = new HashMap();

    expect(() => map._assertIndexInBounds(0)).not.toThrow();
    expect(() => map._assertIndexInBounds(map.capacity - 1)).not.toThrow();
  });
});

describe("HashMap.set", () => {
  test("stores a key-value pair", () => {
    const map = new HashMap();
    map.set("apple", "red");

    expect(map.length()).toBe(1);
  });

  test("overwrites value if key already exists", () => {
    const map = new HashMap();
    map.set("apple", "red");
    map.set("apple", "green");

    expect(map.length()).toBe(1);
  });

  test("handles collisions by chaining", () => {
    const map = new HashMap();

    map.capacity = 1;
    map.buckets = Array(1).fill(null);

    map.set("a", 1);
    map.set("b", 2);

    expect(map.length()).toBe(2);
  });

  test("throws TypeError when key is not a string", () => {
    const map = new HashMap();

    expect(() => map.set(123, "value")).toThrow(TypeError);
  });
});
