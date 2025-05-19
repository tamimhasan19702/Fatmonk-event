/** @format */

var admin = require("firebase-admin");

var serviceAccount = require("./react-social-1-firebase-adminsdk-e14cd-bf107d493b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
module.exports = { admin, bucket };
