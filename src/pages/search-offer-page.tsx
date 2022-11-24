/* eslint-disable react/no-array-index-key */
import { Divider, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OfferDetailsCard from '../components/offer-details-card';
import { useFetchOffers } from '../hooks/request/offerHooks';
import OfferSearchBar from '../components/search-bars/offer-search-bar';
import { Offer, OfferFilters } from '../types/offer/Offer';
import Loading from '../components/loading';

export default function SearchOfferPage() {
  const [offers, , isLoading, error] = useFetchOffers();
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<OfferFilters>({});
  const { t } = useTranslation();

  const filterOffers = (offersToFilter: Offer[]) => offersToFilter.filter((offer) => {
    if (filters.contractType && filters.contractType !== offer.contractType) return false;
    if (filters.jobType && filters.jobType !== offer.jobType) return false;
    if (
      filters.title
      && !offer.title.toLowerCase().trim().startsWith(filters.title.toLowerCase())) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    setFilteredOffers(filterOffers(offers));
  }, [filters, offers]);

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
        <OfferSearchBar setFilters={setFilters} filters={filters} />
      </Box>

      <Stack direction="column" justifyContent="flex-start" gap="1rem">
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '25px', lg: '40px' } }}>
          {t('offer-page-title')}
        </Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Grid container justifyContent="space-between" spacing={3}>
        {
          filteredOffers.map((offer, index) => (
            <Grid item xs md={6} xl={4} width={400} key={index}>
              <OfferDetailsCard offer={offer} />
            </Grid>
          ))
      }
      </Grid>
    </Stack>
  );
}
