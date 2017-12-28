/* global Chart */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

export default class Renderer {
  /**
   * @param {HTMLElement} container
   */
  constructor (container, calculations) {
    this.container = container
    this.calculations = calculations

    this.initialize = this.initialize.bind(this)
    this.renderAxes = this.renderAxes.bind(this)
    this.renderDataset = this.renderDataset.bind(this)

    this.initialize()
  }

  initialize () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 800
    this.canvas.height = 600
    this.container.appendChild(this.canvas)

    this.context = this.canvas.getContext('2d')

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        // labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        labels: [...Array(500)].map((x, i) => i),
        datasets: [{
          label: 'Primitive function',
          data: [1, 2, 3, 4, 5, 6],
          borderColor: chartColors.red,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
          lineTension: 0
        }, {
          label: 'Derivative',
          data: this.calculations.derivativeValues,
          borderColor: chartColors.blue,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
          lineTension: 0
        }, {
          label: 'Runge-Kutta',
          data: this.calculations.rungeKuttaValues,
          borderColor: chartColors.green,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
        tooltips: {
          mode: 'index'
        },
        scales: {
          xAxes: [{
            position: 'bottom',
            gridLines: {
              zeroLineColor: 'rgba(0,255,0,1)'
            },
            scaleLabel: {
              display: true,
              labelString: 'x axis'
            },
            ticks: {
              min: 0,
              max: 100,

              // forces step size to be 5 units
              stepSize: 5
            }
          }],
          yAxes: [{
            position: 'left',
            gridLines: {
              zeroLineColor: 'rgba(0,255,0,1)'
            },
            scaleLabel: {
              display: true,
              labelString: 'y axis'
            }
          }]
        }
        // scales: {
        //   xAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true
        //     }
        //   }],
        //   yAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Value'
        //     },
        //     ticks: {
        //       suggestedMin: -10,
        //       suggestedMax: 200
        //     }
        //   }]
        // }
      }
    })
  }

  /**
   * @param {Point} center
   */
  renderAxes (center) {
    this.context.fillRect(center.x, center.y, 10, 10)
  }

  renderDataset (state) {
    this.renderAxes({x: 300, y: 300})
  }
}
