/* global MathJax */

import Calculations from './Calculations.js'
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

    this.initialize()
  }

  initialize () {
    this.functionInputLabel = document.createElement('div')
    this.functionInputLabel.innerText = 'Input:'
    this.container.appendChild(this.functionInputLabel)

    this.functionInput = document.createElement('input')
    this.functionInput.value = 'e^x'
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

    // Process

    this.processButton = document.createElement('input')
    this.processButton.id = 'processButton'
    this.processButton.type = 'button'
    this.processButton.value = 'Process'
    this.container.appendChild(this.processButton)

    this.updateFields()
  }

  inputChanged (e) {
    store.setState({ function: e.target.value })
    this.updateFields()
  }

  updateFields () {
    this.functionOutput.innerText = `\`${store.getState().function}\``
    this.derivativeOutput.innerText = `\`${store.getState().derivative}\``
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.container])
  }
}
