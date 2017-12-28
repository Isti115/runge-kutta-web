/* global math */

import store from './store.js'

export default class Calculations {
  constructor () {
    this.primitivePoints = { x: [], y: [] }
    this.derivativePoints = { x: [], y: [] }
    this.rungeKuttaPoints = { x: [], y: [] }

    this.initialize = this.initialize.bind(this)

    this.initialize()
  }

  initialize () {
    this.calculateFunctionPoints(0, 3, 0.1)
  }

  calculateFunctionPoints (from, to, step) {
    this.primitivePoints = { x: [], y: [] }
    this.derivativePoints = { x: [], y: [] }
    this.rungeKuttaPoints = { x: [], y: [] }

    for (let x = from; x < to; x += step) {
      this.primitivePoints.x.push(x)
      this.primitivePoints.y.push(math.eval(store.getState().primitiveFunction, { x }))

      this.derivativePoints.x.push(x)
      this.derivativePoints.y.push(math.eval(store.getState().derivative, { x }))
    }
  }

  calculateRungeKuttaPoints (from, to, error) {

  }
}
