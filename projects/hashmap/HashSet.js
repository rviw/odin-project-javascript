import { HashMap } from "./HashMap.js";

export function createHashSet() {
  const map = new HashMap();

  return {
    size() {
      return map.length();
    },

    values() {
      return map.keys();
    },
  };
}
