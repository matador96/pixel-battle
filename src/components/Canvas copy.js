import React from "react";
import colors from "./../consts/colors";

const pixelWith = 0.99;
const pixelHeight = 0.99;
const strokeHeight = 1 - (pixelWith + pixelHeight) / 2;

const pixelWithInPixels = pixelWith * 100;
const pixelHeightInPixels = pixelHeight * 100;

const width = 40; // Elements in row
const height = 40; // Elements in cell

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseHoverInOnePixel: { x: 0, y: 0 },
      clicked: false,
      elements: new Map(),
      position: { x: 0, y: 0 },
      zoomedBlock: { x: 0, y: 0 },
      zoom: {
        scale: 1,
        screen: {
          x: 0,
          y: 0,
        },
        world: {
          x: 0,
          y: 0,
        },
      },
      mouse: {
        screen: {
          x: 0,
          y: 0,
        },
        world: {
          x: 0,
          y: 0,
        },
      },
    };
  }
  componentDidMount() {
    this.generateRandomPixels();

    this.refs.canvas.addEventListener(
      "wheel",
      (e) => this.zoomUsingCustomScale(e),
      false
    );

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

    // this.refs.canvas.addEventListener("mouseup", (e) => this.mouseUp(e), false);
  }

  mouseMove(e) {
    if (!this.state.clicked) return;

    const canvas = this.refs.canvas;
    let shiftX = e.clientX - canvas.getBoundingClientRect().left;
    let shiftY = e.clientY - canvas.getBoundingClientRect().top;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const blockNumberX = Math.ceil(y / (pixelWithInPixels / 10)) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(x / (pixelHeightInPixels / 10)) - 1;

    this.setState(
      {
        zoomedBlock: { x: blockNumberX, y: blockNumberY },
        position: { x: shiftX, y: shiftY },
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const max = 10 * this.state.zoom.scale;
    // console.log(max);
    // ctx.translate(this.state.position.x, this.state.position.y);
    // ctx.scale(1, 1);

    const tX =
      Math.round(this.state.position.x) -
      this.state.zoomedBlock.x * max +
      this.state.mouseHoverInOnePixel.x;
    const tY =
      Math.round(this.state.position.y) -
      this.state.zoomedBlock.y * max +
      this.state.mouseHoverInOnePixel.y;

    ctx.setTransform(max, 0, 0, max, tX, tY);

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        // ctx.strokeStyle = "#000000";
        // ctx.lineWidth = strokeHeight;

        // // Cell line
        // ctx.moveTo(0, indexY);
        // ctx.lineTo(width, indexY);

        // // Row line
        // ctx.moveTo(indexW, 0);
        // ctx.lineTo(indexW, height);

        // ctx.stroke();

        ctx.fillStyle = elements.get([indexX, indexY].toString());
        ctx.fillRect(indexX, indexY, pixelWith, pixelHeight);
      }
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.zoomIn !== this.props.zoomIn) {
  //     this.updateCanvas();
  //   }
  // }

  trackWheel(e) {
    const { zoom } = this.state;

    let scale = 0;
    if (e.deltaY < 0) {
      scale = Math.min(5, zoom.scale * 1.1);
    } else {
      scale = Math.max(0.1, zoom.scale * (1 / 1.1));
    }

    if (!scale) return;

    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const differenceXMod = x % Math.ceil(pixelWithInPixels / 10);
    const differenceYMod = y % Math.ceil(pixelHeightInPixels / 10);

    const blockNumberX = Math.ceil(x / (pixelWithInPixels / 10)) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(y / (pixelHeightInPixels / 10)) - 1;

    this.setState(
      {
        mouseHoverInOnePixel: { x: differenceXMod, y: differenceYMod },
        position: { x: x, y: y },
        zoomedBlock: { x: blockNumberX, y: blockNumberY },
        zoom: { ...this.state.zoom, scale },
      },
      () => this.updateCanvas()
    );
  }

  // scale(zoom) {
  //   return {
  //     length: function (number) {
  //       return Math.floor(number * zoom.scale);
  //     },
  //     x: function (number) {
  //       return Math.floor((number - zoom.world.x) * zoom.scale + zoom.screen.x);
  //     },
  //     y: function (number) {
  //       return Math.floor((number - zoom.world.y) * zoom.scale + zoom.screen.y);
  //     },
  //     x_INV: function (number) {
  //       return Math.floor(
  //         (number - zoom.screen.x) * (1 / zoom.scale) + zoom.world.x
  //       );
  //     },
  //     y_INV: function (number) {
  //       return Math.floor(
  //         (number - zoom.screen.y) * (1 / zoom.scale) + zoom.world.y
  //       );
  //     },
  //   };
  // }

  // trackMouse(e) {
  //   const { mouse, zoom } = this.state;

  //   this.setState({
  //     mouse: {
  //       screen: {
  //         x: e.clientX,
  //         y: e.clientY,
  //       },
  //       world: {
  //         x: this.scale(zoom).x_INV(mouse.screen.x),
  //         y: this.scale(zoom).y_INV(mouse.screen.y),
  //       },
  //     },
  //   });
  // }

  zoomUsingCustomScale(e) {
    // console.log(e);
    // this.trackMouse(e);
    this.trackWheel(e);
    this.contactPixel(e);
    // const ctx = this.refs.canvas.getContext("2d");
    // console.log(ctx.getTransform());
    // ctx.save();
    // ctx.setTransform(5, 0.2, 0.8, 5, 0, 0);
    // ctx.restore();
    // const ctx = this.refs.canvas.getContext("2d");
    // ctx.restore();
    // this.updateCanvas();
  }

  contactPixel(e) {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const blockNumberX = Math.ceil(x / pixelWithInPixels) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(y / pixelHeightInPixels) - 1;

    this.setState({
      position: { x: blockNumberX, y: blockNumberY },
    });
  }

  changeColor(e) {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const blockNumberX = Math.ceil(x / pixelWithInPixels) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
    const blockNumberY = Math.ceil(y / pixelHeightInPixels) - 1;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = this.props.choosedColor;
    ctx.fillRect(blockNumberX, blockNumberY, pixelWith, pixelHeight);
  }

  randomColor() {
    let key = Math.floor(Math.random() * Math.floor(20));
    return colors[key].hex;
  }

  test() {
    const canvas = this.refs.canvas;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.scale(20, 20);
  }

  // move(moveTo) {
  //   const oldParams = this.state.position;
  //   const k = 10; // koef
  //   const positions = { ...this.state.position };

  //   switch (moveTo) {
  //     case "left":
  //       positions.x = oldParams.x - k;
  //       break;
  //     case "top":
  //       positions.y = oldParams.y + k;
  //       break;
  //     case "right":
  //       positions.x = oldParams.x + k;
  //       break;
  //     case "bottom":
  //       positions.y = oldParams.y - k;
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState(
  //     {
  //       position: { ...positions },
  //     },
  //     () => this.updateCanvas()
  //   );
  // }

  render() {
    return (
      <>
        {/* <button onClick={() => this.move("left")}>left</button>
        <button onClick={() => this.move("right")}>right</button>
        <button onClick={() => this.move("top")}>top</button>
        <button onClick={() => this.move("bottom")}>bottom</button> */}
        <canvas
          ref="canvas"
          width={800}
          height={502}
          className="drawer"
          // onClick={(e) => this.changeColor(e)}
        />
      </>
    );
  }
}

// import React from "react";
// import useCanvas from "./useCanvas";

// const Canvas = (props) => {
//   const { draw, ...rest } = props;
//   const canvasRef = useCanvas(draw);

//   return (
//     <canvas
//       width="800"
//       height="502"
//       class="drawer"
//       ref={canvasRef}
//       {...rest}
//     />
//   );
// };

// export default Canvas;
