const billingRest = {
    post: {
        '/pay': {
            body: {
                eventId: "mongo ObjectId string",
                accountId: "mongo ObjectId string"
            }
        }
    },
    get: {
        '/:accountId': {},
        '/:accountId/:eventId': {}
    }
}
const eventRest = {
    post: {
        '/': {
            body: {
                title: "string",
                description: "string",
                price: "number"
            }
        },
        '/register': {
            body: {
                eventId: "mongo ObjectId string",
                accountId: "mongo ObjectId string"
            }
        },
        '/confirm': {
            body: {
                eventId: "mongo ObjectId string",
                accountId: "mongo ObjectId string"
            }
        }
    },
    get: {
        '/': {},
        '/:id': {},
    }
}