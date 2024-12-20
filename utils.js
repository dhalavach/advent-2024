import fs from 'fs/promises';

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
        startX = j;
        startY = i;
        break;
      }
    }
  }
  return [startX, startY];
}
