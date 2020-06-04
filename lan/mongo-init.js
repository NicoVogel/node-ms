
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
