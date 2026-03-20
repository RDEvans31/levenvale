interface Config {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
  ssl: false | { rejectUnauthorized: boolean };
}

export const getDbConfigFromUrl = (): Config => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const params = new URL(dbUrl);

  // Disable SSL for local development (localhost)
  const isLocalhost =
    params.hostname === 'localhost' || params.hostname === '127.0.0.1';

  return {
    user: params.username,
    password: params.password,
    host: params.hostname,
    port: parseInt(params.port, 10) || 5432,
    database: params.pathname.slice(1), // Remove leading '/'
    ssl: isLocalhost ? false : { rejectUnauthorized: false },
  };
};
