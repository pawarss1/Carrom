class Player {
  constructor(id) {
    this.points = 0;
    this.id = id;
    this.successiveMisses = 0;
    this.foulCounts = 0;
  }
  updatePointsBy(value) {
    this.points += value;
  }
  getPoints() {
    return this.points;
  }
  updateSuccessiveMissesBy(value) {
    this.successiveMisses += value;
  }
  getSuccessiveMisses() {
    return this.successiveMisses;
  }
  updateFoulPointsBy(value) {
    this.foulCounts = value;
  }
  getFoulPoints() {
    return this.foulCounts;
  }
}
module.exports = Player;
