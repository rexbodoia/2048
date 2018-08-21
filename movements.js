function moveAll(direction) {
  for (let i = 1; i <= 16; i++) {
    let group = document.getElementById(`${i}`);
    if (group.children.length === 2) {
      moveEach(group, direction);
    }
  }

  function moveEach(group, direction) {
    let grid = document.getElementById('grid');
    let square = group.children[0];
    let number = group.children[1];
    let x = square.getAttribute('x');
    let y = square.getAttribute('y');
    let rect = createRect(x, y);
    // let g = x -  / 125
    document.getElementById('myCanvas').appendChild(rect);
    // let group = createGroup()

    switch (direction) {
      case 'left':
      moveBackward(square, number, 'x');
      break;
      case 'up':
      moveBackward(square, number, 'y');
      break;
      case 'right':
      moveForward(square, number, 'x');
      break;
      case 'down':
      moveForward(square, number, 'y');
      break;
      default:
      break;
    }
  }
}

function moveForward(square, number, axis) {
  let intr = setInterval(() => {
    square.setAttribute(`${axis}`, parseInt(square.getAttribute(`${axis}`)) + 10);
    number.setAttribute(`${axis}`, parseInt(number.getAttribute(`${axis}`)) + 10);
    if (parseInt(square.getAttribute(`${axis}`)) + 22 > grid.getAttribute(`${axis}`)) {
      let val = parseInt(grid.getAttribute(`${axis}`)) - 12;
      square.setAttribute(`${axis}`, val);
      number.setAttribute(`${axis}`, val - 33);
      clearInterval(intr);
    }
  }, 1);
}

function moveBackward(square, number, axis) {
  let intr = setInterval(() => {
    square.setAttribute(`${axis}`, parseInt(square.getAttribute(`${axis}`)) - 10);
    number.setAttribute(`${axis}`, parseInt(number.getAttribute(`${axis}`)) - 10);
    if (square.getAttribute(`${axis}`) - 22 <= grid.getAttribute(`${axis}`)) {
      let val = parseInt(grid.getAttribute(`${axis}`)) + 12;
      square.setAttribute(`${axis}`, val);
      number.setAttribute(`${axis}`, val + 33);
      clearInterval(intr);
    }
  }, 1);
}
