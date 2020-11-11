import http from '../http';

const userService = {
  /**
   * 유저 정보 조회
   *
   * @param userNo (유저 번호)
   */
  searchUser: (userNo) => {
    return http.get(`/api/content/users/${userNo}`);
  },
};

export default userService;
