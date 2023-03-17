let nextId = require('./next-id');

class Strategy {
  constructor(title, startDate, targetDate, hoursLeft, vacationDays, daysToWork) {
    this.id = nextId();
    this.stratTitle = title;
    this.startDate = Strategy.dateStrToObj(startDate);
    this.targetDate = Strategy.dateStrToObj(targetDate);
    this.hoursLeft = hoursLeft;
    this.vacationDays = vacationDays;
    this.daysToWork = daysToWork;
    this.stringStartDate = Strategy.dateObjToStr(this.startDate);
    this.stringTargetDate = Strategy.dateObjToStr(this.targetDate);
  }

  static dateStrToObj(dateStr) {
    let argArr;
    if (dateStr.includes('/')) {
      argArr = dateStr.split('/');
    } else {
      argArr = dateStr.split('-');
    }
    argArr = argArr.map(num => Number(num));
    argArr[1] -= 1;

    return new Date(...argArr);
  }

  static dateObjToStr(date) {
    return date.toISOString().split('T')[0];
  }

  setStratTitle(stratTitle) {
    this.stratTitle = stratTitle;
  }

  setHoursLeft(hoursLeft) {
    this.hoursLeft = hoursLeft;
  }

  setVacationDays(vacationDays) {
    this.vacationDays = vacationDays;
  }

  setDaysToWork(daysToWork) {
    this.daysToWork = daysToWork;
  }

  setStartDate(dateStr) {
    this.startDate = Strategy.dateStrToObj(dateStr);
  }

  setTargetDate(dateStr) {
    this.targetDate = Strategy.dateStrToObj(dateStr);
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