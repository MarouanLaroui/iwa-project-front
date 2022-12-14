/* eslint-disable react/no-array-index-key */
import { Divider, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OfferDetailsCard from '../components/offers/offer-details-card';
import { useFetchOffers } from '../hooks/request/offerHooks';
import OfferSearchBar from '../components/search-bars/offer-search-bar';
import { Offer, OfferFilters } from '../types/offer/Offer';
import Loading from '../components/loading';
import filterOfferByFilter from '../helpers/offer-helper';

export default function SearchOfferPage() {
  const [offers, , isLoading, error] = useFetchOffers();
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<OfferFilters>({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredOffers(filterOfferByFilter(offers, filters));
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
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '23px', sm: '33px', lg: '40px' } }}>
          {t('offer-page-title')}
        </Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Grid container justifyContent="space-between" spacing={3}>
        {
          filteredOffers.map((offer, index) => (
            <Grid
              onClick={() => {
                navigate(`/offer/details/${offer.offerId}`);
              }}
              item
              xs
              md={6}
              xl={4}
              width={400}
              key={index}
            >
              <OfferDetailsCard
                offer={offer}
                onClick={() => {
                  navigate(`/offer/details/${offer.offerId}`);
                }}
              />
            </Grid>
          ))
      }
      </Grid>
    </Stack>
  );
}
