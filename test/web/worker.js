import('/random-number-generator.js').then(({ NodeWorker }) => {
  console.log('YES', NodeWorker)

  const rng = new NodeWorker()

  rng.init({ sockets: [{ id: 'xyz' }] })

  rng.outputStream(val => {
    console.log('received ', val)
  })
})
