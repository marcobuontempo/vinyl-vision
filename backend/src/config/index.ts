import { CorsOptions } from "cors";

/**
 * Application configuration interface.
 *
 */
interface Config {
  port: string; // Port the application server listens on
  db: {
    serviceAccountKey: string; // Path to Firebase service account key
    storageBucket: string; // Firebase storage bucket URL
  };
  authentication: {
    jwtSecret: string; // Secret key used for signing JWT
  };
  cloudinary: {
    cloud_name: string; // Name of Cloudinary Product Environment
    api_key: string; // API Key Value (e.g. 123456789101112)
    api_secret: string; // API Key Secret (e.g. xxxxxxxxxxxxxxxxxxxxxxxxxxx)
  };
  cors: CorsOptions;
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
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    api_key: process.env.CLOUDINARY_API_KEY ?? "",
    api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
  },
  cors: {
    origin: (origin, callback) => {
      const whitelist = [
        process.env.CORS_WHITELIST_1,
        process.env.CORS_WHITELIST_2,
      ]; // Allowed domains
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  },
};

export default config;
