import React from 'react';
import './App.css';
import Settings from './components/dialogs'
import { ConfigContext, config } from './context'

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

class GSBG extends React.Component {
  static contextType = ConfigContext;



  updateCanvas = (newContext) => {
    const { size, theme, column } = newContext ? newContext : this.context
    console.log(theme)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.height = size.height
    ctx.width = size.width
    ctx.fillStyle = "#fff"

    if (theme === "light") {
      ctx.fillStyle = "#fff"
    } else if (theme === "dark") {
      ctx.fillStyle = "#000"
    }
    ctx.beginPath();
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.closePath();

    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, 1900, 1000);
    ctx.save()

    let width = size.width / parseInt(column);
    console.log(width)
    let xnums = parseInt(column);
    let ynums = size.height / width;
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
              if (calcTriangleArea(a, b, c) > width * width / 16) {
                drawTri(ctx, a, b, c, color)
              }
              break
            case 'rect':
              let [rx, ry, rWidth, rHeight] = getRandomRectParams(i * width, j * width, width, width)
              if (rWidth > width / 8) {
                roundedRect(ctx, rx, ry, rWidth, rHeight, 0, color);
              }
              break
          }
        }
      }
    }
  }
  componentDidMount() {
    this.updateCanvas()
  }

  componentWillReceiveProps(newProps, newContext) {
    if (this.context.count !== newContext.count) {
      this.updateCanvas(newContext)
    }

  }

  render() {

    return (
      <ConfigContext.Consumer>
        {
          config => {
            const { size: { width, height }, theme } = config;
            console.log(theme)
            return (
              <canvas id="canvas" width={width} height={height} style={{
                background: theme === 'dark' ? "#000" : '#fff'
              }}></canvas>
            )
          }
        }

      </ConfigContext.Consumer >
    );
  }
}




class App extends React.Component {
  handleThemeChange = (e) => {
    console.log(e.target)
    this.setState(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }))
  }

  handleChange = name => e => {
    const value = parseFloat(e.target.value)
    this.setState(state => ({
      size: {
        width: name === 'width' ? value : state.size.width,
        height: name === 'height' ? value : state.size.height
      },
      content: {
        rect: name === 'rect' ? value : state.content.rect,
        triangle: name === 'triangle' ? value : state.content.triangle,
      },
      column: name === 'column' ? value : state.column,
    }))
  }
  updateCanvas = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  constructor(props) {
    super(props);
    this.state = {
      ...config,
      handleThemeChange: this.handleThemeChange,
      handleChange: this.handleChange,
      updateCanvas: this.updateCanvas
    }
  }

  render() {
    return (
      <ConfigContext.Provider value={this.state}>
        <Settings />
        <GSBG />
      </ConfigContext.Provider>
    )
  }
}

export default App
