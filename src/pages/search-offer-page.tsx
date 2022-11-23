import { Stack } from '@mui/system';
import React, { useState } from 'react';
import OfferSearchBar from '../components/search-bars/offer-search-bar';
import { useFetchOffers } from '../hooks/request/offerHooks';
import { Offer, OfferFilters } from '../types/offer/Offer';

export default function SearchOffersPage() {
  const [filters, setFilters] = useState<OfferFilters>({});
  const [offers,,isOffersLoading, error] = useFetchOffers();

  const filterOffers = (offersToFilter: Offer[]) => offersToFilter.filter((offer) => {
    if (filters.contractType && filters.contractType !== offer.contractType) return false;
    if (filters.jobType && filters.jobType !== offer.jobType) return false;
    return true;
  });

  if (isOffersLoading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(offers);
    return <div>error</div>;
  }

  return (
    <Stack direction="column">
      <div>Search company</div>
      <OfferSearchBar setFilters={setFilters} />
      {
          offers.length > 0 && filterOffers(offers).map((offer) => <div>{offer.offerId}</div>)
      }
    </Stack>
  );
}
