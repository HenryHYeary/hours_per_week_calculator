let nextId = require('./next-id');

class Strategy {
  constructor(stratName, year, month, day) {
    this.id = nextId();
    this.targetDate = new Date(year, month, day);
    this.stratName = stratName;
  }
}