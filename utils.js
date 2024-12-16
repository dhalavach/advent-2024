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
