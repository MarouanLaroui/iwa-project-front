import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import WorkerSignupForm from '../../../forms/worker/signup/worker-signup-form';
import mockWorker from '../../../../database/mock/mockWorker';

export default function VerifyInfoStep() {
  return (
    <Stack direction="column" spacing={2} width="100%">
      <Typography fontSize={20} fontWeight="bold">Vos coordonnées</Typography>
      <WorkerSignupForm readonly worker={mockWorker} />
      <Typography fontSize={14} variant="caption">Vérifiez vos coordonnées et mettez les à jour dans la page profil si besoin.</Typography>
    </Stack>
  );
}
