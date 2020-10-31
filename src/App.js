import React from "react";
import "./style.css";
import colors from "./consts/colors";
import users from "./consts/users";
import Canvas from "./components/Canvas";

const width = 800;
const height = 500;

const draw = (ctx, frameCount) => {
  const positionY = 5;
  const positionX = 5;
  const pixelWith = 1;
  const pixelHeight = 1;

    // for (let indexW = 0; indexW < width; indexW++) {
    //   for (let indexY = 0; indexY < height; indexY++) {
    //     ctx.fillRect(indexW, indexY, pixelWith, pixelHeight);
    //     ctx.fillStyle = "#f1f1f1";
    //   }
    // }
};

export default class App extends React.Component {
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
        <div className="canvas-block">
          <Canvas draw={draw} />
        </div>
      </div>
    );
  }
}
