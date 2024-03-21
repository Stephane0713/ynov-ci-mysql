// mongo-init.js

// Connect to the database
var conn = new Mongo();
var db = conn.getDB("database");

// Create a collection with a schema
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "User's name",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "User's email address",
        },
      },
    },
  },
});

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: ["readWrite", "dbAdmin"], // Adjust roles based on your application needs
});
