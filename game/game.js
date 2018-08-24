const board = new Board(4);
board.generateNumbers();
let gameOver = false;

document.addEventListener('keydown', (event) => {
  if (!board.gameOver) {
    switch (event.keyCode) {
      case 37:
      moveAll(board, 'left');
      break;
      case 38:
      moveAll(board, 'up');
      break;
      case 39:
      moveAll(board, 'right');
      break;
      case 40:
      moveAll(board, 'down');
      break;
    }
  }
  else if (!gameOver) {
    let text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', window.innerWidth / 2 - 250);
    text.setAttribute('y', 400);
    text.setAttribute('class', 'game-over');

    let textNode = document.createTextNode('Game Over');

    text.appendChild(textNode);
    canvas.appendChild(text);

    gameOver = true;
  }
});
