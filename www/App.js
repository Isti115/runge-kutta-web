import Config from './Config.js'
import Calculations from './Calculations.js'
import Renderer from './Renderer.js'
import store from './store.js'

export default class App {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    this.container = container

    this.initialize = this.initialize.bind(this)
    this.process = this.process.bind(this)

    this.initialize()
  }

  initialize () {
    this.configContainer = document.createElement('div')
    this.configContainer.id = 'configContainer'
    this.config = new Config(this.configContainer)
    this.config.processButton.addEventListener('click', this.process)
    this.configContainer.addEventListener('keydown', e => { if (e.code === 'Enter') { this.process() } })
    this.container.appendChild(this.configContainer)

    this.calculations = new Calculations()

    this.rendererContainer = document.createElement('div')
    this.rendererContainer.id = 'rendererContainer'
    this.renderer = new Renderer(this.rendererContainer, this.calculations)
    this.container.appendChild(this.rendererContainer)

    this.process()
    console.log('app initialized')
  }

  process () {
    const { from, to, step } = store.getState()

    this.calculations.calculateFunctionPoints(from, to, step)
    this.calculations.calculateRungeKuttaPoints(from, to, 1)
    this.renderer.render()
  }
}
