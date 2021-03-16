class Board {
  constructor(blackCoinsCount, redCoinsCount) {
    this.blackCoinsCount = blackCoinsCount;
    this.redCoinsCount = redCoinsCount;
  }
  strike(curPlayer) {
    if (this.blackCoinsCount > 0) {
      curPlayer.updatePointsBy(1);
      this.blackCoinsCount -= 1;
      //Whenever a coin is pocketted, set the successive misses counter to 0.
      curPlayer.updateSuccessiveMissesBy(-curPlayer.getSuccessiveMisses());
    }
  }
  multiStrike(curPlayer) {
    if (this.blackCoinsCount > 1) {
      curPlayer.updatePointsBy(2);
      //All coins that were pocketted are kept back onto the board except 2 coins
      this.blackCoinsCount -= 2;
      //Whenever a coin is pocketted, set the successive misses counter to 0.
      curPlayer.updateSuccessiveMissesBy(-curPlayer.getSuccessiveMisses());
    }
  }
  redStrike(curPlayer) {
    if (this.redCoinsCount > 0) {
      curPlayer.updatePointsBy(3);
      this.redCoinsCount -= 1;
      //Whenever a coin is pocketted, set the successive misses counter to 0.
      curPlayer.updateSuccessiveMissesBy(-curPlayer.getSuccessiveMisses());
    }
  }
  strikerStrike(curPlayer) {
    curPlayer.updatePointsBy(-1);
    //If coin is not pocketted, then increment the successive misses count
    curPlayer.updateSuccessiveMissesBy(1);
    //As player looses a point due to this outcome, hence increasing the foul count.
    curPlayer.updateFoulPointsBy(1);
  }
  defunctCoin(curPlayer) {
    if (this.blackCoinsCount > 0) {
      curPlayer.updatePointsBy(-2);
      this.blackCoinsCount -= 1;
      //If coin is not pocketted, then increment the successive misses count
      curPlayer.updateSuccessiveMissesBy(1);
      //As player looses two points due to this outcome, hence increasing the foul count.
      curPlayer.updateFoulPointsBy(1);
    }
  }
  none(curPlayer) {
    curPlayer.updatePointsBy(0);
    //If coin is not pocketted, then increment the successive misses count
    curPlayer.updateSuccessiveMissesBy(1);
  }

  checkForSuccessiveMisses(curPlayer) {
    if (curPlayer.getSuccessiveMisses() === 3) {
      /*
        if successive misses are 3, then a point should be reduced, 
        hence returning true from this method to driver method  
      */
     
      //Initializing the successive miss value to 0 again
      curPlayer.updateSuccessiveMissesBy(-curPlayer.getSuccessiveMisses());
      return true;
    }
    return false;
  }
  checkForFouls(curPlayer) {
    if (curPlayer.getFoulPoints() && curPlayer.getFoulPoints() % 3 === 0) {
      //If the current player fouls 3 times, return true
      return true;
    }
    return false;
  }
  checkForWinningConditions(curPlayer, otherPlayer) {
    if (
      curPlayer.getPoints() >= 5 &&
      curPlayer.getPoints() - otherPlayer.getPoints() >= 3
    ) {
      return true;
    }
    return false;
  }
  checkForDrawOrWinConditions(curPlayer, otherPlayer) {
    const winFlag = this.checkForWinningConditions(curPlayer, otherPlayer);
    if (this.redCoinsCount <= 0 && this.blackCoinsCount <= 0) {
      //Coins are exhausted
      if (winFlag) {
        return {
          win: true,
          draw: false,
        };
      }
      return {
        win: false,
        draw: true,
      };
    }
    if (winFlag) {
      return {
        win: true,
        draw: false,
      };
    }
    return {
      win: false,
      draw: false,
    };
  }
  simulate(outcome, curPlayer, otherPlayer) {
    switch (outcome) {
      case 1:
        this.strike(curPlayer);
        break;
      case 2:
        this.multiStrike(curPlayer);
        break;
      case 3:
        this.redStrike(curPlayer);
        break;
      case 4:
        this.strikerStrike(curPlayer);
        break;
      case 5:
        this.defunctCoin(curPlayer);
        break;
      case 6:
        this.none(curPlayer);
        break;
    }
    if (this.checkForSuccessiveMisses(curPlayer)) {
      curPlayer.updatePointsBy(-1);
    }
    if (this.checkForFouls(curPlayer)) {
      curPlayer.updatePointsBy(-1);
    }
    const response = this.checkForDrawOrWinConditions(curPlayer, otherPlayer);
    if (response.draw || response.win) {
      return response;
    }
    return {
      draw: false,
      win: false,
    };
  }
}
module.exports = Board;
