import { Company } from './Company';

export type CompanyDTO = Omit<Company, 'id'> & {
  password: string
};

export type CompanyDTOFileUploadDTO = Omit<CompanyDTO, 'pictureUrl'> & {
  picturToUpload?: File
};
