class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    if (this.root === null) {
      this.root = new Node(data);
      return;
    }
    function searchTree(node) {
      if (data === node.data) return false; // data already exists
      if (data > node.data) {
        if (node.right === null) {
          node.right = new Node(data);
          return true;
        } else return searchTree(node.right);
      } else {
        if (node.left === null) {
          node.left = new Node(data);
          return true;
        } else return searchTree(node.left);
      }
    }
    return searchTree(this.root);
  }

  //add2 is add without inner func
  add2(data, node = this.root) {
    if (this.root === null) {
      this.root = new Node(data);
      return;
    }
    if (data === node.data) return false;
    if (data > node.data) {
      if (node.right === null) {
        node.right = new Node(data);
        return true;
      } else return this.add(data, node.right);
    } else {
      if (node.left === null) {
        node.left = new Node(data);
        return true;
      } else return this.add(data, node.left);
    }
  }

  findMin() {
    if (this.root === null) return null;

    let min = this.root;
    while (min.left !== null) {
      min = min.left;
    }
    return min.data;
  }

  findMax() {
    if (this.root === null) return null;

    let max = this.root;
    while (max.right !== null) {
      max = max.right;
    }
    return max.data;
  }

  find(data) {
    if (this.root === null) return null;

    let current = this.root;
    while (current !== null) {
      if (current.data === data) return current;
      if (current.data > data) current = current.left;
      else current = current.right;
    }
    return null;
  }

  isPresent(data) {
    if (this.root === null) return null;

    let current = this.root;
    while (current !== null) {
      if (current.data === data) return true;
      if (current.data > data) current = current.left;
      else current = current.right;
    }
    return false;
  }

  remove(data) {
    function removeNode(node, data) {
      if (node === null) return null;
      if (node.data === data) {
        if (node.left === null && node.right === null) return null; // no children
        if (node.left === null) return node.right; // right child takes place of its parent
        if (node.right === null) return node.left; // left child takes place of its parent

        // both children exist
        let tempNode = node.right;

        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data; //take data from most left descendant of right child and overwrite parents data
        node.right = removeNode(node.right, tempNode.data); //delete the most left descendant of right child;
        return node;
      }
      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        node.left = removeNode(node.left, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }

  //remove2 is remove without inner func
  remove2(data, node = this.root) {
    if (node === null) return null;
    if (node.data === data) {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      }
      if (node.right === null) {
        node = node.left;
        return node;
      }

      let tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      node.data = tempNode.data;
      node.right = this.remove(tempNode.data, node.right);
      return node;
    }
    if (data > node.data) {
      node.right = this.remove(data, node.right);
      return node;
    } else {
      node.left = this.remove(data, node.left);
      return node;
    }
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  findMinHeight(node = this.root) {
    if (node === null) return -1;
    let left = this.findMinHeight(node.left); // height of left subtree
    let right = this.findMinHeight(node.right); // height of right subtree

    return left < right ? left + 1 : right + 1; // sum of subtree height and distance to its parent (1)
  }

  findMaxHeight(node = this.root) {
    if (node === null) return -1;
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);

    return left > right ? left + 1 : right + 1;
  }

  inOrder() {
    if (this.root === null) return null;

    let result = [];
    function traverse(node) {
      node.left && traverse(node.left);
      result.push(node.data);
      node.right && traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  preOrder() {
    if (this.root === null) return null;

    let result = [];
    function traverse(node) {
      result.push(node.data);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  postOrder() {
    if (this.root === null) return null;

    let result = [];
    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      result.push(node.data);
    }
    traverse(this.root);
    return result;
  }

  levelOrder() {
    if (this.root === null) return null;

    let result = [],
      queue = [];

    queue.push(this.root);
    while (queue.length) {
      let node = queue.shift();
      result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    return result;
  }
}
