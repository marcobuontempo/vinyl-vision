import config from "./index.js";
import admin from "firebase-admin";

export let db: admin.firestore.Firestore,
  bucket: ReturnType<ReturnType<typeof admin.storage>["bucket"]>,
  dbPing: any;

try {
  const firebaseAppOptions = {
    credential: admin.credential.cert(config.db.serviceAccountKey),
    storageBucket: config.db.storageBucket,
  };

  admin.initializeApp(firebaseAppOptions);
  db = admin.firestore();
  bucket = admin.storage().bucket();

  dbPing = db.listCollections().then((collections) => {
    for (let collection of collections) {
      console.log(`Found db collection: ${collection.id}`);
    }
  });
} catch (error) {
  console.error(error);
}
