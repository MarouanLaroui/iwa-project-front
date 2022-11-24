import React from 'react';
import JobOfferForm from '../components/forms/job-offer/job-offer-form';

export default function createOfferPage() {
  const onSubmitionSuccess = () => {

  };
  return (
    <JobOfferForm onSubmitionSuccess={onSubmitionSuccess} />
  );
}
