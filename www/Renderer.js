/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

export default class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor (canvas) {
    this.canvas = canvas

    this.initialize()
  }

  initialize () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 600
    this.canvas.height = 600

    this.context = this.canvas.getContext('2d')

    this.renderState({})
  }

  /**
   * @param {Point} center
   */
  renderAxes (center) {
    this.context.fillRect(center.x, center.y, 10, 10)
  }

  renderState (state) {
    this.renderAxes({x: 300, y: 300})
  }
}
