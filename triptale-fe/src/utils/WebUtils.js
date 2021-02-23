const WebUtils = {
  getIsMobile: () => {
    let isMobile = false;
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      isMobile = true;
    }
    return isMobile;
  },
};

export default WebUtils;
