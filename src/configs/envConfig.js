const envConfig = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5299',
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'token',
  USER_KEY: import.meta.env.VITE_USER_KEY || 'user',
  AUTH_STORE_KEY: import.meta.env.VITE_AUTH_STORE_KEY || 'user-storage',
};

if (!envConfig.BACKEND_URL) {
  throw new Error('BACKEND_URL is not defined');
}

if (!envConfig.FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not defined');
}

if (!envConfig.TOKEN_KEY) {
  throw new Error('TOKEN_KEY is not defined');
}

if (!envConfig.USER_KEY) {
  throw new Error('USER_KEY is not defined');
}

if (!envConfig.AUTH_STORE_KEY) {
  throw new Error('AUTH_STORE_KEY is not defined');
}

export default envConfig;
