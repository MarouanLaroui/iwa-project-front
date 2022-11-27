import { Offer } from '../offer/Offer';

type Application = {
  applicationId: string;
  workerId: string;
  offer: Offer;
  message: string;
  isValidatedByCompany: boolean;
  isValidatedByWorker: boolean;
};

export default Application;
