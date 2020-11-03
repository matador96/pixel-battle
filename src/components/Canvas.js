import React from "react";
import colors from "./../consts/colors";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
   
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {

    //https://jsfiddle.net/akinuri/cbx7pmra/ Зум здесь
    const ctx = this.refs.canvas.getContext("2d");
    const max = 50;
    ctx.scale(max,max);
    const positionY = 5;
    const positionX = 5;
    const pixelWith = 1;
    const pixelHeight = 1;
    const width = 3000;
    const height = 3000;

    for (let indexW = 0; indexW < width; indexW++) {
      for (let indexY = 0; indexY < height; indexY++) {
        ctx.fillRect(indexW, indexY, pixelWith, pixelHeight);
        ctx.fillStyle = this.randomColor();
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.zoomIn !== this.props.zoomIn){
      this.updateCanvas();
    }
  }

  randomColor() {
    let key = Math.floor(Math.random() * Math.floor(20));
    return colors[key].hex;
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
