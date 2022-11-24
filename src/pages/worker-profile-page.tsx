import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function WorkerProfilePage() {
  const params = useParams();

  return (
    <Stack>
      <Typography>
        Worker login page
        {' '}
        {params.workerId}
      </Typography>
    </Stack>
  );
}
