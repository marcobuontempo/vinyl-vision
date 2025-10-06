/**
 * Database Utilities
 *
 * Provides helper functions for connecting to Firebase Firestore and Storage,
 * as well as mapping Firestore document snapshots to TypeScript types.
 *
 */

// NPM IMPORTS
import admin from "firebase-admin";
import debug from "debug";
// LOCAL IMPORTS
import config from "../config/index.js";

// Debug logger for database-related actions
const debugDatabase = debug("app:db");
// Debug logger for Rrror(#500)-related actions
const debugError500 = debug("app:error500");

// Firestore database instance
let db: admin.firestore.Firestore;

// Firebase storage bucket instance
let bucket: ReturnType<ReturnType<typeof admin.storage>["bucket"]>;

/**
 * Connect to Firebase Admin (Firestore + Storage)
 * Initialises Firestore, Storage, and logs existing collections
 */
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

/**
 * Map a Firestore document snapshot to a TypeScript type, adding the `id` field
 * @template T - Type of the returned object
 * @param {admin.firestore.DocumentSnapshot} document - Firestore document snapshot
 * @returns {T} - Mapped object with all data fields + `id`
 */
const mapDocument = <T>(document: admin.firestore.DocumentSnapshot): T => {
  return {
    ...document.data(),
    id: document.id,
  } as T;
};

export { connectDatabase, db, bucket, mapDocument };
