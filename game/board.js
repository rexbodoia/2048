const svgns = "http://www.w3.org/2000/svg";
const canvas = document.getElementById('myCanvas');
const length = 480;

function Board(size) {
  this.size = size;
  this.gridSize = length / size;
  this.x = window.innerWidth / 2 - length / 2 - 10;
  this.y = 150;
  this.tileSize = length / size;

  this.grid = new Array(size);

  for (let i = 0; i < size; i++) {
    this.grid[i] = new Array(size);
  }

  for (let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      backgroundTile(this.x + i * this.tileSize, this.y + j * this.tileSize, this.gridSize);
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

function generateNumbers(board) {
  let col = Math.floor(Math.random() * 4);
  let row = Math.floor(Math.random() * 4);
  let num = Math.floor(Math.random() * 4);

  if (num < 3) {
    num = 2;
  } else {
    num = 4;
  }

  board.grid[col][row] = new NumberTile(board, num, row, col);
}


function NumberTile(board, number, row, col) {
  let [x, y] = indexToLocation(board, row, col);
  console.log(x, y);

  this.tile = createFrontTile(x, y, board.tileSize);

  switch (number) {
    case 2:
      this.tile.setAttribute('class', 'two-tile');
      this.number = createNumber(x, y, 2);
      break;
    case 2:
      this.tile.setAttribute('class', 'four-tile');
      this.number = createNumber(x, y, 4);
      break;
  }

  this.group = document.createElementNS(svgns, 'g');

  this.group.appendChild(this.tile);
  this.group.appendChild(this.number);

  canvas.appendChild(this.group);
  return this.group;
}

function indexToLocation(board, row, col) {
  const gridSize = board.gridSize;
  const x = board.x;
  const y = board.y;
  const tileSize = board.tileSize;
  console.log(gridSize);

  return [(x + tileSize) * col, (y + tileSize * row)];
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





















let rand = Math.floor(Math.random() * 8);

function createRect(x, y) {
  let rect = document.createElementNS(svgns, 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('rx', 20);
  rect.setAttribute('ry', 20);
  rect.setAttribute('height', 113);
  rect.setAttribute('width', 113);
  rect.setAttribute('class', 'tile');

  return rect;
}

function createGroup(idx, rect) {
  let group = document.createElementNS(svgns, 'g');

  group.setAttribute('id', `${idx}`);
  group.setAttribute('class', 'group');

  group.appendChild(rect);

  return group;
}

function createInitialBoard() {
  let idx = 1;
  for (let x = 456; x < 950; x += 125) {
    for (let y = 156; y < 650; y += 125) {
      let row = (y - 150) / 125;
      let col = (x - 450) / 125;

      let rect = createRect(x, y);
      let group = createGroup(idx, rect);

      canvas.appendChild(group);
      idx += 1;
    }
  }
  generateNums(rand, idx);
}

const generateNums = () => {
  let count = 0;

  while (count < 2) {
    if (Math.floor(Math.random() * 8) === rand) {
      let idx = Math.floor(Math.random() * 16 + 1);
      let group = document.getElementById(`${idx}`);

      if (group.children.length === 1) {
        let square = createRect(group.children[0].getAttribute('x'), group.children[0].getAttribute('y'));
        group.appendChild(square);

        let value = (Math.floor(Math.random() * 2) + 1) * 2;
        group.appendChild(createNumber(square, value));
        count += 1;
      }
    }
  }
}
