import { Criteria } from '../../../types/Criteria';
import useFetch from '../../generic/useFetchOne';

export default function useFetchCompany(userId: string) {
  return useFetch<Criteria>(`offers/${userId}`);
}
