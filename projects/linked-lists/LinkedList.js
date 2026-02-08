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
}
