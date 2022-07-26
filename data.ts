export type Cm = number
export type Dataset = {
  length: [mean: Cm, stddev: Cm]
  girth: [mean: Cm, stddev: Cm]
}

export const BP: Dataset = {
  length: [13.94378, 1.704481],
  girth: [11.63951, 1.314317],
}

export const NBP: Dataset = {
  length: [12.57542, 1.706571],
  girth: [11.63951, 1.314317],
}