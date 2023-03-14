let nextId = require('./next-id');

class Strategy {
  constructor(title, year, month, day) {
    this.id = nextId();
    this.targetDate = new Date(year, month, day);
    this.title = title;
    this.done = false;
  }

  setHoursLeft(hoursLeft) {
    this.hoursLeft = hoursLeft;
  }

  setVacationDays(vacationDays) {
    this.vacationDays = vacationDays;
  }

  setDaysToWorkPerWeek(daysToWork) {
    this.daysToWork = daysToWork;
  }

  setStartDate(year, month, day) {
    this.startDate = new Date(year, month, day);
  }

  _getWeeksDiff() {
    const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;

    return Math.round(Math.abs(this.targetDate - this.startDate) / MS_IN_WEEK);
  }

  getHoursNeededPerDay() {
    let weeksDiff = this._getWeeksDiff();
    let diffInWorkableDays = (this.daysToWork * weeksDiff) - this.vacationDays;

    return (this.hoursLeft / diffInWorkableDays).toFixed(2);
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }
}

let strat = new Strategy("original strategy", 2023, 10, 1);
strat.setHoursLeft(1200);
strat.setVacationDays(40);
strat.setDaysToWorkPerWeek(6);
strat.setStartDate(2022, 9, 24);


module.exports = Strategy;