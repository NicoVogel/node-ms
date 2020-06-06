const eventRest = {
    post: {
        '/': {
            body: {
                title: "string",
                created: "Date",
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
        '/': {
        },
        '/:id': {
        },
    }
}