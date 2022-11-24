import React from 'react';
import ApplicationForm from '../components/forms/application/application-form';
import { Application } from '../types/application/Application';
import { ContractType, JobType, Offer } from '../types/offer/Offer';

export default function ApplyToOfferPage() {
  const offer:Offer = {
    offerId: 'test',
    companyId: 'test',
    title: 'test',
    description: 'test',
    location: 'test',
    creationDate: new Date(),
    startingDate: new Date(),
    endDate: new Date(),
    contractType: ContractType.CDD,
    jobType: JobType.FULL_TIME,
    salary: 30,
    needDrivingLicense: true,
    ledToJob: true,
  };

  const onSubmitionSuccess = (createdApplication: Application) => {
    console.log(createdApplication);
  };

  return (
    <ApplicationForm
      offerId={{ offerId: offer.offerId }}
      onSubmitionSuccess={onSubmitionSuccess}
    />
  );
}
