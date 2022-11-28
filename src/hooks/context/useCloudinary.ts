import React from 'react';
import CloudinaryContext from '../../context/cloudinary-context';

const useCloudinary = () => React.useContext(CloudinaryContext);
export default useCloudinary;
