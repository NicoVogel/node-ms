const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['kafka:9092']
});

let startTime = {};
let counter = {};
const topic = 'logs';
const waitForSeconds = 10;
const requestAmount = 100000;
const consumer = kafka.consumer({ groupId: `group${Math.floor(Math.random() * Math.floor(100000))}` });
const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]: ${msg}`)

const run = async () => {
    log('connect')
    await consumer.connect()
    log('subscribe')
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        // autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            const msg = message.value.toString();
            (() => {
                if (msg.startsWith('end')) {
                    const match = msg.match(/.*\-(\w+)/);
                    log(`done after with [${match[1]}]: ${Date.now() - startTime[match[1]]}ms`);
                    return;
                }

                const match = msg.match(/(\d+):.*\-(\w+)/);
                if (!counter[match[2]]) {
                    counter[match[2]] = 0;
                }
                counter[match[2]]++;

                if (!startTime[match[2]]) {
                    startTime[match[2]] = Date.now();
                } else {
                    if (counter[match[2]] % (requestAmount / 10) == 0) {
                        log(`consumed [${match[2]}] by ${(counter[match[2]] / requestAmount) * 100}% (index/counter - ${match[1]}/${counter[match[2]] - 1})`)
                    }
                }
            })()
            consumer.commitOffsets([{ topic, partition, offset: message.offset }])
        },
    })
}


log(`wait for ${1000 * waitForSeconds}ms`)
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