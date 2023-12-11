import fs from 'fs';
const input = fs.readFileSync('./day7.in', 'utf-8');
// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;

function mapLines1(line) {
  const [hand, val] = line.split(' ');

  const handCounts = hand.split('').reduce((acc, val) => {
    acc[val] = acc[val] != null ? acc[val] + 1 : 1;
    return acc;
  }, {});

  const handCountsValues = Object.values(handCounts);

  let handMax = Math.max(...handCountsValues);
  if (handMax === 3) {
    if (!handCountsValues.includes(2)) handMax--;
  } else if (handMax === 2) {
    handMax -= handCountsValues.filter((x) => x === 2).length === 2 ? 1 : 2;
  } else if (handMax === 1) {
    handMax = -1;
  }
  return {
    hand: { handValue: handMax, cards: hand.split('') },
    val: parseInt(val),
  };
}

function mapLines2(line) {
  const [hand, val] = line.split(' ');

  const handCounts = hand.split('').reduce((acc, val) => {
    acc[val] = acc[val] != null ? acc[val] + 1 : 1;
    return acc;
  }, {});

  const JCounts = handCounts['J'] ?? 0;
  delete handCounts['J'];

  const handCountsValues = Object.values(handCounts);

  let handMax = JCounts === 5 ? 5 : Math.max(...handCountsValues) + JCounts;
  if (JCounts !== 5) handCountsValues[handCountsValues.indexOf(Math.max(...handCountsValues))] = Math.max(...handCountsValues) + JCounts;
  if (handMax === 3) {
    if (!handCountsValues.includes(2)) handMax--;
  } else if (handMax === 2) {
    handMax -= handCountsValues.filter((x) => x === 2).length === 2 ? 1 : 2;
  } else if (handMax === 1) {
    handMax = -1;
  }
  return {
    hand: { handValue: handMax, cards: hand.split('') },
    val: parseInt(val),
  };
}

function sortHands1(a, b) {
  const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  if (a.hand.handValue !== b.hand.handValue) {
    return a.hand.handValue - b.hand.handValue;
  } else {
    for (let i = 0; i < a.hand.cards.length; i++) {
      if (a.hand.cards[i] !== b.hand.cards[i]) {
        return cardValues.indexOf(a.hand.cards[i]) - cardValues.indexOf(b.hand.cards[i]);
      }
    }
    return 0;
  }
}

function sortHands2(a, b) {
  const cardValues = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  if (a.hand.handValue !== b.hand.handValue) {
    return a.hand.handValue - b.hand.handValue;
  } else {
    for (let i = 0; i < a.hand.cards.length; i++) {
      if (a.hand.cards[i] !== b.hand.cards[i]) {
        return cardValues.indexOf(a.hand.cards[i]) - cardValues.indexOf(b.hand.cards[i]);
      }
    }
    return 0;
  }
}

const lines = input.split(/\r?\n/);
const hands1 = lines.map(mapLines1);
const sortedHands1 = hands1.sort(sortHands1);

console.log(
  'First Star:',
  sortedHands1.reduce((acc, val, i) => {
    return acc + val.val * (i + 1);
  }, 0)
);

const hands2 = lines.map(mapLines2);
const sortedHands2 = hands2.sort(sortHands2);

console.log(
  'Second Star:',
  sortedHands2.reduce((acc, val, i) => {
    return acc + val.val * (i + 1);
  }, 0)
);
