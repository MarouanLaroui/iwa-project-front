import { Offer } from '../../../types/Offer';
import useFetchMany from '../../generic/useFetchMany';

export default function useFetchCompany(id: string) {
  return useFetchMany<Offer>(`offers/${id}`);
}
