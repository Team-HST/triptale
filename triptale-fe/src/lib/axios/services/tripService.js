import http from '../http';

const tripService = {
  createTrip: (trip) => {
    return http.post('/api/content/trips', trip);
  },
};

export default tripService;
