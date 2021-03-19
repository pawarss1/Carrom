const Board = require("./Board");
const Player = require("./Player");

const typeOfObj = { Board, Player };

try {
  function createInstance(type, attributes) {
    const objType = typeOfObj[type];
    return new objType(attributes);
  }
} catch (err) {
  return null;
}
module.exports.createInstance = createInstance;
