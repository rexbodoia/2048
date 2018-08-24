const board = new Board(4);
board.generateNumbers();
let gameOver = false;
// let group = document.createElementNS(svgns, 'g');
// let score = document.createElementNS(svgns, 'text');
// score.setAttribute('x', window.innerWidth / 2 - 420);
// score.setAttribute('y', 200);
// score.setAttribute('id', 'score');
// score.setAttribute('fill', "#C05B34");
// let scoreNode = document.createTextNode('0');
// score.appendChild(scoreNode);
// let scoreRect = document.createElementNS(svgns, 'rect');
// scoreRect.setAttribute
// group.appendChild(score);
// canvas.appendChild(group);

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
  score.innerHTML = board.score;
  }
  else if (!gameOver && board.noMoves()) {
    let text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', window.innerWidth / 2 - 320);
    text.setAttribute('y', 400);
    text.setAttribute('class', 'game-over');

    let textNode = document.createTextNode('Game Over');

    text.appendChild(textNode);
    canvas.appendChild(text);
    document.body.style.backgroundColor = "rgb(0, 0, 0)";

    gameOver = true;
  }
  else if (!gameOver) {
    let text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', window.innerWidth / 2 - 264);
    text.setAttribute('y', 400);
    text.setAttribute('class', 'game-over');

    let textNode = document.createTextNode('You Win!');

    text.appendChild(textNode);
    canvas.appendChild(text);
    document.body.style.backgroundColor = "rgb(255, 255, 0)";
    gameOver = true;
  }
});
