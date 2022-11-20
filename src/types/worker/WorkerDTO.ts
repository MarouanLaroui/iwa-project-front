import { Worker } from './Worker';

type OfferDTO = Omit<Worker, 'id'>;

export default OfferDTO;
