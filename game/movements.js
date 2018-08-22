function moveAll(direction) {
  for (let i = 1; i <= 16; i++) {
    let group = document.getElementById(`${i}`);
    if (group.children.length === 3) {
      moveEach(group, direction);
    }
  }
}

function moveEach(group, direction) {
  let grid = document.getElementById('grid');
  let tile = group.children[1];
  let number = group.children[2];

  let x = tile.getAttribute('x');
  let y = tile.getAttribute('y');

  let intr;
  let newGroup;

  const gridWidth = grid.getAttribute('width');
  const gridHeight = grid.getAttribute('height');
  const tileWidth = tile.getAttribute('width');
  const tileHeight = tile.getAttribute('height');

  let otherNumbers = document.querySelectorAll('.text');
  let otherTiles = [];
  for (let i = 0; i < otherNumbers.length; i++) {
    otherTiles.push(otherNumbers[i].parentNode.children[1]);
  }

  switch (direction) {
    case 'left':
      intr = setInterval(() => {
        tile.setAttribute('x', parseInt(tile.getAttribute('x')) - 1);
        number.setAttribute('x', parseInt(number.getAttribute('x')) - 1);
        if (withinBoundaries(tile, grid)) {
          console.log('true');
          // let x = parseInt(grid.getAttribute('x')) + 12;
          // tile.setAttribute('x', x);
          // number.setAttribute('x', x + 33);
          clearInterval(intr);
          for (let idx = group.getAttribute('id'); idx > 0; idx-=4) {
            if (idx < 5) {
              resetGroups(group, idx, tile, number);
              break;
            }
          }
        }
      }, 1);
      break;
    case 'up':
      intr = setInterval(() => {
        tile.setAttribute('y', parseInt(tile.getAttribute('y')) - 1);
        number.setAttribute('y', parseInt(number.getAttribute('y')) - 1);
        if (withinBoundaries(tile, grid)) {
          // let y = parseInt(grid.getAttribute('y')) + 12;
          // tile.setAttribute('y', y);
          // number.setAttribute('y', y + 85);
          clearInterval(intr);
          for (let idx = group.getAttribute('id'); idx > 0; idx--) {
            if (idx % 4 === 1) {
              resetGroups(group, idx, tile, number);
              break;
            }
          }
        }
      }, 1);
      break;
    case 'right':
      intr = setInterval(() => {
        tile.setAttribute('x', parseInt(tile.getAttribute('x')) + 1);
        number.setAttribute('x', parseInt(number.getAttribute('x')) + 1);
        if (withinBoundaries(tile, grid)) {
          // let x = parseInt(grid.getAttribute('x')) + parseInt(gridWidth) - 12;
          // tile.setAttribute('x', x - tileWidth);
          // number.setAttribute('x', x - 80);
          clearInterval(intr);
          for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx+=4) {
            if (idx > 12) {
              resetGroups(group, idx, tile, number);
              break;
            }
          }
        }
      }, 1);
      break;
    case 'down':
      intr = setInterval(() => {
        tile.setAttribute('y', parseInt(tile.getAttribute('y')) + 1);
        number.setAttribute('y', parseInt(number.getAttribute('y')) + 1);
        if (withinBoundaries(tile, grid)) {
          // let y = parseInt(grid.getAttribute('y')) + parseInt(gridHeight) - 12;
          // tile.setAttribute('y', y - tileHeight);
          // number.setAttribute('y', y - 28);
          clearInterval(intr);
          for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx++) {
            if (idx % 4 === 0) {
              resetGroups(group, idx, tile, number);
              break;
            }
          }
        }
      }, 1);
      break;
    default:
    break;
  }
}

function resetGroups(group, idx, tile, number) {
  let newGroup = document.getElementById(`${idx}`);
  group.removeChild(number);
  group.removeChild(tile);
  newGroup.appendChild(tile);
  newGroup.appendChild(number);
}

function boundaries(tile) {
  let left = parseInt(tile.getAttribute('x'));
  let right = left + parseInt(tile.getAttribute('width'));

  let top = parseInt(tile.getAttribute('y'));
  let bottom = top + parseInt(tile.getAttribute('height'));

  return { left, right, top, bottom };
}

function tileBoundary(first, second) {
  first = boundaries(first);
  second = boundaries(second);

  let left = first.right >= second.left && first.top === second.top;
  let right = first.left <= second.right && first.top === second.top;
  let top = first.top >= second.bottom && first.left === second.left;
  let bottom = first.bottom <= second.top && first.left === second.left;

  return left || right || top || bottom;
}

function gridBoundary(tile, grid) {
  const gridWidth = grid.getAttribute('width');
  const gridHeight = grid.getAttribute('height');
  const tileWidth = tile.getAttribute('width');
  const tileHeight = tile.getAttribute('height');

  let left = tile.getAttribute('x') <= grid.getAttribute('x');
  let top = tile.getAttribute('y') <= grid.getAttribute('y');
  let right = parseInt(tile.getAttribute('x')) + parseInt(tileWidth) > parseInt(grid.getAttribute('x')) + parseInt(gridWidth);
  let bottom = parseInt(tile.getAttribute('y')) + parseInt(tileHeight) > parseInt(grid.getAttribute('y')) + parseInt(gridHeight);

  return left || top || right || bottom;
}

function withinBoundaries(self, grid) {
  if (gridBoundary(self, grid)) return true;

  let group;
  let idx = self.parentNode.getAttribute('id');
  // debugger
  for (let i = 1; i < 17; i++) {
    if (i == idx) continue;
    group = document.getElementById(`${i}`);
    let children = group.children;
    if (children.length === 3 && tileBoundary(self, children[0])) return true;
  }

  return false;
}
