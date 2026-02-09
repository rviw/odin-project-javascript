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

describe("HashMap.get", () => {
  test("returns null when key does not exist", () => {
    const map = new HashMap();

    expect(map.get("apple")).toBeNull();
  });

  test("returns value for existing key", () => {
    const map = new HashMap();

    map.set("apple", "red");

    expect(map.get("apple")).toBe("red");
  });

  test("returns updated value after overwrite", () => {
    const map = new HashMap();

    map.set("apple", "red");
    map.set("apple", "green");

    expect(map.get("apple")).toBe("green");
  });

  test("retrieves values correctly from collided bucket", () => {
    const map = new HashMap();

    map.capacity = 1;
    map.buckets = Array(1).fill(null);

    map.set("a", 1);
    map.set("b", 2);

    expect(map.get("a")).toBe(1);
    expect(map.get("b")).toBe(2);
  });
});

describe("HashMap.has", () => {
  test("returns false when key does not exist", () => {
    const map = new HashMap();

    expect(map.has("apple")).toBe(false);
  });

  test("returns true when key exists", () => {
    const map = new HashMap();

    map.set("apple", "red");

    expect(map.has("apple")).toBe(true);
  });

  test("works with collisions", () => {
    const map = new HashMap();

    map.capacity = 1;
    map.buckets = Array(1).fill(null);

    map.set("a", 1);
    map.set("b", 2);

    expect(map.has("a")).toBe(true);
    expect(map.has("b")).toBe(true);
    expect(map.has("c")).toBe(false);
  });
});

describe("HashMap.remove", () => {
  test("returns false when key does not exist", () => {
    const map = new HashMap();

    expect(map.remove("apple")).toBe(false);
    expect(map.length()).toBe(0);
  });

  test("returns existing key and returns true", () => {
    const map = new HashMap();

    map.set("apple", "red");

    expect(map.remove("apple")).toBe(true);
    expect(map.get("apple")).toBeNull();
    expect(map.length()).toBe(0);
  });

  test("removes only the matching key in a collided bucket", () => {
    const map = new HashMap();

    map.capacity = 1;
    map.buckets = Array(1).fill(null);

    map.set("a", 1);
    map.set("b", 2);

    expect(map.remove("a")).toBe(true);
    expect(map.get("a")).toBeNull();
    expect(map.get("b")).toBe(2);
    expect(map.length()).toBe(1);
  });
});

describe("HashMap.clear", () => {
  test("removes all entries and resets length to 0", () => {
    const map = new HashMap();

    map.set("a", 1);
    map.set("b", 2);

    expect(map.length()).toBe(2);

    map.clear();

    expect(map.length()).toBe(0);
    expect(map.get("a")).toBeNull();
    expect(map.get("b")).toBeNull();
  });

  test("keeps capacity the same and resets buckets array length", () => {
    const map = new HashMap();

    map.set("a", 1);
    map.clear();

    expect(map.buckets).toHaveLength(map.capacity);
  });
});
