/* global MathJax */

// import Calculations from './Calculations.js'
import store from './store.js'

export default class Config {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    this.container = container

    this.initialize = this.initialize.bind(this)
    this.inputChanged = this.inputChanged.bind(this)
    this.updateFields = this.updateFields.bind(this)

    this.fromChanged = this.fromChanged.bind(this)
    this.toChanged = this.toChanged.bind(this)
    this.stepChanged = this.stepChanged.bind(this)

    this.initialize()
  }

  initialize () {
    this.functionInputLabel = document.createElement('div')
    this.functionInputLabel.innerText = 'Input:'
    this.container.appendChild(this.functionInputLabel)

    this.functionInput = document.createElement('input')
    this.functionInput.value = store.getState().primitiveFunction
    this.functionInput.addEventListener('input', this.inputChanged)
    this.container.appendChild(this.functionInput)

    // Primitive funtion

    this.primitiveFuntionLabel = document.createElement('div')
    this.primitiveFuntionLabel.innerText = 'Primitive function:'
    this.container.appendChild(this.primitiveFuntionLabel)

    this.functionOutput = document.createElement('div')
    this.container.appendChild(this.functionOutput)

    // Derivative

    this.derivativeLabel = document.createElement('div')
    this.derivativeLabel.innerText = 'Derivative:'
    this.container.appendChild(this.derivativeLabel)

    this.derivativeOutput = document.createElement('div')
    this.container.appendChild(this.derivativeOutput)

    // Separator

    this.container.appendChild(document.createElement('hr'))

    // From

    this.fromInputLabel = document.createElement('span')
    this.fromInputLabel.innerText = 'From: '
    this.container.appendChild(this.fromInputLabel)

    this.fromInput = document.createElement('input')
    this.fromInput.classList.add('rangeInput')
    this.fromInput.type = 'number'
    this.fromInput.value = store.getState().from
    this.fromInput.addEventListener('input', this.fromChanged)
    this.container.appendChild(this.fromInput)

    this.container.appendChild(document.createElement('br'))

    // To

    this.toInputLabel = document.createElement('span')
    this.toInputLabel.innerText = 'To: '
    this.container.appendChild(this.toInputLabel)

    this.toInput = document.createElement('input')
    this.toInput.classList.add('rangeInput')
    this.toInput.type = 'number'
    this.toInput.value = store.getState().to
    this.toInput.addEventListener('input', this.toChanged)
    this.container.appendChild(this.toInput)

    this.container.appendChild(document.createElement('br'))

    // Step

    this.stepInputLabel = document.createElement('span')
    this.stepInputLabel.innerText = 'Step: '
    this.container.appendChild(this.stepInputLabel)

    this.stepInput = document.createElement('input')
    this.stepInput.classList.add('rangeInput')
    this.stepInput.type = 'number'
    this.stepInput.step = 0.1
    this.stepInput.value = store.getState().step
    this.stepInput.addEventListener('input', this.stepChanged)
    this.container.appendChild(this.stepInput)

    // Separator

    this.container.appendChild(document.createElement('hr'))

    // Process

    this.processButton = document.createElement('input')
    this.processButton.id = 'processButton'
    this.processButton.type = 'button'
    this.processButton.value = 'Process'
    this.container.appendChild(this.processButton)

    this.updateFields()
  }

  inputChanged (e) {
    store.setState({ primitiveFunction: e.target.value })
    this.updateFields()
  }

  updateFields () {
    this.functionOutput.innerText = `\`${store.getState().primitiveFunction}\``
    this.derivativeOutput.innerText = `\`${store.getState().derivative}\``
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.container])
  }

  fromChanged (e) {
    store.setState({ from: Number(e.target.value) })
  }

  toChanged (e) {
    store.setState({ to: Number(e.target.value) })
  }

  stepChanged (e) {
    store.setState({ step: Number(e.target.value) })
  }
}
