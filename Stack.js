// LIFO: last in first out
class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  push(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  pop() {
    if (!this.count) return undefined;

    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  size() {
    return this.count;
  }

  peek() {
    return this.storage[this.count - 1];
  }
}
