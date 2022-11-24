import React from 'react';
import CompanySignupForm from '../components/forms/company/company-signup-form';

export default function CompanySignUpPage() {
  const onSubmitionSuccess = () => {

  };

  return (
    <CompanySignupForm onSubmitionSuccess={onSubmitionSuccess} />
  );
}
