import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import TypographyWithIcon from '../components/typography-with-icon';
import Worker from '../types/worker/Worker';

export default function WorkerProfilePage() {
  // const params = useParams();
  const { t } = useTranslation();

  const mockWorker: Worker = {
    id: 'abc-123',
    firstName: 'Ruby',
    lastName: 'Georget',
    email: 'ruby@gmail.com',
    birthDate: new Date('2000-05-24'),
    cvLink: undefined,
    hasDrivingLicense: true,
  };

  const dateString = mockWorker.birthDate.toDateString();

  return (
    <Stack alignItems="flex-start" spacing="10px">
      <Typography fontWeight="bold" variant="h5">
        {t('profile-page-title')}
      </Typography>
      <Typography variant="h6">
        {mockWorker.firstName}
        {' '}
        {mockWorker.lastName}
      </Typography>
      <TypographyWithIcon text={mockWorker.email} icon={<EmailIcon />} />
      <TypographyWithIcon text={`${t('born-on')}${dateString.substring(3, dateString.length)}`} icon={<CakeIcon />} />
      {mockWorker.hasDrivingLicense
      && <TypographyWithIcon text={t('has-driving-license')} icon={<BadgeIcon />} />}

    </Stack>
  );
}
