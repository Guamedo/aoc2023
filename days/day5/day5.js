import fs from 'fs';
const input = fs.readFileSync('./day5.in', 'utf-8');
// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

const lines = input.split(/\r?\n\r?\n/).map((l) => l.replaceAll(/[A-z]|-|:/g, '').trim());

const seeds = lines[0].split(' ').map((x) => parseInt(x));

const maps = lines
  .slice(1)
  .map((m) => m.split('\n').map((l) => l.split(' ').map((x) => parseInt(x))))
  .map((m) =>
    m.map((x) => [
      { min: x[0], max: x[0] + x[2] },
      { min: x[1], max: x[1] + x[2] },
    ])
  );

const out = [];
for (const seed of seeds) {
  let val = seed;
  for (const map of maps) {
    for (const cosa of map) {
      if (val >= cosa[1].min && val < cosa[1].max) {
        val = val - cosa[1].min + cosa[0].min;
        break;
      }
    }
  }
  out.push(val);
}

console.log('First Star:', Math.min(...out));

let out2 = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
  //   console.log('seed', i / 2);
  for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
    let val = seed;
    for (const map of maps) {
      for (const cosa of map) {
        if (val >= cosa[1].min && val < cosa[1].max) {
          val = val - cosa[1].min + cosa[0].min;
          break;
        }
      }
    }
    out2 = Math.min(out2, val);
  }
}

console.log('Second Star:', out2);
