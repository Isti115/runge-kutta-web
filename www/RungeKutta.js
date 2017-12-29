const firstOrderCoefficients = {
  a: [ 0 ],
  b: [
    []
  ],
  c: [ 1 ]
}

const secondOrderCoefficients = {
  a: [ 0, 1 / 2 ],
  b: [
    [ 1 / 2 ]
  ],
  c: [ 0, 1 ]
}

const thirdOrderCoefficients = {
  a: [ 0, 1 / 2, 1 ],
  b: [
    [ 1 / 2 ],
    [ -1, 2 ]
  ],
  c: [ 1 / 6, 2 / 3, 1 / 6 ]
}

const fourthOrderCoefficients = {
  a: [ 0, 1 / 2, 1 / 2, 1 ],
  b: [
    [ 1 / 2 ],
    [ 1 / 2, 0, 1 / 2 ],
    [ 0, 0, 1 ]
  ],
  c: [ 1 / 6, 2 / 6, 2 / 6, 1 / 6 ]
}

export const coefficients = {
  firstOrderCoefficients,
  secondOrderCoefficients,
  thirdOrderCoefficients,
  fourthOrderCoefficients
}

export default class RungeKutta {
  static step (x, y, coefficients, stepSize, derivativeAt) {
    const s = coefficients.a.length
    const k = []

    for (let j = 0; j < s; j++) {
      const sum = [...Array(j)].map(
        (x, l) => coefficients.b[j - 1][l] * k[l]
      ).reduce((a, b) => a + b, 0)

      k.push(derivativeAt(x + stepSize * coefficients.a[j], y + stepSize * sum))
    }

    const sum = [...Array(s)].map(
      (x, l) => coefficients.c[l] * k[l]
    ).reduce((a, b) => a + b, 0)

    return y + stepSize * sum
  }
}
