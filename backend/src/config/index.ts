interface Config {
  port: string;
  db: {
    serviceAccountKey: string;
    storageBucket: string;
  };
  authentication: {
    jwtSecret: string;
  };
}

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
