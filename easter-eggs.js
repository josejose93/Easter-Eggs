function TicTacToe() {}

function Marquee() {}

function Loader(frames = ["|", "/", "-", "\\"]) {
  this.frames = frames;
  let index = 0;

  const animate = () => {
    if (index >= this.frames.length) index = 0;
    console.clear();
    console.log(this.frames[index]);
    index += 1;
  };

  this.render = function () {
    return setInterval(animate, 250);
  };

  this.load = () => {
    const interval = this.render();
    setTimeout(() => {
      clearInterval(interval);
      console.clear();
    }, 3000);
  };
}

function Clock() {}

function numberFormatter(size, ...args) {
  this.size = size;
  this.collection = [...args][0];

  this.play = (number) => {
    let len = this.collection.length;
    for (let i = 0; i < len; i++) {
      if (this.size ** i > number) {
        const position = i - 1;
        return (
          Math.floor(number / this.size ** position) + this.collection[position]
        );
      }
    }
    return (
      Math.floor(number / this.size ** (len - 1)) + this.collection[len - 1]
    );
  };
}

function EasterEgg(game, ...args) {
  this.loader = new Loader();
  const interval = this.loader.load();
  clearInterval(interval);

  this.game;
  this.snippet;

  const listGames = {
    "clock": Clock,
    "number formatter": numberFormatter,
    "tic tac toe": TicTacToe,
    "marquee": Marquee
  };

  this.game = new listGames[game](...args);
  this.snippet = this.game.play;
}
