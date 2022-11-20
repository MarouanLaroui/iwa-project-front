import { Offer } from '../../../types/Offer';
import useFetchMany from '../../generic/useFetchMany';

export default function useFetchCompanies() {
  return useFetchMany<Offer>('offers');
}
