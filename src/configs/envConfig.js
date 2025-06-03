const envConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  frontendUrl: import.meta.env.VITE_FRONTEND_URL,
  tokenKey: import.meta.env.VITE_TOKEN_KEY,
  userKey: import.meta.env.VITE_USER_KEY,
  authStoreKey: import.meta.env.VITE_AUTH_STORE_KEY,
};

if (!envConfig.backendUrl) {
  throw new Error('BACKEND_URL is not defined');
}

if (!envConfig.frontendUrl) {
  throw new Error('FRONTEND_URL is not defined');
}

if (!envConfig.tokenKey) {
  throw new Error('TOKEN_KEY is not defined');
}

if (!envConfig.userKey) {
  throw new Error('USER_KEY is not defined');
}

if (!envConfig.authStoreKey) {
  throw new Error('AUTH_STORE_KEY is not defined');
}

export default envConfig;
