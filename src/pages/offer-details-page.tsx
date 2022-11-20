import React from 'react';
import OfferDetailsCard from '../components/offer-details-card';
import { Offer } from '../types/offer';

export default function LandingPage() {
  const offer: Offer = {
    startingDate: new Date(),
    endDate: new Date(),
    description: 'Ceci est la description',
    contractType: 'CDI',
    jobType: 'FULL_TIME',
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
