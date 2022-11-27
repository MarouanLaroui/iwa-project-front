import {
  Box, Divider, Grid, Stack, Typography,
} from '@mui/material';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import filterOfferByFilter from '../../helpers/offer-helper';
import { useFetchOffersByCompany } from '../../hooks/request/offerHooks';
import { Company } from '../../types/company/Company';
import { Offer, OfferFilters } from '../../types/offer/Offer';
import Loading from '../loading';
import OfferDetailsCard from '../offers/offer-details-card';
import MyOffersSearchBar from '../search-bars/my-offers-search-bar';

export default function CompanyOfferList(
  props: {
    companyData: Pick<Company, 'id'>
  },
) {
  const { companyData } = props;
  const [offers, , isOffersLoading, offersError] = useFetchOffersByCompany({ id: companyData.id });
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<OfferFilters>({});

  useEffect(() => {
    setFilteredOffers(filterOfferByFilter(offers, filters));
  }, [filters, offers]);

  if (isOffersLoading) {
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

  if (offersError) {
    return <div>error</div>;
  }

  return (
    <Stack width="100%" direction="column" gap="2em">

      <Stack direction="column" justifyContent="flex-start" gap="1rem">
        <Typography align="left" variant="h3" sx={{ fontWeight: 600, fontSize: { xs: '23px', sm: '33px', lg: '40px' } }}>
          {t('your-offers')}
        </Typography>
        <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
      </Stack>

      <Box width="100%" alignItems="center">
        <MyOffersSearchBar setFilters={setFilters} />
      </Box>
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