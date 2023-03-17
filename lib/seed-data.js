const Strategy = require('./strategies')

let strat1Args = [
  "Original Strategy",
  "2022-09-24",
  "2023-10-1",
  1200,
  40,
  6,
]

let strat1 = new Strategy(...strat1Args);

let strat2Args = [
  "Alternate Strategy",
  "2023-3-15",
  "2024-1-15",
  1200,
  30,
  5,
];

let strat2 = new Strategy(...strat2Args);


let strats = [
  strat1,
  strat2,
];

module.exports = strats;