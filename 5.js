// import fs from 'fs/promises';
// import { topologicalSort, conformsToTopologicalOrder } from './topoSort.js';
// const inputRules = await fs.readFile('input-5-rules.txt', 'utf-8');
// const inputPages = await fs.readFile('input-5-pages.txt', 'utf-8');
// const inputPagesArr = inputPages.split('\\n');
// //const sortedRules = topologicalSort(inputRules);
// //for (let i = 0; i < inputPagesArr.length; i++)
// console.log(inputPagesArr);

import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');
const [rawRules, rawUpdates] = input.split('\n\n');

const rules = rawRules.split('\n').map((line) => line.split('|'));
const updates = rawUpdates.split('\n').map((line) => line.split(','));

function buildRuleIndex() {
  const ruleGraph = new Map();
  const indegree = new Map();

  for (const [before, after] of rules) {
    if (!ruleGraph.has(before)) {
      ruleGraph.set(before, []);
    }
    ruleGraph.get(before).push(after);

    indegree.set(after, (indegree.get(after) || 0) + 1);
    if (!indegree.has(before)) {
      indegree.set(before, 0);
    }
  }

  return { ruleGraph, indegree };
}

const { ruleGraph, indegree } = buildRuleIndex();

function followsRules(update) {
  const idx = new Map(update.map((val, id) => [val, id]));

  for (const [before, after] of rules) {
    if (idx.has(before) && idx.has(after) && idx.get(before) > idx.get(after)) {
      return false;
    }
  }
  return true;
}

function topoSort(update) {
  const set = new Set(update);
  const graph = new Map();
  const localIndegree = new Map();

  // Build subgraph for current update
  for (const key of set) {
    graph.set(key, []);
    localIndegree.set(key, 0);
  }

  for (const [before, after] of rules) {
    if (set.has(before) && set.has(after)) {
      graph.get(before).push(after);
      localIndegree.set(after, (localIndegree.get(after) || 0) + 1);
    }
  }

  const queue = [];
  const result = [];

  for (const [key, val] of localIndegree.entries()) {
    if (val === 0) {
      queue.push(key);
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph.get(node)) {
      localIndegree.set(neighbor, localIndegree.get(neighbor) - 1);
      if (localIndegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

function solution() {
  let result = 0;

  for (const update of updates) {
    if (followsRules(update)) {
      result += Number(update[Math.floor(update.length / 2)]);
    }
  }

  return result;
}

function solution2() {
  let result = 0;

  for (const update of updates) {
    if (!followsRules(update)) {
      const sortedUpdate = topoSort(update);
      result += Number(sortedUpdate[Math.floor(update.length / 2)]);
    }
  }

  return result;
}

console.log(solution());
console.log(solution2());
