import * as Amqp from 'amqp-ts';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs'
import { rabbitmqURL, mainTopics } from '../config/rabbitmq.config';

const keyRegex = /^(\w+).[\w|.]+$/;

export class EventAdapter {
    private mainExchanges: {
        [name: string]: Amqp.Exchange
    } = {};
    private connection: Amqp.Connection;
    private queueNames: Map<string, Subject<any>>;
    private publishinQueue: { mainTopic: string, key: string, message: Amqp.Message }[] = [];
    private readyForPublish: boolean = false;
    constructor() {
        this.connection = new Amqp.Connection(rabbitmqURL);
        mainTopics.forEach(topic => {
            this.mainExchanges[topic] = this.connection.declareExchange(topic, 'topic', { durable: false });
        });
        this.queueNames = new Map();
    }

    public get mainTopics(): string[] {
        return [...mainTopics];
    }

    public listen(key: string): Subject<any> {
        const mainTopic = this.getMainTopic(key);
        this.checkIfMainTopicExists(mainTopic);

        let subject = this.queueNames.get(key);
        if (subject !== undefined) {
            return subject;
        }
        const queue = this.connection.declareQueue(uuidv4(), { durable: false });
        const exchange = this.mainExchanges[mainTopic];
        queue.bind(exchange, key)

        const newSubject = new Subject<any>();
        queue.activateConsumer((message) => {
            newSubject.next(message.getContent());
            message.ack();
        })
        this.queueNames.set(key, newSubject);
        return newSubject;
    }

    public publish(key: string, data: any): void {
        const mainTopic = this.getMainTopic(key);
        this.checkIfMainTopicExists(mainTopic);

        const message = new Amqp.Message(data);
        if (this.readyForPublish) {
            this.mainExchanges[mainTopic].send(message, key);
        } else {
            this.publishinQueue.push({ key, mainTopic, message });
        }
    }

    public active() {
        this.connection.completeConfiguration().then(() => {
            this.readyForPublish = true;
            this.publishinQueue.forEach(publish => {
                if (this.mainTopics.includes(publish.mainTopic) === false) {
                    console.error(`queued publishing message could not be send, because the given main topic does not exist. provided main topic '${publish.mainTopic}' and key '${publish.key}'`);
                    return;
                }
                this.mainExchanges[publish.mainTopic].send(publish.message, publish.key);
            })
        })
    }

    private getMainTopic(key: string): string {
        const matches = key.match(keyRegex);
        if (matches === null || matches.length < 2) {
            throw new Error(`the key has to be of the format '<maintopic>.<subtopic>', while the provided key is: ${key}`);
        }
        return matches[1];
    }

    private checkIfMainTopicExists(mainTopic: string) {
        if (this.mainTopics.includes(mainTopic) === false) {
            throw new Error(`the selected given main topic ${mainTopic} is not part of the availiable topics, which are: ${this.mainTopics}`);
        }
    }

}


