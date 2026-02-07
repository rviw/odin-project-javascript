export default function caesarCipher(str, shift) {
  const shiftAmount = shift % 26;

  return str
    .split("")
    .map((char) => {
      if (!/[a-z]/i.test(char)) return char;

      const isUpperCase = char === char.toUpperCase();
      const baseCharCode = isUpperCase ? 65 : 97;
      const charCode = char.charCodeAt(0) - baseCharCode;
      const shiftedCharCode = (charCode + shiftAmount + 26) % 26;

      return String.fromCharCode(shiftedCharCode + baseCharCode);
    })
    .join("");
}
