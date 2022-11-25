import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Worker from '../types/worker/Worker';
import WorkerProfile from '../components/worker-profile';

export default function WorkerProfilePage() {
  const { t } = useTranslation();
  // const params = useParams();

  const [value, setValue] = React.useState(0);

  const mockWorker: Worker = {
    id: 'abc-123',
    firstName: 'Ruby',
    lastName: 'Georget',
    email: 'ruby@gmail.com',
    birthDate: new Date('2000-05-24'),
    cvLink: undefined,
    hasDrivingLicense: true,
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '10px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('personal-information')} />
          <Tab label={t('search-criterias')} />
        </Tabs>
      </Box>
      {value === 0 && <WorkerProfile worker={mockWorker} />}
      {value === 1 && <div>Test</div>}
    </>
  );
}
