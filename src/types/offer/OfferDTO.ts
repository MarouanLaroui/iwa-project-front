import { Offer } from './Offer';

type OfferDTO = Omit<Offer, 'offerId' | 'creationDate' | 'ledToJob' | 'creationDate'>;

export default OfferDTO;
