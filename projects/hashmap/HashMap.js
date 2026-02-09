import { LinkedList } from "./LinkedList.js";

export class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(capacity).fill(null);
    this._size = 0;
  }

  length() {
    return this._size;
  }

  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("HashMap only supports string keys");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  _assertIndexInBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this._assertIndexInBounds(index);

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }

    const list = this.buckets[index];

    const existing = list.find(key);
    if (existing) {
      list.append(key, value);
      return;
    }

    list.append(key, value);
    this._size++;
  }

  get(key) {
    const index = this.hash(key);
    this._assertIndexInBounds(index);

    const list = this.buckets[index];
    if (!list) return null;

    const entry = list.find(key);
    return entry ? entry.value : null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    this._assertIndexInBounds(index);

    const list = this.buckets[index];
    if (!list) return false;

    const removed = list.remove(key);
    if (!removed) return false;

    this._size--;

    if (list.entries().length === 0) {
      this.buckets[index] = null;
    }

    return true;
  }

  clear() {
    this.buckets = Array(this.capacity).fill(null);
    this._size = 0;
  }
}
