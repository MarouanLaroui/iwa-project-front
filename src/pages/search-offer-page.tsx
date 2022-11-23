/* eslint-disable react/no-array-index-key */
import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import OfferDetailsCard from '../components/offer-details-card';
import { useFetchOffers } from '../hooks/request/offerHooks';
import OfferSearchBar from '../components/search-bars/offer-search-bar';
import { Offer, OfferFilters } from '../types/offer/Offer';

export default function SearchOfferPage() {
  const [offers, , isLoading, error] = useFetchOffers();
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<OfferFilters>({});

  const filterOffers = (offersToFilter: Offer[]) => offersToFilter.filter((offer) => {
    if (filters.contractType && filters.contractType !== offer.contractType) {
      console.log('here');
      return false;
    }
    if (filters.jobType && filters.jobType !== offer.jobType) {
      console.log('here 2');
      return false;
    }
    return true;
  });

  useEffect(() => {
    setFilteredOffers(filterOffers(offers));
  }, [filters, offers]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(offers);
    return <div>error</div>;
  }

  return (
    <Stack>
      <OfferSearchBar setFilters={setFilters} />
      <Typography
        variant="h3"
        marginBottom={5}
      >
        Voici toutes nos supers offres

      </Typography>
      <Grid
        container
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        {
          filteredOffers.map((offer, index) => (
            <Box width={500} key={index}>
              <OfferDetailsCard offer={offer} />
            </Box>
          ))
      }
      </Grid>
    </Stack>
  );
}
