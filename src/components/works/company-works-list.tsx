import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import mockWorker from '../../database/mock/mockWorker';
import { useFetchWorksByToken } from '../../hooks/request/worksHooks';
import EmployeeCard from './employee-card';

export default function CompanyWorksList() {
  const [works,, loading, error] = useFetchWorksByToken();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Stack>
      {
      // TODO: fetch and use real workers
      works.map((work) => <EmployeeCard work={work} worker={mockWorker} />)
      }
    </Stack>
  );
}
