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

    add(key) {
      map.set(key, true);
    },

    has(key) {
      return map.has(key);
    },

    remove(key) {
      return map.remove(key);
    },
  };
}
