export function fibs(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 2] + result[i - 1]);
  }

  return result;
}

export function fibsRec() {
  throw new Error("Not Implemented");
}
