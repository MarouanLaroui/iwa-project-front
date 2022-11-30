import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTranslation } from 'react-i18next';
import LandingPageButton from './landing-page-banner-button';
import { WORKER_PROFILE_BASE_ROUTE } from '../../pages/routing/routes';

export default function LandingPageBannerWorker(props:{
  hasCriterias: boolean
}) {
  const { hasCriterias } = props;
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ md: 'column', lg: 'row' }}
      alignItems="center"
      justifyContent="center"
      marginLeft="-9.52%"
      marginRight="-9.52%"
      spacing={{ xs: 3, md: 5, lg: 10 }}
      paddingX={3}
      paddingY={10}
      sx={{ backgroundColor: '#ffcd00' }}

    >
      <>
        <Stack direction="row" width={{ md: '90%', lg: '50%' }} justifyContent="center">
          {!hasCriterias && <SearchOutlinedIcon sx={{ fontSize: { xs: '125px', sm: '200px', md: '250px' } }} />}

          <Stack direction="column" justifyContent="center">
            <Typography
              variant="h1"
              fontWeight="bold"
              textAlign="left"
              fontSize={{
                xs: '40px', sm: '65px', md: '75px', lg: '90px',
              }}
            >
              {hasCriterias ? t('hi-again') : t('uh-oh')}

            </Typography>

            <Typography
              variant="h3"
              textAlign="left"
              fontSize={{
                xs: '25px', sm: '30px', md: '35px', lg: '35px',
              }}
            >
              {hasCriterias ? t('have-your-interest-changed') : t('not-enough-info')}

            </Typography>
          </Stack>

        </Stack>

        <Stack
          direction="column"
          height="100%"
          width={{ md: '70%', lg: '30%' }}
          alignItems="flex-start"
          spacing={3}
        >
          <Typography
            textAlign="left"
            variant="h3"
            fontSize={{
              xs: '20px', sm: '25px', md: '35px', lg: '30px',
            }}
          >
            {t('help-you-suggestion')}

          </Typography>
          <LandingPageButton tKey={hasCriterias ? 'update-criteria' : 'specify-criteras'} link={WORKER_PROFILE_BASE_ROUTE} />

        </Stack>
      </>

    </Stack>
  );
}
