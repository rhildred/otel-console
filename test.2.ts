var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rnhprog81102018.firebaseio.com"
});

console.log("Firebase initialized");

let db = admin.database();

let ref = db.ref("logs");

ref.push({message:"your code is working now", timestamp: new Date().toISOString()});