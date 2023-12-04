import fs from 'fs';
const input = fs.readFileSync('./day4.in', 'utf-8');
// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

function parseInput(input) {
  return input
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) =>
      line
        .replace(/Card +\d+:/, '')
        .trim()
        .split(' | ')
        .map((card) => card.split(/ +/).map((num) => parseInt(num)))
    );
}

const cards = parseInput(input);

let sum = 0;
const copies = [];
for (const card of cards) {
  const [wNum, myNum] = card;

  const winningNumbers = myNum.filter((n) => wNum.includes(n));
  copies.push(winningNumbers.length);
  if (winningNumbers.length) {
    sum += 2 ** (winningNumbers.length - 1);
  }
}
console.log('First Star:', sum);

const instances = new Array(copies.length).fill(1);
copies.forEach((c, i) => {
  for (let j = i + 1; j < copies.length && j <= i + c; j++) {
    instances[j] += instances[i];
  }
});

console.log(
  'Second Star:',
  instances.reduce((a, c) => a + c)
);
