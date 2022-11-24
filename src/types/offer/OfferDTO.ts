import { Offer } from './Offer';

type OfferDTO = Omit<Offer, 'offerId' | 'creationDate' | 'ledToJob'>;

export default OfferDTO;
