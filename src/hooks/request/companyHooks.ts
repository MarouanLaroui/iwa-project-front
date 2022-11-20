import Company from '../../types/company/Company';
import CompanyDTO from '../../types/company/CompanyDTO';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';

const useFetchCompany = (id: string) => useFetch<Company>(`companies/${id}`);

const useFetchCompanies = () => useFetchMany<Company>('companies');

const createCompanies = (companyToCreate: CompanyDTO) => usePost<CompanyDTO, Company>('companies', companyToCreate);

export { useFetchCompanies, useFetchCompany, createCompanies };
