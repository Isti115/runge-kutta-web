/* global math */

import RungeKutta, * as coefficients from './RungeKutta.js'
import store from './store.js'

export default class Calculations {
  constructor () {
    window.rk = RungeKutta

    this.primitivePoints = { x: [], y: [] }
    this.derivativePoints = { x: [], y: [] }
    this.rungeKuttaPoints = { x: [], y: [] }

    this.initialize = this.initialize.bind(this)

    this.initialize()
  }

  initialize () {}

  calculateFunctionPoints (from, to, step) {
    this.primitivePoints = { x: [], y: [] }
    this.derivativePoints = { x: [], y: [] }

    for (let x = from; x < to; x += step) {
      this.primitivePoints.x.push(x)
      this.primitivePoints.y.push(math.eval(store.getState().primitiveFunction, { x }))

      this.derivativePoints.x.push(x)
      this.derivativePoints.y.push(math.eval(store.getState().derivative, { x }))
    }
  }

  calculateRungeKuttaPoints (from, to, stepSize) {
    const compiledDerivative = math.compile(store.getState().derivative)
    const derivativeAt = (x, y) => y // (x, y) => compiledDerivative.eval({ x, y })

    let x = 0
    let y = math.eval(store.getState().primitiveFunction, { x })

    this.rungeKuttaPoints = { x: [ x ], y: [ y ] }

    while (x < to) {
      y = RungeKutta.step(x, y, coefficients.firstOrderCoefficients, stepSize, derivativeAt)
      // y = RungeKutta.step(x, y, coefficients.secondOrderCoefficients, stepSize, derivativeAt)
      x += stepSize

      this.rungeKuttaPoints.x.push(x)
      this.rungeKuttaPoints.y.push(y)
    }
  }
}
