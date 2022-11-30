import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationCardWorker from '../components/applications/application-card-worker';
import Loading from '../components/loading';
import useAlert from '../hooks/context/useAlert';
import { useFetchWorkerApplications } from '../hooks/request/applicationHooks';

export default function WorkerApplicationPage() {
  const [applications, , loading, error] = useFetchWorkerApplications();
  const { setError } = useAlert();
  const { t } = useTranslation();

  if (error) {
    setError(error);
  }
  if (loading) {
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
  return (
    <Stack>
      <Typography>{t('your-applications')}</Typography>
      {
        applications && (
          applications.map(
            (application) => (
              <ApplicationCardWorker application={application} />
            ),
          )
        )
      }
    </Stack>
  );
}
