const express = require('express')
const bodyParser = require('body-parser')
const morgen = require('morgan')
const { router } = require('./routers')
const cluster = require('cluster')
const {  isMaster } = require('cluster')
const process = require('process')
const { cpus } = require('os')
const { Worker, isMainThread } = require('worker_threads')


const app = express()

app.use(bodyParser.json())
app.use(morgen('dev'))

app.use('/api/student', router)

/**
 * 
 * @param {worker data} WorkerData 
 * @returns Promise of worker data
 */
const runService = (WorkerData) => {
    return new Promise((resolve, reject) => {
        const worker1 = new Worker('./worker.js', { workerData: WorkerData });
        if (isMainThread) {
            worker1.once('message', message => console.log(message));
            const worker2 = new Worker('./worker.js', { workerData: 'Worker Data 2' });
            worker2.once('message', message => console.log(message));
            resolve()
            worker1.on('error', reject);
            worker1.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`stopped with  ${code} exit code`));
            })
        }

    })

}

// get cpu process counts
const numCPUs = cpus().length;

if (isMaster) {
    console.log(`Primary ${process.pid} is running`);
    const run = async () => {
        await runService('Worker Data 1')
    }
    run().catch(err => console.error(err))
   
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        // create new worker
        cluster.fork();
    }

} else {
    app.listen(8080,async () => {
        console.log(`App is running on http://localhost:${8080}`)
    })
    console.log(`Worker ${process.pid} started`);
}
