import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Stack direction="column" alignItems="center" spacing="5px">
      <CircularProgress />
      <Typography variant="caption">Chargement en cours..</Typography>
    </Stack>
  );
}
