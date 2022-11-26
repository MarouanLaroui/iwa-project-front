import React from 'react';
import { useParams } from 'react-router-dom';
import ApplicationForm from '../components/forms/application/application-form';
import { Application } from '../types/application/Application';

export default function ApplyToOfferPage() {
  const params = useParams();

  const onSubmitionSuccess = (createdApplication: Application) => {
    console.log(createdApplication);
  };

  return (
    <ApplicationForm
      isSubmitOutside={false}
      offerId={{ offerId: `${params.offerId}` }}
      onSubmitionSuccess={onSubmitionSuccess}
    />
  );
}
