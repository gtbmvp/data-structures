class Node {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) current.children[char] = new Node();
      current = current.children[char];
    }
    current.isWordEnd = true;
  }

  contains(word) {
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return current.isWordEnd;
  }

  startWithPrefix(prefix) {
    let current = this.root;

    for (let char of prefix) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return true;
  }

  printAllWords() {
    let words = [];

    const search = function (node, string) {
      if (Object.keys(node.children).length) {
        for (let char in node.children) {
          search(node.children[char], string.concat(char));
        }
        // we checked all children above, now we ask if current node is word end, so now going upwards
        if (node.isWordEnd) {
          words.push(string);
        }
      } else {
        string.length ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length ? words : null;
  }
}
