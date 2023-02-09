import React from "react";
import colors from "./../consts/colors";

const pixelWith = 1;
const pixelHeight = 1;

const pixelWithInPixels = pixelWith * 10;
const pixelHeightInPixels = pixelHeight * 10;

const MAX_SCALE = 0.45;
const MIN_SCALE = 0;

const width = 75; // Elements in row
const height = 40; // Elements in cell
const canvasHeight = 502;
const canvasWidth = 800;

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pixelWith: 1,
      pixelHeight: 1,
      pixelWithInPixels: 1 * 10,
      pixelHeightInPixels: 1 * 10,

      pixelSize: 1,
      test: {
        x: canvasWidth / 2 - (width * pixelWithInPixels) / 2,
        y: canvasHeight / 2 - (height * pixelHeightInPixels) / 2,
      },
      mouseHoverInOnePixel: { x: 0, y: 0 },
      clicked: false,
      elements: new Map(),
      position: { x: 0, y: 0 },
      zoomedBlock: { x: 0, y: 0 },
      zoom: {
        scale: 1,
      },
    };
  }
  componentDidMount() {
    this.generateRandomPixels();

    // this.refs.canvas.addEventListener(
    //   "wheel",
    //   (e) => this.trackWheel(e),
    //   false
    // );

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log(x, y);

    const scalableValue = Math.floor(this.state.zoom.scale * 10);

    const differenceXMod = x % Math.ceil(this.state.pixelSize);
    const differenceYMod = y % Math.ceil(this.state.pixelSize);

    const pixelWidth = this.state.pixelSize * scalableValue;
    const blockNumberX = Math.ceil(x / pixelWidth) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(y / pixelHeight) - 1;

    this.setState(
      {
        test: { x: x, y: y },
        position: { x: x - blockNumberX, y: y - blockNumberY },
        mouseHoverInOnePixel: { x: differenceXMod, y: differenceYMod },
        zoomedBlock: { x: blockNumberX, y: blockNumberY },
      },
      () => this.updateCanvas()
    );
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
    //https://jsfiddle.net/akinuri/cbx7pmra/ Зум здесь
    const { canvas } = this.refs;
    const ctx = canvas.getContext("2d");
    const { elements } = this.state;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scalableValue = Math.floor(this.state.zoom.scale * 10);

    const max = this.state.pixelSize * scalableValue;

    // const tX =
    //   Math.round(this.state.position.x) -
    //   this.state.zoomedBlock.x * max +
    //   this.state.mouseHoverInOnePixel.x;

    // const tY =
    //   Math.round(this.state.position.y) -
    //   this.state.zoomedBlock.y * max +
    //   this.state.mouseHoverInOnePixel.y;

    // const tX =
    //   -Math.round(this.state.position.x) -
    //   this.state.zoomedBlock.x * max +
    //   this.state.mouseHoverInOnePixel.x;

    // const tY =
    //   -Math.round(this.state.position.y) -
    //   this.state.zoomedBlock.y * max +
    //   this.state.mouseHoverInOnePixel.y;

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

  // trackWheel(e) {
  //   const { zoom } = this.state;

  //   let scale = 0;
  //   if (e.deltaY < 0) {
  //     scale = Math.min(5, zoom.scale * 1.1);
  //   } else {
  //     scale = Math.max(0.1, zoom.scale * (1 / 1.1));
  //   }

  //   const canvas = this.refs.canvas;
  //   const rect = canvas.getBoundingClientRect();
  //   const x = e.clientX - rect.left - this.state.test.x;
  //   const y = e.clientY - rect.top - this.state.test.y;

  //   const scalableValue = Math.floor(this.state.zoom.scale * 10);

  //   const differenceXMod = x % Math.ceil(this.state.pixelSize);
  //   const differenceYMod = y % Math.ceil(this.state.pixelSize);

  //   const pixelWidth = this.state.pixelSize * scalableValue;

  //   const blockNumberX = Math.ceil(x / pixelWidth) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
  //   const blockNumberY = Math.ceil(y / pixelWidth) - 1;

  //   this.setState(
  //     {
  //       mouseHoverInOnePixel: { x: differenceXMod, y: differenceYMod },
  //       position: { x: x, y: y },
  //       zoomedBlock: { x: blockNumberX, y: blockNumberY },
  //       scale1: scale,
  //       zoom: { ...this.state.zoom, scale: scale },
  //     },
  //     () => this.updateCanvas()
  //   );
  // }

  changeColor(e) {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - this.state.test.x;
    const y = e.clientY - rect.top - this.state.test.y;

    const scalableValue = Math.floor(this.state.zoom.scale * 10);

    const pixelSize = this.state.pixelSize * scalableValue;

    const blockNumberX = Math.ceil(x / pixelSize) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(y / pixelSize) - 1;

    console.log(blockNumberX, blockNumberY);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = this.props.choosedColor;
    ctx.fillRect(
      blockNumberX,
      blockNumberY,
      this.state.pixelWith,
      this.state.pixelHeight
    );
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
        // onClick={(e) => this.changeColor(e)}
      />
    );
  }
}
