/* eslint-disable react/no-array-index-key */
import { Grid } from '@mui/material';
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
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Stack width="100%" gap="3rem">
      <OfferSearchBar setFilters={setFilters} filters={filters} />
      <Grid
        container
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="flex-start"
      >
        {
          filteredOffers.map((offer, index) => (
            <Box width={400} key={index}>
              <OfferDetailsCard offer={offer} />
            </Box>
          ))
      }
      </Grid>
    </Stack>
  );
}
