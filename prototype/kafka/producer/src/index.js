const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['kafka:9092']
})

const requestAmount = 10000;
const producer = kafka.producer();
const waitForSeconds = 11;

const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]: ${msg}`)



const run = async () => {
    await producer.connect()
    console.log('\n\n\n\n');
    let startTime;
    log(`**start Sending ${requestAmount} single requests`)
    startTime = Date.now();
    const requests = [];
    for (let index = 0; index <= requestAmount; index++) {
        requests.push(producer.send({
            topic: 'logs',
            messages: [{ value: `${index}: 'Hello World!'` }]
        }));
    }
    await Promise.all(requests);
    console.log('\n\n\n\n');
    log(`**done sending after ${Date.now() - startTime}ms`);
    
    console.log('\n\n\n\n');
    log(`**start Sending ${requestAmount} in batches requests`)
    const messages = [];
    for (let index = 0; index <= requestAmount; index++) {
        messages.push({ value: `${index}: 'Hello World!'` })
    }
    await producer.send({
        topic: 'logs',
        messages,
    });
    console.log('\n\n\n\n');
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