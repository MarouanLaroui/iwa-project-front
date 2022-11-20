import Company from '../../../types/company/Company';
import useFetch from '../../generic/useFetchOne';

export default function useFetchCompany(id: string) {
  return useFetch<Company>(`companies/${id}`);
}
