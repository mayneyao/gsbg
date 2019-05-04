import React, { useEffect } from 'react';
import './App.css';

import Settings from './components/dialogs'

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}


const Color = ["#e91e63", "#9c27b0", "#f44336", "#ea80fc", "#2196f3"]


function getRandomColor() {
  return Color[Math.floor(Math.random() * Color.length)]
}

function getLineLength(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

function calcTriangleArea(a, b, c) {
  let side1 = getLineLength(a, b)
  let side2 = getLineLength(a, c)
  let side3 = getLineLength(b, c)
  let s = (side1 + side2 + side3) / 2;
  let area = Math.sqrt(s * ((s - side1) * (s - side2) * (s - side3)));
  return area
}

function roundedRect(ctx, x, y, width, height, radius, color) {
  ctx.save();
  ctx.rotate(Math.PI * 2 / (getRandomIntInclusive(1, 6) * 6));
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fillStyle = color
  ctx.fill();
  ctx.restore();
}


function getRandomTriPoint(x, y, width, height) {
  let r = []
  for (let i = 0; i < 3; i++) {
    let rx = getRandomIntInclusive(x, x + width)
    let ry = getRandomIntInclusive(y, y + height)
    r.push(new Point(rx, ry))
  }
  return r
}

function getRandomRectParams(x, y, width, height) {
  let rx = getRandomIntInclusive(x, x + width)
  let ry = getRandomIntInclusive(y, y + height)
  let maxWidth = x + width - rx
  let maxHeight = y + height - ry
  let rWidth = getRandomIntInclusive(0, maxWidth)
  let rHeight = getRandomIntInclusive(0, maxHeight)
  let rWH = Math.min(rWidth, rHeight) // 这里取最小的边长，正方形（矩形不好看）
  return [rx, ry, rWH, rWH]
}

function drawTri(ctx, a, b, c, color) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.fillStyle = color
  ctx.fill();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

function getRandomShape() {
  const Shape = ['triangle', 'rect']
  return Shape[Math.floor(Math.random() * Shape.length)]
}

function App() {
  useEffect(() => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, 1900, 1000);
    ctx.save()
    let width = 100;
    let xnums = 20;
    let ynums = 10;
    let v = 0.4
    for (let i = 0; i < xnums; i++) {
      for (let j = 0; j < ynums; j++) {
        let rectangle = new Path2D();
        rectangle.rect(i * width, j * width, width, width);
        if (Math.random() < v) {
          let shape = getRandomShape()
          // let shape = 'tri'
          let color = getRandomColor()
          switch (shape) {
            case 'triangle':
              let [a, b, c] = getRandomTriPoint(i * width, j * width, width, width)
              if (calcTriangleArea(a, b, c) > 400) {
                drawTri(ctx, a, b, c, color)
              }
              break
            case 'rect':
              console.log(1)
              let [rx, ry, rWidth, rHeight] = getRandomRectParams(i * width, j * width, width, width)
              if (rWidth > 10) {
                roundedRect(ctx, rx, ry, rWidth, rHeight, 0, color);
              }
              break
          }
        }
      }
    }
  })

  return (
    <div>
      <Settings />
      <canvas id="canvas" width="1900" height="1000"></canvas>
    </div>
  );
}

export default App;
