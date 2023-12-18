import fs from 'fs';
const input = fs.readFileSync('./day9.in', 'utf-8');
// const input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45`;

const lines = input.split(/\r?\n/);

const hists = lines.map((x) => x.split(' ').map((y) => parseInt(y)));

let sum = 0;
let sum2 = 0;

for (let hist of hists) {
  let end = false;
  let rec = [hist.at(-1)];
  let rec2 = [hist.at(0)];
  while (!end) {
    const newHist = hist.reduce((acc, val, i) => {
      if (i < hist.length - 1) {
        acc.push(hist[i + 1] - hist[i]);
      }
      return acc;
    }, []);
    if (newHist.every((x) => x === 0)) {
      end = true;
    }
    hist = newHist;
    rec.push(hist.at(-1));
    rec2.push(hist.at(0));
  }
  rec2.pop();
  const val = rec2.reverse().reduce((acc, val) => {
    return val - acc;
  }, 0);
  sum += rec.reduce((acc, val) => acc + val);
  sum2 += val;
}

console.log('First Star:', sum);
console.log('Second Star:', sum2);
