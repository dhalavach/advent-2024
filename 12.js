import fs from 'fs';

const input = fs.readFileSync('input-12.txt', 'utf-8');
const grid = input.split('\n').map((line) => line.split(''));

function findCharacterAreas(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const areas = {};

  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  function dfs(row, col, char, area) {
    const stack = [[row, col]];
    visited.add(`${row},${col}`);
    area.push([row, col]);

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();

      for (const [dRow, dCol] of directions) {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !visited.has(`${newRow},${newCol}`) &&
          grid[newRow][newCol] === char
        ) {
          visited.add(`${newRow},${newCol}`);
          stack.push([newRow, newCol]);
          area.push([newRow, newCol]);
        }
      }
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited.has(`${row},${col}`)) {
        const char = grid[row][col];
        if (!areas[char]) {
          areas[char] = [];
        }
        const area = [];
        dfs(row, col, char, area);
        areas[char].push(area); // Save the area for the character
      }
    }
  }

  return areas;
}

// const grid = [
//   ['A', 'A', 'B', 'C'],
//   ['A', 'B', 'B', 'A'],
//   ['C', 'A', 'A', 'A'],
//   ['B', 'B', 'C', 'A'],
// ];

const areas = findCharacterAreas(grid);
// console.log('areas: ', areas);

function calculateAllPerimeters(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const perimeters = {};

  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  function dfs(row, col, char) {
    const stack = [[row, col]];
    let perimeter = 0;
    visited.add(`${row},${col}`);

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();

      for (const [dRow, dCol] of directions) {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols || grid[newRow][newCol] !== char) {
          perimeter++;
        } else if (!visited.has(`${newRow},${newCol}`)) {
          visited.add(`${newRow},${newCol}`);
          stack.push([newRow, newCol]);
        }
      }
    }

    return perimeter;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited.has(`${row},${col}`)) {
        const char = grid[row][col];
        if (!perimeters[char]) {
          perimeters[char] = [];
        }

        const groupPerimeter = dfs(row, col, char);
        perimeters[char].push(groupPerimeter);
      }
    }
  }

  return perimeters;
}

const perimeters = calculateAllPerimeters(grid);
// console.log('perimeters: ', perimeters);

let costs = 0;
for (let key in areas) {
  for (let i = 0; i < areas[key].length; i++) {
    let cost = areas[key][i].length * perimeters[key][i];
    costs += cost;
  }
}
console.log('costs: ', costs);
