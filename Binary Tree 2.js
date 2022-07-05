// tree methods calls node's ones -> we can pass no node argument in methods and access nodes children using this keyword
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  insert(data) {
    if (data === this.data) return false;
    if (data > this.data) {
      if (!this.right) {
        this.right = new Node(data);
        return true;
      } else {
        return this.right.insert(data);
      }
    } else {
      if (!this.left) {
        this.left = new Node(data);
        return true;
      } else {
        return this.left.insert(data);
      }
    }
  }

  remove(data) {
    if (data === this.data) {
      if (!this.left && !this.right) return null;
      if (!this.left) return this.right;
      if (!this.right) return this.left;

      let tempNode = this.right;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }
      this.data = tempNode.data;
      this.right = this.right.remove(tempNode.data);
      return this;
    }
    if (data > this.data && this.right) {
      this.right = this.right.remove(data);
      return this;
    }
    if (data < this.data && this.left) {
      this.left = this.left.remove(data);
      return this;
    }
    console.log("data not found");
    return this;
  }

  find(data) {
    if (this.data === data) return this;
    if (data > this.data && this.right) return this.right.find(data);
    if (data < this.data && this.left) return this.left.find(data);
    return false;
  }

  findMinHeight(node) {
    if (node === null) return -1;

    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);

    return left < right ? left + 1 : right + 1;
  }

  findMaxHeight(node) {
    if (node === null) return -1;

    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);

    return left > right ? left + 1 : right + 1;
  }

  inOrder(node, result) {
    node.left && this.inOrder(node.left, result);
    result.push(node.data);
    node.right && this.inOrder(node.right, result);
  }

  preOrder(node, result) {
    result.push(node.data);
    node.left && this.preOrder(node.left, result);
    node.right && this.preOrder(node.right, result);
  }

  postOrder(node, result) {
    node.left && this.postOrder(node.left, result);
    node.right && this.postOrder(node.right, result);
    result.push(node.data);
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    if (data === undefined) return "no data passed";

    if (this.root) {
      return this.root.insert(data);
    } else {
      this.root = new Node(data);
      return this;
    }
  }

  remove(data) {
    if (data === undefined) return "no data passed";

    if (!this.root) return null;

    this.root = this.root.remove(data);
    return this.root;
  }

  find(data) {
    if (data === undefined) return "no data passed";

    if (!this.root) return null;

    return this.root.find(data);
  }

  findMin() {
    if (!this.root) return null;
    let min = this.root;
    while (min.left) {
      min = min.left;
    }
    return min.data;
  }

  findMax() {
    if (!this.root) return null;
    let max = this.root;
    while (max.right) {
      max = max.right;
    }
    return max.data;
  }

  findMinHeight() {
    if (!this.root) return null;

    return this.root.findMinHeight(this.root);
  }

  findMaxHeight() {
    if (!this.root) return null;

    return this.root.findMaxHeight(this.root);
  }

  isBalanced() {
    return this.findMinHeight() + 1 >= this.findMaxHeight();
  }

  inOrder() {
    if (!this.root) return null;
    let result = [];

    this.root.inOrder(this.root, result);
    return result;
  }

  preOrder() {
    if (!this.root) return null;
    let result = [];

    this.root.preOrder(this.root, result);
    return result;
  }

  postOrder() {
    if (!this.root) return null;
    let result = [];

    this.root.postOrder(this.root, result);
    return result;
  }

  levelOrder() {
    if (!this.root) return null;

    let result = [],
      queue = [];

    queue.push(this.root);
    while (queue.length) {
      let node = queue.shift();
      result.push(node.data);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    return result;
  }
}
