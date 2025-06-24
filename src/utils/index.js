import envConfig from '../configs/envConfig';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatJustDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getToken = () => {
  return localStorage.getItem(envConfig.ACCESS_TOKEN_KEY);
};
export const setToken = (token) => {
  localStorage.setItem(envConfig.ACCESS_TOKEN_KEY, token);
};
export const removeToken = () => {
  localStorage.removeItem(envConfig.ACCESS_TOKEN_KEY);
};
