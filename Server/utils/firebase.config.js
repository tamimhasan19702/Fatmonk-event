/** @format */

var admin = require("firebase-admin");

var serviceAccount = require("../../react-social-1-firebase-adminsdk-e14cd-65b4bbb7ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || "gs://react-social-1.appspot.com",
});

const bucket = admin.storage().bucket();
module.exports = { admin, bucket };
