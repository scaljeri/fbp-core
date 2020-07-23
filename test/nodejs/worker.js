// require('@babel/register')({
//   presets: ['@babel/preset-env']
// })
// https://medium.com/@jamischarles/using-import-export-in-node-js-with-esm-7ce9153ff63
require = require('esm')(module)

const { workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"

const { NodeWorker } = require('./random-number-generator.mjs');

// import('./random-number-generator.mjs').then(({ NodeWorker }) => {
  const rng = new NodeWorker()

  rng.init({ sockets: [{ id: 'xyz' }] })

  rng.outputStream(val => {
    parentPort.postMessage({ data: val })
    // console.log('received ', val);
  });
// })
