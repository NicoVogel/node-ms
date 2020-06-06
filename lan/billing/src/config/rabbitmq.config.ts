
export const rabbitmqURL = 'amqp://rabbitmq';
export const mainTopics = [
    'account',
    'event',
    'billing'
]

export const topicKeys: Record<string, string[]> = {
    account: [
        'account.created'
    ]
}