const { workerData, parentPort } = require('worker_threads')


// to send the message to the worker thread
parentPort.postMessage({ message: workerData })