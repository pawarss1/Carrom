const expect = require("chai").expect;
const Board = require("../Board");
const Player = require("../Player");
const DataPreProcessing = require("../DataPreProcessing");

describe("Unit Testing module for Player Module", () => {
  context(
    "Unit testing for Point variable getter and setter methods",
    function () {
      it("should test getter and setter methods for points instance variable", (done) => {
        const Player1 = new Player(1);
        Player1.updatePointsBy(2);
        expect(2).to.equal(Player1.getPoints());
        done();
      });
    }
  );
  context(
    "Unit testing for successiveMisses variable getter and setter methods",
    function () {
      it("should test getter and setter methods for successiveMisses instance variable", (done) => {
        const Player1 = new Player(1);
        Player1.updateSuccessiveMissesBy(2);
        expect(2).to.equal(Player1.getSuccessiveMisses());
        done();
      });
    }
  );
  context(
    "Unit testing for foulCounts variable getter and setter methods",
    function () {
      it("should test getter and setter methods for foulCounts instance variable", (done) => {
        const Player1 = new Player(1);
        Player1.updateFoulPointsBy(2);
        expect(2).to.equal(Player1.getFoulPoints());
        done();
      });
    }
  );
});

describe("Unit Testing module for Board Module", () => {
  context("Unit testing for Board class methods", function () {
    it("should test all the 6 outcomes", (done) => {
      const newBoard = new Board(9, 5);
      const PlayerTemp1 = new Player(1);
      const PlayerTemp2 = new Player(2);
      newBoard.strike(PlayerTemp1);
      newBoard.multiStrike(PlayerTemp1);
      newBoard.redStrike(PlayerTemp1);
      newBoard.strikerStrike(PlayerTemp1);
      newBoard.defunctCoin(PlayerTemp1);
      newBoard.none(PlayerTemp1);
      newBoard.checkForSuccessiveMisses(PlayerTemp1);
      newBoard.checkForFouls(PlayerTemp1);
      newBoard.checkForDrawOrWinConditions(PlayerTemp1, PlayerTemp2);
      newBoard.simulate(1, PlayerTemp1, PlayerTemp2);
      done();
    });
  });
  context("Unit testing for Board class methods", function () {
    it("should test for draw condition", (done) => {
      const newBoard = new Board(1, 1);
      const PlayerTemp1 = new Player(1);
      const PlayerTemp2 = new Player(2);
      newBoard.simulate(1, PlayerTemp1, PlayerTemp2);
      const response = newBoard.simulate(3, PlayerTemp2, PlayerTemp1);
      expect(response.draw).to.equal(true);
      done();
    });
  });
  context("Unit testing for Board class methods", function () {
    it("should test for Player1 win condition", (done) => {
      const newBoard = new Board(3, 1);
      const PlayerTemp1 = new Player(1);
      const PlayerTemp2 = new Player(2);
      newBoard.simulate(1, PlayerTemp1, PlayerTemp2);
      newBoard.simulate(4, PlayerTemp2, PlayerTemp1);
      newBoard.simulate(3, PlayerTemp1, PlayerTemp2);
      newBoard.simulate(4, PlayerTemp2, PlayerTemp1);
      newBoard.simulate(1, PlayerTemp1, PlayerTemp2);
      newBoard.simulate(4, PlayerTemp2, PlayerTemp1);
      const response = newBoard.simulate(1, PlayerTemp1, PlayerTemp2);
      expect(response.win).to.equal(true);
      done();
    });
  });
});

describe("Unit Testing module for Data Pre Processing Module", () => {
  context("Unit testing for testing data preprocessing methods", function () {
    it("should test fetching input from file", (done) => {
      const response = DataPreProcessing.getInputFromFile("InputFile.txt");
      expect(response.success).to.equal(true);
      done();
    });
  });
  context("Unit testing for testing data preprocessing methods", function () {
    it("should give error and handle it while fetching input from wrong file", (done) => {
      const response = DataPreProcessing.getInputFromFile("InputFile123.txt");
      expect(response.success).to.equal(false);
      done();
    });
  });
  context("Unit testing for testing data preprocessing methods", function () {
    it("should give error and handle it while fetching incorrect input", (done) => {
      const response = DataPreProcessing.getInputFromFile(`${__dirname}/InputFileTest.txt`);
      expect(response.success).to.equal(false);
      done();
    });
  });
  context("Unit testing for testing data preprocessing methods", function () {
    it("should give error and handle it while fetching incorrect input sequence, it should be strictly in alternating pattern", (done) => {
      const response = DataPreProcessing.getInputFromFile(`${__dirname}/InputFileIncorrectSequence.txt`);
      expect(response.success).to.equal(false);
      done();
    });
  });
});
