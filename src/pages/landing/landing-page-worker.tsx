import React, { Key } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useFetchCompanies } from '../../hooks/request/companyHooks';
import Loading from '../../components/loading';
import CompanyCard from '../../components/company/company-card';
import { useFetchOffers, useFetchRecommendedOffers } from '../../hooks/request/offerHooks';
import OfferDetailsCard from '../../components/offers/offer-details-card';
import LandingPageBannerWorker from '../../components/landing-page/landing-page-banner-worker';
import useAlert from '../../hooks/context/useAlert';

export default function LandingPageWorker() {
  const { t } = useTranslation();
  const { setError } = useAlert();
  const navigate = useNavigate();
  const [companies, , loading] = useFetchCompanies();
  const [offers, , offersLoading, offersError] = useFetchOffers();
  const [
    recommendedOffers,,
    recommendedOffersLoading,
    recommendedError,
  ] = useFetchRecommendedOffers();

  if (loading || recommendedOffersLoading || offersLoading) {
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
    setError(offersError);
  }

  return (
    <Stack paddingBottom={5} direction="column" spacing={10}>
      <LandingPageBannerWorker hasCriterias={!recommendedError} />

      {/* Workers */}
      <Stack direction="column" spacing={3}>
        <Typography
          fontWeight="bold"
          textAlign="left"
          fontSize={{
            xs: '20px', sm: '25px', md: '30px', lg: '30px',
          }}
        >
          {recommendedError || recommendedOffers.length === 0 ? t('last-offers') : t('recommended-offers')}
        </Typography>
        <Stack spacing={3} direction="row" width="100%" sx={{ overflow: 'scroll' }} paddingY={2} paddingX={1}>
          {
            (recommendedOffers.length > 0 ? recommendedOffers : offers).map((offer) => (
              <Box
                width={550}
                height={270}
                onClick={() => { navigate(`offer/details/${offer.offerId}`); }}
                key={offer.offerId as Key}
              >
                <OfferDetailsCard
                  offer={offer}
                  onClick={() => {}}
                />
              </Box>
            ))
          }
        </Stack>
      </Stack>

      {/* Companies */}
      <Stack direction="column" spacing={3}>
        <Typography
          fontWeight="bold"
          textAlign="left"
          fontSize={{
            xs: '20px', sm: '25px', md: '30px', lg: '30px',
          }}
        >
          {t('recruiting-companies')}
        </Typography>
        <Stack spacing={3} direction="row" width="100%" sx={{ overflow: 'scroll' }} paddingY={2} paddingX={1}>
          {
            companies.map((company) => (
              <Box width={550} height={270} key={company.id as Key}>
                <CompanyCard
                  company={company}
                  key={company.id as Key}
                />
              </Box>
            ))
          }
        </Stack>
      </Stack>

    </Stack>
  );
}
