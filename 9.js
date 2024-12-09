import * as fs from 'fs';

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

const input = fs.readFileSync('input-9.txt', 'utf-8');

class InputParser {
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
      .map((element) => {
        const num = parseInt(element, 10);
        return isNaN(num) ? 0 : num; // Replace invalid values with 0 or handle appropriately
      });

    for (let i = 0; i < arr.length; i++) {
      if (i % 2 !== 0) {
        this.inputMap.set(i, new Array(arr[i]).fill('.'));
      } else {
        this.inputMap.set(i, new Array(arr[i]).fill(this.indexCounter));
        this.indexCounter++;
      }
    }
    return this.inputMap;
  }

  #turnInputIntoString() {
    return this.input; // Return the content of the file
  }
}
class Defragmentor {
  map;
  fileSystem;
  emptySpaces;
  mapSize;

  constructor(map) {
    this.map = map;
    this.fileSystem = [];
    this.emptySpaces = 0;
    this.mapSize = map.size;
  }

  createAndDefragment() {
    this.#createFilesystem();
    this.#defragment();
    return this.#calculateResult();
  }

  #createFilesystem() {
    for (let i = 0; i < this.map.size; i++) {
      this.map.get(i).forEach((element) => {
        this.fileSystem.push(element);
      });
    }
  }

  #defragment() {
    for (let i = 0; i < this.fileSystem.length; i++) {
      if (this.fileSystem[i] === '.') {
        for (let k = this.fileSystem.length - 1; k > i; k--) {
          if (typeof this.fileSystem[k] === 'number') {
            this.fileSystem[i] = this.fileSystem[k];
            this.fileSystem[k] = '.';
            break;
          }
        }
      }
    }
  }

  #calculateResult() {
    const resultArr = [];
    for (let i = 0; i < this.fileSystem.length; i++) {
      if (typeof this.fileSystem[i] === 'number') {
        resultArr.push(i * Number(this.fileSystem[i]));
      }
    }
    return sumArray(resultArr);
  }
}

const parser = new InputParser();
const parsedInput = parser.createInputMap();
const defrag = new Defragmentor(parsedInput);

console.log(defrag.createAndDefragment());
