import { createHashSet } from "./HashSet.js";

describe("HashSet initialization", () => {
  it("creates an empty set", () => {
    const set = createHashSet();

    expect(set.size()).toBe(0);
    expect(set.values()).toEqual([]);
  });
});
