class EntryNode {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  find(key) {
    let current = this.head;
    while (current) {
      if (current.key === key)
        return { key: current.key, value: current.value };
      current = current.next;
    }
    return null;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new EntryNode(key, value);
      return;
    }

    let current = this.head;
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      if (!current.next) break;
      current = current.next;
    }

    current.next = new EntryNode(key, value);
  }

  remove(key) {
    if (!this.head) return false;

    if (this.head.key === key) {
      this.head = this.head.next;
      return true;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current) {
      if (current.key === key) {
        prev.next = current.next;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  entries() {
    const result = [];

    let current = this.head;
    while (current) {
      result.push([current.key, current.value]);
      current = current.next;
    }

    return result;
  }
}
