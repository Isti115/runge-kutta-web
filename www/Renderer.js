/* global Plotly */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

// const chartColors = {
//   red: 'rgb(255, 99, 132)',
//   orange: 'rgb(255, 159, 64)',
//   yellow: 'rgb(255, 205, 86)',
//   green: 'rgb(75, 192, 192)',
//   blue: 'rgb(54, 162, 235)',
//   purple: 'rgb(153, 102, 255)',
//   grey: 'rgb(201, 203, 207)'
// }

export default class Renderer {
  /**
   * @param {HTMLElement} container
   */
  constructor (container, calculations) {
    this.container = container
    this.calculations = calculations

    this.initialize = this.initialize.bind(this)
    this.render = this.render.bind(this)

    this.initialize()
  }

  initialize () {}

  render () {
    if (!('renderMode' in window)) {
      window.renderMode = 'lines+markers'
    }

    Plotly.newPlot(this.container, [
      {
        name: 'Primitive',
        type: 'scatter',
        mode: window.renderMode,
        x: this.calculations.primitivePoints.x,
        y: this.calculations.primitivePoints.y
      },
      {
        name: 'Derivative',
        type: 'scatter',
        visible: 'legendonly',
        mode: window.renderMode,
        x: this.calculations.derivativePoints.x,
        y: this.calculations.derivativePoints.y
      },
      {
        name: 'RungeKutta',
        type: 'scatter',
        mode: window.renderMode,
        x: this.calculations.rungeKuttaPoints.x,
        y: this.calculations.rungeKuttaPoints.y
      }
    ], {
      width: 800,
      height: 600,
      dragmode: 'pan',
      hovermode: 'closest'
    })
  }
}
