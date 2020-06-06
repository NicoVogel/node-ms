
export const rabbitmqURL = 'amqp://rabbitmq';
export const mainTopics = [
    'account',
    'event',
    'billing'
]

export const topicKeys = [
    'account.created',
    'billing.request',//states
    'billing.pending',
    'billing.completed',
    'billing.addToCart',//cartAction
    'billing.removeFromCart',
    'billing.replaceCart',
    'billing.emptyCart'
]