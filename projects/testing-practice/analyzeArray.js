export default function analyzeArray(arr) {
  const sum = arr.reduce((total, num) => total + num, 0);

  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}
