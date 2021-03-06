function moveAll(board, direction) {
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      let tile = board.grid[row][col];
      if (tile != null) {
        board.update(direction);
      }
    }
  }
  if(!board.noMoves()) {
    board.generateNewTile();
  }
  if (document.getElementById('instructions')) {
    document.getElementById('instructions').remove();
  }
}

Board.prototype.update = function(dir) {
  switch (dir) {
    case 'left':
    for (let row = 0; row < board.size; row++) {
      for (let col = 1; col < board.size; col++) {
        let tile = this.grid[row][col];
        if (tile != null) {
          while(col > 0 && this.grid[row][col - 1] == null) {
            tile.moveOne(row, col, board, dir);
            this.grid[row][col - 1] = tile;
            tile = this.grid[row][col - 1];
            this.grid[row][col] = null;
            tile.col -= 1;
            col -= 1;
          }
          if (col > 0 && equalNumbers(tile, this.grid[row][col - 1])) {
            tile.moveOne(row, col, board, dir);
            merge(tile, this.grid[row][col - 1], board);
         }
        }
      }
    }
    break;
    case 'right':
    for (let row = 0; row < board.size; row++) {
      for (let col = board.size - 2; col >= 0; col--) {
        let tile = this.grid[row][col];
        if (tile != null) {
          while(col < board.size - 1 && this.grid[row][col + 1] == null) {
            tile.moveOne(row, col, board, dir);
            this.grid[row][col + 1] = tile;
            tile = this.grid[row][col + 1];
            this.grid[row][col] = null;
            tile.col += 1;
            col += 1;
          }
          if (col < board.size - 1 && equalNumbers(tile, this.grid[row][col + 1])) {
            tile.moveOne(row, col, board, dir);
            merge(tile, this.grid[row][col + 1], board);
         }
        }
      }
    }
    break;
    case 'up':
    for (let col = 0; col < board.size; col++) {
      for (let row = 1; row < board.size; row++) {
        let tile = this.grid[row][col];
        if (tile != null) {
          while(row > 0 && this.grid[row - 1][col] == null) {
            tile.moveOne(row, col, board, dir);
            this.grid[row - 1][col] = tile;
            tile = this.grid[row - 1][col];
            this.grid[row][col] = null;
            tile.row -= 1;
            row -= 1;
          }
          if (row > 0 && equalNumbers(tile, this.grid[row - 1][col])) {
            tile.moveOne(row, col, board, dir);
            merge(tile, this.grid[row - 1][col], board);
         }
        }
      }
    }
    break;
    case 'down':
      for (let col = 0; col < board.size; col++) {
        for (let row = board.size - 2; row >= 0; row--) {
        let tile = this.grid[row][col];
        if (tile != null) {
          while(row < board.size - 1 && this.grid[row + 1][col] == null) {
            tile.moveOne(row, col, board, dir);
            this.grid[row + 1][col] = tile;
            tile = this.grid[row + 1][col];
            this.grid[row][col] = null;
            tile.row += 1;
            row += 1;
          }
          if (row < board.size - 1 && equalNumbers(tile, this.grid[row + 1][col])) {
            tile.moveOne(row, col, board, dir);
            merge(tile, this.grid[row + 1][col], board);
         }
        }
      }
    }
    break;
  }
  if (board.noMoves()) {
    board.gameOver = true;
  }
}

NumberTile.prototype.moveOne = function(row, col, board, dir) {
  let intr;
  let counter = 0;
  switch (dir) {
    case 'left':
      intr = setInterval(() => {
        this.tile.setAttribute('x', parseInt(this.tile.getAttribute('x')) - 4);
        this.number.setAttribute('x', parseInt(this.number.getAttribute('x')) - 4);
        this.left -= 4;
        this.right -= 4;
        counter += 1;
        if (counter === board.tileSize / 4) {
          clearInterval(intr);
        }
      }, 1);
      break;
    case 'right':
      intr = setInterval(() => {
        this.tile.setAttribute('x', parseInt(this.tile.getAttribute('x')) + 4);
        this.number.setAttribute('x', parseInt(this.number.getAttribute('x')) + 4);
        this.left += 4;
        this.right += 4;
        counter += 1;
        if (counter === board.tileSize / 4) {
          clearInterval(intr);
        }
      }, 1);
      break;
    case 'up':
      intr = setInterval(() => {
        this.tile.setAttribute('y', parseInt(this.tile.getAttribute('y')) - 4);
        this.number.setAttribute('y', parseInt(this.number.getAttribute('y')) - 4);
        this.top -= 4;
        this.bottom -= 4;
        counter += 1;
        if (counter === board.tileSize / 4) {
          clearInterval(intr);
        }
      }, 1);
      break;
    case 'down':
      intr = setInterval(() => {
        this.tile.setAttribute('y', parseInt(this.tile.getAttribute('y')) + 4);
        this.number.setAttribute('y', parseInt(this.number.getAttribute('y')) + 4);
        this.top += 4;
        this.bottom += 4;
        counter += 1;
        if (counter === board.tileSize / 4) {
          clearInterval(intr);
        }
      }, 1);
      break;
  }
}

function merge(first, second, board) {
  let newNum = parseInt(first.number.innerHTML) * 2;
  board.score += newNum;

  if (newNum > board.largest) {
    setBackground(newNum);
    board.largest = newNum;
  }

  if (newNum === 2048) {
    board.gameOver = true;
  }
  else {
    let row = second.row;
    let col = second.col;
    board.grid[row][col] = new NumberTile(board, newNum, row, col);
    board.grid[first.row][first.col] = null;
    first.group.remove();
    second.group.remove();
  }
}

function setBackground(number) {
  switch (number) {
    case 4:
      document.body.style.backgroundColor = "rgb(190,190,255)";
      break;
    case 8:
      document.body.style.backgroundColor = "rgb(190,255,190)";
      break;
    case 16:
    document.body.style.backgroundColor = "rgb(255,190,190)";
      break;
    case 32:
    document.body.style.backgroundColor = "rgb(140,140,255)";
      break;
    case 64:
    document.body.style.backgroundColor = "rgb(140,255,140)";
      break;
    case 128:
    document.body.style.backgroundColor = "rgb(255,140,140)";
      break;
    case 256:
    document.body.style.backgroundColor = "rgb(100,100,255)";
      break;
    case 512:
    document.body.style.backgroundColor = "rgb(100,255,100)";
      break;
    case 1024:
    document.body.style.backgroundColor = "rgb(255,100,100)";
      break;
    case 2048:
    document.body.style.backgroundColor = "rgb(255,0,0)";
      break;
  }
}
