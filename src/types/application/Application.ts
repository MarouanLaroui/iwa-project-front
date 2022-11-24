import { Offer } from "../offer/Offer";

export type Application = {
  applicationId: string;
  workerId: string;
  offer: Offer;
  message: string;
  isValidatedByCompany: boolean;

}