import caesarCipher from "./caesarCipher.js";

describe("caesarCipher", () => {
  test("shifts letters by the given factor", () => {
    expect(caesarCipher("abc", 1)).toBe("bcd");
  });

  test("handles large shift factors", () => {
    expect(caesarCipher("abc", 27)).toBe("bcd");
  });

  test("wraps from z to a", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  test("preserves lettercase", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  });

  test("leaves punctuation and spaces unchanged", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
  });
});
