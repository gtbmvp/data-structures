class mySet {
  constructor() {
    this.collection = [];
  }

  has(element) {
    return this.collection.includes(element);
  }

  values() {
    return this.collection;
  }

  add(element) {
    if (this.has(element)) return false;

    this.collection.push(element);
    return true;
  }

  remove(element) {
    if (this.has(element)) {
      let index = this.collection.indexOf(element);

      this.collection.splice(index, 1);
      return true;
    }
    return false;
  }

  size() {
    return this.collection.length;
  }

  union(anotherSet) {
    let unionSet = new mySet();
    let firstSet = this.values();
    let secondSet = anotherSet.values();

    firstSet.forEach((element) => unionSet.add(element));
    secondSet.forEach((element) => unionSet.add(element));

    return unionSet;
  }

  intersection(anotherSet) {
    let intersectionSet = new mySet();
    let firstSet = this.values();

    firstSet.forEach((element) =>
      anotherSet.has(element) ? intersectionSet.add(element) : false
    );

    return intersectionSet;
  }

  difference(anotherSet) {
    let differenceSet = new mySet();
    let firstSet = this.values();

    firstSet.forEach((element) =>
      !anotherSet.has(element) ? differenceSet.add(element) : false
    );

    return differenceSet;
  }

  subset(anotherSet) {
    let firstSet = this.values();

    return firstSet.every((element) => anotherSet.has(element));
  }
}
