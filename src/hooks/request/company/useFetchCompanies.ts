import Company from '../../../types/Company';
import useFetchMany from '../../generic/useFetchMany';

export default function useFetchCompanies() {
  return useFetchMany<Company>('companies');
}
