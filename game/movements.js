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
  let gridWidth = grid.getAttribute('width');
  let gridHeight = grid.getAttribute('height');
  let tileWidth = tile.getAttribute('width');
  let tileHeight = tile.getAttribute('height');

  let otherNumbers = document.querySelectorAll('.text');
  let otherTiles = [];
  for (let i = 0; i < otherNumbers.length; i++) {
    otherTiles.push(otherNumbers[i].parentNode.children[1]);
  }

  switch (direction) {
    case 'left':
      intr = setInterval(() => {
        tile.setAttribute('x', parseInt(tile.getAttribute('x')) - 15);
        number.setAttribute('x', parseInt(number.getAttribute('x')) - 15);
        if (tile.getAttribute('x') - 32 <= grid.getAttribute('x')) {
          let x = parseInt(grid.getAttribute('x')) + 12;
          tile.setAttribute('x', x);
          number.setAttribute('x', x + 33);
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
        tile.setAttribute('y', parseInt(tile.getAttribute('y')) - 15);
        number.setAttribute('y', parseInt(number.getAttribute('y')) - 15);
        if (tile.getAttribute('y') - 32 <= grid.getAttribute('y')) {
          let y = parseInt(grid.getAttribute('y')) + 12;
          tile.setAttribute('y', y);
          number.setAttribute('y', y + 85);
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
      for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx+=4) {
        if (idx > 12) {
          resetGroups(group, idx, tile, number);
          break;
        }
      }
      intr = setInterval(() => {
        tile.setAttribute('x', parseInt(tile.getAttribute('x')) + 15);
        number.setAttribute('x', parseInt(number.getAttribute('x')) + 15);
        if (parseInt(tile.getAttribute('x')) + parseInt(tileWidth) + 32 > parseInt(grid.getAttribute('x')) + parseInt(gridWidth)) {
          let x = parseInt(grid.getAttribute('x')) + parseInt(gridWidth) - 12;
          tile.setAttribute('x', x - tileWidth);
          number.setAttribute('x', x - 80);
          clearInterval(intr);
        }
      }, 1);
      break;
    case 'down':
      for (let idx = parseInt(group.getAttribute('id')); idx < 17; idx++) {
        if (idx % 4 === 0) {
          resetGroups(group, idx, tile, number);
          break;
        }
      }
      intr = setInterval(() => {
        tile.setAttribute('y', parseInt(tile.getAttribute('y')) + 15);
        number.setAttribute('y', parseInt(number.getAttribute('y')) + 15);
        if (parseInt(tile.getAttribute('y')) + parseInt(tileHeight) + 32 > parseInt(grid.getAttribute('y')) + parseInt(gridHeight)) {
          let y = parseInt(grid.getAttribute('y')) + parseInt(gridHeight) - 12;
          tile.setAttribute('y', y - tileHeight);
          number.setAttribute('y', y - 28);
          clearInterval(intr);
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
  left = tile.getAttribute('x');
  right = left + tile.getAttribute('width');

  top = tile.getAttribute('y');
  bottom = top + tile.getAttribute('height');

  return { left, right, top, bottom };
}

function withinBoundaries(first, second) {
  first = boundaries(first);
  second = boundaries(second);

  let left = first.right >= second.left;
  let right = first.left <= second.right;
  let top = first.top >= second.bottom;
  let bottom = first.bottom <= second.top;

  return left || right || top || bottom;
}
