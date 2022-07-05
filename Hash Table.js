function hash(string, limit) {
  let hash = 0;

  string.split("").forEach((char) => (hash += char.charCodeAt()));

  return hash % limit;
}

class HashTable {
  constructor() {
    this.storage = [];
    this.storageLimit = 10;
  }

  print() {
    console.log(this.storage);
  }

  add(key, value) {
    let index = hash(key, this.storageLimit);
    let inserted = false;

    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
      inserted = true;
    } else {
      this.storage[index].forEach((elem) => {
        if (elem[0] === key) {
          elem[1] = value;
          inserted = true;
        }
      });
      if (inserted === false) {
        this.storage[index].push([key, value]);
        inserted = true;
      }
    }
    return inserted;
  }

  remove(key) {
    let index = hash(key, this.storageLimit);
    let removed = false;

    if (this.storage[index] === undefined) return removed;

    this.storage[index] = this.storage[index].filter((elem) => {
      if (elem[0] === key) removed = true;
      return elem[0] !== key;
    });

    return removed;
  }

  lookup(key) {
    let index = hash(key, this.storageLimit);
    let result = undefined;

    if (this.storage[index] === undefined) return result;
    this.storage[index].every((elem) => {
      if (elem[0] === key) {
        result = elem[1];
        return false;
      }
      return true;
    });
    return result;
  }
}
