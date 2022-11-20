import { Offer } from './Offer';

type OfferDTO = Omit<Offer, 'offerId' | 'creationDate'>;

export default OfferDTO;
