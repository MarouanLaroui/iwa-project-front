import Company from '../../types/company/Company';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';

const useFetchCompany = (id: string) => useFetch<Company>(`companies/${id}`);

const useFetchCompanies = () => useFetchMany<Company>('companies');

export { useFetchCompanies, useFetchCompany };
