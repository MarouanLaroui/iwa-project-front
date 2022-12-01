import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useFetchWorker } from '../../../../hooks/request/workerHooks';
import Worker from '../../../../types/worker/Worker';
import RecapInfoForm from '../../../forms/worker/recap-info/recap-info-form';

export default function VerifyInfoStep(props:{
  workerData:Pick<Worker, 'id'>
}) {
  const { workerData } = props;
  const [worker] = useFetchWorker(`${workerData.id}`);

  return (
    <Stack direction="column" spacing={2} width="100%">
      <Typography fontSize={20} fontWeight="bold">Vos coordonnées</Typography>
      {worker && <RecapInfoForm worker={worker} />}
      <Typography fontSize={14} variant="caption">Vérifiez vos coordonnées et mettez les à jour dans la page profil si besoin.</Typography>
    </Stack>
  );
}
