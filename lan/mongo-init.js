
db = db.getSiblingDB('node-ms-account')

db.createUser({
  user: "account",
  pwd: "account",
  roles: [
    { role: "dbAdmin", db: "node-ms-account" },
    { role: "userAdmin", db: "node-ms-account" },
    { role: "readWrite", db: "node-ms-account" }
  ]
});

db = db.getSiblingDB('node-ms-billing')
db.createUser({
  user: "billing",
  pwd: "billing",
  roles: [
    { role: "dbAdmin", db: "node-ms-billing" },
    { role: "userAdmin", db: "node-ms-billing" },
    { role: "readWrite", db: "node-ms-billing" }
  ]
});

db = db.getSiblingDB('node-ms-event')
db.createUser({
  user: "event",
  pwd: "event",
  roles: [
    { role: "dbAdmin", db: "node-ms-event" },
    { role: "userAdmin", db: "node-ms-event" },
    { role: "readWrite", db: "node-ms-event" }
  ]
});

// db = db.getSiblingDB('node-ms-blank')
// db.createUser({
//   user: "blank",
//   pwd: "blank",
//   roles: [
//     { role: "dbAdmin", db: "node-ms-blank" },
//     { role: "userAdmin", db: "node-ms-blank" },
//     { role: "readWrite", db: "node-ms-blank" }
//   ]
// });