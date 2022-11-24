import { Divider, Grid, Typography } from '@mui/material';
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
    <Stack width="100%" direction="column" gap="2em">

      <Box width="100%" alignItems="center">
        <CompanySearchBar filters={filters} setFilters={setFilters} />
      </Box>

      <Stack direction="column" justifyContent="flex-start" gap="1rem">
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '25px', lg: '40px' } }}>Our partner companies</Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Grid container gap="2rem" justifyContent="space-between">
        {
          filteredCompanies.map((company) => (
            <Box sx={{ width: { xs: '100%', lg: '315px', xl: '400px' } }}>
              <CompanyCard
                company={company}
                key={company.id as Key}
              />
            </Box>
          ))
        }
      </Grid>
    </Stack>

  );
}
