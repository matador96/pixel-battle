import React from 'react';
import colors from './../consts/colors';
import { default as socket } from '../api/ws';
import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

const TransitionOff = 500;

const LoaderFullWindow = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background: #c9c9c9;
  flex-direction: column;
  span {
    margin-top: 15px;
    font-size: 14px;
  }
}
`;

const width = 260; // Elements in row
const height = 120; // Elements in cell

const defaultScaleCanvas = 10; // в то же время это размер пикселя в пикселях

const ZOOM_MAX = 40;
const ZOOM_MIN = 5;

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragStartPosition: { x: 0, y: 0 },
      currentTransformedCursor: { x: 0, y: 0 },
      isDragging: false,
      isLoaded: false,
      loaderText: 'Подключение',
      elements: new Map(),
    };
  }

  componentDidMount() {
    // this.generateRandomPixels();
    socket.on('connect pixelgame', (value) => {
      setTimeout(() => {
        this.setState({ elements: value, isLoaded: true }, () => this.initializeGame());
      }, TransitionOff);
    });

    setTimeout(() => {
      this.setState({ loaderText: 'Подключились' }, () => {
        setTimeout(() => {
          socket.emit('try connect pixelgame');
        }, 500);
      });
    }, 500);
  }

  initializeGame() {
    this.canvas = this.refs.canvas;
    this.canvasContext = this.canvas.getContext('2d');

    const { canvas, canvasContext } = this;
    this.setActualHeightAndWidthForCanvas();
    canvasContext.scale(defaultScaleCanvas, defaultScaleCanvas);

    const centeredPosition = {
      x: width / 4,
      y: height / 4,
    };

    canvasContext.translate(centeredPosition.x, centeredPosition.y);

    this.zoom(false); // this runs auto  this.updateCanvas();

    canvas.addEventListener('wheel', (e) => this.onWheel(e), false);
    canvas.addEventListener('mouseup', (e) => this.onMouseUp(e), false);
    canvas.addEventListener('click', (e) => this.onClickPixel(e), false);
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    canvas.addEventListener('mouseleave', (e) => this.setState({ isDragging: false }), false);

    socket.on('cooldown pixelgame', (value) => {
      this.props.toast({
        title: `У вас кулдаун ${value} секунд`,
        status: 'error',
        isClosable: true,
      });
    });

    socket.on('patch pixelgame', (value) => {
      this.setState({ elements: { ...this.state.elements, ...value } }, () => this.updateCanvas());
    });

    this.setState({ isLoaded: true });
  }

  setActualHeightAndWidthForCanvas() {
    const gameBlock = document.querySelector('.game');
    const { canvas, canvasContext } = this;

    canvas.height = gameBlock.clientHeight;
    canvas.width = gameBlock.clientWidth;

    const canvasWidth = gameBlock.clientWidth;
    const canvasHeight = gameBlock.clientHeight;

    canvasContext.translate(
      canvasWidth / 2 - (width * defaultScaleCanvas) / 2,
      canvasHeight / 2 - (height * defaultScaleCanvas) / 2,
    );
  }

  getTransformedPoint(x, y) {
    const originalPoint = new DOMPoint(x, y);
    return this.canvasContext.getTransform().invertSelf().transformPoint(originalPoint);
  }

  onWheel(event) {
    const zoom = event.deltaY < 0 ? 2 : 0.5;
    const { canvasContext } = this;

    const currentScale = this.decomposeMatrix(canvasContext.getTransform()).scaleX;
    const nextScale = currentScale * zoom;

    if (nextScale > ZOOM_MAX || nextScale < ZOOM_MIN) return;

    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);
    canvasContext.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    canvasContext.scale(zoom, zoom);
    canvasContext.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);

    this.changeCanvas();
    event.preventDefault();
  }

  zoom(zoomIn = true) {
    const zoom = zoomIn < 0 ? 2 : 0.5;
    const { canvasContext } = this;
    const { currentTransformedCursor } = this.state;

    const currentScale = this.decomposeMatrix(canvasContext.getTransform()).scaleX;
    const nextScale = currentScale * zoom;

    if (nextScale > ZOOM_MAX || nextScale < ZOOM_MIN) return;

    canvasContext.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    canvasContext.scale(zoom, zoom);
    canvasContext.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);

    this.changeCanvas();
  }

  onMouseUp() {
    this.setState({
      isDragging: false,
    });
  }

  changeCanvas() {
    const { canvas, canvasContext } = this;

    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();

    this.updateCanvas();
  }

  onMouseDown(event) {
    this.setState({
      dragStartPosition: this.getTransformedPoint(event.offsetX, event.offsetY),
      isDragging: true,
    });
  }

  decomposeMatrix(m) {
    const E = (m.a + m.d) / 2;
    const F = (m.a - m.d) / 2;
    const G = (m.c + m.b) / 2;
    const H = (m.c - m.b) / 2;

    const Q = Math.sqrt(E * E + H * H);
    const R = Math.sqrt(F * F + G * G);
    const a1 = Math.atan2(G, F);
    const a2 = Math.atan2(H, E);
    const theta = (a2 - a1) / 2;
    const phi = (a2 + a1) / 2;

    return {
      translateX: m.e,
      translateY: m.f,
      rotate: (-phi * 180) / Math.PI,
      scaleX: Q + R,
      scaleY: Q - R,
      skew: (-theta * 180) / Math.PI,
    };
  }

  onMouseMove(event) {
    const { dragStartPosition, isDragging } = this.state;
    const { canvasContext } = this;

    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);
    this.updateCoordinatesOnBlock(event);

    if (!isDragging) return;

    this.setState({
      currentTransformedCursor: this.getTransformedPoint(event.offsetX, event.offsetY),
    });

    canvasContext.translate(
      currentTransformedCursor.x - dragStartPosition.x,
      currentTransformedCursor.y - dragStartPosition.y,
    );

    this.changeCanvas();
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
    const { elements } = this.state;
    const { canvasContext } = this;

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        const keyCoordinate = [indexX, indexY].toString();
        canvasContext.fillStyle = elements[keyCoordinate] || '#fff';
        canvasContext.fillRect(indexX, indexY, 1, 1);
      }
    }
  }

  updateCoordinatesOnBlock(e) {
    const { numberOfBlock_X, numberOfBlock_Y } = this.getHoveredNumberOfBlocks(e);
    if (!numberOfBlock_X || !numberOfBlock_Y) return;
    document.querySelector(
      '#black-gamecard-value',
    ).innerHTML = `${numberOfBlock_X}, ${numberOfBlock_Y}`;
  }

  getHoveredNumberOfBlocks(e) {
    const { canvas, canvasContext } = this;

    const rect = canvas.getBoundingClientRect();
    const xInCanvas = e.clientX - rect.left;
    const yInCanvas = e.clientY - rect.top;

    const pixelBlock_X = canvasContext.getTransform().e;
    const pixelBlock_Y = canvasContext.getTransform().f;
    const pixelSize = canvasContext.getTransform().d;

    const startOfPixelBlock_X = pixelBlock_X;
    const endOfPixelBlock_X = startOfPixelBlock_X + width * pixelSize;

    const startOfPixelBlock_Y = pixelBlock_Y;
    const endOfPixelBlock_Y = startOfPixelBlock_Y + height * pixelSize;

    let numberOfBlock_X = '';
    let numberOfBlock_Y = '';

    if (
      xInCanvas >= startOfPixelBlock_X &&
      xInCanvas <= endOfPixelBlock_X &&
      yInCanvas >= startOfPixelBlock_Y &&
      yInCanvas <= endOfPixelBlock_Y
    ) {
      const xDistanceToClickInPixelBlock =
        pixelBlock_X < 0 ? xInCanvas + -pixelBlock_X : xInCanvas - pixelBlock_X;

      const yDistanceToClickInPixelBlock =
        pixelBlock_Y < 0 ? yInCanvas + -pixelBlock_Y : yInCanvas - pixelBlock_Y;

      numberOfBlock_X = Math.floor(xDistanceToClickInPixelBlock / pixelSize);
      numberOfBlock_Y = Math.floor(yDistanceToClickInPixelBlock / pixelSize);
    }

    return { numberOfBlock_X, numberOfBlock_Y };
  }

  onClickPixel(e) {
    const { isDragging } = this.state;
    if (isDragging) return;

    const { numberOfBlock_X, numberOfBlock_Y } = this.getHoveredNumberOfBlocks(e);

    if (!numberOfBlock_X || !numberOfBlock_Y) {
      return;
    }

    // const { canvasContext } = this;
    // canvasContext.fillStyle = this.props.choosedColor;
    // canvasContext.fillRect(numberOfBlock_X, numberOfBlock_Y, 1, 1);

    socket.emit('try patch pixelgame', {
      x: numberOfBlock_X,
      y: numberOfBlock_Y,
      color: this.props.choosedColor,
    });
  }

  randomColor() {
    const key = Math.floor(Math.random() * Math.floor(20));
    return colors[key].hex;
  }

  render() {
    return (
      <>
        <canvas ref="canvas" width={'100%'} height={'100vh'} className="drawer" />
        {!this.state.isLoaded && (
          <LoaderFullWindow>
            <Spinner thickness="2px" speed="0.65s" emptyColor="gray.400" size="xl" />
            <span>{this.state.loaderText}</span>
          </LoaderFullWindow>
        )}
      </>
    );
  }
}
