// const canvas = document.getElementById('myCanvas');

function moveAll(board, direction) {
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      let tile = board.grid[row][col];
      if (tile != null) {
        board.update(direction);
      }
    }
  }
  board.generateNewTile();
}

function equalNumbers(first, second) {
  return first.number.innerHTML == second.number.innerHTML;
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
            merge(tile, this.grid[row + 1][col], board);
         }
        }
      }
    }
    break;
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
  let row = second.row;
  let col = second.col;
  board.grid[row][col] = new NumberTile(board, newNum, row, col);
  board.grid[first.row][first.col] = null;
  first.group.remove();
  second.group.remove();
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
  }

  this.grid[row][col] = new NumberTile(this, num, row, col);
}
