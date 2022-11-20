import { Offer } from '../../types/offer/Offer';
import OfferDTO from '../../types/offer/OfferDTO';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';

const useFetchOffer = (id: string) => useFetchMany<Offer>(`offers/${id}`);

const useFetchOffers = () => useFetchMany<Offer>('offers');

const createOffer = (offerToPost:OfferDTO) => usePost<OfferDTO, Offer>('offers', offerToPost);

export { useFetchOffer, useFetchOffers, createOffer };
