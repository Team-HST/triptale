import http from '../http';

const fileService = {
  /**
   * 이미지 파일 업로드
   *
   * @param file (upload 파일 데이터)
   */
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return http.post('/api/system/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * 이미지 파일 다운로드
   *
   * @param fileNo (파일 다운로드 번호)
   */
  fileDownload: (fileNo) => {
    return http.get(`/api/system/storage/files/${fileNo}`);
  },
};

export default fileService;
