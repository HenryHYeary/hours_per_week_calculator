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
const flash = require("express-flash");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
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

app.use(session({
  name: "hours-per-week-calc-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

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
  res.redirect("/strategies");
})

app.get("/strategies", (req, res) => {
    res.render("strategies", {
      strats: sortStrategies(strats),
    });
});

app.get("/strategies/new", (req, res) => {
  res.render("new-strategy");
});

app.post("/strategies",
  [
    body("stratTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The list title is required.")
      .isLength({ max: 100 })
      .withMessage("List title must be between 1 and 100 characters.")
      .custom(title => {
        let duplicate = strats.find(strat => strat.title === title);
        return duplicate === undefined;
      })
      .withMessage("List title must be unique."),
    body("startDate")
      .trim()
      .isLength({ min: 1 })
      .withMessage("A start date is required.")
      .isDate()
      .withMessage("Date must be in YYYY/MM/DD format."),
    body("hoursLeft")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Number of hours left is required.")
      .isNumeric({ no_symbols: true })
      .withMessage("Number of hours must be a positive integer"),
    body("targetDate")
      .trim()
      .isLength({ min: 1 })
      .withMessage("A target date is required.")
      .isDate()
      .withMessage("Date must be in YYYY/MM/DD format.")
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.render("new-strategy", {
        flash: req.flash(),
        stratTitle: req.body.stratTitle,
        targetDate: req.body.targetDate,
        hoursLeft: req.body.hoursLeft,
      });
    } else {
      strats.push(new Strategy(req.body.stratTitle));
      req.flash("success", "The strategy has been created.");
      res.redirect("/strategies");
    }
});

app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}!`);
});