import React from "react";
export default class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    const positionY = 5;
    const positionX = 5;
    const pixelWith = 1;
    const pixelHeight = 1;
    const width = 800;
    const height = 500;

    for (let indexW = 0; indexW < width; indexW++) {
      for (let indexY = 0; indexY < height; indexY++) {
        ctx.fillRect(indexW, indexY, pixelWith, pixelHeight);
        ctx.fillStyle = "#f1f1f1";
      }
    }
  }
  render() {
    return <canvas ref="canvas" width={800} height={502} class="drawer" />;
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
