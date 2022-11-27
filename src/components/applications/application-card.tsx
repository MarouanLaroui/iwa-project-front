import { Cancel, CheckCircle, PendingActions } from '@mui/icons-material';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationFull from '../../types/application/ApplicationFull';
import TypographyWithIcon from '../typography-with-icon';

type ApplicationCardProps = {
  application: ApplicationFull;
};

function ApplicationStatus({ application }: ApplicationCardProps) {
  const { t } = useTranslation();

  if (application.isValidatedByCompany) {
    if (application.isValidatedByWorker) {
      return <TypographyWithIcon sx={{ color: 'green' }} text={t('fully-accepted')} icon={<CheckCircle sx={{ color: 'green' }} />} />;
    }
    return <TypographyWithIcon sx={{ color: 'orange' }} text={t('company-accepted')} icon={<PendingActions sx={{ color: 'orange' }} />} />;
  }
  return <TypographyWithIcon sx={{ color: 'gray' }} text={t('not-accepted')} icon={<Cancel sx={{ color: 'gray' }} />} />;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
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
          <ApplicationStatus application={application} />
          <Typography textAlign="left">
            {`"${application.message}"`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button sx={{ width: 'fit-content' }}>
            Accepter candidature
          </Button>
        </Stack>
      </Stack>

    </Box>
  );
}
