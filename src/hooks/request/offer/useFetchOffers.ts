import { Offer } from '../../../types/offer/Offer';
import useFetchMany from '../../generic/useFetchMany';

export default function useFetchCompanies() {
  return useFetchMany<Offer>('offers');
}
