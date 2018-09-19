const svgns = "http://www.w3.org/2000/svg";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let gridWidth = 492;
let gridX = windowWidth / 2 - gridWidth / 2;
let scoreX = gridX + gridWidth + 30;

const canvas = document.createElementNS(svgns, 'svg');
canvas.setAttribute('width', windowWidth);
canvas.setAttribute('height', windowHeight);
canvas.setAttribute('id', 'myCanvas');
document.getElementsByTagName('body')[0].appendChild(canvas);

const title = document.createElementNS(svgns, 'text');
title.setAttribute('id', 'title');
const titleText = document.createTextNode("2048!");
title.appendChild(titleText);
canvas.appendChild(title);

titleX = windowWidth / 2 - title.textLength.baseVal.value / 2;
title.setAttribute('x', titleX);
title.setAttribute('y', 100);
title.setAttribute('fill', "rgb(60,60,60)");

const scoreRect = document.createElementNS(svgns, 'rect');
scoreRect.setAttribute('x', scoreX);
scoreRect.setAttribute('y', 100);
scoreRect.setAttribute('rx', 10);
scoreRect.setAttribute('ry', 10);
scoreRect.setAttribute('width', 180);
scoreRect.setAttribute('height', 90);
scoreRect.setAttribute('fill', "rgb(60,60,60)");

const scoreText = document.createElementNS(svgns, 'text');
scoreText.setAttribute('id', 'score');
scoreText.setAttribute('x', scoreX + 20);
scoreText.setAttribute('y', 168);
scoreText.setAttribute('fill', "#C05B34");

let scoreNode = document.createTextNode('0');
scoreText.appendChild(scoreNode);

const scoreGroup = document.createElementNS(svgns, 'g');
scoreGroup.appendChild(scoreRect);
scoreGroup.appendChild(scoreText);
canvas.appendChild(scoreGroup);

const grid = document.createElementNS(svgns, 'rect');
grid.setAttribute('id', 'grid');
grid.setAttribute('x', gridX);
grid.setAttribute('y', '140');
grid.setAttribute('rx', '20');
grid.setAttribute('ry', '20');
grid.setAttribute('ry', '20');
grid.setAttribute('width', '492');
grid.setAttribute('height', '492');
grid.setAttribute('fill', '#07575B');

canvas.appendChild(grid);

(function() {
    let throttle = function(type, name, obj) {
        obj = obj || window;
        let running = false;
        let func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
})();

window.addEventListener("optimizedResize", function() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    // centerAll(Array.from(canvas.children));
    centerGrid();
    centerTitle();
});

function centerGrid() {
  let x = window.innerWidth / 2 - grid.width.baseVal.value / 2;
  grid.setAttribute('x', x);
}

function centerTitle() {
  let x = window.innerWidth / 2 - title.textLength.baseVal.value / 2;
  title.setAttribute('x', x);
}

function centerAll(children) {
  children.forEach(child => {
    let x;

    if (child.textLength) {
      x = window.innerWidth / 2 - child.textLength.baseVal.value / 2;
    } else if (child.width) {
      x = window.innerWidth / 2 - child.width.baseVal.value / 2;
    } else {
      centerAll(Array.from(child.children));
    }

    child.setAttribute('x', x);
  });
}
