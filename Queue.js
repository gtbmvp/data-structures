// FIFO: first in first out
class Queue {
  constructor() {
    this.collection = [];
  }

  print() {
    console.log(this.collection);
  }

  enqueue(element) {
    this.collection.push(element);
  }

  dequeue() {
    return this.collection.shift();
  }

  front() {
    return this.collection[0];
  }

  size() {
    return this.collection.length;
  }

  isEmpty() {
    return this.collection.length === 0;
  }

  //   // for ["data", priority_number] elements
  //   priority(element) {
  //     if (this.isEmpty()) this.collection.push(element);
  //     else {
  //       let added = false;
  //       for (let i = 0; i < this.collection.length; i++) {
  //         if (element[1] < this.collection[i][1]) {
  //           this.collection.splice(i, 0, element);
  //           added = true;
  //           break;
  //         }
  //       }
  //       if (!added) {
  //         this.collection.push(element);
  //       }
  //     }
  //   }
}
