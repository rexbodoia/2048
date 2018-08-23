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

Board.prototype.generateNumbers = function() {
  let count = 0;

  while (count < 2) {
    let col = Math.floor(Math.random() * 4);
    let row = Math.floor(Math.random() * 4);
    let num = Math.floor(Math.random() * 4);

    if(this.grid[col][row] != null) continue;

    if (num < 3) {
      num = 2;
    } else {
      num = 4;
    }

    this.grid[col][row] = new NumberTile(this, num, row, col);
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

  return [x + tileSize * row, y + tileSize * col];
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

  text.setAttribute('class', 'text');
  text.setAttribute('x', parseInt(x) + 37);
  text.setAttribute('y', parseInt(y) + 85);
  text.setAttribute('fill', '#C4DFE6');

  let textNode = document.createTextNode(value);

  text.appendChild(textNode);

  return text;
}

// NumberTile.prototype.x = function(x) {
//   this.x = x;
// }
//
// NumberTile.prototype.y = function(y) {
//   this.y = y;
// }
