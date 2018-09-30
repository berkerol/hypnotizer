/* global FPSMeter */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let meter = new FPSMeter({
  left: canvas.width - 130 + 'px',
  top: 'auto',
  bottom: '12px',
  theme: 'colorful',
  heat: 1,
  graph: 1
});

let label = {
  height: 25,
  font: '25px Monospace',
  type: 2,
  case: 2,
  color: 16,
  colors: [[15, 15, 15], [240, 60, 80], [255, 100, 0], [255, 160, 0], [255, 220, 0], [220, 255, 0], [160, 255, 0], [50, 255, 0], [0, 220, 120], [130, 230, 220], [0, 220, 240], [240, 120, 255], [210, 140, 170], [220, 180, 240], [160, 220, 220], [200, 200, 200]]
};

let labels = [];

ctx.font = label.font;
let metrics = ctx.measureText('0');
resizeHandler();
draw();
window.addEventListener('resize', resizeHandler);

function draw () {
  meter.tick();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = label.font;
  if (label.color !== label.colors.length) {
    ctx.fillStyle = 'rgba(' + label.colors[label.color][0] + ',' + label.colors[label.color][1] + ',' + label.colors[label.color][2] + ',' + 1.0 + ')';
  }
  for (let l of labels) {
    if (label.color === label.colors.length) {
      ctx.fillStyle = generateRandomColor();
    }
    ctx.fillText(String.fromCharCode(generateRandomLetter()), l.x, l.y);
  }
  window.requestAnimationFrame(draw);
}

function generateRandomLetter () {
  if (label.type === 0) {
    return Math.floor(Math.random() * 9 + 48);
  } else if (label.type === 1) {
    if (label.case === 0) {
      return Math.floor(Math.random() * 25 + 97);
    } else if (label.case === 1) {
      return Math.floor(Math.random() * 25 + 65);
    } else {
      if (Math.random() < 0.5) {
        return Math.floor(Math.random() * 25 + 97);
      } else {
        return Math.floor(Math.random() * 25 + 65);
      }
    }
  } else {
    if (Math.random() < 0.5) {
      return Math.floor(Math.random() * 9 + 48);
    } else {
      if (label.case === 0) {
        return Math.floor(Math.random() * 25 + 97);
      } else if (label.case === 1) {
        return Math.floor(Math.random() * 25 + 65);
      } else {
        if (Math.random() < 0.5) {
          return Math.floor(Math.random() * 25 + 97);
        } else {
          return Math.floor(Math.random() * 25 + 65);
        }
      }
    }
  }
}

function generateRandomColor () {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function changeType () {
  if (label.type === 2) {
    label.type = 0;
  } else {
    label.type++;
  }
  if (label.type === 0) {
    document.getElementById('change-type').innerHTML = 'Digit';
  } else if (label.type === 1) {
    document.getElementById('change-type').innerHTML = 'Letter';
  } else {
    document.getElementById('change-type').innerHTML = 'Digits & Letter';
  }
}

function changeCase () {
  if (label.case === 2) {
    label.case = 0;
  } else {
    label.case++;
  }
  if (label.case === 0) {
    document.getElementById('change-case').innerHTML = 'Lowe';
  } else if (label.case === 1) {
    document.getElementById('change-case').innerHTML = 'Uppe';
  } else {
    document.getElementById('change-case').innerHTML = 'Lower & Uppe';
  }
}

function changeColor () {
  if (label.color === label.colors.length) {
    label.color = 0;
  } else {
    label.color++;
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
        y: j * label.height
      });
    }
  }
}
