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
    this.functionChanged = this.functionChanged.bind(this)
    this.updateFields = this.updateFields.bind(this)
    this.derivativeChanged = this.derivativeChanged.bind(this)

    this.fromChanged = this.fromChanged.bind(this)
    this.toChanged = this.toChanged.bind(this)
    this.stepChanged = this.stepChanged.bind(this)

    this.methodChanged = this.methodChanged.bind(this)
    this.methodStepChanged = this.methodStepChanged.bind(this)
    this.errorLimitChanged = this.errorLimitChanged.bind(this)

    this.initialize()
  }

  initialize () {
    this.functionInputLabel = document.createElement('div')
    this.functionInputLabel.innerText = 'Primitive function:'
    this.container.appendChild(this.functionInputLabel)

    this.functionInput = document.createElement('input')
    this.functionInput.value = store.getState().primitiveFunction
    this.functionInput.addEventListener('input', this.functionChanged)
    this.container.appendChild(this.functionInput)

    // Primitive funtion

    this.primitiveFunctionLabel = document.createElement('div')
    this.primitiveFunctionLabel.innerText = 'Primitive function:'
    this.container.appendChild(this.primitiveFunctionLabel)

    this.functionOutput = document.createElement('div')
    this.container.appendChild(this.functionOutput)

    // Derivative

    this.derivativeLabel = document.createElement('div')
    this.derivativeLabel.innerText = 'Calculated derivative:'
    this.container.appendChild(this.derivativeLabel)

    this.derivativeOutput = document.createElement('div')
    this.container.appendChild(this.derivativeOutput)

    // Separator

    this.container.appendChild(document.createElement('hr'))

    // Derivative input

    this.derivativeInputLabel = document.createElement('div')
    this.derivativeInputLabel.innerText = 'Derivative input:'
    this.container.appendChild(this.derivativeInputLabel)

    this.derivativeInput = document.createElement('input')
    this.derivativeInput.value = store.getState().givenDerivative
    this.derivativeInput.addEventListener('input', this.derivativeChanged)
    this.container.appendChild(this.derivativeInput)

    // Given derivative

    this.givenDerivativeLabel = document.createElement('div')
    this.givenDerivativeLabel.innerText = 'Given derivative:'
    this.container.appendChild(this.givenDerivativeLabel)

    this.givenDerivativeOutput = document.createElement('div')
    this.container.appendChild(this.givenDerivativeOutput)

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

    // Method selector

    this.methodSelector = document.createElement('select')

    ;[
      { value: 'first', text: 'First order' },
      { value: 'second', text: 'Second order' },
      { value: 'third', text: 'Third order' },
      { value: 'fourth', text: 'Fourth order' },
      { value: 'embedded', text: 'Embedded' }
    ].forEach(o => {
      const currentOption = document.createElement('option')
      currentOption.value = o.value
      currentOption.text = o.text
      this.methodSelector.appendChild(currentOption)
    })

    this.methodSelector.value = store.getState().method
    this.methodSelector.addEventListener('change', this.methodChanged)

    this.container.appendChild(this.methodSelector)

    // Method step

    this.container.appendChild(document.createElement('br'))

    this.methodStepInputLabel = document.createElement('span')
    this.methodStepInputLabel.innerText = 'Method step: '
    this.container.appendChild(this.methodStepInputLabel)

    this.methodStepInput = document.createElement('input')
    this.methodStepInput.classList.add('rangeInput')
    this.methodStepInput.type = 'number'
    this.methodStepInput.step = 0.1
    this.methodStepInput.value = store.getState().methodStep
    this.methodStepInput.addEventListener('input', this.methodStepChanged)
    this.container.appendChild(this.methodStepInput)

    // Error limit

    this.container.appendChild(document.createElement('br'))

    this.errorLimitInputLabel = document.createElement('span')
    this.errorLimitInputLabel.innerText = 'Error limit: '
    this.container.appendChild(this.errorLimitInputLabel)

    this.errorLimitInput = document.createElement('input')
    this.errorLimitInput.classList.add('rangeInput')
    this.errorLimitInput.type = 'number'
    this.errorLimitInput.step = 0.1
    this.errorLimitInput.value = store.getState().errorLimit
    this.errorLimitInput.addEventListener('input', this.errorLimitChanged)
    this.container.appendChild(this.errorLimitInput)

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

  functionChanged (e) {
    store.setState({ primitiveFunction: e.target.value })
    this.updateFields()
  }

  updateFields () {
    this.functionOutput.innerText = `\`${store.getState().primitiveFunction}\``
    this.derivativeOutput.innerText = `\`${store.getState().derivative}\``
    this.givenDerivativeOutput.innerText = `\`${store.getState().givenDerivative}\``
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.container])
  }

  derivativeChanged (e) {
    store.setState({ givenDerivative: e.target.value })
    this.updateFields()
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

  methodChanged (e) {
    store.setState({ method: e.target.value })
  }

  methodStepChanged (e) {
    store.setState({ methodStep: Number(e.target.value) })
  }

  errorLimitChanged (e) {
    store.setState({ errorLimit: Number(e.target.value) })
  }
}
