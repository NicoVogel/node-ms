const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['kafka:9092']
});

const container = {};
const topic = 'logs';
const waitForSeconds = 10;
const requestAmount = 10000;
const consumer = kafka.consumer({ groupId: `group${Math.floor(Math.random() * Math.floor(100000))}` });
const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ')}]: ${msg}`)

const run = async () => {
    log('connect')
    await consumer.connect()
    log('subscribe')
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        // autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            const msg = message.value.toString();
            if (msg.startsWith('end')) {
                const match = msg.match(/.*\-(\w+)/);
                const config = match[1];
                const metaData = container[config];
                log(`done with [${config}] after ${Date.now() - metaData.startTime}ms and total match count is ${metaData.matches}/${requestAmount}`);
            } else {
                const match = msg.match(/(\d+):.*\-(\w+)/);
                const index = match[1];
                const config = match[2];

                if (container[config] === undefined) {
                    container[config] = {
                        index: -1,
                        startTime: Date.now(),
                        matches: 0
                    }
                }
                const metaData = container[config];
                metaData.index++;
                if (index == metaData.index) {
                    metaData.matches++;
                }
            }
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