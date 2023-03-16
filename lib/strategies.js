let nextId = require('./next-id');

class Strategy {
  constructor(title, startDate, targetDate, hoursLeft, vacationDays, daysToWork) {
    this.id = nextId();
    this.stratTitle = title;
    this.startDate = Strategy.dateToStringObj(startDate);
    this.targetDate = Strategy.dateToStringObj(targetDate);
    this.hoursLeft = hoursLeft;
    this.vacationDays = vacationDays;
    this.daysToWork = daysToWork;
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
}

module.exports = Strategy;