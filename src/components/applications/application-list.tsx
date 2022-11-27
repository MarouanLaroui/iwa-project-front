import { Divider } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import ApplicationFull from '../../types/application/ApplicationFull';
import ApplicationCard from './application-card';

type ApplicationListProps = {
  applications: Array<ApplicationFull>
};

export default function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <Stack>
      {applications.map((application, index) => (
        <>
          <ApplicationCard
            key={application.applicationId}
            application={application}
          />
          {index !== (applications.length - 1) && <Divider sx={{ marginY: 1 }} />}
        </>
      ))}
    </Stack>
  );
}
