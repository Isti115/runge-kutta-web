/* global math */

class Store {
  constructor () {
    this.state = {
      function: 'e^x',
      derivative: 'e^x'
    }

    this.callbacks = []
  }

  getState () {
    return this.state
  }

  setState (updates) {
    this.state = Object.assign({}, this.state, updates)

    try {
      this.state.derivative = math.derivative(this.state.function, 'x')
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
