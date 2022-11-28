import axios from 'axios';

const uploadFile = (fileToUpload: File) => {
  const virginAxios = axios.create();
  const data = new FormData();
  data.append('file', fileToUpload);
  data.append('upload_preset', 'q2bjnlgc');
  data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
  return virginAxios.post(`${process.env.REACT_APP_CLOUDINARY_API_URL}`, data);

  // const data = new FormData();
  // data.append('file', fileToUpload);
  // data.append('upload_preset', 'q2bjnlgc');
  // data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
  // return fetch(`${process.env.REACT_APP_CLOUDINARY_API_URL}`, {
  //   method: 'POST',
  //   body: data,
  // });
};

export default uploadFile;
