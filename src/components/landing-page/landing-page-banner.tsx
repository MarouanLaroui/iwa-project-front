import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import LandingPageButton from './landing-page-banner-button';
import { COMPANY_SEARCH_ROUTE, OFFER_SEARCH_ROUTE, WORKER_LOGIN_ROUTE } from '../../pages/routing/routes';

export default function LandingPageBanner() {
  // const { t } = useTranslation();
  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      marginLeft="-9.52%"
      marginRight="-9.52%"
      paddingX={3}
      paddingY={10}
      spacing={4}
      sx={{ backgroundColor: '#ffcd00' }}
      alignItems={{ xs: 'center', lg: 'flex-start' }}
    >
      <Stack direction="column" width="60%" justifyContent="center">
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize={{
            xs: '50px', sm: '65px', md: '75px', lg: '90px',
          }}
        >
          Notre slogon

        </Typography>
        <Typography
          variant="h3"
          fontSize={{
            xs: '30px', sm: '40px', md: '45px', lg: '55px',
          }}
        >
          Description phrase stylée détaillée

        </Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row', lg: 'column' }}
        width={{ xs: '100%', lg: '30%' }}
        justifyContent={{ xs: 'center', md: 'space-around', lg: 'center' }}
        alignItems="center"
        spacing={3}
      >
        <LandingPageButton tKey="browe-job-offers" link={OFFER_SEARCH_ROUTE} />
        <LandingPageButton tKey="find-your-company" link={COMPANY_SEARCH_ROUTE} />
        <LandingPageButton tKey="join-us" link={WORKER_LOGIN_ROUTE} />

      </Stack>
    </Stack>
  );
}
