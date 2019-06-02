/* global FPSMeter */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

FPSMeter.theme.colorful.container.height = '40px';
const meter = new FPSMeter({
  left: canvas.width - 130 + 'px',
  top: 'auto',
  bottom: '12px',
  theme: 'colorful',
  heat: 1,
  graph: 1
});

const label = {
  height: 25,
  font: '25px Monospace',
  type: 2,
  case: 2,
  color: 15,
  colors: [[255, 30, 40], [255, 150, 20], [255, 220, 0], [0, 255, 100], [100, 255, 20], [50, 200, 200], [120, 220, 255], [80, 180, 255], [220, 120, 255], [255, 100, 150], [240, 20, 200], [140, 140, 140], [170, 170, 170], [200, 200, 200]]
};

let labels = [];

ctx.font = label.font;
const metrics = ctx.measureText('0');
resizeHandler();
draw();
window.addEventListener('resize', resizeHandler);

function draw () {
  meter.tick();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = label.font;
  for (const l of labels) {
    if (label.color === label.colors.length + 2) {
      l.color = generateRandomColor();
    }
    ctx.fillStyle = `rgba(${l.color[0]}, ${l.color[1]}, ${l.color[2]}, 1.0)`;
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
  return label.colors[Math.floor(Math.random() * label.colors.length)];
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

$('.dropdown-menu li a').click(function () {
  $('#selected').text($(this).text());
  label.color = $(this).closest('li').data('value');
  if (label.color === label.colors.length + 2 || label.color === label.colors.length + 1) {
    for (const l of labels) {
      l.color = generateRandomColor();
    }
  } else if (label.color === label.colors.length) {
    const color = generateRandomColor();
    for (const l of labels) {
      l.color = color;
    }
  } else {
    for (const l of labels) {
      l.color = label.colors[label.color];
    }
  }
});

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
  for (const l of labels) {
    l.color = generateRandomColor();
  }
}
