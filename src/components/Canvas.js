import React from "react";
import colors from "./../consts/colors";

const pixelWith = 1;
const pixelHeight = 1;

const pixelWithInPixels = pixelWith * 10;
const pixelHeightInPixels = pixelHeight * 10;

const width = 10; // Elements in row
const height = 10; // Elements in cell
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
      pixelInPixels: 1 * 10,
      pixelSize: 1,
      dragStartPosition: { x: 0, y: 0 },
      currentTransformedCursor: { x: 0, y: 0 },

      clicked: false,
      elements: new Map(),
      data: {
        x: 0,
        y: 0,
        pixelWidth: 0,
        blockNumberX: 0,
        blockNumberY: 0,
        rectLeft: 0,
        rectRight: 0,
        clientX: 0,
        clientY: 0,
        transformedCursorPosition: "{}",
      },
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
      (e) => this.onMouseUp(e),
      false
    );

    this.refs.canvas.addEventListener(
      "mousedown",
      (e) => this.onMouseDown(e),
      false
    );

    this.refs.canvas.addEventListener(
      "mousemove",
      (e) => this.onMouseMove(e),
      false
    );

    this.refs.canvas.addEventListener(
      "mouseleave",
      (e) => this.setState({ clicked: false }),
      false
    );

    this.refs.canvas.addEventListener("wheel", (e) => this.onWheel(e), false);

    const { canvas } = this.refs;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
  }

  getTransformedPoint(x, y) {
    const { canvas } = this.refs;
    const context = canvas.getContext("2d");

    const originalPoint = new DOMPoint(x, y);
    return context.getTransform().invertSelf().transformPoint(originalPoint);
  }

  onWheel(event) {
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    const { canvas } = this.refs;
    const context = canvas.getContext("2d");

    const { currentTransformedCursor } = this.state;

    context.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    context.scale(zoom, zoom);
    context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);

    this.drawImageToCanvas();
    event.preventDefault();
  }

  onMouseUp() {
    this.setState({
      clicked: false,
    });
  }

  drawImageToCanvas() {
    const { canvas } = this.refs;
    const context = canvas.getContext("2d");

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    this.updateCanvas();
  }

  onMouseDown(event) {
    this.setState({
      dragStartPosition: this.getTransformedPoint(event.offsetX, event.offsetY),
      clicked: true,
    });
  }

  onMouseMove(event) {
    const { dragStartPosition } = this.state;

    const { canvas } = this.refs;
    const context = canvas.getContext("2d");

    const currentTransformedCursor = this.getTransformedPoint(
      event.offsetX,
      event.offsetY
    );

    if (this.state.clicked) {
      this.setState({
        currentTransformedCursor: this.getTransformedPoint(
          event.offsetX,
          event.offsetY
        ),
      });

      context.translate(
        currentTransformedCursor.x - dragStartPosition.x,
        currentTransformedCursor.y - dragStartPosition.y
      );

      this.drawImageToCanvas();
    }
  }

  // mouseMove(e) {
  //   if (!this.state.clicked) return;
  //   const { canvas } = this.refs;

  //   const transformedCursorPosition = this.getTransformedPoint(
  //     e.offsetX,
  //     e.offsetY
  //   );
  //   console.log(transformedCursorPosition);

  //   let m = { x: 0, y: 0 }; //mouse coords on mouse down
  //   let last_m = { x: 0, y: 0 }; //mouse coords on dragging
  //   //distance
  //   let d = { x: 0, y: 0 }; // distance while dragging
  //   let D = { x: 0, y: 0 }; // distance on mouse up

  //   let cw = (canvas.width = window.innerWidth),
  //     cx = cw / 2;
  //   let ch = (canvas.height = window.innerHeight),
  //     cy = ch / 2;

  //   const ctx = canvas.getContext("2d");

  //   last_m = this.oMousePos(canvas, e);

  //   let x = last_m.x - m.x + D.x;
  //   let y = last_m.y - m.y + D.y;

  //   // clear the context
  //   ctx.clearRect(-cw, 0, 2 * cw, ch);

  //   ctx.save();

  //   //translate the context
  //   ctx.translate(x, y);
  //   console.log(x, y);
  //   //repaint everithing
  //   const rect = canvas.getBoundingClientRect();
  //   const blockNumberY = canvasWidth - e.clientX - rect.left;

  //   console.log(`rect: ${rect.x}, e.clientX: ${e.clientX}`);

  //   this.setState(
  //     {
  //       position: {
  //         x: x,
  //         y: y,
  //       },
  //       data: {
  //         ...this.state.data,
  //         transformedCursorPosition: JSON.stringify(transformedCursorPosition),
  //       },
  //     },
  //     () => this.updateCanvas()
  //   );

  //   ctx.restore();
  // }

  oMousePos(canvas, evt) {
    var ClientRect = this.refs.canvas.getBoundingClientRect();
    return {
      //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }

  // mouseMove(e) {
  //   if (!this.state.clicked) return;

  //   const canvas = this.refs.canvas;

  //   const rect = canvas.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   const scalableValue = Math.floor(this.state.pixelSize * 10);

  //   const pixelWidth = this.state.pixelSize * scalableValue;

  //   const blockNumberX =
  //     Math.ceil(
  //       (x - this.state.data.blockNumberX * this.state.pixelSize) / pixelWidth
  //     ) - 1; // Округление в большую сторону всегда, поэтому отнимает 1
  //   const blockNumberY = Math.ceil(y / pixelHeight) - 1;

  //   this.setState(
  //     {
  //       position: {
  //         x: x - blockNumberX * this.state.pixelSize,
  //         y: y - blockNumberY * this.state.pixelSize,
  //       },
  //       data: {
  //         x,
  //         y,
  //         pixelWidth,
  //         blockNumberX,
  //         blockNumberXPixel: blockNumberX * scalableValue,
  //         blockNumberY,
  //         rectLeft: rect.left,
  //         rectTop: rect.top,
  //         clientX: e.clientX,
  //         clientY: e.clientY,
  //       },
  //     },
  //     () => this.updateCanvas()
  //   );
  // }

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
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // const max = this.state.pixelInPixels;

    // ctx.setTransform(
    //   max,
    //   0,
    //   0,
    //   max,
    //   this.state.position.x,
    //   this.state.position.y
    // );

    for (let indexX = 0; indexX <= width; indexX++) {
      for (let indexY = 0; indexY <= height; indexY++) {
        ctx.fillStyle = elements.get([indexX, indexY].toString());
        ctx.fillRect(
          indexX,
          indexY,
          this.state.pixelSize,
          this.state.pixelSize
        );
      }
    }
  }

  randomColor() {
    let key = Math.floor(Math.random() * Math.floor(20));
    return colors[key].hex;
  }

  render() {
    return (
      <>
        <div class="test-data">
          {Object.keys(this.state.data).map((key) => (
            <div>
              {key}: {this.state.data[key]}
            </div>
          ))}{" "}
        </div>

        <button onClick={() => this.clid()}>sss</button>

        <canvas
          ref="canvas"
          width={canvasWidth}
          height={canvasHeight}
          className="drawer"
        />
      </>
    );
  }
}
