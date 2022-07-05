class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getHead() {
    return this.head;
  }

  getSize() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  add(data) {
    let node = new Node(data);
    if (!this.head) this.head = node;
    else {
      let currentNode = this.head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.length++;
    return true;
  }

  addAt(index, data) {
    let node = new Node(data),
      currentNode = this.head,
      previousNode,
      currentIndex = 0;

    if (index > this.length || index < 0) return false;
    if (index === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    this.length++;
    return true;
  }

  remove(data) {
    let currentNode = this.head,
      previousNode;

    if (currentNode.data === data) {
      this.head = currentNode.next;
    } else {
      while (currentNode.data !== data) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        if (!currentNode) return false;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
    return currentNode.data;
  }

  removeAt(index) {
    let currentNode = this.head,
      previousNode,
      currentIndex = 0;

    if (index >= this.length || index < 0) return false;
    if (index === 0) {
      this.head = currentNode.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
    return currentNode.data;
  }

  indexOf(data) {
    let currentNode = this.head,
      index = -1;

    while (currentNode) {
      index++;
      if (currentNode.data === data) return index;
      currentNode = currentNode.next;
    }
    return -1;
  }

  elementAt(index) {
    let currentNode = this.head,
      currentIndex = 0;

    if (index >= this.length || index < 0) return null;

    while (currentIndex < index) {
      currentIndex++;
      currentNode = currentNode.next;
    }
    return currentNode.data;
  }
}
