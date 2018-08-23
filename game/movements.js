// const canvas = document.getElementById('myCanvas');

function moveAll(board, direction) {
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      let tile = board.grid[row][col];
      if (tile != null) {
        tile.move(row, col, board, direction);
      }
    }
  }
}

// function leftObstacles(intr, tile, row, col, board) {
//   for (let i = 1; i < col; i++) {
//     if (board.grid[row][col - i] != null) {
//       if (tile.sameNumber(board.grid[row][col - i])) {
//       } else {
//         clearInterval(intr);
//       }
//     }
//   }
// }

NumberTile.prototype.tileBoundary = function(otherTile, dir) {
  switch (dir) {
    case 'left':
    if (this.left > otherTile.left) {
      return this.left <= otherTile.right;
    }
    case 'right':
    if (this.right < otherTile.right) {
      return this.right >= otherTile.left;
    }
    case 'up':
    if (this.top > otherTile.top) {
      console.log(this.top <= otherTile.bottom);
      return this.top <= otherTile.bottom;
    }
    case 'down':
    if (this.bottom < otherTile.bottom) {
      return this.bottom >= otherTile.top;
    }
  }
}

NumberTile.prototype.sameNumber = function(otherTile) {
  this.number === otherTile.number;
}

NumberTile.prototype.move = function(row, col, board, direction) {
  let intr;
  switch (direction) {
    case 'left':
      intr = setInterval(() => {
        this.tile.setAttribute('x', parseInt(this.tile.getAttribute('x')) - 1);
        this.number.setAttribute('x', parseInt(this.number.getAttribute('x')) - 1);
        this.left -= 1;
        this.right -= 1;
        if (this.tile.getAttribute('x') <= board.x + 6) {
          clearInterval(intr);
        } else {
          for (let i = 0; i < board.size; i++) {
            if(board.grid[row][i] == null) continue;
            if (this.tileBoundary(board.grid[row][i], 'left')){
              clearInterval(intr);
            }
          }
        }
      }, 1);
      break;
    case 'up':
      intr = setInterval(() => {
        this.tile.setAttribute('y', parseInt(this.tile.getAttribute('y')) - 1);
        this.number.setAttribute('y', parseInt(this.number.getAttribute('y')) - 1);
        this.top -= 1;
        this.bottom -= 1;
        if (this.tile.getAttribute('y') <= board.y + 6){
          clearInterval(intr);
        } else {
          for (let i = board.size - 1; i >= 0; i--) {
            if(board.grid[i][col] == null) continue;
            if (this.tileBoundary(board.grid[i][col], 'left')){
              clearInterval(intr);
            }
          }
        }
      }, 1);
      break;
    case 'right':
      intr = setInterval(() => {
        this.tile.setAttribute('x', parseInt(this.tile.getAttribute('x')) + 1);
        this.number.setAttribute('x', parseInt(this.number.getAttribute('x')) + 1);
        this.left += 1;
        this.right += 1;
        if (this.tile.getAttribute('x') >= board.x + length - board.tileSize + 6){
          clearInterval(intr);
        }
      }, 1);
      break;
    case 'down':
      intr = setInterval(() => {
        this.tile.setAttribute('y', parseInt(this.tile.getAttribute('y')) + 1);
        this.number.setAttribute('y', parseInt(this.number.getAttribute('y')) + 1);
        this.top += 1;
        this.bottom += 1;
        if (this.tile.getAttribute('y') >= board.y + length - board.tileSize + 6){
          clearInterval(intr);
        }
      }, 1);
      break;
  }
}












