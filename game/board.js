const length = 480;

function Board(size) {
  this.size = size;
  this.x = window.innerWidth / 2 - length / 2 - 10;
  this.y = 131;
  this.tileSize = length / size;
  this.largest = 2;

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
