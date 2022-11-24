import { Offer } from './Offer';

type OfferDTO = Omit<Offer, 'offerId' | 'companyId' | 'creationDate' | 'ledToJob'>;

export default OfferDTO;
