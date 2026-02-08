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
