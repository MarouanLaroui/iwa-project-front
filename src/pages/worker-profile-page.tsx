import React, { useContext } from 'react';
import {
  Tabs, Tab, CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import WorkerProfileForm from '../components/forms/worker/worker-profile-form';
import WorkerCriteria from '../components/worker-criteria';
import { useFetchWorker, useUpdateWorker } from '../hooks/request/workerHooks';
import mockCriteria from '../database/mock/mockCriteria';
import AlertContext from '../context/alert-context';
import { WorkerUpdateDTO } from '../types/worker/WorkerUpdateDTO';
import useAuth from '../hooks/context/useAuth';
import FeedbackCard from '../components/feedback/feedback-card';
import mockFeedback from '../database/mock/mockFeedback';

export default function WorkerProfilePage() {
  const { t } = useTranslation();
  const { workerId } = useAuth();
  const { setError, setSuccessMessage } = useContext(AlertContext);

  const [value, setValue] = React.useState(0);

  const [worker, loading, error] = useFetchWorker(workerId!);

  if (error) {
    setError(error);
  }

  // TODO: GET CRITERIA FROM REQUEST

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onUpdateWorkerSubmit = async (
    workerUpdateDTO: WorkerUpdateDTO,
  ) => {
    useUpdateWorker(workerUpdateDTO)
      .then(() => {
        setSuccessMessage(t('information-successfully-updated'));
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      {worker
          && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '30px' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={t('personal-information')} />
                <Tab label={t('search-criterias')} />
                <Tab label={t('feedback-received')} />
              </Tabs>
            </Box>
            {value === 0 && <WorkerProfileForm worker={worker!} onSubmit={onUpdateWorkerSubmit} />}
            {value === 1 && <WorkerCriteria criteria={mockCriteria} />}
            {value === 2 && <FeedbackCard feedback={mockFeedback} />}
          </>
          )}
      {loading && <CircularProgress />}
    </>
  );
}
