
const accountEvents = {
  "account.created": {
    _id: "string",
    name: "string"
  }
}
const billingEvents = {
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
  'billing.pending': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    }
  },
  'billing.completed': {
    _id: {
      accountId: "mongo ObjectId string",
      eventId: "mongo ObjectId string"
    }
  },
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
  'event.create': {
    _id: "mongo ObjectId string",
    title: "string"
  }
}