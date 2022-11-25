import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import TypographyWithIcon from './typography-with-icon';
import Worker from '../types/worker/Worker';

type Props = {
  worker: Worker
};

export default function WorkerProfile({ worker }: Props) {
  const { t } = useTranslation();

  const dateString = worker.birthDate.toDateString();

  return (
    <Stack alignItems="flex-start" spacing="10px">
      <Typography variant="h6">
        {worker.firstName}
        {' '}
        {worker.lastName}
      </Typography>
      <TypographyWithIcon text={worker.email} icon={<EmailIcon />} />
      <TypographyWithIcon text={`${t('born-on')}${dateString.substring(3, dateString.length)}`} icon={<CakeIcon />} />
      {worker.hasDrivingLicense
      && <TypographyWithIcon text={t('has-driving-license')} icon={<BadgeIcon />} />}

    </Stack>
  );
}
