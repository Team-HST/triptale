import axios from 'axios';

// axios requset interceptor setting
axios.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// axios response interceptor setting
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
