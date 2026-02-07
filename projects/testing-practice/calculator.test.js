import calculator from "./calculator.js";

describe("calculator", () => {
  test("adds two numbers", () => {
    expect(calculator.add(1, 2)).toBe(3);
  });

  test("subtracts two numbers", () => {
    expect(calculator.subtract(10, 2)).toBe(8);
  });

  test("divides two numbers", () => {
    expect(calculator.divide(6, 2)).toBe(3);
  });

  test("multiplies two numbers", () => {
    expect(calculator.multiply(3, 5)).toBe(15);
  });
});
