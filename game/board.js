const length = 480;
const width = window.innerWidth;
const height = window.innerHeight;

function createCanvas() {
  const canvas = document.createElementNS(svgns, 'svg');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.getElementsByTagName('body')[0].appendChild(canvas);
}

function Board(size) {
  this.size = size;
  this.x = window.innerWidth / 2 - length / 2 - 10;
  this.y = 131;
  this.tileSize = length / size;
  this.largest = 2;
  this.gameOver = false;
  this.score = 0;

  this.grid = new Array(size);

  for (let i = 0; i < size; i++) {
    this.grid[i] = new Array(size);
  }

  for (let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      backgroundTile(this.x + i * this.tileSize, this.y + j * this.tileSize, this.tileSize);
    }
  }
}

function backgroundTile(x, y, size) {
  let backTile = document.createElementNS(svgns, 'rect');

  backTile.setAttribute('x', x);
  backTile.setAttribute('y', y);
  backTile.setAttribute('width', size);
  backTile.setAttribute('height', size);
  backTile.setAttribute('class', 'background-back-tile');

  let frontTile =  createFrontTile(x, y, size);
  frontTile.setAttribute('class', 'background-front-tile');

  let group = document.createElementNS(svgns, 'g');

  group.appendChild(backTile);
  group.appendChild(frontTile);

  const canvas = document.getElementById('myCanvas');
  canvas.appendChild(group);
  return group;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

Board.prototype.generateNumbers = function() {
  for (let i = 0; i < 2; i++) {
    this.generateNewTile();
  }
}

Board.prototype.generateNewTile = function() {
  let [row, col] = [randomNumber(this.size), randomNumber(this.size)];

  while (this.grid[row][col] != null) {
    [row, col] = [randomNumber(this.size), randomNumber(this.size)];
  }

  let num = Math.floor(Math.random() * 4);

  if (num < 3) {
    num = 2;
  } else {
    num = 4;
    if (this.largest === 2) {
      this.largest = 4;
    }
  }

  this.grid[row][col] = new NumberTile(this, num, row, col);
}

Board.prototype.noMoves = function() {
  let noMoves = true;
  for (let row = 0; row < this.size; row++) {
    for (let col = 0; col < this.size; col++) {
      if (this.grid[row][col] == null) return false;

      if (col - 1 >= 0 && (this.grid[row][col - 1] == null || equalNumbers(this.grid[row][col], this.grid[row][col - 1]))) {
        moves = false;
      } else if (col + 1 < board.size && (this.grid[row][col + 1] == null || equalNumbers(this.grid[row][col], this.grid[row][col + 1]))) {
        moves = false;
      } else if (row - 1 >= 0 && (this.grid[row - 1][col] == null || equalNumbers(this.grid[row][col], this.grid[row - 1][col]))) {
        moves = false;
      } else if (row + 1 < board.size && (this.grid[row + 1][col] == null || equalNumbers(this.grid[row][col], this.grid[row + 1][col])))
        moves = false;
    }
  }

  return noMoves;
}

function equalNumbers(first, second) {
  return first.number.innerHTML == second.number.innerHTML;
}

function createFrontTile(x, y, size) {
  let frontTile = document.createElementNS(svgns, 'rect');

  frontTile.setAttribute('x', x + 6);
  frontTile.setAttribute('y', y + 6);
  frontTile.setAttribute('rx', 20);
  frontTile.setAttribute('ry', 20);
  frontTile.setAttribute('width', size - 12);
  frontTile.setAttribute('height', size - 12);

  return frontTile;
}
