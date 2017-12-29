/* global math */

import RungeKutta from './RungeKutta.js'
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

  calculateRungeKuttaPoints (from, to, coefficients, stepSize) {
    const compiledDerivative = math.compile(store.getState().givenDerivative)
    const derivativeAt = (x, y) => compiledDerivative.eval({ x, y })

    let x = from
    let y = math.eval(store.getState().primitiveFunction, { x })

    this.rungeKuttaPoints = { x: [ x ], y: [ y ] }

    while (x < to) {
      y = RungeKutta.step(x, y, coefficients, stepSize, derivativeAt)
      // y = RungeKutta.step(x, y, coefficients.secondOrderCoefficients, stepSize, derivativeAt)
      x += stepSize

      this.rungeKuttaPoints.x.push(x)
      this.rungeKuttaPoints.y.push(y)
    }
  }

  calculateEmbeddedRungeKuttaPoints (from, to, coefficients, embeddedCoefficients, initialStepSize, errorLimit) {
    const dampingNumber = 0.9
    const p = 3

    const compiledDerivative = math.compile(store.getState().givenDerivative)
    const derivativeAt = (x, y) => compiledDerivative.eval({ x, y })

    let stepSize = initialStepSize
    let x = from
    let y = math.eval(store.getState().primitiveFunction, { x })

    this.rungeKuttaPoints = { x: [ x ], y: [ y ] }

    while (x < to) {
      // console.log(x)

      if (this.rungeKuttaPoints.x.length > 100) {
        throw Error('Runge Kutta points exceeded 100.')
      }

      const newY = RungeKutta.step(x, y, coefficients, stepSize, derivativeAt)
      const embeddedY = RungeKutta.step(x, y, embeddedCoefficients, stepSize, derivativeAt)

      const suggestedStepSize = dampingNumber * Math.pow(errorLimit / Math.abs(embeddedY - newY), 1 / p) * stepSize

      if (suggestedStepSize <= 0.1 * stepSize) {
        stepSize = 0.1 * stepSize
        y = RungeKutta.step(x, y, coefficients, stepSize, derivativeAt)
        x += stepSize
      } else if (0.1 * stepSize <= suggestedStepSize && suggestedStepSize <= stepSize) {
        stepSize = suggestedStepSize
        y = RungeKutta.step(x, y, coefficients, stepSize, derivativeAt)
        x += stepSize
      } else if (stepSize <= suggestedStepSize && suggestedStepSize <= 2 * stepSize) {
        y = newY
        x += stepSize
        stepSize = suggestedStepSize
      } else if (2 * stepSize <= suggestedStepSize) {
        y = newY
        x += stepSize
        stepSize = 2 * stepSize
      }

      this.rungeKuttaPoints.x.push(x)
      this.rungeKuttaPoints.y.push(y)
    }
  }
}
