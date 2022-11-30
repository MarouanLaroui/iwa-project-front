import { Company } from './Company';

export type CompanyDTO = Omit<Company, 'id'> & {
  password: string
};

export type CompanyDTOFileUploadDTO = Omit<CompanyDTO, 'pictureUrl' > & {
  pictureToUpload?: File,
};

export type CompanyUpdateDTO = Omit<Company, 'id'>;

export type CompanyUpdateDTOFileToUpload = Omit<Company, 'id' | 'pictureUrl'> & {
  pictureToUpload?: File
};
