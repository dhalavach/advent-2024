import fs from 'fs/promises';

export async function readInput(relativePathToInput) {
  let input;
  try {
    input = await fs.readFile(relativePathToInput, { encoding: 'utf-8' });
  } catch (err) {
    throw new Error('Error reading input file', { cause: err });
  }
  return input;
}
