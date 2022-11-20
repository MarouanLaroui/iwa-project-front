import { Offer } from '../../types/offer/Offer';
import useFetchMany from '../generic/useFetchMany';

const useFetchOffer = (id: string) => useFetchMany<Offer>(`offers/${id}`);

const useFetchOffers = () => useFetchMany<Offer>('offers');

export { useFetchOffer, useFetchOffers };
