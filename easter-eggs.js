function TicTacToe() {
  const initialBoard = () => {
    return [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  };

  this.board = initialBoard();

  const makeRowBoard = (row) => {
    return `${row[0]} | ${row[1]} | ${row[2]}`;
  };

  this.drawBoard = () => {
    let currentBoard = "";
    const separation = "---------";

    currentBoard += `\t${makeRowBoard(
      this.board[0]
    )}\n\t${separation}\n\t${makeRowBoard(
      this.board[1]
    )}\n\t${separation}\n\t${makeRowBoard(this.board[2])}`;

    return currentBoard;
  };

  const boardGame = () => {
    let boardPlay = "";
    const player = getCurrentPlayer();
    const initialMessage = `It's ${player} turn!`;
    console.clear();
    boardPlay += `\n\t${initialMessage}\n\n${this.drawBoard()}`;
    console.log(boardPlay);
  };

  const makeMove = (coordX, coordY) => {
    this.board[coordY][coordX] = getCurrentPlayer();
  };

  this.currentPlayer = true;
  const getCurrentPlayer = () => {
    return this.currentPlayer ? "O" : "X";
  };

  this.winner = null;

  const findWinner = (player, coordX, coordY) => {
    const currentMove = player;
    this.winner = currentMove;
    let posX = coordX;
    let posY = coordY;
    let cont = 0;
    for (let i = 0; i < 3; i++) {
      if (posX > 2) posX = 0;
      if (this.board[posY][posX] === currentMove) cont += 1;
      posX += 1;
    }

    if (cont === 3) return true;

    posX = coordX;
    posY = coordY;
    cont = 0;
    for (let i = 0; i < 3; i++) {
      if (posY > 2) posY = 0;
      if (this.board[posY][posX] === currentMove) cont += 1;
      posY += 1;
    }

    if (cont === 3) return true;

    if (
      this.board[0][0] === currentMove &&
      this.board[2][2] === currentMove &&
      this.board[1][1] === currentMove
    )
      return true;
    if (
      this.board[2][0] === currentMove &&
      this.board[0][2] === currentMove &&
      this.board[1][1] === currentMove
    )
      return true;

    this.winner = null;
    return false;
  };

  this.play = (coordX, coordY) => {
    console.clear();
    makeMove(coordX, coordY);
    const player = getCurrentPlayer();
    this.currentPlayer = !this.currentPlayer;
    boardGame();
    const isWinner = findWinner(player, coordX, coordY);
    if (isWinner) console.log(`${this.winner} has won!!!`);
  };

  this.start = () => {
    boardGame();
  };
}

function Marquee(message, size) {
  this.marquee;
  let fullMessage = " ".repeat(size) + message;
  let index = 1;

  const animate = () => {
    const marqueeAux = fullMessage.slice(index, fullMessage.length);
    this.marquee = `${marqueeAux}${" ".repeat(index)}`;
    console.clear();
    console.log(this.marquee);
    index += 1;
  };

  this.render = () => {
    return setInterval(animate, 500);
  };

  this.start = () => {
    const interval = this.render();
    setTimeout(() => {
      clearInterval(interval);
    }, 500 * fullMessage.length);
  };
}

function Clock() {
  this.time = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    console.log(
      `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`
    );
  };

  const makeInterval = () => {
    return setInterval(() => {
      console.clear();
      this.time();
    }, 1000);
  };

  let interval;

  this.start = () => {
    interval = makeInterval();
    window.addEventListener("click", () => {
      clearInterval(interval);
      console.clear();
      console.log("Let's keep playing!");
    });
  };
}

function NumberFormatter(size, ...args) {
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

  this.start = () => {
    console.clear();
    return (number) => {
      return this.play(number);
    };
  };
}

function Loader(frames = ["|", "/", "-", "\\"]) {
  this.frames = frames;
  let index = 0;

  const animate = () => {
    if (index >= this.frames.length) index = 0;
    console.clear();
    console.log(this.frames[index]);
    index += 1;
  };

  this.render = () => {
    return setInterval(animate, 250);
  };

  this.load = () => {
    const interval = this.render();
    return interval;
  };
}

function EasterEgg(game, ...args) {
  this.loader = new Loader();
  this.snippet;
  let interval;

  switch (game) {
    case "clock":
      interval = this.loader.load();
      setTimeout(() => {
        clearInterval(interval);
        this.snippet = new Clock();
        this.snippet.start();
      }, 3000);
      break;

    case "tic tac toe":
      interval = this.loader.load();
      setTimeout(() => {
        clearInterval(interval);
        this.snippet = new TicTacToe();
        this.snippet.start();
      }, 3000);
      break;

    case "marquee":
      interval = this.loader.load();
      setTimeout(() => {
        clearInterval(interval);
        this.snippet = new Marquee(...args);
        this.snippet.start();
      }, 3000);
      break;

    case "number formatter":
      interval = this.loader.load();
      setTimeout(() => {
        clearInterval(interval);
        const numberFormatter = new NumberFormatter(...args);
        this.snippet = numberFormatter.start();
      }, 3000);
      break;

    default:
      break;
  }
}
