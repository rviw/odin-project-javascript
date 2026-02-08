import { mergeSort } from "./mergeSort.js";

describe("mergeSort", () => {
  test("handles emptry array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("handles single element", () => {
    expect(mergeSort([73])).toEqual([73]);
  });

  test("handles already sorted array", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("sorts unsorted array", () => {
    expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  test("sorts random numbers", () => {
    expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
  });
});
