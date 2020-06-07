const accountRest = {
    post: {
        '/user/authenticate': {
            name: "string",
            password: "password"
        },
        '/user/register': {
            name: "string",
            password: "password"
        }
    },
    get: {
        '/user/current': {},
        '/user/:id': {},
        '/user/': {}
    },
    put: {
        '/user/:id': {
            name: "string",
            password: "password"
        }
    },
    delete: {
        '/user/:id': {}
    }
}
const billingRest = {
    post: {
        '/pay': {
            eventId: "mongo ObjectId string",
            accountId: "mongo ObjectId string"
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
            title: "string",
            description: "string",
            price: "number"
        },
        '/register': {
            eventId: "mongo ObjectId string",
            accountId: "mongo ObjectId string"
        },
        '/confirm': {
            eventId: "mongo ObjectId string",
            accountId: "mongo ObjectId string"
        }
    },
    get: {
        '/': {},
        '/:id': {},
    }
}