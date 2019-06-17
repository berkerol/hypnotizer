/* global FPSMeter */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let animation;
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
  color: 16,
  colors: [[255, 30, 40], [255, 150, 20], [255, 220, 0], [0, 255, 100], [100, 255, 20], [50, 200, 200], [120, 220, 255], [80, 180, 255], [220, 120, 255], [255, 100, 150], [240, 20, 200], [140, 140, 140], [170, 170, 170], [200, 200, 200], [255, 0, 0]]
};

let labels = [];

ctx.font = label.font;
const metrics = ctx.measureText('0');
resizeHandler();
draw();
const dropdown = document.getElementById('change-color');
const custom = document.getElementById('custom');
const colors = ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Teal', 'Aqua', 'Blue', 'Purple', 'Pink', 'Fuchsia', 'Dark Gray', 'Light Gray', 'Silver'];
for (const i in colors) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'dropdown-item';
  button.setAttribute('data-value', i);
  button.innerHTML = colors[i];
  dropdown.insertBefore(button, custom);
  if (i === '2' || i === '5' || i === '7' || i === '10' || i === '13') {
    const div = document.createElement('div');
    div.className = 'dropdown-divider';
    dropdown.insertBefore(div, custom);
  }
}
document.querySelectorAll('#change-type .dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-type-text').innerHTML = this.innerHTML.substring(0, this.innerHTML.length - 1);
    label.type = +this.dataset.value;
  });
});
document.querySelectorAll('#change-case .dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-case-text').innerHTML = this.innerHTML.substring(0, this.innerHTML.length - 5);
    label.case = +this.dataset.value;
  });
});
document.querySelectorAll('#change-color .dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-color-text').innerText = this.innerText;
    label.color = +this.dataset.value;
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
});
document.getElementById('customColor').addEventListener('change', function () {
  label.colors[label.colors.length - 1] = this.value.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
});
document.addEventListener('keyup', keyUpHandler);
window.addEventListener('resize', resizeHandler);

function draw () {
  meter.tick();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = label.font;
  for (const l of labels) {
    if (label.color === label.colors.length + 2) {
      l.color = generateRandomColor();
    }
    ctx.fillStyle = `rgb(${l.color[0]}, ${l.color[1]}, ${l.color[2]})`;
    ctx.fillText(String.fromCharCode(generateRandomLetter()), l.x, l.y);
  }
  animation = window.requestAnimationFrame(draw);
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
  return label.colors[Math.floor(Math.random() * (label.colors.length - 1))];
}

function keyUpHandler (e) {
  if (e.keyCode === 80) {
    if (animation === undefined) {
      animation = window.requestAnimationFrame(draw);
    } else {
      window.cancelAnimationFrame(animation);
      animation = undefined;
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
        y: j * label.height
      });
    }
  }
  for (const l of labels) {
    l.color = generateRandomColor();
  }
}
