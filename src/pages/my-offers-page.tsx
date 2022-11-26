import { Typography, Divider, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { t } from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import OfferDetailsCard from '../components/offers/offer-details-card';
import MyOffersSearchBar from '../components/search-bars/my-offers-search-bar';
import UserContext from '../context/user-context';
import filterOfferByFilter from '../helpers/offer-helper';
import { useFetchOffersByCompany } from '../hooks/request/offerHooks';
import { Offer, OfferFilters } from '../types/offer/Offer';
// import JobOfferForm from '../components/forms/job-offer/job-offer-form';

export default function MyOfferPage() {
  const { userId } = useContext(UserContext);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<OfferFilters>({});

  useEffect(() => {
    console.log('here', userId);
    if (userId) {
      const [fetchedOffers] = useFetchOffersByCompany({ id: userId });
      setOffers(fetchedOffers);
    }
  }, [userId]);

  useEffect(() => {
    setFilteredOffers(filterOfferByFilter(offers, filters));
  }, [filters, offers]);

  // if () {
  //   return (
  //     <Grid
  //       container
  //       width="100%"
  //       height="80vh"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <Loading />
  //     </Grid>
  //   );
  // }

  // if (error) {
  //   return <div>error</div>;
  // }

  return (
    <Stack width="100%" direction="column" gap="2em">

      <Box width="100%" alignItems="center">
        <MyOffersSearchBar setFilters={setFilters} />
      </Box>

      <Stack direction="column" justifyContent="flex-start" gap="1rem">
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '23px', sm: '33px', lg: '40px' } }}>
          {t('your-offers')}
        </Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Grid container justifyContent="space-between" spacing={3}>
        {
          filteredOffers.map((offer) => (
            <Grid item xs md={6} xl={4} width={400} key={offer.title + offer.offerId}>
              <OfferDetailsCard offer={offer} />
            </Grid>
          ))
      }
      </Grid>
    </Stack>
  );
}
