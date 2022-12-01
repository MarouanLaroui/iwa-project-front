import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationCardWorker from '../components/applications/application-card-worker';
import Loading from '../components/loading';
import useAlert from '../hooks/context/useAlert';
import { acceptApplicationByWorker, useFetchWorkerApplications } from '../hooks/request/applicationHooks';

export default function WorkerApplicationPage() {
  const [applications, setApplications, loading, error] = useFetchWorkerApplications();
  const { setError, setSuccessMessage } = useAlert();
  const { t } = useTranslation();

  const acceptOffer = (applicationId: string) => {
    acceptApplicationByWorker(applicationId).then(
      () => {
        setSuccessMessage('Offer accepted with success');
        const updatedApplications = applications.map(
          (application) => {
            if (application.applicationId === applicationId) {
              return { ...application, isValidatedByWorker: true };
            }
            return application;
          },
        );
        setApplications([...updatedApplications]);
      },
      (err) => setError(err),
    );
  };

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
      {
        applications.length > 0
        && <Typography variant="h3">{t('your-applications')}</Typography>
      }
      {
        applications.length === 0 && <Typography>{t('no-applications-yet')}</Typography>
      }
      {
        applications && (
          applications.map(
            (application) => (
              <ApplicationCardWorker
                acceptOffer={() => acceptOffer(application.applicationId)}
                application={application}
              />
            ),
          )
        )
      }
    </Stack>
  );
}
