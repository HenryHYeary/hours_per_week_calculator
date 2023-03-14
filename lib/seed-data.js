const Strategy = require('./strategies')

let strat1 = new Strategy("original strategy", 2023, 10, 1);
strat1.setHoursLeft(1200);
strat1.setVacationDays(40);
strat1.setDaysToWorkPerWeek(6);
strat1.setStartDate(2022, 9, 24);

let strat2 = new Strategy("alternate strategy", 2024, 1, 15);
strat2.setHoursLeft(1200);
strat2.setVacationDays(30);
strat2.setDaysToWorkPerWeek(5);
strat2.setStartDate(2023, 3, 15);

let strat3 = new Strategy("WIP strategy", 2023, 11, 31);


let strats = [
  strat1,
  strat2,
  strat3,
];

module.exports = strats;