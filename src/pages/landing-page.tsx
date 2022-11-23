import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/search-bars/search-bar';
import CompanyCard from '../components/company-card';

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <Grid paddingY="30px">
      <Typography>{t('test')}</Typography>
      <SearchBar placeholder="Rechercher une entreprise, un job..." />
      <CompanyCard />
    </Grid>
  );
}
