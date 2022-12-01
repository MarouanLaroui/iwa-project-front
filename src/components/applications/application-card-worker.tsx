import {
  Box, Button, Paper, Stack, Typography,
} from '@mui/material';
import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { t } from 'i18next';
import { useFetchCompany } from '../../hooks/request/companyHooks';
import useAlert from '../../hooks/context/useAlert';
import Application from '../../types/application/Application';
import TypographyWithIcon from '../typography-with-icon';

export default function ApplicationCardWorker(props:{
  application: Application;
  acceptOffer: ()=>void
}) {
  const { setError } = useAlert();
  const { application, acceptOffer } = props;
  const [company, , error] = useFetchCompany(application.offer.companyId);

  if (error) {
    setError(error);
  }
  if (company) {
    return (
      <Paper elevation={2} sx={{ borderRadius: '20px' }}>
        <Stack paddingX={6} paddingY={3} direction="column">
          <Typography
            fontSize={{ xs: '25px', md: '30px' }}
            fontWeight="bold"
            align="left"
          >
            {application.offer.title}

          </Typography>

          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {
                company.pictureUrl
                && (
                  <Box width={{ xs: '40px', md: '40px' }} height={{ xs: '40px', md: '40px' }}>
                    <img src={company.pictureUrl} style={{ width: '100%', height: '100%' }} alt="logo" />
                  </Box>
                )
              }
              <Typography fontSize={{ xs: '20px', md: '23px' }}>
                {t('for')}
                {' '}
                {company.name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={5}>
              {
                application.isValidatedByCompany && application.isValidatedByWorker && (
                  <Typography>{t('job-already-accepted')}</Typography>
                )
              }

              {
                application.isValidatedByCompany && !application.isValidatedByWorker && (
                  <>
                    <Button variant="outlined">Decline offer</Button>
                    <Button variant="contained" onClick={acceptOffer}>{t('accept-offer')}</Button>
                  </>
                )
              }

              {
                !application.isValidatedByCompany && !application.isValidatedByWorker && (
                  <TypographyWithIcon text={t('application-under-review')} icon={<AutorenewIcon />} />
                )
              }
            </Stack>

          </Stack>
        </Stack>

      </Paper>

    );
  }
  return <span />;
}
