import http from '../http';

const fileService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return http.post('/api/system/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default fileService;
