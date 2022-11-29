import { Company } from '../../types/company/Company';
import CompanyAuthenticated from '../../types/company/CompanyAuthenticated';
import { CompanyDTO, CompanyDTOFileUploadDTO } from '../../types/company/CompanyDTO';
import LoginDTO from '../../types/company/LoginDTO';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';
import uploadFile from './fileHooks';

const useFetchCompany = (id: string) => useFetch<Company>(`companies/${id}`);

const useFetchCompanies = () => useFetchMany<Company>('companies/');

const signUpCompany = async (companyToCreate: CompanyDTOFileUploadDTO) => {
  const fileUploadedUrl: string | undefined = companyToCreate.picturToUpload
    ? (await uploadFile(companyToCreate.picturToUpload)).data.url
    : undefined;

  const company : CompanyDTO = {
    ...companyToCreate,
    pictureUrl: fileUploadedUrl,
  };
  return usePost<CompanyDTO, CompanyAuthenticated>('companies/register', company);
};

const useLoginCompany = (loginDTO: LoginDTO) => usePost<LoginDTO, CompanyAuthenticated>('companies/login', loginDTO);

export {
  useFetchCompanies, useFetchCompany, signUpCompany, useLoginCompany,
};
