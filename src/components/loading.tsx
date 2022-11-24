import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  return (
    <Stack direction="column" alignItems="center" spacing="5px">
      <CircularProgress />
      <Typography variant="caption">{t('loading')}</Typography>
    </Stack>
  );
}
