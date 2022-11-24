import { Grid } from '@mui/material';
import React, { Key } from 'react';
import CompanyCard from '../components/company-card';
import { useFetchCompanies } from '../hooks/request/companyHooks';

export default function SearchCompaniesPage() {
  const [companies,,isLoading, error] = useFetchCompanies();
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <Grid container gap="2rem" justifyContent="center">
      {
        companies.map((company) => <CompanyCard key={company.id as Key} />)
      }
    </Grid>
  );
}
