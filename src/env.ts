const env = {
  APP: {
    NAME: 'Library API',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    DB_DATABASE: process.env.DB_DATABASE,
    PORT: process.env.DB_PORT,
  },
};

export default env;
