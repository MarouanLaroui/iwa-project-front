import { Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationFull from '../../types/application/ApplicationFull';
import ApplicationCard from './application-card';

type ApplicationListProps = {
  applications: Array<ApplicationFull>
};

export default function ApplicationList({ applications }: ApplicationListProps) {
  const { t } = useTranslation();
  return (
    <Box
      component={Paper}
      elevation={2}
      justifyContent="flex-start"
      padding={2}
    >
      <Stack direction="column" alignItems="flex-start">

        <Typography variant="h4" fontWeight="bold">{applications.length > 0 ? t('applications') : t('applications-empty')}</Typography>
        {applications.map((application, index) => (
          <>
            <ApplicationCard
              key={application.applicationId}
              applicationFull={application}
            />
            {index !== (applications.length - 1) && <Divider sx={{ marginY: 1, width: '90%' }} />}
          </>
        ))}
      </Stack>
    </Box>
  );
}
