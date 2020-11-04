import http from '../http';

const userService = {
  searchUser: (userNo) => {
    return http.get(`/api/content/users/${userNo}`);
  },
};

export default userService;