// function moveAll(direction) {
//   for (let i = 1; i <= 16; i++) {
//     let group = document.getElementById(`${i}`);
//     if (group.children.length === 3) {
//       moveEach(group, direction);
//     }
//   }
// }
//
// function moveEach(group, direction) {
//   let grid = document.getElementById('grid');
//   let tile = group.children[1];
//   let number = group.children[2];
//
//   let x = tile.getAttribute('x');
//   let y = tile.getAttribute('y');
//
//   let intr;
//   let newGroup;
//
//   const gridWidth = grid.getAttribute('width');
//   const gridHeight = grid.getAttribute('height');
//   const tileWidth = tile.getAttribute('width');
//   const tileHeight = tile.getAttribute('height');
//
//   let otherNumbers = document.querySelectorAll('.text');
//   let otherTiles = [];
//   for (let i = 0; i < otherNumbers.length; i++) {
//     otherTiles.push(otherNumbers[i].parentNode.children[1]);
//   }
//
//   switch (direction) {
//     case 'left':
//       intr = setInterval(() => {
//         tile.setAttribute('x', parseInt(tile.getAttribute('x')) - 1);
//         number.setAttribute('x', parseInt(number.getAttribute('x')) - 1);
//         console.log('iteration');
//         if (withinBoundaries(tile, grid, 'left')) {
//           // let x = parseInt(grid.getAttribute('x')) + 12;
//           // tile.setAttribute('x', x);
//           // number.setAttribute('x', x + 33);
//           clearInterval(intr);
//           for (let idx = group.getAttribute('id'); idx > 0; idx-=4) {
//             if (idx < 5) {
//               resetGroups(group, idx, tile, number);
//               break;
//             }
//           }
//         }
//       }, 1);
//       break;
//     case 'up':
//       intr = setInterval(() => {
//         tile.setAttribute('y', parseInt(tile.getAttribute('y')) - 1);
//         number.setAttribute('y', parseInt(number.getAttribute('y')) - 1);
//         if (withinBoundaries(tile, grid, 'up')) {
//           // let y = parseInt(grid.getAttribute('y')) + 12;
//           // tile.setAttribute('y', y);
//           // number.setAttribute('y', y + 85);
//           clearInterval(intr);
//           for (let idx = group.getAttribute('id'); idx > 0; idx--) {
//             if (idx % 4 === 1) {
//               resetGroups(group, idx, tile, number);
//               break;
//             }
//           }
//         }
//       }, 1);
//       break;
//     case 'right':
//       intr = setInterval(() => {
//         tile.setAttribute('x', parseInt(tile.getAttribute('x')) + 1);
//         number.setAttribute('x', parseInt(number.getAttribute('x')) + 1);
//         if (withinBoundaries(tile, grid, 'right')) {
//           // let x = parseInt(grid.getAttribute('x')) + parseInt(gridWidth) - 12;
//           // tile.setAttribute('x', x - tileWidth);
//           // number.setAttribute('x', x - 80);
//           clearInterval(intr);
//           for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx+=4) {
//             if (idx > 12) {
//               resetGroups(group, idx, tile, number);
//               break;
//             }
//           }
//         }
//       }, 1);
//       break;
//     case 'down':
//       intr = setInterval(() => {
//         tile.setAttribute('y', parseInt(tile.getAttribute('y')) + 1);
//         number.setAttribute('y', parseInt(number.getAttribute('y')) + 1);
//         if (withinBoundaries(tile, grid, 'down')) {
//           // let y = parseInt(grid.getAttribute('y')) + parseInt(gridHeight) - 12;
//           // tile.setAttribute('y', y - tileHeight);
//           // number.setAttribute('y', y - 28);
//           clearInterval(intr);
//           for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx++) {
//             if (idx % 4 === 0) {
//               resetGroups(group, idx, tile, number);
//               break;
//             }
//           }
//         }
//       }, 1);
//       break;
//     default:
//     break;
//   }
// }
//
// // function resetGroups(group, idx, tile, number) {
// //   let newGroup = document.getElementById(`${idx}`);
// //   group.removeChild(number);
// //   group.removeChild(tile);
// //   newGroup.appendChild(tile);
// //   newGroup.appendChild(number);
// // }
//
// function boundaries(tile) {
//   let left = parseInt(tile.getAttribute('x'));
//   let right = left + parseInt(tile.getAttribute('width'));
//
//   let top = parseInt(tile.getAttribute('y'));
//   let bottom = top + parseInt(tile.getAttribute('height'));
//
//   return { left, right, top, bottom };
// }
//
// function tileBoundary(first, second, dir) {
//   console.log(second);
//   first = boundaries(first);
//   second = boundaries(second);
//
//   switch (dir) {
//     case 'left':
//       if (first.left > second.left) {
//         return first.left <= second.right && first.top === second.top;
//       }
//     case 'right':
//       if (first.right < second.right) {
//         return first.right >= second.left && first.top === second.top;
//       }
//     case 'up':
//       if (first.top > second.top) {
//         return first.top >= second.bottom && first.left === second.left;
//       }
//     case 'down':
//       if (first.bottom < second.bottom) {
//         return first.bottom <= second.top && first.left === second.left;
//       }
//     default:
//       return false;
//   }
// }
//
// function gridBoundary(tile, grid) {
//   const gridWidth = grid.getAttribute('width');
//   const gridHeight = grid.getAttribute('height');
//   const tileWidth = tile.getAttribute('width');
//   const tileHeight = tile.getAttribute('height');
//
//   let left = tile.getAttribute('x') - 12 <= grid.getAttribute('x');
//   let top = tile.getAttribute('y') - 12 <= grid.getAttribute('y');
//   let right = parseInt(tile.getAttribute('x')) + parseInt(tileWidth) > parseInt(grid.getAttribute('x')) + parseInt(gridWidth) - 12;
//   let bottom = parseInt(tile.getAttribute('y')) + parseInt(tileHeight) > parseInt(grid.getAttribute('y')) + parseInt(gridHeight) - 12;
//
//   return left || top || right || bottom;
// }
//
// function withinBoundaries(self, grid, dir) {
//   if (gridBoundary(self, grid)){
//     console.log('grid boundary');
//     return true;
//   }
//
//   let group;
//   let idx = self.parentNode.getAttribute('id');
//   for (let i = 1; i < 17; i++) {
//     if (i == idx) continue;
//     group = document.getElementById(`${i}`);
//     let children = group.children;
//     if (children.length === 3 && tileBoundary(self, children[1], dir)) {
//       console.log('tile boundary');
//       console.log(self);
//       return true;
//     }
//   }
//
//   return false;
// }
