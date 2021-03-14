const fs = require("fs");

class DataPreProcessing {
  static playerTurn = 1;
  static checkIfValid(playerNum, outcome) {
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
  static getInputFromFile(filePath) {
    try {
      // read contents of the file
      const data = fs.readFileSync(filePath, "UTF-8");

      // split the contents by new line
      const lines = data.split(/\r?\n/);

      // split the file to get structured data as per the requirements
      let inputArrResponse = [];
      for (let i = 0; i < lines.length; i++) {
        const inputArr = lines[i].split(">");
        if (this.checkIfValid(inputArr[0], inputArr[1])) {
          inputArrResponse.push([Number(inputArr[0]), Number(inputArr[1])]);
        } else {
          return {
            inputArr: [],
            success: false,
          };
        }
      }
      return {
        inputArr: inputArrResponse,
        success: true,
      };
    } catch (err) {
      return {
        inputArr: [],
        success: false,
      };
    }
  }
}
module.exports = DataPreProcessing;
