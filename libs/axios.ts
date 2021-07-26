import axiosBase from 'axios';

const config = {
  baseURL: 'http://localhost:3008/',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  withCredentials: true,
};

export const axios = axiosBase.create(config);

axios.interceptors.response.use(res => {
  const { data } = res;
  // csrfトークンを自動でセット
  if (data?.csrfToken) {
    axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken;
  }
  return res;
});