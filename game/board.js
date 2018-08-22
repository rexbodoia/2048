const svgns = "http://www.w3.org/2000/svg";
const canvas = document.getElementById('myCanvas');

let rand = Math.floor(Math.random() * 8);

const generateNums = () => {
  let count = 0;

  while (count < 2) {
    if (Math.floor(Math.random() * 8) === rand) {
      let idx = Math.floor(Math.random() * 16 + 1);
      let group = document.getElementById(`${idx}`);

      if (group.children.length === 1) {
        let square = createRect(group.children[0].getAttribute('x'), group.children[0].getAttribute('y'));
        group.appendChild(square);

        let value = (Math.floor(Math.random() * 2) + 1) * 2;
        group.appendChild(createNumber(square, value));
        count += 1;
      }
    }
  }
}

function createRect(x, y) {
  let rect = document.createElementNS(svgns, 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('rx', 20);
  rect.setAttribute('ry', 20);
  rect.setAttribute('height', 113);
  rect.setAttribute('width', 113);
  rect.setAttribute('class', 'tile');

  return rect;
}

function createNumber(square, value) {
  let text = document.createElementNS(svgns, 'text');

  let x = square.getAttribute('x');
  let y = square.getAttribute('y');

  text.setAttribute('class', 'text');
  text.setAttribute('x', parseInt(x) + 33);
  text.setAttribute('y', parseInt(y) + 85);
  text.setAttribute('fill', '#C4DFE6');

  let textNode = document.createTextNode(value);

  text.appendChild(textNode);

  return text;
}

function createGroup(idx, rect) {
  let group = document.createElementNS(svgns, 'g');

  group.setAttribute('id', `${idx}`);
  group.setAttribute('class', 'group');

  group.appendChild(rect);

  return group;
}

function createInitialBoard() {
  let idx = 1;
  for (let x = 456; x < 950; x += 125) {
    for (let y = 156; y < 650; y += 125) {
      let row = (y - 150) / 125;
      let col = (x - 450) / 125;

      let rect = createRect(x, y);
      let group = createGroup(idx, rect);

      canvas.appendChild(group);
      idx += 1;
    }
  }
  generateNums(rand, idx);
}
