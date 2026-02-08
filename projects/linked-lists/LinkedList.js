import { Node } from "./Node.js";

export class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }

    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }

  size() {
    let count = 0;
    let current = this.headNode;

    while (current) {
      count += 1;
      current = current.nextNode;
    }

    return count;
  }

  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  tail() {
    if (!this.headNode) return undefined;

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }

    return current.value;
  }

  at(index) {
    if (index < 0) return undefined;

    let current = this.headNode;
    let currentIndex = 0;

    while (current) {
      if (currentIndex === index) {
        return current.value;
      }

      current = current.nextNode;
      currentIndex++;
    }

    return undefined;
  }

  pop() {
    if (!this.headNode) return undefined;

    const value = this.headNode.value;
    this.headNode = this.headNode.nextNode;

    return value;
  }

  contains(value) {
    let current = this.headNode;

    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }

  findIndex(value) {
    let current = this.headNode;
    let index = 0;

    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }

    return -1;
  }

  toString() {
    if (!this.headNode) return "";

    let parts = [];
    let current = this.headNode;

    while (current) {
      parts.push(`( ${current.value} )`);
      current = current.nextNode;
    }

    return `${parts.join(" -> ")} -> null`;
  }

  insertAt(index, ...values) {
    const size = this.size();
    if (index < 0 || index > size) {
      throw new RangeError("Index out of bounds");
    }
    if (values.length === 0) return;

    if (index === 0) {
      let next = this.headNode;
      for (let i = values.length - 1; i >= 0; i--) {
        next = new Node(values[i], next);
      }
      this.headNode = next;
      return;
    }

    let prev = this.headNode;
    let i = 0;
    while (i < index - 1) {
      prev = prev.nextNode;
      i++;
    }

    let tail = prev.nextNode;

    for (let j = 0; j < values.length; j++) {
      const node = new Node(values[j]);
      prev.nextNode = node;
      prev = node;
    }

    prev.nextNode = tail;
  }

  removeAt(index) {
    const size = this.size();
    if (index < 0 || index >= size) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }

    let prev = this.headNode;
    let i = 0;
    while (i < index - 1) {
      prev = prev.nextNode;
      i++;
    }

    prev.nextNode = prev.nextNode.nextNode;
  }
}
