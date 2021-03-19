const fs = require("fs");

class DataPreProcessing {
  //Assumption- Player1 will go first
  static playerTurn = 1; 

  static checkIfValid(playerNum, outcome) {
    //Check for alternating input and valid outcome number
    if (
      this.playerTurn !== Number(playerNum) ||
      Number(outcome) > 6 ||
      Number(outcome) <= 0
    ) {
      return false;
    }
    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
    return true;
  }
  
  static checkIfValidCoinsParser(inputArr) {
    try {
      for(let i = 0; i < inputArr.length; i++) {
        const coinCount = inputArr[i].split('>')
        if(isNaN(coinCount[1])) {
          return false;
        }

        if(Number(coinCount[1]) <= 0) {
          return false;
        }
      }
      return true;
    }
    catch(err) {
      return false;
    }
  }

  static getInputFromFile(filePath) {
    try {
      // read contents of the file
      const data = fs.readFileSync(filePath, "UTF-8");

      // split the contents by new line
      const lines = data.split(/\r?\n/);

      // split the file to get structured data as per the requirements
      let inputArrResponse = [];
      if(!this.checkIfValidCoinsParser(lines.slice(0, 2))) {
        return {
          inputArr: [],
          success: false,
          coins: null,
        }; 
      }
      //If we are at this point, this means that the input is Parsed is validated!
      const coins = {
        "Black": lines[0].split(">")[1],
        "Red": lines[1].split(">")[1],
      } 

      for (let i = 2; i < lines.length; i++) {
        const inputArr = lines[i].split(">");
        if (this.checkIfValid(inputArr[0], inputArr[1])) {
          inputArrResponse.push([Number(inputArr[0]), Number(inputArr[1])]);
        } else {
          return {
            inputArr: [],
            coins: null,
            success: false,
          };
        }
      }
      return {
        inputArr: inputArrResponse,
        success: true,
        coins: coins,
      };
    } catch (err) {
      return {
        inputArr: [],
        success: false,
        coins: null,
      };
    }
  }
}
module.exports = DataPreProcessing;
