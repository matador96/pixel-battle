import React from "react";
import "./style.css";
import colors from "./consts/colors";
import users from "./consts/users";
import Canvas from "./components/Canvas";
import StyledReactPanZoom from "@ajainarayanan/react-pan-zoom";

// const width = 800;
// const height = 500;

// const draw = (ctx, frameCount) => {
//   const positionY = 5;
//   const positionX = 5;
//   const pixelWith = 1;
//   const pixelHeight = 1;

//   // for (let indexW = 0; indexW < width; indexW++) {
//   //   for (let indexY = 0; indexY < height; indexY++) {
//   //     ctx.fillRect(indexW, indexY, pixelWith, pixelHeight);
//   //     ctx.fillStyle = "#f1f1f1";
//   //   }
//   // }
// };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = { dx: 0, dy: 0, zoom: 1 };
  }

  componentDidMount() {
    // window.addEventListener(
    //   "wheel",
    //   (event) => {
    //     var oldPos = window.scrollY;
    //     const { ctrlKey } = event;
    //     var newPos = window.scrollY;
    //     if (newPos > oldPos) {
    //       this.zoomOut();
    //     } else if (newPos < oldPos) {
    //       this.zoomIn();
    //       // } else {
    //       //   console.log("same");
    //       // }
    //     }
    //     // console.log(event);
    //     // if (ctrlKey) {
    //     //   console.log(ctrlKey);
    //     //   // eslint-disable-next-line no-unused-expressions
    //     //   event.preventDefault;
    //     //   return;
    //     // }
    //   },
    //   { passive: false }
    // );
  }

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.2,
    });
  };

  zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.2,
    });
  };

  onPan = (dx: number, dy: number) => {
    this.setState({
      dx,
      dy,
    });
  };

  render() {
    return (
      <div className="App">
        <header></header>
        <div className="header-block">
          <div className="colors-block">
            <label>Цвета</label>
            <div className="colors-list">
              {colors.map((color) => (
                <div
                  id={color.hex}
                  data-color={color.hex}
                  style={{ backgroundColor: color.rgb }}
                />
              ))}
            </div>
          </div>
          <div className="users-top-block">
            <label>Топ</label>
            <div className="user-list">
              {users.map((user) => (
                <div>
                  <div
                    className="user-avatar"
                    style={{ backgroundImage: "url(" + user.avatar + ")" }}
                  />
                  <div className="user-nickname">
                    <span>{user.nickname}</span>
                    <i>{user.count}</i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button onClick={this.zoomOut}>-</button>
          <input type="range" id="volume" name="volume" min="0" max="11"/>
          <button onClick={this.zoomIn}>+</button>
        </div>
        <div className="canvas-block">
        *<StyledReactPanZoom
            zoom={this.state.zoom}
            pandx={this.state.dx}
            pandy={this.state.dy}
            onPan={this.onPan}
          > 
            <Canvas zoomIn={this.state.zoomIn} zoomOut={this.state.zoomOut}/>
         </StyledReactPanZoom>
        </div>
      </div>
    );
  }
}
