const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['kafka:9092']
})

const requestAmount = 10000;
const producer = kafka.producer();
const waitForSeconds = 11;

const log = (msg) => console.log(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]: ${msg}`)

const sendAwaitOptional = async (useAwait, producer, send) => {
    if (useAwait) {
        await producer.send(send);
    } else {
        producer.send(send);
    }
}

const introOutroWrap = async (useAwait, config, func) => {
    log(`start Sending with ${config}`)
    const startTime = Date.now();

    try {
        await func(useAwait);
        await producer.send({
            topic: 'logs',
            messages: [{ value: `end-${config}` }],
        })
    } catch (error) {
        log('error: ' + error.message)
    }

    log(`done with ${config} after ${Date.now() - startTime}ms`);
}


const singleRun = async (useAwait, config) => await introOutroWrap(useAwait, config, async (useAwait) => {
    for (let index = 0; index < requestAmount; index++) {
        await sendAwaitOptional(useAwait, producer, {
            topic: 'logs',
            messages: [{ value: `${index}: 'Hello World!' -${config}` }]
        });
    }
})

const singleRunAwaitAll = async (config) => await introOutroWrap(true, config, async (useAwait) => {
    const requests = [];
    for (let index = 0; index < requestAmount; index++) {
        requests.push(sendAwaitOptional(useAwait, producer, {
            topic: 'logs',
            messages: [{ value: `${index}: 'Hello World!' -${config}` }]
        }));
    }
    await Promise.all(requests);
});



const batchRun = async (useAwait, config) => await introOutroWrap(useAwait, config, async (useAwait) => {
    const batches = 10;
    const limit = requestAmount / batches;
    for (let j = 0; j < batches; j++) {
        let messages = [];
        for (let index = 0; index < limit; index++) {
            messages.push({ value: `${index * j}: 'Hello World!' -${config}` })
        }
        await sendAwaitOptional(useAwait, producer, {
            topic: 'logs',
            messages,
        });
    }
});


const batchRunAwaitAll = async (config) => await introOutroWrap(true, config, async (useAwait) => {
    const batches = 10;
    const limit = requestAmount / batches;
    const requests = [];
    for (let j = 0; j < batches; j++) {
        let messages = [];
        for (let index = 0; index < limit; index++) {
            messages.push({ value: `${index * j}: 'Hello World!' -${config}` })
        }
        requests.push(sendAwaitOptional(useAwait, producer, {
            topic: 'logs',
            messages,
        }));
    }
    await Promise.all(requests);
});

const run = async () => {
    log('connect')
    await producer.connect()

    const waitBetweenCalls = 60 * 1000;
    await batchRun(true, "batchAwait");
    setTimeout(async () => {
        await batchRunAwaitAll("batchAwaitAll");

        setTimeout(async () => {
            await singleRun(true, "singleAwait");

            setTimeout(async () => {
                await singleRunAwaitAll("singleAwaitAll");

                setTimeout(async () => {
                    await batchRun(false, "batchNoAwait");

                    setTimeout(async () => {
                        await singleRun(false, "singleNoAwait");
                    }, waitBetweenCalls);
                }, waitBetweenCalls);
            }, waitBetweenCalls);
        }, waitBetweenCalls);
    }, waitBetweenCalls);
}
// const run = async () => {
//     log('connect')
//     await producer.connect()

//     await singleRun(true, "singleAwait");
//     await batchRun(true, "batchAwait");

// }

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