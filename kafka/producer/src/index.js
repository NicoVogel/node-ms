const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['kafka:9092']
})

const producer = kafka.producer();

const run = async () => {
    await producer.connect()
    await producer.send({
        topic: 'logs',
        messages: [
          { value: 'Hello KafkaJS user!' },
        ],
      })
    console.log('send message')
}

run().catch(e => console.error(`[example/producer] ${e.message}`, e))




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