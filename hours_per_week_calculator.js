// Basic concept code

/*
input: the current date
output: the number of hours per week necessary to make the July 15th capstone cohort, should have six days per week

Data Structure: should declare a constant variable of 1000 hours as time remaining to study in between current date and target date (July 15 2023).
Should find the number of weeks in between the current date and the target date.
Should divide the number of total hours by 6 times the current number of weeks left in between now and July 15th (divisor should also be subtracted by 24 for vacation days).
*/

// const HOURS_LEFT = 1200;
// const TARGET_DATE = new Date(2023, 10, 1);
// const VACATION_DAYS = 40;
// const DAYS_TO_WORK_PER_WEEK = 6;

// function getWeeksDiff(startDate, endDate) {
//     const msInWeek = 1000 * 60 * 60 * 24 * 7;

//     return Math.round(Math.abs(endDate - startDate) / msInWeek);
// }

// function getHoursNeededPerDay(date) {
//     let diffInWeeks = getWeeksDiff(date, TARGET_DATE);
//     let diffInWorkableDays = (DAYS_TO_WORK_PER_WEEK * diffInWeeks) - VACATION_DAYS;

//     return HOURS_LEFT / diffInWorkableDays;
// }

// console.log(getWeeksDiff(new Date(2022, 9, 24), TARGET_DATE));

// console.log(getHoursNeededPerDay(new Date(2022, 9, 24)));

const express = require("express");
const morgan = require("morgan");
const Strategy = require('./lib/strategies');

const app = express();
const host = "localhost";
const port = 3000;

let strats = require('./lib/seed-data');

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sortStrategies = strats => {
  return strats.slice().sort((stratA, stratB) => {
    let titleA = stratA.title.toLowerCase();
    let titleB = stratB.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  });
};

app.get("/", (req, res) => {
    res.render("strategies", {
      strats: sortStrategies(strats),
    });
});

app.get("/strategies/new", (req, res) => {
  res.render("new-strategy");
});

app.post("/strategies", (req, res) => {
  let title = req.body.stratTitle.trim();
  strats.push(new Strategy(title));
});

app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}!`);
});