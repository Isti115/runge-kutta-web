export default class Config {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    this.container = container

    this.initialize()
  }

  initialize () {
    this.functionInput = document.createElement('input')

    this.container.appendChild(this.functionInput)
  }
}
