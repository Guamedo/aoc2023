import fs from 'fs';
// const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const input = fs.readFileSync('./day2.in', { encoding: 'utf-8' });

const lines = input.split(/\r?\n/).filter((l) => l);

const games = lines.map((l) => {
  const [idStr, setsStr] = l.split(': ');
  const id = parseInt(idStr.replace('Game ', ''));
  const sets = setsStr.split('; ').map((s) => {
    const colors = s.split(', ');
    const colorCounts = colors.map((c) => {
      const [count, color] = c.split(' ');
      return [color, parseInt(count)];
    });
    return Object.fromEntries(colorCounts);
  });
  return { id, sets };
});

let sum = 0;

const maxValues = {
  red: 12,
  green: 13,
  blue: 14,
};
for (const game of games) {
  let possible = true;
  for (const set of game.sets) {
    for (const color in set) {
      if (set[color] > maxValues[color]) {
        possible = false;
        break;
      }
    }
    if (!possible) break;
  }
  if (possible) {
    sum += game.id;
  }
}
console.log('First Star:', sum);

let sum2 = 0;
for (const game of games) {
  const mins = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const set of game.sets) {
    for (const color in set) {
      if (set[color] > mins[color]) {
        mins[color] = set[color];
      }
    }
  }
  sum2 += mins.red * mins.green * mins.blue;
}
console.log('Second Star:', sum2);
