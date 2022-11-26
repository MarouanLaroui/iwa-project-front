import { Company } from '../../types/company/Company';
import CompanyAuthenticated from '../../types/company/CompanyAuthenticated';
import CompanyDTO from '../../types/company/CompanyDTO';
import LoginDTO from '../../types/company/LoginDTO';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';

const useFetchCompany = (id: string) => useFetch<Company>(`companies/${id}`);

const useFetchCompanies = () => useFetchMany<Company>('companies/');

const signUpCompany = (companyToCreate: CompanyDTO) => usePost<CompanyDTO, CompanyAuthenticated>('companies/register', companyToCreate);

const useLoginCompany = (loginDTO: LoginDTO) => usePost<LoginDTO, CompanyAuthenticated>('companies/login', loginDTO);

export {
  useFetchCompanies, useFetchCompany, signUpCompany, useLoginCompany,
};
