import { Cancel, CheckCircle, PendingActions } from '@mui/icons-material';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AlertContext from '../../context/alert-context';
import { acceptApplicationByCompany } from '../../hooks/request/applicationHooks';
import ApplicationFull from '../../types/application/ApplicationFull';
import TypographyWithIcon from '../typography-with-icon';

type ApplicationCardProps = {
  applicationFull: ApplicationFull;
};

function ApplicationStatus({ applicationFull }: ApplicationCardProps) {
  const { t } = useTranslation();

  if (applicationFull.isValidatedByCompany) {
    if (applicationFull.isValidatedByWorker) {
      return <TypographyWithIcon sx={{ color: 'green' }} text={t('fully-accepted')} icon={<CheckCircle sx={{ color: 'green' }} />} />;
    }
    return <TypographyWithIcon sx={{ color: 'orange' }} text={t('company-accepted')} icon={<PendingActions sx={{ color: 'orange' }} />} />;
  }
  return <TypographyWithIcon sx={{ color: 'gray' }} text={t('not-accepted')} icon={<Cancel sx={{ color: 'gray' }} />} />;
}

export default function ApplicationCard({ applicationFull }: ApplicationCardProps) {
  const { setError, setSuccessMessage } = useContext(AlertContext);
  const [application, setApplication] = useState<ApplicationFull>(applicationFull);
  const { t } = useTranslation();
  const { worker } = application;
  return (
    <Box
      width="100%"
      borderRadius="5px"
    >
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
        <Stack
          direction="column"
          alignItems="flex-start"
          paddingX="20px"
          paddingY="20px"
          gap="5px"
        >
          <Typography textAlign="left" fontWeight="bold">
            {worker.firstname}
            {' '}
            {worker.lastname.toUpperCase()}
          </Typography>
          <Typography textAlign="left" fontStyle="italic">
            {t('born-on')}
            {worker.birthDate.toDateString().substring(3, worker.birthDate.toDateString().length)}
          </Typography>
          <ApplicationStatus applicationFull={application} />
          <Typography textAlign="left">
            {`"${application.message}"`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            sx={{ width: 'fit-content' }}
            onClick={() => {
              acceptApplicationByCompany(application.applicationId)
                .then(() => {
                  setSuccessMessage(t('application-accepted'));
                  setApplication({ ...application, isValidatedByCompany: true });
                })
                .catch((err:AxiosError) => setError(err));
            }}
          >
            {t('accept-application')}
          </Button>
        </Stack>

        <Stack>
          <Button variant="contained" startIcon={<DownloadOutlinedIcon />} href={worker.cvLink}>
            {t('download')}
          </Button>
        </Stack>
      </Stack>

    </Box>
  );
}
