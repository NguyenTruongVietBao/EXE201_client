const envConfig = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  ACCESS_TOKEN_KEY: import.meta.env.VITE_ACCESS_TOKEN_KEY || 'accessToken',
  USER_KEY: import.meta.env.VITE_USER_KEY || 'user',
  AUTH_STORE_KEY: import.meta.env.VITE_AUTH_STORE_KEY || 'user-storage',
};

if (!envConfig.BACKEND_URL) {
  throw new Error('BACKEND_URL is not defined');
}

if (!envConfig.ACCESS_TOKEN_KEY) {
  throw new Error('ACCESS_TOKEN_KEY is not defined');
}

if (!envConfig.USER_KEY) {
  throw new Error('USER_KEY is not defined');
}

if (!envConfig.AUTH_STORE_KEY) {
  throw new Error('AUTH_STORE_KEY is not defined');
}

export default envConfig;
