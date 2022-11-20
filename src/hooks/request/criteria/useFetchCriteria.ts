import { Criteria } from '../../../types/criteria/Criteria';
import useFetch from '../../generic/useFetchOne';

export default function useFetchCompany(userId: string) {
  return useFetch<Criteria>(`offers/${userId}`);
}
