createInitialBoard();
document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      moveAll('left');
      break;
    case 38:
      moveAll('up');
      break;
    case 39:
      moveAll('right');
      break;
    case 40:
      moveAll('down');
      break;
    default:
      console.log('invalid key');
  }
});
