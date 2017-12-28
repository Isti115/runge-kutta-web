import Config from './Config.js'
import Renderer from './Renderer.js'

export default class App {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    this.container = container

    this.initialize()
  }

  initialize () {
    this.configContainer = document.createElement('div')
    this.config = new Config(this.configContainer)

    this.canvas = document.createElement('canvas')
    this.canvas.width = 600
    this.canvas.height = 600
    this.renderer = new Renderer(this.canvas)

    this.container.appendChild(this.configContainer)
    this.container.appendChild(this.canvas)

    console.log('app initialized')
  }
}
