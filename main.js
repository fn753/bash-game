const prompt = require('prompt-sync')({sigint: true});
const term = require('terminal-kit').terminal;

const hat = '^';
const hole = 'O'; 
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor() {
    this.field;
    this.row = 0;
    this.col = 0;
  }

  print() {
    term.clear();
    this.field.forEach(row=>{
      console.log(row.join(''));
    });
  }

  move() {
    const move = prompt('Which way? ');
    if (move === 'r') {
      this.col += 1;
      this.printPathCharacter();
    } else if (move === 'l') {
      this.col -= 1;
      this.printPathCharacter();
    } else if (move === 'd') {
      this.row += 1;
      this.printPathCharacter();
    } else if (move === 'u') {
      this.row -= 1;
      this.printPathCharacter();
    } else {
      console.log('Incorrect move! Flying is not allowed.');
    }
  }

  printPathCharacter() {
    if (!this.gameLost() && !this.gameWon()) {
        this.field[this.row][this.col] = pathCharacter;
    }
  }

  gameWon() {
    if (this.field[this.row][this.col] === hat) {
      return true;
    } else {
      return false;
    }
  }

  gameLost() {
    if (this.row === -1 || this.row >= this.field.length || this.col === -1 || this.col >= this.field[this.row].length) {
      return 1;
    } else if (this.field[this.row][this.col] === hole) {
      return 2;
    } else {
      return false;
    }
  }

  game() {
    this.generateField(5,5);
    this.print();
    while (!this.gameLost() && !this.gameWon()) {
      this.move();
      this.print();
    }
    if (this.gameLost() === 1) {
      term.red('You crossed the boundary! GAME OVER!\n')
    } else if (this.gameLost() === 2) {
      term.red('You fell into a hole! GAME OVER!\n');
    } else if (this.gameWon()) {
      term.green('You found the hat!\n');
    }
  }

  generateField(height, width) {
    // create an empty array 
    this.field = new Array(height); 
    for (let i = 0; i < this.field.length; i++) { 
        this.field[i] = new Array(width);
    } 

    // fill array with field characters
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        this.field[i][j] = fieldCharacter;
      }
    }

    // set start location
    this.field[0][0] = pathCharacter;

    // set hat
    let hatRow = this.getRandomField(height);
    let hatCol = this.getRandomField(width);
    while (this.field[hatRow][hatCol] === this.field[0][0]) {
      let hatRow = this.getRandomField(height);
      let hatCol = this.getRandomField(width);
    }
    this.field[hatRow][hatCol] = hat;

    // set holes
    const numberHoles = (0.2 * height * width);
    for (let i = 0; i < numberHoles; i++) {
      let holeRow = this.getRandomField(height);
      let holeCol = this.getRandomField(width);
      if (this.field[holeRow][holeCol] !== this.field[0][0] && this.field[holeRow][holeCol] !== hat) {
         this.field[holeRow][holeCol] = hole;
      }
    }
  }

  getRandomField(num) {
    return Math.floor(Math.random() * num);
  }
}

const fieldOne = new Field();
fieldOne.game();