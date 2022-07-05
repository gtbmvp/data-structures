const grid = [
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
];

class Graph {
  #nodes = {};

  addNode(node) {
    this.#nodes[node] = [];
  }

  addEdge(source, destination) {
    if (!this.#nodes[source] || !this.#nodes[destination]) {
      return false;
    }

    if (!this.#nodes[source].includes(destination)) {
      this.#nodes[source].push(destination);
    }

    if (!this.#nodes[destination].includes(source)) {
      this.#nodes[destination].push(source);
    }
  }

  showNode() {
    console.log(this.#nodes);
  }

  dfsIterativePrint(source) {
    const stack = [source];
    const visited = new Set([source]);

    while (stack.length) {
      const current = stack.pop();

      console.log(current);

      for (let neighbor of this.#nodes[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
  }

  dfsRecursivePrint(source, visited = new Set()) {
    if (visited.has(source)) return;
    visited.add(source);

    console.log(source);

    for (let neighbor of this.#nodes[source]) {
      this.dfsRecursivePrint(neighbor, visited);
    }
  }

  bfsPrint(traverseFrom) {
    const queue = [traverseFrom]; //initialize queue and visited with first node
    const visited = new Set([traverseFrom]);

    // no check if current node is visited inside
    while (queue.length) {
      const current = queue.shift();

      console.log(current);

      for (let neighbor of this.#nodes[current]) {
        // add only not visited neighbor and tag it visited in advance
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  bfsIsPathBetween(source, destination) {
    const queue = [source];
    const visited = new Set([source]);

    while (queue.length) {
      const current = queue.shift();

      if (current === destination) return true;

      for (let neighbor of this.#nodes[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return false;
  }

  bfsShortestPathBetween(source, destination) {
    const queue = [[source, 0]];
    const visited = new Set([source, 0]);

    while (queue.length) {
      const [current, distance] = queue.shift();

      //all neighbors are equidistant from current node, it doesn't matter which one is equil to destination
      if (current === destination) return distance;

      for (let neighbor of this.#nodes[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, distance + 1]);
        }
      }
    }

    return -1;
  }

  bfsCountGraphs() {
    let counter = 0;
    const visited = new Set();

    for (let node in this.#nodes) {
      const queue = [node];

      if (!visited.has(node)) {
        counter++;
        visited.add(node);

        while (queue.length) {
          const current = queue.shift();

          for (let neighbor of this.#nodes[current]) {
            if (!visited.has(String(neighbor))) {
              visited.add(String(neighbor));
              queue.push(String(neighbor));
            }
          }
        }
      }
    }

    return counter;
  }

  bfsLargestGraphSize() {
    let result = [0];
    const visited = new Set();

    for (let node in this.#nodes) {
      const queue = [node];
      let nodeCounter = 0;

      if (!visited.has(node)) {
        visited.add(node);

        while (queue.length) {
          const current = queue.shift();

          nodeCounter++;

          for (let neighbor of this.#nodes[current]) {
            if (!visited.has(String(neighbor))) {
              visited.add(String(neighbor));
              queue.push(String(neighbor));
            }
          }
        }
        result.push(nodeCounter);
      }
    }
    return Math.max(...result);
  }

  islandCount(grid) {
    /*
    0)grid[0].length for columns because grid may be not square;
    1) two loops for iterating through matrix, check grid[row][column] immediately and its neighbors in explore function:
    if (grid[row][column] === 1) {
          counter++;
          explore(grid, row, column);
    }
    or just invoke explore and check current cell and its neighbor through queue/stack/recursively explore;
    2)explore function marks visited cells, ways to implement it:
      - add visited cells into Set;
      - explore function change neighbors values to either 0 (it would clear matrix at the end of function execution) or some different value (1 -> 2):
    3) explore function returns integer 0 or 1 and summarize with islandCount function counter or returns true/false and we increase counter manually:
    counter += explore(grid, row, column)
      or
    if (explore(grid, row, column)) counter++
    */

    if (grid === undefined || !grid.length) {
      return false;
    }

    const visited = new Set();
    let counter = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        counter += bfsExplore(grid, row, column);
        //counter += dfsIterativeExplore(grid, row, column);
        //counter += dfsRecursiveExplore(grid, row, column);
      }
    }

    return counter;

    function bfsExplore(grid, row, column) {
      const queue = [[row, column]];
      let island = false;

      while (queue.length) {
        const [row, column] = queue.shift();

        const position = row + "," + column;

        if (visited.has(position)) continue;

        visited.add(position);

        const rowInbounds = 0 <= row && row < grid.length;
        const columnInbounds = 0 <= column && column < grid[0].length;
        if (!rowInbounds || !columnInbounds) continue;

        if (grid[row][column] === 0) continue;

        island = true;

        queue.push(
          [row - 1, column],
          [row + 1, column],
          [row, column - 1],
          [row, column + 1]
        );
      }

      return island ? 1 : 0;
    }

    function dfsIterativeExplore(grid, row, column) {
      const stack = [[row, column]];
      let island = false;

      while (stack.length) {
        const [row, column] = stack.pop();

        const position = row + "," + column;

        if (visited.has(position)) continue;

        visited.add(position);

        const rowInbounds = 0 <= row && row < grid.length;
        const columnInbounds = 0 <= column && column < grid[0].length;
        if (!rowInbounds || !columnInbounds) continue;

        if (grid[row][column] === 0) continue;

        island = true;

        stack.push(
          [row - 1, column],
          [row + 1, column],
          [row, column - 1],
          [row, column + 1]
        );
      }

      return island ? 1 : 0;
    }

    function dfsRecursiveExplore(grid, row, column) {
      const position = row + "," + column;
      if (visited.has(position)) return 0;

      visited.add(position);

      const rowInbounds = 0 <= row && row < grid.length;
      const columnInbounds = 0 <= column && column < grid[0].length;
      if (!rowInbounds || !columnInbounds) return 0;

      if (grid[row][column] === 0) return 0;

      dfsRecursiveExplore(grid, row - 1, column);
      dfsRecursiveExplore(grid, row + 1, column);
      dfsRecursiveExplore(grid, row, column - 1);
      dfsRecursiveExplore(grid, row, column + 1);

      return 1;
    }
  }

  islandCount2(grid) {
    if (grid === undefined || !grid.length) {
      return false;
    }

    const visited = new Set();
    let counter = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        if (grid[row][column] === 1 && !visited.has(`${row},${column}`)) {
          counter++;
          visited.add(`${row},${column}`);
          bfsExplore(grid, row, column);
        }
      }
    }

    return counter;

    function bfsExplore(grid, row, column) {
      const queue = [
        [row - 1, column],
        [row + 1, column],
        [row, column - 1],
        [row, column + 1],
      ];

      while (queue.length) {
        const [row, column] = queue.shift();

        if (visited.has(`${row},${column}`)) continue;

        visited.add(`${row},${column}`);

        const rowInbounds = 0 <= row && row < grid.length;
        const columnInbounds = 0 <= column && column < grid[0].length;
        if (!rowInbounds || !columnInbounds) continue;

        if (grid[row][column] === 0) continue;

        queue.push(
          [row - 1, column],
          [row + 1, column],
          [row, column - 1],
          [row, column + 1]
        );
      }
    }
  }

  dfsMinimumIsland(grid) {
    const visited = new Set();
    let minSize = Infinity;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        const size = dfsExploreSize(grid, row, column);
        if (size > 0 && size < minSize) {
          minSize = size;
        }
      }
    }

    return minSize;

    function dfsExploreSize(grid, row, column) {
      const rowInbounds = 0 <= row && row < grid.length;
      const columnInbounds = 0 <= column && column < grid[0].length;
      if (!rowInbounds || !columnInbounds) return 0;

      if (grid[row][column] === 0) return 0;

      const position = row + "," + column;

      if (visited.has(position)) return 0;
      visited.add(position);

      let size = 1;

      size += dfsExploreSize(grid, row - 1, column);
      size += dfsExploreSize(grid, row + 1, column);
      size += dfsExploreSize(grid, row, column - 1);
      size += dfsExploreSize(grid, row, column + 1);

      return size;
    }
  }
}
