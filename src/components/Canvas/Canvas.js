import React from 'react'
import colors from './../../consts/colors'

const width = 200 // Elements in row
const height = 100 // Elements in cell

const zoomDelta = 0.2
const defaultScaleCanvas = 10 // в то же время это размер пикселя в пикселях

export default class Canvas extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dragStartPosition: { x: 0, y: 0 },
      currentTransformedCursor: { x: 0, y: 0 },
      isDragging: false,
      elements: new Map()
    }
  }

  componentDidMount () {
    this.generateRandomPixels()
    this.canvas = this.refs.canvas
    this.canvasContext = this.canvas.getContext('2d')

    const { canvas, canvasContext } = this
    this.setActualHeightAndWidthForCanvas()
    canvasContext.scale(defaultScaleCanvas, defaultScaleCanvas)

    canvas.addEventListener('wheel', (e) => this.onWheel(e), false)
    canvas.addEventListener('mouseup', (e) => this.onMouseUp(e), false)
    canvas.addEventListener('click', (e) => this.onClickPixel(e), false)
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e), false)
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e), false)

    canvas.addEventListener('mouseleave', (e) => this.setState({ isDragging: false }), false)
  }

  setActualHeightAndWidthForCanvas () {
    const gameBlock = document.querySelector('.game')
    const { canvas, canvasContext } = this

    canvas.height = gameBlock.clientHeight
    canvas.width = gameBlock.clientWidth

    const canvasWidth = gameBlock.clientWidth
    const canvasHeight = gameBlock.clientHeight

    canvasContext.translate(
      canvasWidth / 2 - (width * defaultScaleCanvas) / 2,
      canvasHeight / 2 - (height * defaultScaleCanvas) / 2
    )
  }

  getTransformedPoint (x, y) {
    const originalPoint = new DOMPoint(x, y)
    return this.canvasContext.getTransform().invertSelf().transformPoint(originalPoint)
  }

  onWheel (event) {
    const zoom = event.deltaY < 0 ? 1.1 + zoomDelta : 0.9 - zoomDelta
    const { canvasContext } = this

    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY)

    canvasContext.translate(currentTransformedCursor.x, currentTransformedCursor.y)
    canvasContext.scale(zoom, zoom)
    canvasContext.translate(-currentTransformedCursor.x, -currentTransformedCursor.y)

    this.changeCanvas()
    event.preventDefault()
  }

  onMouseUp () {
    this.setState({
      isDragging: false
    })
  }

  changeCanvas () {
    const { canvas, canvasContext } = this

    canvasContext.save()
    canvasContext.setTransform(1, 0, 0, 1, 0, 0)
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.restore()

    this.updateCanvas()
  }

  onMouseDown (event) {
    this.setState({
      dragStartPosition: this.getTransformedPoint(event.offsetX, event.offsetY),
      isDragging: true
    })
  }

  onMouseMove (event) {
    const { dragStartPosition, isDragging } = this.state
    const { canvasContext } = this

    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY)

    if (!isDragging) return

    this.setState({
      currentTransformedCursor: this.getTransformedPoint(event.offsetX, event.offsetY)
    })

    canvasContext.translate(
      currentTransformedCursor.x - dragStartPosition.x,
      currentTransformedCursor.y - dragStartPosition.y
    )

    this.changeCanvas()
  }

  generateRandomPixels () {
    const elements = new Map()

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        elements.set([indexX, indexY].toString(), this.randomColor())
      }
    }

    this.setState({ elements }, () => this.updateCanvas())
  }

  updateCanvas () {
    const { elements } = this.state
    const { canvasContext } = this

    for (let indexX = 0; indexX < width; indexX++) {
      for (let indexY = 0; indexY < height; indexY++) {
        canvasContext.fillStyle = elements.get([indexX, indexY].toString())
        canvasContext.fillRect(indexX, indexY, 1, 1)
      }
    }
  }

  onClickPixel (e) {
    const { isDragging } = this.state
    if (isDragging) return

    const { canvas, canvasContext } = this

    const rect = canvas.getBoundingClientRect()
    const xInCanvas = e.clientX - rect.left
    const yInCanvas = e.clientY - rect.top

    const pixelBlock_X = canvasContext.getTransform().e
    const pixelBlock_Y = canvasContext.getTransform().f
    const pixelSize = canvasContext.getTransform().d

    const startOfPixelBlock_X = pixelBlock_X
    const endOfPixelBlock_X = startOfPixelBlock_X + width * pixelSize

    const startOfPixelBlock_Y = pixelBlock_Y
    const endOfPixelBlock_Y = startOfPixelBlock_Y + height * pixelSize

    if (
      xInCanvas >= startOfPixelBlock_X &&
      xInCanvas <= endOfPixelBlock_X &&
      yInCanvas >= startOfPixelBlock_Y &&
      yInCanvas <= endOfPixelBlock_Y
    ) {
      const xDistanceToClickInPixelBlock =
        pixelBlock_X < 0 ? xInCanvas + -pixelBlock_X : xInCanvas - pixelBlock_X

      const yDistanceToClickInPixelBlock =
        pixelBlock_Y < 0 ? yInCanvas + -pixelBlock_Y : yInCanvas - pixelBlock_Y

      const numberOfBlock_X = Math.floor(xDistanceToClickInPixelBlock / pixelSize)
      const numberOfBlock_Y = Math.floor(yDistanceToClickInPixelBlock / pixelSize)

      canvasContext.fillStyle = this.props.choosedColor
      canvasContext.fillRect(numberOfBlock_X, numberOfBlock_Y, 1, 1)
    }
  }

  randomColor () {
    const key = Math.floor(Math.random() * Math.floor(20))
    return colors[key].hex
  }

  render () {
    return <canvas ref="canvas" width={'100%'} height={'100vh'} className="drawer" />
  }
}
