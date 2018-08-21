function moveAll(direction) {
  for (let i = 1; i <= 16; i++) {
    let group = document.getElementById(`${i}`);
    if (group.children.length === 2) {
      moveEach(group, direction);
    }
  }

  function moveEach(group, direction) {
    let grid = document.getElementById('grid');
    let tile = group.children[0];
    let number = group.children[1];

    let x = tile.getAttribute('x');
    let y = tile.getAttribute('y');
    let rect = createRect(x, y);
    document.getElementById('myCanvas').appendChild(rect);
    group.appendChild(rect);

    let intr;
    let newGroup;
    let gridWidth = grid.getAttribute('width');
    let gridHeight = grid.getAttribute('height');
    let tileWidth = tile.getAttribute('width');
    let tileHeight = tile.getAttribute('height');

    switch (direction) {
      case 'left':
        intr = setInterval(() => {
          tile.setAttribute('x', parseInt(tile.getAttribute('x')) - 10);
          number.setAttribute('x', parseInt(number.getAttribute('x')) - 10);
          if (tile.getAttribute('x') - 22 <= grid.getAttribute('x')) {
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
          tile.setAttribute('y', parseInt(tile.getAttribute('y')) - 10);
          number.setAttribute('y', parseInt(number.getAttribute('y')) - 10);
          if (tile.getAttribute('y') - 22 <= grid.getAttribute('y')) {
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
        intr = setInterval(() => {
          tile.setAttribute('x', parseInt(tile.getAttribute('x')) + 10);
          number.setAttribute('x', parseInt(number.getAttribute('x')) + 10);
          if (parseInt(tile.getAttribute('x')) + parseInt(tileWidth) + 22 > parseInt(grid.getAttribute('x')) + parseInt(gridWidth)) {
            let x = parseInt(grid.getAttribute('x')) + parseInt(gridWidth) - 12;
            tile.setAttribute('x', x - tileWidth);
            number.setAttribute('x', x - 45);
            clearInterval(intr);
            for (let idx = group.getAttribute('id'); idx < 16; idx+=4) {
              if (idx > 12) {
                resetGroups(group, idx, tile, number);
              }
            }
          }
        }, 1);
        break;
      case 'down':
        intr = setInterval(() => {
          tile.setAttribute('y', parseInt(tile.getAttribute('y')) + 10);
          number.setAttribute('y', parseInt(number.getAttribute('y')) + 10);
          if (parseInt(tile.getAttribute('y')) + parseInt(tileHeight) + 22 > parseInt(grid.getAttribute('y')) + parseInt(gridHeight)) {
            let y = parseInt(grid.getAttribute('y')) + parseInt(gridHeight) - 12;
            tile.setAttribute('y', y - tileHeight);
            number.setAttribute('y', y - 28);
            clearInterval(intr);
            for (let idx = group.getAttribute('id'); idx < 16; idx++) {
              if (idx % 4 === 0) {
                resetGroups(group, idx, tile, number);
              }
            }
          }
        }, 1);
        break;
      default:
      break;
    }
  }
}

function resetGroups(group, idx, tile, number) {
  let newGroup = document.getElementById(`${idx}`);
  group.removeChild(tile);
  group.removeChild(number);
  newGroup.removeChild(newGroup.children[0]);
  newGroup.appendChild(tile);
  newGroup.appendChild(number);
}
