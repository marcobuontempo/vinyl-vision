import config from "../config/index.js";
import admin from "firebase-admin";
import debug from "debug";
import { UserType } from "../../../shared/types/user.js";

const debugDatabase = debug("app:db");
const debugError500 = debug("app:error500");

let db: admin.firestore.Firestore;
let bucket: ReturnType<ReturnType<typeof admin.storage>["bucket"]>;

const connectDatabase = async () => {
  try {
    debugDatabase("Attempting database connection...");

    admin.initializeApp({
      credential: admin.credential.cert(config.db.serviceAccountKey),
      storageBucket: config.db.storageBucket,
    });

    db = admin.firestore();
    bucket = admin.storage().bucket();

    const collections = await db.listCollections();
    debugDatabase("Connected to Cloud Firestore");
    collections.forEach((collection) =>
      debugDatabase(`Found db collection: ${collection.id}`)
    );
  } catch (error) {
    debugError500(error);
  }
};

const mapDocument = <T>(document: admin.firestore.DocumentSnapshot): T => {
  return {
    ...document.data(),
    id: document.id,
  } as T;
};

export { connectDatabase, db, bucket, mapDocument };
