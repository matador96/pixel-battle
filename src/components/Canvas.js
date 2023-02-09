import React from "react";
import colors from "./../consts/colors";

const pixelWith = 1;
const pixelHeight = 1;

const pixelWithInPixels = pixelWith * 10;
const pixelHeightInPixels = pixelHeight * 10;

const width = 75; // Elements in row
const height = 40; // Elements in cell
const canvasHeight = 502;
const canvasWidth = 800;

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        x: canvasWidth / 2 - (width * pixelWithInPixels) / 2,
        y: canvasHeight / 2 - (height * pixelHeightInPixels) / 2,
      },
      pixelWith: 1,
      pixelHeight: 1,
      pixelWithInPixels: 1 * 10,
      pixelHeightInPixels: 1 * 10,
      pixelSize: 1,

      clicked: false,
      elements: new Map(),
    };
  }
  componentDidMount() {
    this.generateRandomPixels();

    this.refs.canvas.addEventListener(
      "mousedown",
      (e) => this.setState({ clicked: true }),
      false
    );

    this.refs.canvas.addEventListener(
      "mouseup",
      (e) => this.setState({ clicked: false }),
      false
    );

    this.refs.canvas.addEventListener(
      "mousemove",
      (e) => this.mouseMove(e),
      false
    );

    this.refs.canvas.addEventListener(
      "mouseleave",
      (e) => this.setState({ clicked: false }),
      false
    );
  }

  mouseMove(e) {
    if (!this.state.clicked) return;

    const canvas = this.refs.canvas;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - this.state.position.x;
    // const y = e.clientY - rect.top - this.state.position.y;

    console.log(x);

    // const scalableValue = Math.floor(this.state.pixelSize * 10);

    // const pixelWidth = this.state.pixelSize * scalableValue;
    // const blockNumberX = Math.ceil(x / pixelWidth) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    // const blockNumberY = Math.ceil(y / pixelHeight) - 1;

    // console.log(blockNumberX, blockNumberY);

    // this.setState(
    //   {
    //     test: { x: x, y: y },
    //     position: { x: x - blockNumberX, y: y - blockNumberY },
    //     zoomedBlock: { x: blockNumberX, y: blockNumberY },
    //   },
    //   () => this.updateCanvas()
    // );
  }

  generateRandomPixels() {
    const elements = new Map();

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        elements.set([indexX, indexY].toString(), this.randomColor());
      }
    }

    this.setState({ elements }, () => this.updateCanvas());
  }

  updateCanvas() {
    const { canvas } = this.refs;
    const ctx = canvas.getContext("2d");
    const { elements } = this.state;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scalableValue = Math.floor(this.state.pixelSize * 10);

    const max = this.state.pixelSize * scalableValue;

    const tX = this.state.position.x;
    const tY = this.state.position.y;

    ctx.setTransform(max, 0, 0, max, tX, tY);

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        ctx.fillStyle = elements.get([indexX, indexY].toString());
        ctx.fillRect(indexX, indexY, pixelWith, pixelHeight);
      }
    }
  }

  randomColor() {
    let key = Math.floor(Math.random() * Math.floor(20));
    return colors[key].hex;
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={canvasWidth}
        height={canvasHeight}
        className="drawer"
      />
    );
  }
}
