import React from 'react';
import OfferDetailsCard from '../components/offer-details-card';
import { ContractType, JobType, Offer } from '../types/offer/Offer';

export default function LandingPage() {
  const offer: Offer = {
    offerId: '1',
    startingDate: new Date(),
    endDate: new Date(),
    description: 'Ceci est la description',
    contractType: ContractType.CDI,
    jobType: JobType.FULL_TIME,
    salary: 1200,
    hasCompanyCar: true,
    needDrivingLicense: true,
    ledToJob: false,
    creationDate: new Date(),
  };
  return (
    <OfferDetailsCard offer={offer} />
  );
}
