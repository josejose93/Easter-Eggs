function TicTacToe() {
}

function Marquee() {
  
}

function Loader() {
}

function Clock() {
}

function numberFormatter(size, ...args) {
  this.size = size;
  this.collection = [...args][0];
  this.play = (number) => {
    let len = this.collection.length;
    for (let i = 0; i < len; i++) {
      if (this.size ** i > number) {
        const position = i - 1;
        return Math.floor(number / (this.size ** position)) + this.collection[position];
      }
    }
    return Math.floor(number / (this.size ** (len - 1))) + this.collection[len - 1];
  };
}

function EasterEgg(game, ...args) {
  this.game;
  this.snippet;
  const listGames = {
    "number formatter": numberFormatter 
  }
  this.game = new listGames[game](...args);
  this.snippet = this.game.play;
}
