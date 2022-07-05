class MaxHeap {
  constructor() {
    this.data = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return index * 2 + 1;
  }
  getRightChildIndex(index) {
    return index * 2 + 2;
  }
  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  add(key) {
    this.data.push(key);
    this.heapifyUp();
  }

  remove() {
    const maxValue = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.length--;
    this.heapifyDown();

    return maxValue;
  }

  heapifyUp() {
    let currentIndex = this.data.length - 1;

    while (
      this.data[currentIndex] > this.data[this.getParentIndex(currentIndex)]
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    // no need to check right child, because tree is complete and is filled from left to right;
    while (this.data[this.getLeftChildIndex(currentIndex)] !== undefined) {
      let biggestChildIndex = this.getLeftChildIndex(currentIndex);

      if (
        this.data[this.getRightChildIndex(currentIndex)] !== undefined &&
        this.data[this.getRightChildIndex(currentIndex)] >
          this.data[this.getLeftChildIndex(currentIndex)]
      ) {
        biggestChildIndex = this.getRightChildIndex(currentIndex);
      }
      if (this.data[currentIndex] < this.data[biggestChildIndex]) {
        this.swap(currentIndex, biggestChildIndex);
        currentIndex = biggestChildIndex;
      } else return;
    }
  }

  sort() {
    let maxToMin = [];

    while (this.data.length) {
      maxToMin.push(this.remove());
    }

    return maxToMin;
  }
}

class MinHeap {
  constructor() {
    this.data = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return index * 2 + 1;
  }
  getRightChildIndex(index) {
    return index * 2 + 2;
  }
  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  add(key) {
    this.data.push(key);
    this.heapifyUp();
  }

  remove() {
    const minValue = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.length--;
    this.heapifyDown();

    return minValue;
  }

  heapifyUp() {
    let currentIndex = this.data.length - 1;

    while (
      this.data[currentIndex] < this.data[this.getParentIndex(currentIndex)]
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (this.data[this.getLeftChildIndex(currentIndex)] !== undefined) {
      let smallestChildIndex = this.getLeftChildIndex(currentIndex);

      if (
        this.data[this.getRightChildIndex(currentIndex)] !== undefined &&
        this.data[this.getRightChildIndex(currentIndex)] <
          this.data[this.getLeftChildIndex(currentIndex)]
      ) {
        smallestChildIndex = this.getRightChildIndex(currentIndex);
      }
      if (this.data[smallestChildIndex] < this.data[currentIndex]) {
        this.swap(smallestChildIndex, currentIndex);
        currentIndex = smallestChildIndex;
      } else return;
    }
  }

  sort() {
    let minToMax = [];

    while (this.data.length) {
      minToMax.push(this.remove());
    }

    return minToMax;
  }
}
