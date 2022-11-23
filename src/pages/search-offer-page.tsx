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
    if (filters.contractType && filters.contractType !== offer.contractType) return false;
    if (filters.jobType && filters.jobType !== offer.jobType) return false;
    return true;
  });

  useEffect(() => {
    setFilteredOffers(filterOffers(offers));
  }, [filters]);

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
          filteredOffers.map((offer) => (
            <Box width={500}>
              <OfferDetailsCard offer={offer} />
            </Box>
          ))
      }
      </Grid>
    </Stack>
  );
}
