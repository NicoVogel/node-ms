const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['kafka:9092']
})

const requestAmount = 100000;
const producer = kafka.producer();
const waitForSeconds = 11;

const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]: ${msg}`)



const run = async () => {
    await producer.connect()
    let startTime;
    let requests = [];

    log(`**start Sending ${requestAmount} in batches requests`)
    startTime = Date.now();
    const batches = 10;
    const limit = requestAmount / batches;
    for (let j = 0; j < batches; j++) {
        let messages = [];
        // for (let index = limit; index >= 0; index--) {
        //     messages.push({ value: `${index * j}: 'Hello World!' -batch` })
        // }
        for (let index = 0; index <= limit; index++) {
            messages.push({ value: `${index * j}: 'Hello World!' -batch` })
        }
        await producer.send({
            topic: 'logs',
            messages,
        });
        log(`progress: ${j * 10}%`)
    }
    await producer.send({
        topic: 'logs',
        messages: [{ value: 'end-batch' }],
    })
    // await Promise.all(requests);
    log(`**done sending after ${Date.now() - startTime}ms`);


    log(`**start Sending ${requestAmount} single requests`)
    startTime = Date.now();
    for (let index = 0; index <= requestAmount; index++) {
        await requests.push(producer.send({
            topic: 'logs',
            messages: [{ value: `${index}: 'Hello World!' -single` }]
        }));
        if (index % (requestAmount / 10) === 0) {
            log(`progress: ${(index / requestAmount) * 100}%`)
        }
    }
    await producer.send({
        topic: 'logs',
        messages: [{ value: 'end-single' }],
    })
    // await Promise.all(requests);
    log(`**done sending after ${Date.now() - startTime}ms`);

}

setTimeout(() => run().catch(e => console.error(`[example/producer] ${e.message}`, e)),
    1000 * waitForSeconds)







const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async () => {
        try {
            console.log(`process.on ${type}`)
            await producer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})