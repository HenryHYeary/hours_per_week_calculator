const Strategy = require('./strategies')

let strat1 = new Strategy("Original strategy");
strat1.setHoursLeft(1200);
strat1.setVacationDays(40);
strat1.setDaysToWorkPerWeek(6);
strat1.setStartDate("2022/09/24");
strat1.setStartDate("2023/10/1");

let strat2 = new Strategy("Alternate strategy");
strat2.setHoursLeft(1200);
strat2.setVacationDays(30);
strat2.setDaysToWorkPerWeek(5);
strat2.setStartDate("2023/3/15");
strat2.setTargetDate("2024/1/15");

let strat3 = new Strategy("WIP strategy");


let strats = [
  strat1,
  strat2,
  strat3,
];

module.exports = strats;