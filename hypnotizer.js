/* global canvas ctx label addPause loop generateRandomInteger colorIndex colorCodes addDropdownListener addCustomColor generateRandomColor */
label.height = 25;
label.font = '25px Monospace';
label.type = 2;
label.case = 2;

let labels = [];

ctx.font = label.font;
const metrics = ctx.measureText('0');
resizeHandler();
document.querySelectorAll('#change-type .dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-type-text').innerHTML = this.innerHTML.substring(0, this.innerHTML.length - 1);
    label.type = +this.dataset.bsValue;
  });
});
document.querySelectorAll('#change-case .dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-case-text').innerHTML = this.innerHTML.substring(0, this.innerHTML.length - 5);
    label.case = +this.dataset.bsValue;
  });
});
addDropdownListener(labels);
addCustomColor();
addPause();
window.addEventListener('resize', resizeHandler);

loop(function () {
  ctx.font = label.font;
  for (const l of labels) {
    if (colorIndex === colorCodes.length + 2) {
      l.color = generateRandomColor();
    }
    ctx.fillStyle = `rgb(${l.color[0]}, ${l.color[1]}, ${l.color[2]})`;
    ctx.fillText(String.fromCharCode(generateRandomCharacter()), l.x, l.y);
  }
});

function generateRandomCharacter () {
  if (label.type === 0) {
    return generateRandomInteger(9) + 48;
  } else if (label.type === 1) {
    return generateRandomLetter();
  } else {
    if (Math.random() < 0.5) {
      return generateRandomInteger(9) + 48;
    } else {
      return generateRandomLetter();
    }
  }
}

function generateRandomLetter () {
  if (label.case === 0) {
    return generateRandomInteger(25) + 97;
  } else if (label.case === 1) {
    return generateRandomInteger(25) + 65;
  } else {
    if (Math.random() < 0.5) {
      return generateRandomInteger(25) + 97;
    } else {
      return generateRandomInteger(25) + 65;
    }
  }
}

function resizeHandler () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  labels = [];
  for (let i = 0; i < Math.floor(canvas.width / metrics.width); i++) {
    for (let j = 1; j <= Math.floor(canvas.height / label.height); j++) {
      labels.push({
        x: i * metrics.width,
        y: j * label.height,
        color: generateRandomColor()
      });
    }
  }
}
