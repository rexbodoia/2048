const svgns = "http://www.w3.org/2000/svg";
const canvas = document.getElementById('myCanvas');
const length = 480;

function Board(size) {
  this.size = size;
  this.x = window.innerWidth / 2 - length / 2 - 10;
  this.y = 150;
  this.tileSize = length / size;

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
  let count = 0;

  while (count < 2) {
    let col = randomNumber(this.size);
    let row = randomNumber(this.size);
    let num = Math.floor(Math.random() * 4);

    if(this.grid[row][col] != null) continue;

    if (num < 3) {
      num = 2;
    } else {
      num = 4;
    }

    this.grid[row][col] = new NumberTile(this, num, row, col);
    count += 1;
  }
}

function NumberTile(board, number, row, col) {
  this.row = row;
  this.col  = col;

  let [x, y] = indexToLocation(board, row, col);
  this.left = x;
  this.top = y;
  this.right = this.left + board.tileSize;
  this.bottom = this.top + board.tileSize;

  this.tile = createFrontTile(x, y, board.tileSize);

  switch (number) {
    case 2:
      this.tile.setAttribute('class', 'two-tile');
      this.number = createNumber(x, y, 2);
      break;
    case 4:
      this.tile.setAttribute('class', 'four-tile');
      this.number = createNumber(x, y, 4);
      break;
    case 8:
      this.tile.setAttribute('class', 'eight-tile');
      this.number = createNumber(x, y, 8);
      break;
    case 16:
      this.tile.setAttribute('class', 'sixteen-tile');
      this.number = createNumber(x, y, 16);
      break;
    case 32:
      this.tile.setAttribute('class', 'thirty-two-tile');
      this.number = createNumber(x, y, 32);
      break;
    case 64:
      this.tile.setAttribute('class', 'sixty-four-tile');
      this.number = createNumber(x, y, 64);
      break;
    case 128:
      this.tile.setAttribute('class', 'one-twenty-eight');
      this.number = createNumber(x, y, 128);
      break;
    case 256:
      this.tile.setAttribute('class', 'two-fifty-six');
      this.number = createNumber(x, y, 256);
      break;
    case 512:
      this.tile.setAttribute('class', 'five-twelve');
      this.number = createNumber(x, y, 512);
      break;
    case 1024:
      this.tile.setAttribute('class', 'ten-twenty-four');
      this.number = createNumber(x, y, 1024);
      break;
    case 2048:
      this.tile.setAttribute('class', 'twenty-forty-eight');
      this.number = createNumber(x, y, 2048);
      break;
  }

  this.group = document.createElementNS(svgns, 'g');

  this.group.appendChild(this.tile);
  this.group.appendChild(this.number);

  canvas.appendChild(this.group);
}

function indexToLocation(board, row, col) {
  const x = board.x;
  const y = board.y;
  const tileSize = board.tileSize;

  return [x + tileSize * col, y + tileSize * row];
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

function createNumber(x, y, value) {
  let text = document.createElementNS(svgns, 'text');

  if (value < 10) {
    x = parseInt(x) + 37;
    y = parseInt(y) + 89;
    text.setAttribute('class', 'text');
  } else if (value < 100) {
    x = parseInt(x) + 14;
    y = parseInt(y) + 89;
    text.setAttribute('class', 'text');
  } else if (value < 1000) {
    x = parseInt(x) + 9;
    y = parseInt(y) + 81;
    text.setAttribute('class', 'three-digit-text');
  } else {
    x = parseInt(x) + 9;
    y = parseInt(y) + 77;
    text.setAttribute('class', 'four-digit-text');
  }

  text.setAttribute('x', x);
  text.setAttribute('y', y);
  // text.setAttribute('fill', '#C4DFE6');
  text.setAttribute('fill', 'rgb(60,60,60)');

  let textNode = document.createTextNode(value);

  text.appendChild(textNode);

  return text;
}
