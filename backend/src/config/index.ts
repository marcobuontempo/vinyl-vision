/**
 * Application configuration interface.
 *
 */
interface Config {
  port: string; // port the application server listens on
  db: {
    serviceAccountKey: string; // path to Firebase service account key
    storageBucket: string; // Firebase storage bucket URL
  };
  authentication: {
    jwtSecret: string; // Secret key used for signing JWT
  };
}

/**
 * Application configuration object.
 *
 * Populated from environment variables with safe fallbacks.
 */
export const config: Config = {
  port: process.env.PORT ?? "3000",
  db: {
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS ?? "",
    storageBucket: process.env.STORAGE_BUCKET_URL ?? "",
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET ?? "",
  },
};

export default config;
