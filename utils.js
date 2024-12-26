import fs from 'fs/promises';
import { directions } from './enums.js';

export async function readInput(relativePathToInput) {
  if (typeof relativePathToInput !== 'string' || !relativePathToInput.trim()) {
    throw new Error('Invalid path: relativePathToInput must be a non-empty string');
  }

  const DEFAULT_ENCODING = 'utf-8';

  let input;

  try {
    input = await fs.readFile(relativePathToInput, { encoding: DEFAULT_ENCODING });
  } catch (err) {
    throw new Error(`Error reading input file at "${relativePathToInput}"`, { cause: err });
  }

  return input;
}

export async function findInitialPlayerPosition(grid, playerChar) {
  if (!grid || !playerChar) throw new TypeError('Missing arguments');

  let startX = 0;
  let startY = 0;
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[j].length; i++) {
      if (grid[j][i] === playerChar) {
        startX = i;
        startY = j;
        break;
      }
    }
  }
  return [startX, startY];
}

export function turnClockwise(initDirection) {
  switch (initDirection) {
    case directions.RIGHT:
      return directions.DOWN;
      break;
    case directions.DOWN:
      return directions.LEFT;
      break;
    case directions.LEFT:
      return directions.UP;
      break;
    case directions.UP:
      return directions.RIGHT;
      break;
    default:
      throw new TypeError('Invalid direction for turnClockwise function');
  }
}

export function turnCounterClockwise(initDirection) {
  switch (initDirection) {
    case directions.RIGHT:
      return directions.UP;
    case directions.UP:
      return directions.LEFT;
    case directions.LEFT:
      return directions.DOWN;
    case directions.DOWN:
      return directions.RIGHT;
    default:
      throw new TypeError('Invalid direction for turnCounterClockwise function');
  }
}

export function checkIfArrayHasDuplicates(arr) {
  return arr.some((e, i) => arr.indexOf(e) !== i);
}

export function create2DArray(rows, cols) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    arr.push(row);
  }
  return arr;
}
