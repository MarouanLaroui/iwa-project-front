import { Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { Key, useEffect, useState } from 'react';
import CompanyCard from '../components/company-card';
import CompanySearchBar from '../components/search-bars/company-search-bar';
import { useFetchCompanies } from '../hooks/request/companyHooks';
import { Company, CompanyFilters } from '../types/company/Company';

export default function SearchCompaniesPage() {
  const [companies,,isLoading, error] = useFetchCompanies();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState<CompanyFilters>({});

  const filterCompanies = (companiesToFilter: Company[]) => companiesToFilter.filter((company) => {
    if (
      filters.companyName
      && !company.name.toLowerCase().trim().startsWith(filters.companyName.toLowerCase())) {
      return false;
    }
    if (filters.sector && filters.sector !== company.sector) return false;
    return true;
  });

  useEffect(() => {
    setFilteredCompanies(filterCompanies(companies));
  }, [filters, companies]);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <Stack width="100%" direction="column" gap="5rem" alignItems="center">
      <Box width="100%" justifyContent="center">
        <CompanySearchBar filters={filters} setFilters={setFilters} />
      </Box>

      <Grid container gap="4rem" justifyContent="center">
        {
          filteredCompanies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id as Key}
            />
          ))
        }
      </Grid>
    </Stack>

  );
}
