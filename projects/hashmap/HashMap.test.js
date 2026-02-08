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
