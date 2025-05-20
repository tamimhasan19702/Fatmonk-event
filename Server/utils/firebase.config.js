/** @format */
const dotenv = require("dotenv");
dotenv.config();

var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || "gs://react-social-1.appspot.com",
});

const bucket = admin.storage().bucket();
module.exports = { admin, bucket };
