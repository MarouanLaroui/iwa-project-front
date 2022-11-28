import { createContext } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

export interface CloudinaryContextType {
  cloudinary: Cloudinary
}

const CloudinaryContext = createContext<CloudinaryContextType>({
  cloudinary: new Cloudinary(),
});

export default CloudinaryContext;
