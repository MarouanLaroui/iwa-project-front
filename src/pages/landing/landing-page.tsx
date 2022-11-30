import React, { Key } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/system';
import LandingPageBanner from '../../components/landing-page/landing-page-banner';
import { useFetchCompanies } from '../../hooks/request/companyHooks';
import Loading from '../../components/loading';
import CompanyCard from '../../components/company/company-card';
import { useFetchOffers } from '../../hooks/request/offerHooks';
import OfferDetailsCard from '../../components/offers/offer-details-card';

export default function LandingPage() {
  const { t } = useTranslation();
  const [companies,,loading] = useFetchCompanies();
  const [offers,,offersLoading] = useFetchOffers();

  if (loading || offersLoading) {
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

  return (
    <Stack paddingBottom={5} direction="column" spacing={10}>
      <LandingPageBanner />
      {/* Companies */}
      <Stack direction="column" spacing={3}>
        <Typography
          fontWeight="bold"
          textAlign="left"
          fontSize={{
            xs: '20px', sm: '25px', md: '30px', lg: '30px',
          }}
        >
          {t('recruiting-companies')}
        </Typography>
        <Stack spacing={3} direction="row" width="100%" sx={{ overflow: 'scroll' }} paddingY={2} paddingX={1}>
          {
            companies.map((company) => (
              <Box width={550} height={270} key={company.id as Key}>
                <CompanyCard
                  company={company}
                  key={company.id as Key}
                />
              </Box>
            ))
          }
        </Stack>
      </Stack>

      {/* Website */}
      <Stack direction="column" spacing={3}>
        <Typography
          fontWeight="bold"
          textAlign="left"
          fontSize={{
            xs: '20px', sm: '25px', md: '30px', lg: '30px',
          }}
        >
          {t('last-offers')}
        </Typography>
        <Stack spacing={3} direction="row" width="100%" sx={{ overflow: 'scroll' }} paddingY={2} paddingX={1}>
          {
            offers.map((offer) => (
              <Box width={550} height={270} key={offer.offerId as Key}>
                <OfferDetailsCard
                  offer={offer}
                  onClick={() => {}}
                />
              </Box>
            ))
          }
        </Stack>
      </Stack>

    </Stack>
  );
}
