import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import Loading from '../components/loading';
import LastOffers from '../components/offers/last-offers/last-offers-desktop';
import { useFetchCompany } from '../hooks/request/companyHooks';
import mockOffer from '../database/mock/mockOffer';
import mockCompany from '../database/mock/mockCompany';
import { useFetchOffer } from '../hooks/request/offerHooks';
import CompanyBanner from '../components/company/company-banner';
import LastOfferMobile from '../components/offers/last-offers/last-offers-mobile';

export default function CompanyDetailsPage() {
  const params = useParams();
  const [company, isCompanyLoading, companyError] = useFetchCompany(`${params.companyId}`);
  const [offer, isOfferLoading, offerError] = useFetchOffer(`${params.offerId}`);
  // revoir

  if (isOfferLoading || isCompanyLoading) {
    <Grid
      container
      width="100%"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Loading />
    </Grid>;
  }
  return (
    <Stack direction="column" spacing={{ xs: 3, md: 10 }}>
      <CompanyBanner company={mockCompany} />

      <Box display={{ xs: 'flex', md: 'none' }}>
        <LastOfferMobile offers={[mockOffer, mockOffer, mockOffer]} />
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 10 }}>
        <Box minWidth="280px" display={{ xs: 'none', md: 'flex' }}>
          <LastOffers offers={[mockOffer, mockOffer, mockOffer]} />
        </Box>

        {/* Description entreprise */}
        <Stack direction="column" justifyContent="flex-start" spacing={2}>
          <Typography variant="h4" fontWeight={600} align="left" fontSize={{ xs: '20px', md: '30px' }}>Qui sont ils ?</Typography>
          <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
          <Typography fontSize={{ xs: '18px', md: '20px' }} align="left">{mockCompany.description}</Typography>
        </Stack>

      </Stack>
    </Stack>

  );

  if (company && offer) {
    return <LastOffers offers={[mockOffer]} />;
  }
  if (offerError || companyError) {
    return <div>error</div>;
  }
}
