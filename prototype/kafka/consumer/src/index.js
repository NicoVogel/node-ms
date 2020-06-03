const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['kafka:9092']
});

let startTime;
const topic = 'logs';
const waitForSeconds = 10;
const consumer = kafka.consumer({ groupId: `group${Math.floor(Math.random() * Math.floor(100000))}` });
const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]: ${msg}`)

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const match = message.value.toString().match(/(\d+):/);
            if (match[1] == 0) {
                startTime = Date.now()
            } else if (match[1] == 10000) {
                log(`done after: ${Date.now() - startTime}ms`);
            }
        },
    })
}
run().catch(e => console.error(`[example/consumer] ${e.message}`, e))


setTimeout(() => run().catch(e => console.error(`[example/consumer] ${e.message}`, e)),
    1000 * waitForSeconds)


const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async e => {
        try {
            console.log(`process.on ${type}`)
            console.error(e)
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})