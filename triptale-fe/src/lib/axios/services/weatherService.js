import http from '../http';

const weatherService = {
  getCurrentWeatherType: () => {
    return http.get(`/api/content/weather/current`);
  }
};

export default weatherService;