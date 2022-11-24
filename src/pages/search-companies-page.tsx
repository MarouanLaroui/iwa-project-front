import { Divider, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CompanyCard from '../components/company-card';
import Loading from '../components/loading';
import CompanySearchBar from '../components/search-bars/company-search-bar';
import { useFetchCompanies } from '../hooks/request/companyHooks';
import { Company, CompanyFilters } from '../types/company/Company';

export default function SearchCompaniesPage() {
  const [companies,,isLoading, error] = useFetchCompanies();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState<CompanyFilters>({});
  const { t } = useTranslation();

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
    return (
      <Grid
        container
        width="100%"
        height="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Loading />
      </Grid>
    );
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
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '25px', lg: '40px' } }}>
          {t('companies-page-title')}
        </Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Grid container justifyContent="space-between" spacing={3}>
        {
          filteredCompanies.map((company) => (
            <Grid item xs md={6} xl={4} width={400} key={company.id as Key}>
              <CompanyCard
                company={company}
                key={company.id as Key}
              />
            </Grid>
          ))
        }
      </Grid>

    </Stack>

  );
}
