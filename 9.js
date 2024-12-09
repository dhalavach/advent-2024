// import { sumUpArray } from '../../../utils/utils';
import * as fs from 'fs';

function sumArray(arr) {
  const result = arr.reduce((a, b) => a + b, 0);
  return result;
}

const input = fs.readFileSync('input-9.txt', 'utf-8');

export class InputParser {
  input;
  indexCounter;
  inputMap;

  constructor() {
    this.input = input;
    this.indexCounter = 0;
    this.inputMap = new Map();
  }

  createInputMap() {
    const string = this.#turnInputIntoString();
    const arr = string
      .replace(/\r/g, '')
      .split('')
      .map((element) => parseInt(element));
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 != 0) {
        this.inputMap.set(i, new Array(arr[i]).fill('.'));
      } else {
        this.inputMap.set(i, new Array(arr[i]).fill(this.indexCounter));
        this.indexCounter++;
      }
    }
    return this.inputMap;
  }

  #turnInputIntoString() {
    return fs.readFileSync(this.input).toString('utf-8');
  }
}

///////////////////////////

export class Defragmentor {
  constructor(map) {
    this.map = map;
  }

  createAndDefragment() {
    const fileSystem = this.#populateFileSystem();
    const defragmentedFileSystem = this.#defragmentFileSystem(fileSystem);
    return this.#computeResult(defragmentedFileSystem);
  }

  #populateFileSystem() {
    // Flatten the map values into a single array
    return Array.from(this.map.values()).flat();
  }

  #defragmentFileSystem(fileSystem) {
    // Collect numbers and count empty spaces ('.')
    const numbers = fileSystem.filter((item) => typeof item === 'number');
    const emptySpacesCount = fileSystem.length - numbers.length;

    // Reconstruct the defragmented file system
    return [...numbers, ...Array(emptySpacesCount).fill('.')];
  }

  #computeResult(fileSystem) {
    // Map and reduce to compute the final result
    return fileSystem.reduce((acc, item, index) => (typeof item === 'number' ? acc + index * item : acc), 0);
  }
}

const parser = new InputParser('./input-9.txt');
const parsedInput = parser.createInputMap();
const defrag = new Defragmentor(parsedInput);

console.log(defrag.createAndDefragment());
