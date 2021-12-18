import brain from 'brain.js'

const network = new brain.NeuralNetwork({
  hiddenLayers: [3, 6]
})

network.train([
  {
    input: [0, 0],
    output: [0]
  },
  {
    input: [1, 0],
    output: [1]
  },
  {
    input: [1, 1],
    output: [0]
  },
  {
    input: [0, 1],
    output: [1]
  },
])

console.log(network.run([0, 0]))