
const accountEvents = {
  "account.created": {
    _id: "string",
    name: "string"
  }
}
const billingEvents = {
  // event tells billing to open an new invoice (1)
  'billing.request': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    },
    //Optional
    cart: [
      {
        sourceId: "string",
        purpose: "string",
        amount: "number"
      }
    ]
  },
  // event tells billing that the invoice is complete (3)
  'billing.pending': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    }
  },
  // billing shouts out that the transaction was made (4)
  'billing.completed': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    }
  },
  // inform billing over a new entry in for the invoice (2) 
  'billing.addToCart': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    },
    cart: [
      {
        sourceId: "string",
        purpose: "string",
        amount: "number"
      }
    ]
  },
  // inform billing, that an entry should be removed (2)
  'billing.removeFromCart': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    },
    sourceId: "string",
    purpose: "string",
  },
  'billing.replaceCart': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    },
    cart: [
      {
        sourceId: "string",
        purpose: "string",
        amount: "number"
      }
    ]
  },
  'billing.emptyCart': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    }
  }
}
const eventEvents = {
  // sent by event when a new event is created
  'event.created': {
    _id: "mongo ObjectId string",
    title: "string"
  },
  // sent by event when a user starts to register himself
  'event.registered': {
    eventId: "string",
    accountId: "string"
  }
}