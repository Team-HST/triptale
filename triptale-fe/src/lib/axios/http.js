import axios from 'axios';

const serviceErrorArr = [4000, 4001];

// axios requset interceptor setting
axios.interceptors.request.use(
  function (config) {
    if (config.url.indexOf('dapi.kakao.com') === -1) {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
    }

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
    const statusCode = error.response.status;
    const systemCode = error.response.data.statusCode;

    if (!serviceErrorArr.includes(systemCode)) {
      console.log('error' + systemCode);
      if (statusCode === 404) {
        window.location = '/error/404';
      } else if (statusCode === 500) {
        window.location = '/error/500';
      } else if (statusCode === 401) {
        if (systemCode === 2001) {
          alert('해당요청에 접근권한이 없습니다.');
          window.location = '/';
        }
        window.location = '/error/401';
      } else if (statusCode === 403) {
        window.location = '/error/403';
      }
    }

    return Promise.reject(error);
  },
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
