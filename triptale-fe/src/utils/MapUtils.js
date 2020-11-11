const { kakao } = window;

const MapUtils = {
  getAddressToCoords: (searchArea, callback) => {
    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색
    geocoder.addressSearch(searchArea, callback);
  },
};

export default MapUtils;
