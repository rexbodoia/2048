const board = new Board(4);
board.generateNumbers();

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      moveAll(board, 'left');
      document.getElementById('instructions').remove();
      break;
    case 38:
      moveAll(board, 'up');
      document.getElementById('instructions').remove();
      break;
    case 39:
      moveAll(board, 'right');
      document.getElementById('instructions').remove();
      break;
    case 40:
      moveAll(board, 'down');
      document.getElementById('instructions').remove();
      break;
  }
});
