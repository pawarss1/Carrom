/*
    Developer- Sanidhya Pawar
    Start Date- 12:00 PM, 14th March, 2021.
    Last Modified Date- 12:19 PM, 19th March, 2021.
    Test Method- ./Tests/test.js
    Command to start the service- "node Main"
    Objective- To simulate the carrom board game with mentioned conditions in the assignment.
    Design Pattern Followed- Factory Design Pattern
    ------------------------------------------------------------------------------------------------------------------------------------------
*/
const CreateInstancesFactory = require("./CreateInstancesFactory");
const DataPreProcessing = require("./DataPreProcessing");

//Initialize all the details
try {
  //Static class to get the structured input from file.
  const reponseObj = DataPreProcessing.getInputFromFile("InputFile.txt");
  if (!reponseObj.success) {
    console.log(
      "Error while parsing the input file, maybe due to improper input format, Please check Readme file for better understanding."
    );
  } else {
    //Board constructor takes in two parameters, number of black coins and number of red coins
    const newBoard = CreateInstancesFactory.createInstance("Board", [
      reponseObj.coins["Black"],
      reponseObj.coins["Red"],
    ]);

    /*
    Player constructor takes in one parameter, Player Serial Number or Id. 
    This should be same as # mentioned in the input file 
    */

    //This factory returns the instance of the Player Class; with ID as parameter.
    const Player1 = CreateInstancesFactory.createInstance("Player", [1]);
    const Player2 = CreateInstancesFactory.createInstance("Player", [2]);

    const inputArr = reponseObj.inputArr;
    let winner = null;
    let response = { draw: false, win: false };
    console.log(`Intermediate Scorings: `);

    for (let i = 0; i < inputArr.length; i++) {
      //Method to handle all the conditions, constraints and simulate the process.
      response = newBoard.simulate(
        inputArr[i][1],
        inputArr[i][0] === 1 ? Player1 : Player2,
        inputArr[i][0] === 1 ? Player2 : Player1
      );
      if (response.draw || response.win) {
        winner = inputArr[i][0];
        break;
      }
      console.log(
        `Player1: ${Player1.getPoints()}  Player2: ${Player2.getPoints()}`
      );
    }
    if (response.draw) {
      console.log(
        `Match Drawn. Final Score- ${Player1.getPoints()}:${Player2.getPoints()}`
      );
    } else if (response.win) {
      console.log(
        `Player${winner} won the game. Final Score- ${
          winner === 1 ? Player1.getPoints() : Player2.getPoints()
        }:${winner === 1 ? Player2.getPoints() : Player1.getPoints()}`
      );
    } else {
      /*
        "When the coins are exhausted on the board, if the highest scorer is not leading by, at
        least, 3 points or does not have a minimum of 5 points, the game is considered a draw"
        As in the condition, it is mentioned only when the coins are exhausted, then can a match be drawn,
        but lets say we have set of input where in the coins are not exhausted, or the input is incomplete
        in that case, we cant come to a conclusion.
      */
      console.log(
        `Couldn't reach to any conclusion with the given input..(Can be considered as Match drawn, but kept a seperate case for more clarity). Final Score: Player1: ${Player1.getPoints()} : Player2: ${Player2.getPoints()}`
      );
    }
  }
} catch (err) {
  console.log("Technical Issue or exception " + err);
}
