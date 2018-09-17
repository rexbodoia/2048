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
  text.setAttribute('fill', 'rgb(60,60,60)');

  let textNode = document.createTextNode(value);

  text.appendChild(textNode);

  return text;
}
