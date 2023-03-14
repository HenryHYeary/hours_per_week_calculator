let nextId = require('./next-id');

class Strategy {
  constructor(title, dateStr) {
    this.id = nextId();
    this.targetDate = Strategy.dateToStringObj(dateStr);
    this.title = title;
    this.done = false;
  }

  static dateToStringObj(dateStr) {
    let argArr = dateStr.split('/');
    argArr = argArr.map(num => Number(num));
    argArr[1] -= 1;

    return new Date(...argArr);
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

  setStartDate(dateStr) {
    this.startDate = Strategy.dateToStringObj(dateStr);
  }

  setTargetDate(dateStr) {
    this.targetDate = Strategy.dateToStringObj(dateStr);
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

let strat = new Strategy("original strategy", "2021/2/21");
strat.setHoursLeft(1200);
strat.setVacationDays(40);
strat.setDaysToWorkPerWeek(6);
strat.setStartDate("2022/08/24");

console.log(strat.getHoursNeededPerDay());


module.exports = Strategy;