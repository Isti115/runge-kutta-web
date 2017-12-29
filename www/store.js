/* global math */

class Store {
  constructor () {
    this.state = {
      from: 0,
      to: 4,
      step: 0.1,
      primitiveFunction: 'e^x'
    }
    this.state.derivative = math.derivative(this.state.primitiveFunction, 'x').toString()

    this.callbacks = []
  }

  getState () {
    return this.state
  }

  setState (updates) {
    this.state = Object.assign({}, this.state, updates)

    try {
      this.state.derivative = math.derivative(this.state.primitiveFunction, 'x').toString()
    } catch (e) {
      console.log(e.toString())
    }

    this.callbacks.forEach(c => c(this.state))
  }

  subscribe (callback) {
    this.callbacks = [callback, ...this.callbacks]
  }
}

export default new Store()
